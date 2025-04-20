// Configuración para informes semanales
// Este archivo puede ser compartido en GitHub sin credenciales sensibles

// Importa las variables de entorno de .env
// Nota: En producción, necesitarás una biblioteca como dotenv

// Intenta cargar las credenciales si están disponibles
let credentials = {};
try {
  // Intenta cargar el archivo de credenciales
  if (typeof require !== 'undefined') {
    // Entorno Node.js
    credentials = require('./credentials/credentials.json');
  } else {
    // Entorno navegador - podría implementarse con fetch si es necesario
    console.log('Las credenciales se cargarán dinámicamente en el navegador');
  }
} catch (e) {
  console.warn('No se pudieron cargar las credenciales:', e.message);
}

// Configuración del informe
const reportConfig = {
  schedule: {
    day: 'Monday', // Día de la semana para enviar el informe
    time: '09:00', // Hora de envío (formato 24h)
    timezone: 'Europe/Madrid' // Zona horaria
  },
  email: {
    from: credentials.email?.from || process.env.EMAIL || 'email@example.com',
    password: credentials.email?.app_password || process.env.APP_PASSWORD || 'your_app_password_here',
    to: process.env.REPORT_RECIPIENT || 'recipient@example.com',
    subject: process.env.REPORT_SUBJECT || 'Adelgaza sin Salir de Casa'
  },
  analytics: {
    id: credentials.google_analytics?.property_id || process.env.ANALYTICS_ID || 'G-VSWS87PY47',
    includePageViews: true,
    includeClickEvents: true,
    includeCTAConversions: true,
    includeUserDemographics: true,
    includeUserFlow: true
  }
};

// Exporta la configuración
// En un entorno Node.js sería module.exports = reportConfig
// Para navegador lo exponemos como variable global
window.reportConfig = reportConfig; 