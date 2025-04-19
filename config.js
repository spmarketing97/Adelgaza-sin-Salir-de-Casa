// Configuración para informes semanales
// Este archivo puede ser compartido en GitHub sin credenciales sensibles

// Importa las variables de entorno de .env
// Nota: En producción, necesitarás una biblioteca como dotenv

// Configuración del informe
const reportConfig = {
  schedule: {
    day: 'Monday', // Día de la semana para enviar el informe
    time: '09:00', // Hora de envío (formato 24h)
    timezone: 'Europe/Madrid' // Zona horaria
  },
  email: {
    from: process.env.EMAIL || 'email@example.com',
    password: process.env.APP_PASSWORD || 'your_app_password_here',
    to: process.env.REPORT_RECIPIENT || 'recipient@example.com',
    subject: process.env.REPORT_SUBJECT || 'Adelgaza sin Salir de Casa'
  },
  analytics: {
    id: process.env.ANALYTICS_ID || 'G-VSWS87PY47',
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