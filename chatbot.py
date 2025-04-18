import re
import json
import random
from flask import Flask, request, jsonify, render_template, url_for
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import requests
from bs4 import BeautifulSoup
import os

# Descargar recursos de NLTK necesarios
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('punkt')
    nltk.download('stopwords')
    nltk.download('wordnet')

app = Flask(__name__)

# Estructura de la información extraída de la landing page
landing_info = {
    "nombre_programa": "Adelgaza sin Salir de Casa",
    "duracion_diaria": "45 minutos al día",
    "dias_semana": "5 días a la semana",
    "niveles": [
        {"nombre": "Nivel básico 1", "clases": 5},
        {"nombre": "Nivel Básico 2", "clases": 5},
        {"nombre": "Nivel Intermedio 1", "clases": 5},
        {"nombre": "Nivel Intermedio 2", "clases": 5},
        {"nombre": "Nivel Avanzado 1", "clases": 5},
        {"nombre": "Nivel Avanzado 2", "clases": 5}
    ],
    "bonus": [
        {"nombre": "Baile", "clases": 3, "descripcion": "Aprenderás pasos básicos de diferentes géneros musicales"},
        {"nombre": "Embarazo", "clases": 3, "descripcion": "Para mujeres que quieren mantenerse activas durante esta etapa"},
        {"nombre": "Adulto Mayor", "clases": 2, "descripcion": "Ejercicios para fortalecer todos los grupos musculares"},
        {"nombre": "Estiramiento", "clases": 2, "descripcion": "Para elongar tu cuerpo y evitar lesiones"}
    ],
    "beneficios": [
        "Ahorrarás mucho dinero en DIETAS y GIMNASIOS",
        "Mejorarás tu estado físico reduciendo niveles de depresión y ansiedad",
        "Tendrás dos entrenadores profesionales de manera virtual",
        "Ahorrarás tiempo usando entrenamiento de tan solo 45 minutos al día",
        "Aprenderás a usar los elementos de tu hogar para hacer entrenamientos",
        "Podrás entrenar con la ropa que desees",
        "Tendrás al alcance un teléfono o una computadora",
        "El tiempo, dinero y lugar dejarán de ser un problema",
        "Adquirirás hábitos más saludables y mejorarás tu salud"
    ],
    "testimonios": [
        {"nombre": "ZENAIDA RODRIGUEZ", "comentario": "Duré casi dos años en un gimnasio y nunca había obtenido los resultados tan maravillosos que tengo ahora, he bajado más de 4 kilos"},
        {"nombre": "YOLANDA ARIAS", "comentario": "Estoy muy feliz de poder hacer los ejercicios desde mi casa, ya bajé más de 5 kilos"},
        {"nombre": "ELIANA HERRERA", "comentario": "Llevaba más de 10 años sin hacer ejercicio y empecé con rutinas suaves desde mi casa"}
    ],
    "entrenadores": ["NATALIA ALARCÓN", "CRISTIAN ESPINOSA"],
    "experiencia_entrenadores": "Artistas, bailarines y entrenadores profesionales con recorrido internacional en países como CHINA, KOREA DEL SUR, MÉXICO, ITALIA, FRANCIA, TURQUIA y U.S.A",
    "precio": {
        "normal": 169.00,
        "oferta": 90.00,
        "ahorro": "47%"
    },
    "enlace_inscripcion": "https://hotm.art/AdelgazasinSalirdeCasa-LanCheckOut",
    "contacto": "hristiankrasimirov7@gmail.com"
}

# Preguntas frecuentes
faq = [
    {
        "question": "¿Cuánto tiempo dura cada clase?",
        "answer": "Cada clase tiene una duración de 45 minutos. El programa está diseñado para que entrenes 5 días a la semana."
    },
    {
        "question": "¿Necesito equipamiento especial?",
        "answer": "No, el programa está diseñado para utilizar elementos que ya tienes en tu hogar. Aprenderás a ser recursivo y usar los objetos de tu casa para hacer los entrenamientos."
    },
    {
        "question": "¿Qué nivel de condición física necesito?",
        "answer": "El programa está dividido en 6 niveles progresivos, desde básico hasta avanzado. Cada nivel tiene 5 clases, lo que te permite comenzar desde cero e ir avanzando gradualmente."
    },
    {
        "question": "¿Obtendré un certificado?",
        "answer": "Sí, recibirás un certificado al completar el programa como reconocimiento por tu dedicación y logros."
    },
    {
        "question": "¿Cuál es el precio del programa?",
        "answer": f"El precio normal es de ${landing_info['precio']['normal']}, pero actualmente está en oferta por solo ${landing_info['precio']['oferta']}, lo que te permite ahorrar un {landing_info['precio']['ahorro']}."
    },
    {
        "question": "¿Cómo puedo inscribirme?",
        "answer": f"Puedes inscribirte haciendo clic en el botón '¡QUIERO INSCRIBIRME AHORA!' o visitando directamente este enlace: {landing_info['enlace_inscripcion']}"
    },
    {
        "question": "¿Quiénes son los entrenadores?",
        "answer": f"Los entrenadores son {' y '.join(landing_info['entrenadores'])}, {landing_info['experiencia_entrenadores']}."
    },
    {
        "question": "¿Qué bonus incluye el programa?",
        "answer": "El programa incluye 10 clases de regalo como bonus: 3 de baile, 3 para mujeres en embarazo, 2 para adulto mayor y 2 de estiramiento."
    },
    {
        "question": "¿Puedo hacer las clases a cualquier hora?",
        "answer": "Sí, una de las ventajas del programa es la flexibilidad de horarios. Puedes realizar las clases cuando mejor te convenga, desde la comodidad de tu hogar."
    },
    {
        "question": "¿Cómo puedo contactar con soporte?",
        "answer": f"Puedes contactarnos directamente a través del correo electrónico: {landing_info['contacto']}"
    }
]

# Patrones de conversación para el chatbot
conversation_patterns = {
    "saludos": [
        r"hola",
        r"buenos días",
        r"buenas tardes",
        r"buenas noches",
        r"saludos",
        r"qué tal",
        r"como estas",
        r"hey"
    ],
    "despedidas": [
        r"adiós",
        r"chao",
        r"hasta luego",
        r"hasta pronto",
        r"nos vemos",
        r"bye"
    ],
    "agradecimientos": [
        r"gracias",
        r"muchas gracias",
        r"te lo agradezco",
        r"thanks"
    ],
    "precio": [
        r"(cuánto|cuanto|que|qué) (cuesta|vale|precio|valor)",
        r"precio",
        r"valor",
        r"costo",
        r"tarifa",
        r"oferta",
        r"descuento",
        r"dolares",
        r"pesos"
    ],
    "informacion_programa": [
        r"(cómo|como) (funciona|es) (el|este) (programa|curso|entrenamiento)",
        r"(dime|cuéntame|explicame) (sobre|acerca) (el|este) (programa|curso)",
        r"(qué|que) (incluye|contiene|ofrece) (el|este) (programa|curso)",
        r"más información",
        r"mas información",
        r"detalles"
    ],
    "beneficios": [
        r"(cuáles|cuales|qué|que) (son) (los|) (beneficios|ventajas)",
        r"beneficios",
        r"ventajas",
        r"(por qué|porque) (debería|deberia) (inscribirme|comprarlo)"
    ],
    "niveles": [
        r"(cuáles|cuales|qué|que) (son) (los|) (niveles|etapas|fases)",
        r"niveles",
        r"dificultad",
        r"(principiante|intermedio|avanzado)"
    ],
    "clases_bonus": [
        r"(qué|que) (clases|) (bonus|regalo|extra|adicional|gratis) (hay|incluye|ofrece)",
        r"bonus",
        r"regalos",
        r"extras",
        r"(clases|) adicionales",
        r"(clases|) gratis"
    ],
    "testimonio": [
        r"(cuales|cuáles|qué|que) (testimonios|opiniones|comentarios|experiencias)",
        r"testimonios",
        r"opiniones",
        r"reseñas",
        r"comentarios",
        r"experiencias",
        r"resultados"
    ],
    "entrenadores": [
        r"(quiénes|quienes|quién|quien) (son) (los|) (entrenadores|profesores|instructores)",
        r"(entrenadores|profesores|instructores)",
        r"(experiencia|trayectoria|background) (de los|) (entrenadores|profesores|instructores)"
    ],
    "inscripcion": [
        r"(cómo|como) (me|) (inscribo|registro|apunto|uno)",
        r"(dónde|donde) (me|) (inscribo|registro|apunto|uno)",
        r"inscripción",
        r"registro",
        r"apuntarme",
        r"unirme",
        r"participar",
        r"comprar",
        r"adquirir"
    ],
    "duracion": [
        r"(cuánto|cuanto) (tiempo|) (dura|toma|lleva) (el|este|cada) (programa|curso|clase|sesión|entrenamiento)",
        r"duración",
        r"tiempo",
        r"horas",
        r"minutos"
    ],
    "contacto": [
        r"(cómo|como) (puedo|) (contactar|comunicarme|hablar)",
        r"(datos|información|info) (de|) (contacto)",
        r"contacto",
        r"email",
        r"correo",
        r"teléfono",
        r"numero",
        r"whatsapp"
    ]
}

# Respuestas del chatbot
chat_responses = {
    "saludos": [
        "¡Hola! 👋 Bienvenido/a al chatbot de Adelgaza sin Salir de Casa. ¿En qué puedo ayudarte hoy?",
        "¡Hola! Estoy aquí para ayudarte con toda la información sobre nuestro programa de ejercicios. ¿Qué te gustaría saber?",
        "¡Bienvenido/a! Soy el asistente virtual de Adelgaza sin Salir de Casa. ¿Cómo puedo asistirte hoy?"
    ],
    "despedidas": [
        "¡Hasta pronto! Si tienes más preguntas, no dudes en volver a conversar conmigo.",
        "¡Adiós! Espero haberte ayudado. Si quieres transformar tu cuerpo, ¡no olvides inscribirte en nuestro programa!",
        "¡Que tengas un excelente día! Recuerda que puedes transformar tu cuerpo con solo 45 minutos al día."
    ],
    "agradecimientos": [
        "¡De nada! Estoy aquí para ayudarte. ¿Hay algo más que quieras saber sobre el programa?",
        "Es un placer poder asistirte. ¿Necesitas información adicional sobre algún aspecto del programa?",
        "¡No hay de qué! ¿Hay algo más en lo que pueda ayudarte a decidir si nuestro programa es adecuado para ti?"
    ],
    "precio": [
        f"El programa Adelgaza sin Salir de Casa tiene un precio normal de ${landing_info['precio']['normal']}, pero actualmente está en oferta por solo ${landing_info['precio']['oferta']}. ¡Eso es un ahorro del {landing_info['precio']['ahorro']}! Además incluye garantía de 7 días con 100% devolución del dinero sin preguntas. ¿Te gustaría inscribirte ahora?",
        f"Tenemos una oferta especial: el programa completo por solo ${landing_info['precio']['oferta']} en lugar de ${landing_info['precio']['normal']}. Incluye todos los niveles, 10 clases bonus y garantía de devolución del dinero durante 7 días sin preguntas. ¿Te interesa aprovecharlo?",
        f"Invertir en tu salud con nuestro programa cuesta únicamente ${landing_info['precio']['oferta']} (precio normal: ${landing_info['precio']['normal']}), con garantía de satisfacción de 7 días y reembolso completo sin preguntas. ¿Quieres saber qué incluye esta inversión?"
    ],
    "informacion_programa": [
        f"Adelgaza sin Salir de Casa es un programa de ejercicios que puedes hacer desde tu hogar en solo {landing_info['duracion_diaria']} durante {landing_info['dias_semana']}. Incluye 6 niveles (desde básico hasta avanzado) con 5 clases cada uno, más 10 clases de regalo. ¿Te gustaría conocer más sobre algún aspecto específico?",
        f"Nuestro programa te permite transformar tu cuerpo sin necesidad de gimnasio, con solo {landing_info['duracion_diaria']}. Tiene una estructura progresiva de 6 niveles y además incluye 10 clases bonus. ¿Qué parte te interesa más?",
        "El programa está diseñado para ayudarte a mejorar tu condición física, perder peso y tonificar tu cuerpo, todo desde la comodidad de tu hogar. ¿Te gustaría saber sobre los beneficios específicos o los niveles del programa?"
    ],
    "beneficios": [
        f"Los principales beneficios incluyen: 1) Ahorro de dinero en gimnasios, 2) Mejora tu estado físico y emocional, 3) Entrenamiento de solo {landing_info['duracion_diaria']}, 4) Flexibilidad para entrenar cuando quieras, 5) No necesitas equipamiento especial. ¿Qué beneficio te interesa más?",
        "Con nuestro programa conseguirás resultados reales sin salir de casa, ahorrarás tiempo y dinero, y mejorarás tanto tu condición física como tu bienestar emocional. ¿Te gustaría ver algunos testimonios de alumnos que ya lo han logrado?",
        "Entrenar con nosotros te permitirá transformar tu cuerpo usando elementos que ya tienes en casa, con la guía de entrenadores profesionales, y en solo 45 minutos diarios. ¿Quieres saber más sobre algún beneficio específico?"
    ],
    "niveles": [
        f"El programa consta de 6 niveles progresivos: {', '.join([nivel['nombre'] for nivel in landing_info['niveles']])}. Cada nivel tiene 5 clases, diseñadas para ir aumentando gradualmente la intensidad. ¿En qué nivel te gustaría comenzar?",
        "Tenemos una estructura de 6 niveles que va desde lo básico hasta lo avanzado, para que puedas progresar a tu ritmo. Cada nivel tiene 5 clases diferentes. ¿Eres principiante o ya tienes experiencia haciendo ejercicio?",
        "Nuestro programa está estructurado en 6 niveles progresivos con 5 clases cada uno, diseñados para adaptarse a cualquier nivel de condición física. ¿Te gustaría saber más sobre algún nivel en particular?"
    ],
    "clases_bonus": [
        f"Como regalo especial, recibirás 10 clases adicionales: {', '.join([f'{bonus['nombre']} ({bonus['clases']} clases)' for bonus in landing_info['bonus']])}. Estas clases complementan perfectamente el programa principal. ¿Te gustaría saber más sobre alguno de estos bonus?",
        "Además del programa principal, obtendrás 10 clases de regalo: baile, rutinas para embarazadas, ejercicios para adultos mayores y sesiones de estiramiento. ¿Cuál de estos bonus te interesa más?",
        "Las 10 clases de regalo incluyen experiencias de baile, ejercicios adaptados para embarazadas, rutinas específicas para adultos mayores y sesiones de estiramiento para prevenir lesiones. ¿Te gustaría saber más detalles sobre estos bonus?"
    ],
    "testimonio": [
        f"Nuestros alumnos han tenido resultados increíbles. Por ejemplo, {landing_info['testimonios'][0]['nombre']} dice: \"{landing_info['testimonios'][0]['comentario']}\". ¿Te gustaría ver más testimonios o conocer cómo puedes lograr resultados similares?",
        f"Tenemos muchas historias de éxito. {landing_info['testimonios'][1]['nombre']} nos cuenta: \"{landing_info['testimonios'][1]['comentario']}\". ¿Te motivaría ver más testimonios de alumnos que han transformado su cuerpo?",
        "Los resultados de nuestros alumnos hablan por sí mismos. Muchos han perdido entre 5 y 10 kilos en pocos meses, mejorando también su energía y estado de ánimo. ¿Te gustaría conocer más historias de éxito?"
    ],
    "entrenadores": [
        f"Tus entrenadores serán {' y '.join(landing_info['entrenadores'])}, artistas, bailarines y entrenadores profesionales con amplio recorrido internacional en países como China, Corea del Sur, México y más. ¿Te gustaría saber más sobre su experiencia?",
        f"{' y '.join(landing_info['entrenadores'])} son profesionales con experiencia internacional en entrenamiento físico y danza. Han compartido su conocimiento con personas de todas las edades en varios países. ¿Hay algo específico que quieras saber sobre ellos?",
        "Nuestros entrenadores son profesionales con experiencia internacional que te guiarán en cada paso del programa, adaptando los ejercicios a tu nivel y necesidades. ¿Te gustaría comenzar a entrenar con ellos?"
    ],
    "inscripcion": [
        f"¡Inscribirte es muy fácil! Solo tienes que hacer clic en el botón '¡QUIERO INSCRIBIRME AHORA!' o visitar este enlace: {landing_info['enlace_inscripcion']}. ¿Te gustaría inscribirte ahora?",
        f"Puedes unirte al programa en cualquier momento a través de nuestro enlace de inscripción: {landing_info['enlace_inscripcion']}. El proceso es rápido y seguro. ¿Necesitas ayuda con la inscripción?",
        "Para comenzar tu transformación, solo tienes que hacer clic en el botón de inscripción que encontrarás en la página. ¿Quieres que te dirija directamente a la página de inscripción?"
    ],
    "duracion": [
        f"Cada clase dura {landing_info['duracion_diaria']}, y el programa está diseñado para que entrenes {landing_info['dias_semana']}. Esto es suficiente para ver resultados sin ocupar demasiado tiempo de tu día. ¿Te parece un tiempo adecuado?",
        "El programa está diseñado para que dediques solo 45 minutos al día, 5 días a la semana. Esto es el tiempo óptimo para ver resultados sin sobrecargar tu agenda. ¿Crees que podrías dedicar este tiempo a mejorar tu salud?",
        "Solo necesitas 45 minutos diarios durante 5 días a la semana para seguir nuestro programa. Es el tiempo justo para conseguir resultados sin que interfiera con tus otras actividades. ¿Te gustaría saber cómo distribuir estas sesiones en tu semana?"
    ],
    "contacto": [
        f"Puedes contactarnos a través del correo electrónico {landing_info['contacto']} para cualquier consulta o soporte que necesites. ¿Hay algo específico sobre lo que necesites ayuda?",
        f"Estamos disponibles para resolver tus dudas a través de nuestro correo electrónico: {landing_info['contacto']}. ¿Tienes alguna pregunta específica que podamos responderte ahora?",
        "Si tienes cualquier pregunta o necesitas asistencia, puedes contactarnos por email. También puedes preguntarme a mí directamente y trataré de ayudarte lo mejor posible. ¿En qué puedo ayudarte hoy?"
    ],
    "fallback": [
        "Lo siento, no he entendido completamente tu pregunta. ¿Podrías reformularla? Estoy aquí para ayudarte con información sobre el programa Adelgaza sin Salir de Casa.",
        "Disculpa, no estoy seguro de entender lo que necesitas. ¿Te gustaría conocer sobre los precios, beneficios, niveles del programa o algo más específico?",
        "Parece que no tengo una respuesta específica para eso. ¿Puedo ayudarte con información sobre los entrenamientos, precios, o beneficios del programa?"
    ]
}

# Funciones para el procesamiento de texto
def preprocess_text(text):
    """Preprocesa el texto para análisis (tokenización, eliminación de stopwords, etc.)"""
    text = text.lower()
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('spanish'))
    filtered_tokens = [w for w in tokens if w.isalnum() and w not in stop_words]
    lemmatizer = WordNetLemmatizer()
    lemmas = [lemmatizer.lemmatize(w) for w in filtered_tokens]
    return lemmas

def match_pattern(user_input, patterns):
    """Verifica si el input del usuario coincide con algún patrón"""
    for pattern in patterns:
        if re.search(pattern, user_input, re.IGNORECASE):
            return True
    return False

def detect_intent(user_input):
    """Detecta la intención del usuario basada en su mensaje"""
    for intent, patterns in conversation_patterns.items():
        if match_pattern(user_input, patterns):
            return intent
    
    # Si no se detecta ninguna intención específica, buscar en las FAQ
    preprocessed_input = ' '.join(preprocess_text(user_input))
    for qa in faq:
        question_tokens = preprocess_text(qa["question"])
        common_tokens = set(preprocessed_input.split()) & set(question_tokens)
        if len(common_tokens) > 1:  # Si hay al menos dos tokens en común
            return "faq", qa["answer"]
    
    return "fallback"

def generate_response(intent, faq_answer=None):
    """Genera una respuesta basada en la intención detectada"""
    if isinstance(intent, tuple) and intent[0] == "faq":
        return intent[1]
    
    responses = chat_responses.get(intent, chat_responses["fallback"])
    return random.choice(responses)

def get_call_to_action():
    """Genera un call-to-action para dirigir al usuario hacia la conversión"""
    ctas = [
        f"¿Te gustaría inscribirte ahora? Visita: {landing_info['enlace_inscripcion']}",
        "¿Quieres comenzar tu transformación hoy mismo? Pregúntame cómo inscribirte.",
        "Si estás listo para cambiar tu cuerpo, puedo ayudarte a inscribirte en el programa.",
        "¿Tienes alguna otra pregunta antes de tomar la decisión de inscribirte?",
        f"Recuerda que actualmente tenemos una oferta especial: ¡solo ${landing_info['precio']['oferta']} en lugar de ${landing_info['precio']['normal']}!"
    ]
    return random.choice(ctas)

def scrape_landing_page(url):
    """Extrae información de la landing page"""
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            # Aquí se implementaría la lógica para extraer información específica
            # como precios, beneficios, etc. de la página web
            return True
        return False
    except Exception as e:
        print(f"Error scraping landing page: {e}")
        return False

# Rutas Flask
@app.route('/')
def home():
    return render_template('chat.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    intent = detect_intent(user_message)
    
    if isinstance(intent, tuple):
        response = generate_response(intent)
    else:
        response = generate_response(intent)
    
    # Agregar un call-to-action si no es un saludo o despedida
    if intent not in ['saludos', 'despedidas', 'agradecimientos']:
        # 30% de probabilidad de agregar un CTA
        if random.random() < 0.3:
            response += "\n\n" + get_call_to_action()
    
    return jsonify({
        'response': response,
        'intent': intent if not isinstance(intent, tuple) else intent[0]
    })

@app.route('/api/faq')
def get_faq():
    return jsonify({'faq': faq})

@app.route('/api/program_info')
def get_program_info():
    return jsonify({'info': landing_info})

if __name__ == '__main__':
    # Intenta extraer información actualizada de la landing page
    # Si falla, usa la información predefinida
    landing_url = "http://localhost:5000"  # Reemplazar con la URL real
    scrape_landing_page(landing_url)
    
    app.run(debug=True) 