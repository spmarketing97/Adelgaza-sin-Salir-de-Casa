/**
 * main.js - Archivo principal que carga todos los módulos
 * Este archivo inicializa todos los componentes JavaScript de la página
 * 
 * @version 1.0.0
 * @author SPMarketing - ImpactoDigital
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes si existen en la página
    
    // Cargar módulo del temporizador
    if (document.querySelector('.countdown-timer')) {
        loadScript('js/timer.js');
    }
    
    // Cargar módulo de testimoniales
    if (document.querySelector('.testimonials-section')) {
        loadScript('js/testimonials.js');
    }
    
    // Cargar módulo del chatbot
    if (document.querySelector('.chat-container') || document.querySelector('.chat-widget')) {
        loadScript('js/chatbot.js');
    }
    
    // Cargar módulo de FAQ
    if (document.querySelector('.faq-section')) {
        loadScript('js/faq.js');
    }
    
    // Añadir comportamiento al formulario de contacto
    initContactForm();
    
    // Inicializar animaciones de desplazamiento
    initScrollAnimations();
    
    // Inicializar navegación responsiva
    initMobileNav();
});

/**
 * Función para cargar scripts dinámicamente
 */
function loadScript(src) {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        
        script.onload = function() {
            resolve(script);
        };
        
        script.onerror = function() {
            reject(new Error(`Error al cargar el script: ${src}`));
        };
        
        document.head.appendChild(script);
    });
}

/**
 * Inicializar el formulario de contacto
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar campos del formulario
        const name = document.getElementById('contact-name');
        const email = document.getElementById('contact-email');
        const message = document.getElementById('contact-message');
        
        if (!name.value || !email.value || !message.value) {
            showMessage('Por favor, completa todos los campos', 'error');
            return;
        }
        
        if (!isValidEmail(email.value)) {
            showMessage('Por favor, introduce un email válido', 'error');
            return;
        }
        
        // Aquí se enviaría el formulario mediante AJAX
        // Por ahora simplemente mostramos un mensaje de éxito
        showMessage('Mensaje enviado correctamente. Nos pondremos en contacto pronto.', 'success');
        contactForm.reset();
    });
}

/**
 * Validar formato de email
 */
function isValidEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

/**
 * Mostrar mensaje de confirmación o error
 */
function showMessage(text, type = 'info') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `message-${type}`);
    messageElement.textContent = text;
    
    document.body.appendChild(messageElement);
    
    // Hacer visible con animación
    setTimeout(() => messageElement.classList.add('visible'), 10);
    
    // Eliminar después de 5 segundos
    setTimeout(() => {
        messageElement.classList.remove('visible');
        setTimeout(() => messageElement.remove(), 300);
    }, 5000);
}

/**
 * Inicializar animaciones al hacer scroll
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Inicializar navegación móvil
 */
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.addEventListener('click', function() {
        const isOpen = menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('open', isOpen);
        
        // Prevenir scroll del body cuando el menú está abierto
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Cerrar menú al hacer click en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// Menú de navegación y scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const timerContainer = document.querySelector('.timer-container');
    const scrollPosition = window.scrollY;
    
    // Menú de navegación - cambiar estilo al hacer scroll
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Ajustar la posición del temporizador según el scroll
    if (scrollPosition > 300) {
        timerContainer.style.top = '20%';
    } else {
        timerContainer.style.top = '30%';
    }
});

// Toggle para el menú móvil
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.toggle('active'));
});

// Implementar scroll suave para los enlaces del menú
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const verContenidoBtn = document.querySelector('a[href="#como-lograrlo"]');
    
    function scrollToSection(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Cerrar el menú móvil si está abierto
            document.querySelector('.nav-links').classList.remove('active');
            
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Ajustar por la altura del menú
                behavior: 'smooth'
            });
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });
    
    if (verContenidoBtn) {
        verContenidoBtn.addEventListener('click', scrollToSection);
    }
});

// Gestión de cookies y GDPR
function manageCookieConsent() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('cookieAccept');
    const declineBtn = document.getElementById('cookieDecline');
    
    // Comprobar si ya se ha guardado la preferencia de cookies
    function checkCookieConsent() {
        if (getCookie('cookie_consent') === '') {
            // No hay preferencia guardada, mostrar el aviso
            cookieConsent.style.display = 'block';
        }
    }
    
    // Evento para el botón de aceptar
    acceptBtn.addEventListener('click', function() {
        setCookie('cookie_consent', 'accepted', 365); // Guardar por 1 año
        cookieConsent.style.display = 'none';
        
        // Aquí se puede activar el código de análisis/seguimiento
        enableAnalytics();
    });
    
    // Evento para el botón de rechazar
    declineBtn.addEventListener('click', function() {
        setCookie('cookie_consent', 'declined', 365); // Guardar por 1 año
        cookieConsent.style.display = 'none';
        
        // Aquí se puede desactivar el código de análisis/seguimiento
        disableAnalytics();
    });
    
    // Función para habilitar analíticas
    function enableAnalytics() {
        // Aquí iría el código para inicializar Google Analytics u otras herramientas
        console.log('Analytics enabled');
    }
    
    // Función para deshabilitar analíticas
    function disableAnalytics() {
        // Aquí iría el código para deshabilitar el seguimiento
        console.log('Analytics disabled');
    }
    
    // Comprobar la preferencia al cargar la página
    checkCookieConsent();
}

// Ejecutar gestión de cookies cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', manageCookieConsent);

// Funciones para cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

// Inicializar componentes al cargar la página
window.onload = function () {
    // Configurar el video para que se reproduzca automáticamente una sola vez
    const video = document.querySelector('video');
    if (video) {
        video.onended = function() {
            this.pause();
            this.currentTime = 0;
        };
    }
}; 