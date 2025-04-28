// Sistema de análisis e informes semanales
// Este archivo se puede compartir en GitHub ya que no contiene credenciales directas

// Intentar cargar credenciales si estamos en un entorno Node.js
let credentials = {};
if (typeof require !== 'undefined') {
  try {
    credentials = require('./credentials/credentials.json');
    console.log('Credenciales cargadas correctamente');
  } catch (e) {
    console.warn('No se pudieron cargar las credenciales:', e.message);
  }
}

// Clase principal para análisis
class Analytics {
  constructor() {
    this.pageViews = 0;
    this.events = [];
    this.ctaClicks = {};
    this.startTime = new Date();
    this.initialized = false;
    this.analyticsId = window.reportConfig?.analytics?.id || '';
    this.credentials = credentials;
  }

  // Inicializa el sistema de análisis
  init() {
    if (this.initialized) return;
    
    console.log('Inicializando sistema de análisis...');
    
    // Registra vista de página
    this.trackPageView();
    
    // Configura escuchas de eventos
    this.setupEventListeners();
    
    // Configura el informe semanal
    this.scheduleWeeklyReport();
    
    // Inicializar Google Analytics si está disponible
    if (this.analyticsId) {
      this.initGoogleAnalytics();
    }
    
    this.initialized = true;
    console.log('Sistema de análisis inicializado correctamente');
  }
  
  // Inicializa Google Analytics
  initGoogleAnalytics() {
    // Código para inicializar Google Analytics
    console.log(`Inicializando Google Analytics con ID: ${this.analyticsId}`);
    
    // Aquí podríamos usar las credenciales completas si es necesario
    if (this.credentials.google_analytics) {
      console.log('Usando credenciales completas de Google Analytics');
    }
  }
  
  // Registra una vista de página
  trackPageView() {
    this.pageViews++;
    console.log(`Vista de página registrada. Total: ${this.pageViews}`);
    
    // En una implementación real, aquí enviaríamos datos a un servidor
  }
  
  // Registra un evento (clic, conversión, etc.)
  trackEvent(category, action, label) {
    const event = {
      timestamp: new Date(),
      category,
      action,
      label
    };
    
    this.events.push(event);
    console.log(`Evento registrado: ${category} - ${action} - ${label}`);
    
    // Registra clics en CTA específicamente
    if (category === 'CTA') {
      if (!this.ctaClicks[label]) {
        this.ctaClicks[label] = 0;
      }
      this.ctaClicks[label]++;
    }
  }
  
  // Configura los escuchas de eventos para elementos importantes
  setupEventListeners() {
    // Escucha clics en CTA del menú
    const navCTA = document.querySelector('.nav-cta');
    if (navCTA) {
      navCTA.addEventListener('click', () => {
        this.trackEvent('CTA', 'click', 'Menu - Quiero Inscribirme');
      });
    }
    
    // Escucha clics en CTA del banner
    const bannerCTA = document.querySelector('.banner-cta.secondary-cta');
    if (bannerCTA) {
      bannerCTA.addEventListener('click', () => {
        this.trackEvent('CTA', 'click', 'Banner - Ver Contenido');
      });
    }
    
    // Escucha clics en CTA del widget de precio
    const priceCTA = document.querySelector('.price-widget .cta-button');
    if (priceCTA) {
      priceCTA.addEventListener('click', () => {
        this.trackEvent('CTA', 'click', 'Precio - Quiero Inscribirme Ahora');
      });
    }
    
    // Escucha clics en botón de contacto
    const contactButton = document.querySelector('.contact-button');
    if (contactButton) {
      contactButton.addEventListener('click', () => {
        this.trackEvent('CTA', 'click', 'Footer - Contacto Email');
      });
    }
    
    // Configurar escucha de eventos para el iframe de YouTube
    // Nota: Para rastrear eventos de iframe de YouTube se necesita configurar YouTube API
    // Aquí implementamos una solución simple detectando clics en el contenedor
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
      videoContainer.addEventListener('click', () => {
        this.trackEvent('Video', 'interaction', 'Video YouTube Principal');
      });
    }
  }
  
  // Programa el envío del informe semanal
  scheduleWeeklyReport() {
    console.log('Programando informe semanal...');
    
    // Verificamos la configuración del informe
    const schedule = window.reportConfig?.schedule || {
      day: 'Monday',
      time: '09:00',
      timezone: 'Europe/Madrid'
    };
    
    console.log(`Informe semanal programado para cada ${schedule.day} a las ${schedule.time}`);
    
    // En una implementación real, esto usaría un sistema de tareas programadas del servidor
    // Para una implementación en el navegador, podemos verificar cada hora si es momento de enviar
    
    // Verificar si tenemos que enviar ahora (ejecutar una vez por hora)
    this.checkIfTimeToSendReport();
    setInterval(() => this.checkIfTimeToSendReport(), 60 * 60 * 1000); // cada hora
  }
  
  // Verifica si es momento de enviar el informe
  checkIfTimeToSendReport() {
    const now = new Date();
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
    const currentHour = now.getHours();
    
    // Configuración del informe
    const schedule = window.reportConfig?.schedule || {
      day: 'Monday',
      time: '09:00'
    };
    
    // Hora programada
    const scheduledHour = parseInt(schedule.time.split(':')[0]);
    
    // Verificar si es el día y la hora correctos
    if (dayOfWeek === schedule.day && currentHour === scheduledHour) {
      console.log('¡Es hora de enviar el informe semanal!');
      this.sendEmailReport();
    }
  }
  
  // Genera un informe con los datos recopilados
  generateReport() {
    const endTime = new Date();
    const duration = (endTime - this.startTime) / 1000; // en segundos
    
    const report = {
      period: {
        start: this.startTime,
        end: endTime,
        durationSeconds: duration
      },
      metrics: {
        pageViews: this.pageViews,
        totalEvents: this.events.length,
        ctaClicks: this.ctaClicks
      },
      analytics: {
        id: this.analyticsId
      },
      topEvents: this.getTopEvents(5),
      recommendations: this.generateRecommendations()
    };
    
    console.log('Informe generado:', report);
    return report;
  }
  
  // Genera recomendaciones basadas en datos recopilados
  generateRecommendations() {
    const recommendations = [
      "Analizar qué CTAs tienen mejor conversión",
      "Revisar la experiencia de usuario en móviles",
      "Optimizar la velocidad de carga de la página",
      "Mejorar el contenido para aumentar el tiempo de permanencia",
      "Agregar más testimonios para mejorar la credibilidad"
    ];
    
    return recommendations;
  }
  
  // Obtiene los eventos más frecuentes
  getTopEvents(limit = 5) {
    const eventCounts = {};
    
    this.events.forEach(event => {
      const key = `${event.category}:${event.action}:${event.label}`;
      if (!eventCounts[key]) {
        eventCounts[key] = 0;
      }
      eventCounts[key]++;
    });
    
    // Convertir a array y ordenar
    const sortedEvents = Object.entries(eventCounts)
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
      
    return sortedEvents;
  }
  
  // Simula el envío del informe por email
  sendEmailReport() {
    const report = this.generateReport();
    const emailConfig = window.reportConfig?.email || {};
    
    console.log(`Enviando informe por email a ${emailConfig.to || 'destinatario'}`);
    console.log(`Desde: ${emailConfig.from || 'remitente'}`);
    console.log(`Asunto: ${emailConfig.subject || 'Informe semanal'}`);
    
    // En una implementación real, aquí conectaríamos con un servicio de email
    // Usando las credenciales de configuración
    
    // Para fines de demostración, simplemente registramos en la consola
    console.log('Informe enviado correctamente');
    
    return true;
  }
}

// Inicializar el sistema cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  // Verificamos si existe la configuración global (cargada desde config.js)
  if (!window.reportConfig) {
    console.warn('Advertencia: No se encontró configuración para informes. El sistema funcionará con valores predeterminados.');
  }
  
  // Inicializamos el sistema de análisis
  window.analyticsSystem = new Analytics();
  window.analyticsSystem.init();
}); 