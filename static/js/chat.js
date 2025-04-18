document.addEventListener('DOMContentLoaded', function() {
    const chatBody = document.querySelector('.chat-body');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.querySelector('.send-button');
    const typingIndicator = document.querySelector('.typing-indicator');
    const suggestionChips = document.querySelector('.suggestion-chips');
    const faqContainer = document.querySelector('.faq-items');
    
    // Array de respuestas predefinidas para el chatbot
    const botResponses = {
        'hola': '¡Hola! Soy tu asistente virtual para el programa "Adelgaza sin Salir de Casa". ¿En qué puedo ayudarte hoy?',
        'programa': 'Nuestro programa "Adelgaza sin Salir de Casa" es un método completo que combina rutinas de ejercicio, plan alimenticio personalizado y seguimiento profesional, todo desde la comodidad de tu hogar.',
        'precio': 'El programa tiene un costo de $99.99 por 3 meses. Actualmente tenemos una promoción especial de $79.99 si te inscribes hoy.',
        'empezar': 'Para comenzar, puedes registrarte directamente en nuestra página web. Una vez completado el registro, recibirás un correo con tus credenciales y acceso al programa completo.',
        'ejercicios': 'Nuestros ejercicios están diseñados para realizarse en casa sin necesidad de equipamiento especializado. Se adaptan a todos los niveles de condición física.',
        'dieta': 'El plan alimenticio es personalizado según tus necesidades, preferencias y objetivos. No se trata de dietas restrictivas sino de hábitos saludables y sostenibles.',
        'resultados': 'Los resultados varían para cada persona, pero la mayoría de nuestros clientes comienzan a ver cambios positivos a partir de la tercera semana siguiendo el programa correctamente.',
        'gracias': '¡De nada! Estoy aquí para ayudarte con cualquier otra duda que tengas sobre el programa.',
        'ayuda': '¿En qué puedo ayudarte? Puedes preguntarme sobre el programa, precios, cómo empezar, ejercicios, dieta, resultados o cualquier otra duda.'
    };
    
    // Sugerencias iniciales
    const initialSuggestions = [
        '¿En qué consiste el programa?',
        '¿Cuánto cuesta?',
        '¿Cómo empiezo?',
        '¿Veré resultados rápido?'
    ];
    
    // Preguntas frecuentes
    const faqItems = [
        {
            question: '¿Necesito equipo especial para los ejercicios?',
            answer: 'No, todos nuestros ejercicios están diseñados para realizarse con el peso corporal o elementos comunes que puedes encontrar en casa.'
        },
        {
            question: '¿Cuánto tiempo debo dedicar al día?',
            answer: 'Recomendamos sesiones de 30-45 minutos, 4-5 veces por semana para obtener resultados óptimos.'
        },
        {
            question: '¿El plan alimenticio es muy restrictivo?',
            answer: 'No, nuestro enfoque es la alimentación balanceada y sostenible. No creemos en dietas extremas sino en crear hábitos saludables que puedas mantener a largo plazo.'
        },
        {
            question: '¿Puedo cancelar mi suscripción en cualquier momento?',
            answer: 'Sí, puedes cancelar tu suscripción cuando lo desees sin cargos adicionales.'
        },
        {
            question: '¿Hay soporte personalizado?',
            answer: 'Sí, contamos con nutricionistas y entrenadores disponibles para consultas personalizadas mediante chat o videollamada programada.'
        }
    ];
    
    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        addBotMessage('¡Hola! Soy el asistente virtual de "Adelgaza sin Salir de Casa". ¿En qué puedo ayudarte hoy?');
    }, 500);
    
    // Cargar sugerencias iniciales
    loadSuggestions(initialSuggestions);
    
    // Cargar preguntas frecuentes
    loadFAQs(faqItems);
    
    // Evento para enviar mensaje con Enter
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && messageInput.value.trim() !== '') {
            sendMessage();
        }
    });
    
    // Evento para enviar mensaje con botón
    sendButton.addEventListener('click', function() {
        if (messageInput.value.trim() !== '') {
            sendMessage();
        }
    });
    
    // Función para enviar mensaje
    function sendMessage() {
        const message = messageInput.value.trim();
        addUserMessage(message);
        messageInput.value = '';
        messageInput.focus();
        
        // Mostrar indicador de escritura
        showTypingIndicator();
        
        // Procesar y responder (con retraso simulado para efecto natural)
        setTimeout(() => {
            processUserMessage(message);
            hideTypingIndicator();
        }, 1500);
    }
    
    // Función para procesar mensaje del usuario y generar respuesta
    function processUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = '';
        
        // Buscar palabras clave en el mensaje
        for (const [key, value] of Object.entries(botResponses)) {
            if (lowerMessage.includes(key)) {
                response = value;
                break;
            }
        }
        
        // Respuesta predeterminada si no se encuentra coincidencia
        if (response === '') {
            response = 'Gracias por tu mensaje. Para obtener información más específica, ¿podrías aclarar tu pregunta? Puedes consultar sobre nuestro programa, precios, ejercicios o plan alimenticio.';
        }
        
        addBotMessage(response);
        
        // Actualizar sugerencias basadas en la conversación
        updateSuggestions(lowerMessage);
    }
    
    // Función para añadir mensaje del usuario al chat
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message user-message';
        messageElement.innerHTML = `
            <div class="message-content user-content">${message}</div>
            <div class="message-avatar user-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
        chatBody.appendChild(messageElement);
        scrollToBottom();
    }
    
    // Función para añadir mensaje del bot al chat
    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message bot-message';
        messageElement.innerHTML = `
            <div class="message-avatar bot-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content bot-content">${message}</div>
        `;
        chatBody.appendChild(messageElement);
        scrollToBottom();
    }
    
    // Mostrar indicador de escritura
    function showTypingIndicator() {
        typingIndicator.style.display = 'flex';
        scrollToBottom();
    }
    
    // Ocultar indicador de escritura
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }
    
    // Función para hacer scroll al final del chat
    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // Cargar chips de sugerencias
    function loadSuggestions(suggestions) {
        suggestionChips.innerHTML = '';
        suggestions.forEach(suggestion => {
            const chip = document.createElement('button');
            chip.className = 'suggestion-chip';
            chip.textContent = suggestion;
            chip.addEventListener('click', () => {
                messageInput.value = suggestion;
                sendMessage();
            });
            suggestionChips.appendChild(chip);
        });
    }
    
    // Actualizar sugerencias basadas en la conversación
    function updateSuggestions(message) {
        let newSuggestions = [];
        
        if (message.includes('precio') || message.includes('costo')) {
            newSuggestions = [
                '¿Cómo puedo pagar?',
                '¿Hay promociones disponibles?',
                '¿Tiene garantía de devolución?'
            ];
        } else if (message.includes('ejercicio') || message.includes('rutina')) {
            newSuggestions = [
                '¿Cuánto tiempo duran las rutinas?',
                '¿Necesito equipo especial?',
                '¿Hay ejercicios para principiantes?'
            ];
        } else if (message.includes('dieta') || message.includes('alimentación') || message.includes('comida')) {
            newSuggestions = [
                '¿El plan incluye recetas?',
                '¿Qué pasa si tengo restricciones alimenticias?',
                '¿Cuántas comidas al día recomienda el plan?'
            ];
        } else if (message.includes('empezar') || message.includes('comenzar') || message.includes('inscribir')) {
            newSuggestions = [
                '¿Necesito evaluación previa?',
                '¿Cuándo puedo empezar?',
                '¿Qué incluye exactamente el programa?'
            ];
        } else {
            newSuggestions = [
                '¿Qué resultados puedo esperar?',
                '¿Hay soporte personalizado?',
                '¿Cómo empiezo el programa?'
            ];
        }
        
        loadSuggestions(newSuggestions);
    }
    
    // Cargar preguntas frecuentes
    function loadFAQs(faqs) {
        if (!faqContainer) return;
        
        faqContainer.innerHTML = '';
        faqs.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
                <div class="faq-question">${faq.question}</div>
                <div class="faq-answer">${faq.answer}</div>
            `;
            
            // Toggle para mostrar/ocultar respuesta
            const question = faqItem.querySelector('.faq-question');
            const answer = faqItem.querySelector('.faq-answer');
            answer.style.display = 'none';
            
            question.addEventListener('click', () => {
                if (answer.style.display === 'none') {
                    answer.style.display = 'block';
                } else {
                    answer.style.display = 'none';
                }
            });
            
            faqContainer.appendChild(faqItem);
        });
    }
}); 