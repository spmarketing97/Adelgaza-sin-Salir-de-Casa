/**
 * config.example.js
 * Archivo de configuración de ejemplo
 * Renombra este archivo a config.js y completa los datos reales
 */

// Configuración de la aplicación
const config = {
    // Credenciales de API (reemplazar con tus datos reales)
    apiKey: 'TU_API_KEY_AQUI',
    apiSecret: 'TU_API_SECRET_AQUI',
    
    // URLs de API
    apiBaseUrl: 'https://api.ejemplo.com',
    
    // Opciones de análisis
    analytics: {
        enabled: true,
        trackingId: 'TU_TRACKING_ID'
    },
    
    // Configuración de pagos
    payment: {
        merchantId: 'TU_MERCHANT_ID',
        publicKey: 'TU_PUBLIC_KEY',
        // No incluir claves privadas aquí, usar variables de entorno
    }
};

// No modificar esta línea
if (typeof module !== 'undefined') module.exports = config; 