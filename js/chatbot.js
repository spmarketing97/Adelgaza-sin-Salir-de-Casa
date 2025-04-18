/**
 * chatbot.js - Funcionalidad para el chatbot flotante
 * Este archivo controla el comportamiento del asistente virtual que interactúa con los usuarios.
 * 
 * @version 1.0.0
 * @author SPMarketing - ImpactoDigital
 */

// Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const chatBody = document.querySelector('.chat-body');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.querySelector('.send-button');
    const typingIndicator = document.querySelector('.typing-indicator');
    const suggestionChips = document.querySelector('.suggestion-chips');
    const faqItems = document.querySelector('.faq-items');
    const chatBubble = document.getElementById('chatBubble');
    const floatingChatBox = document.getElementById('floatingChatBox');
    const closeChat = document.getElementById('closeChat');
    const chatPopup = document.getElementById('chatPopup');
    const timerContainer = document.querySelector('.timer-container');
    
    // Control del chatbot flotante
    chatBubble.addEventListener('click', function() {
        floatingChatBox.classList.toggle('active');
        // Ocultar la notificación y el popup al abrir el chat
        document.querySelector('.notification-badge').style.display = 'none';
        chatPopup.style.display = 'none';
        
        // Ajustar posición del timer cuando el chat está abierto
        if (floatingChatBox.classList.contains('active')) {
            adjustTimerPosition(true);
        } else {
            adjustTimerPosition(false);
        }
    });
    
    closeChat.addEventListener('click', function() {
        floatingChatBox.classList.remove('active');
        // Restaurar posición del timer cuando el chat se cierra
        adjustTimerPosition(false);
    });
    
    // Función para ajustar posición del timer
    function adjustTimerPosition(chatIsOpen) {
        if (window.innerWidth <= 768) {
            if (chatIsOpen) {
                timerContainer.style.bottom = '430px';
            } else {
                timerContainer.style.bottom = '80px';
            }
        } else {
            // En dispositivos más grandes, mantener posición original
            timerContainer.style.bottom = 'auto';
            timerContainer.style.top = '30%';
        }
    }
    
    // Datos de ejemplo para preguntas frecuentes
    const faqData = [
        {
            question: "¿Cuánto tiempo debo dedicar cada día al programa?",
            answer: "Solo necesitas 45 minutos al día, 5 días a la semana. Nuestras rutinas están diseñadas para ser efectivas y eficientes."
        },
        {
            question: "¿Necesito equipamiento especial?",
            answer: "No, nuestro programa está diseñado para usar objetos comunes que ya tienes en casa. Te enseñamos a ser recursivo con lo que tienes a mano."
        },
        {
            question: "¿Funciona para todas las edades?",
            answer: "Sí, tenemos niveles desde básico hasta avanzado y clases especiales para embarazadas y adultos mayores."
        },
        {
            question: "¿Cuánto tiempo tardaré en ver resultados?",
            answer: "La mayoría de nuestros alumnos comienzan a ver resultados en las primeras 3-4 semanas, siempre que sigan el programa con constancia."
        },
        {
            question: "¿Qué pasa si me pierdo una clase?",
            answer: "No hay problema, tienes acceso a todas las clases de por vida y puedes tomarlas cuando mejor te convenga."
        },
        {
            question: "¿El programa incluye plan de alimentación?",
            answer: "El programa se enfoca principalmente en ejercicios, pero incluimos consejos generales de alimentación saludable. Para un plan nutricional detallado, recomendamos consultar con un nutricionista."
        },
        {
            question: "¿Puedo hacer el programa si tengo lesiones?",
            answer: "Depende de la lesión. Ofrecemos adaptaciones para muchos ejercicios, y tenemos rutinas especiales para adultos mayores y embarazadas. Sin embargo, siempre recomendamos consultar con tu médico antes de comenzar."
        },
        {
            question: "¿Cómo es el método de pago?",
            answer: "Aceptamos pagos seguros a través de tarjetas de crédito, débito y PayPal. Todas las transacciones están protegidas con encriptación."
        }
    ];
    
    // Datos de ejemplo para sugerencias iniciales y contextuales
    const suggestionCategories = {
        initial: [
            "¿Cómo empiezo?",
            "Precios",
            "Beneficios",
            "Niveles del programa",
            "Testimonios"
        ],
        pricing: [
            "¿Cómo puedo pagar?",
            "¿Hay promociones?",
            "¿Puedo cancelar?",
            "¿Qué incluye el precio?"
        ],
        workout: [
            "¿Cuánto duran las rutinas?",
            "¿Necesito equipo?",
            "¿Es para principiantes?",
            "¿Veré resultados rápido?"
        ],
        nutrition: [
            "¿Incluye plan de comidas?",
            "¿Qué debo comer?",
            "¿Hay dietas restrictivas?",
            "¿Tengo que tomar suplementos?"
        ],
        results: [
            "Ver testimonios",
            "¿Cuánto peso puedo perder?",
            "¿Cuánto tiempo tarda?",
            "¿Funcionará para mí?"
        ],
        support: [
            "¿Cómo contacto al equipo?",
            "¿Hay asesoramiento?",
            "¿Puedo hablar con entrenadores?",
            "Tengo una duda específica"
        ]
    };
    
    // Mensaje inicial del bot
    function addInitialMessage() {
        setTimeout(() => {
            // Mostrar indicador de escritura primero
            typingIndicator.style.display = 'block';
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // Después de 2 segundos mostrar el mensaje
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                addMessage("¡Hola! 👋 Soy Tu Asistente Digital de Adelgaza sin Salir de Casa. ¿En qué puedo ayudarte hoy?", "bot");
            }, 2000);
        }, 500);
    }
    
    // Cargar las preguntas frecuentes
    function loadFAQs() {
        faqData.forEach(item => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            
            const question = document.createElement('div');
            question.className = 'faq-question';
            question.textContent = item.question;
            
            const answer = document.createElement('div');
            answer.className = 'faq-answer';
            answer.textContent = item.answer;
            
            faqItem.appendChild(question);
            faqItem.appendChild(answer);
            
            // Añadir evento para expandir/contraer
            question.addEventListener('click', () => {
                answer.classList.toggle('open');
                question.classList.toggle('active');
            });
            
            faqItems.appendChild(faqItem);
        });
    }
    
    // Cargar las sugerencias según la categoría
    function loadSuggestions(category = 'initial') {
        suggestionChips.innerHTML = '';
        const chips = suggestionCategories[category] || suggestionCategories.initial;
        
        // Limitar a máximo 4 sugerencias visibles para evitar desplazamiento
        const displayChips = chips.slice(0, 4);
        
        displayChips.forEach(suggestion => {
            const chip = document.createElement('div');
            chip.className = 'suggestion-chip';
            chip.textContent = suggestion;
            chip.addEventListener('click', () => {
                sendMessage(suggestion);
            });
            suggestionChips.appendChild(chip);
        });
    }
    
    // Actualizar sugerencias basadas en la conversación
    function updateSuggestions(message) {
        message = message.toLowerCase();
        
        if (message.includes('precio') || message.includes('costo') || message.includes('pago') || message.includes('tarifa')) {
            loadSuggestions('pricing');
        } 
        else if (message.includes('ejercicio') || message.includes('rutina') || message.includes('entrenamiento') || message.includes('clase')) {
            loadSuggestions('workout');
        }
        else if (message.includes('comida') || message.includes('dieta') || message.includes('alimentación') || message.includes('comer') || message.includes('nutrición')) {
            loadSuggestions('nutrition');
        }
        else if (message.includes('resultado') || message.includes('adelgazar') || message.includes('perder peso') || message.includes('testimonio')) {
            loadSuggestions('results');
        }
        else if (message.includes('ayuda') || message.includes('contacto') || message.includes('problema') || message.includes('duda')) {
            loadSuggestions('support');
        }
        else {
            // Si no coincide con ninguna categoría específica, mostrar sugerencias iniciales
            loadSuggestions('initial');
        }
    }
    
    // Enviar mensaje
    function sendMessage(message) {
        // Si el mensaje viene de un clic, usamos ese texto
        // Si no, tomamos el valor del input
        const messageText = message || messageInput.value.trim();
        
        if (!messageText) return;
        
        // Agregar mensaje del usuario
        addMessage(messageText, 'user');
        
        // Limpiar el input
        if (!message) {
            messageInput.value = '';
        }
        
        // Actualizar las sugerencias basadas en el mensaje del usuario
        updateSuggestions(messageText);
        
        // Mostrar indicador de escritura
        typingIndicator.style.display = 'block';
        chatBody.scrollTop = chatBody.scrollHeight;
        
        // Simular respuesta del bot (con retraso de 3 segundos)
        setTimeout(() => {
            // Generar respuesta según la pregunta
            let response = getBotResponse(messageText);
            
            // Ocultar el indicador de escritura y mostrar respuesta
            typingIndicator.style.display = 'none';
            addMessage(response, 'bot');
        }, 3000);
    }
    
    // Función para obtener respuesta del bot según el mensaje del usuario
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        // Buscar coincidencia en las FAQs
        const faqMatch = faqData.find(item => 
            item.question.toLowerCase().includes(message) || 
            message.includes(item.question.toLowerCase())
        );
        
        if (faqMatch) return faqMatch.answer;
        
        // Respuestas según palabras clave
        if (message.includes('precio') || message.includes('costo') || message.includes('valor') || message.includes('cuánto cuesta')) {
            return "El programa completo tiene un valor de $90.00 USD, con un descuento del 47% sobre el precio original de $169.00 USD. Incluye acceso de por vida a todas las clases, 10 clases de regalo y garantía de 7 días con 100% devolución del dinero sin preguntas.";
        } 
        else if (message.includes('empiezo') || message.includes('comenzar') || message.includes('iniciar')) {
            return "Para comenzar, solo necesitas inscribirte en nuestro programa a través del botón '¡QUIERO INSCRIBIRME AHORA!' que encontrarás en la página. Una vez inscrito, recibirás acceso inmediato a todas las clases organizadas por niveles.";
        }
        else if (message.includes('resultado') || message.includes('efecto') || message.includes('funciona')) {
            return "Nuestros alumnos comienzan a ver resultados desde las primeras 3-4 semanas. Tenemos testimonios de personas que han perdido entre 4 y 10 kilos siguiendo nuestro programa con constancia. Los resultados varían según el compromiso y condición física inicial.";
        }
        else if (message.includes('equipo') || message.includes('materiales') || message.includes('necesito')) {
            return "No necesitas equipamiento especial. Nuestro programa está diseñado para usar objetos comunes que ya tienes en tu hogar, como sillas, botellas de agua, o toallas. Te enseñamos a ser recursivo con lo que tienes a mano.";
        }
        else if (message.includes('nivel') || message.includes('difícil') || message.includes('intensidad')) {
            return "El programa incluye 6 niveles: Básico 1, Básico 2, Intermedio 1, Intermedio 2, Avanzado 1 y Avanzado 2. Cada nivel consta de 5 clases. Puedes comenzar desde el nivel que mejor se adapte a tu condición física actual.";
        }
        else if (message.includes('hola') || message.includes('buenas') || message.includes('saludos')) {
            return "¡Hola! Gracias por contactarnos. ¿En qué puedo ayudarte con nuestro programa Adelgaza sin Salir de Casa?";
        }
        else if (message.includes('gracias') || message.includes('genial') || message.includes('excelente')) {
            return "¡De nada! Estamos aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?";
        }
        
        // Respuesta por defecto
        return "Gracias por tu pregunta. Para información más detallada sobre el programa, te recomiendo que te inscribas o contactes directamente con nuestro equipo a través del botón de contacto al final de la página.";
    }
    
    // Función para agregar mensajes al chat
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        messageElement.textContent = message;
        
        // Insertar antes del indicador de escritura
        chatBody.insertBefore(messageElement, typingIndicator);
        
        // Desplazar al final
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // Configurar eventos
    sendButton.addEventListener('click', () => {
        if (messageInput.value.trim()) {
            sendMessage();
        }
    });
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && messageInput.value.trim()) {
            sendMessage();
        }
    });
    
    // Mostrar el popup de saludo después de 2 segundos
    setTimeout(() => {
        chatPopup.style.display = 'block';
        
        // Ocultar el popup después de 10 segundos
        setTimeout(() => {
            if (!floatingChatBox.classList.contains('active')) {
                chatPopup.style.display = 'none';
            }
        }, 10000);
    }, 2000);
    
    // Mostrar la notificación después de ocultar el popup
    setTimeout(() => {
        // Solo si el chat no está ya abierto
        if(!floatingChatBox.classList.contains('active')) {
            document.querySelector('.notification-badge').style.display = 'flex';
        }
    }, 13000); // 13 segundos (después de que desaparezca el popup)
    
    // Ajustar posición del timer al cargar la página
    adjustTimerPosition(false);
    
    // Ajustar posición del timer al cambiar el tamaño de la ventana
    window.addEventListener('resize', function() {
        adjustTimerPosition(floatingChatBox.classList.contains('active'));
    });
    
    // Inicializar
    addInitialMessage();
    loadFAQs();
    loadSuggestions('initial');
}); 