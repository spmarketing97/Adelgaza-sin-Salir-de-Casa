# Adelgaza sin Salir de Casa - Landing Page

Este repositorio contiene el código fuente de la landing page para el programa "Adelgaza sin Salir de Casa", con un chatbot interactivo integrado.

## Estructura del Proyecto

```
├── css/                    # Archivos de estilos
├── js/                     # Archivos JavaScript
│   ├── chatbot.js          # Funcionalidad del chatbot
│   └── main.js             # Scripts principales
├── img/                    # Imágenes y recursos visuales
├── index.html              # Página principal
├── config.example.js       # Ejemplo de configuración
└── README.md               # Este archivo
```

## Configuración

1. Clona este repositorio
2. Copia `config.example.js` a `config.js` y completa con tus datos reales
3. Si necesitas variables de entorno, crea un archivo `.env` basado en `.env.example`

## Características

- Landing page responsive optimizada para conversión
- Chatbot interactivo con preguntas frecuentes
- Testimonios de clientes
- Sección de precios con llamadas a la acción
- Temporizador de cuenta regresiva para ofertas

## Configuración del Chatbot

El chatbot incluye:
- Preguntas frecuentes configuradas para mostrar solo una respuesta a la vez
- Sugerencias contextuales basadas en la interacción del usuario
- Respuestas personalizadas según palabras clave
- CTAs específicos para cada tipo de consulta

## Seguridad

- No subas archivos de configuración con datos sensibles a GitHub
- Utiliza el archivo `.gitignore` incluido para excluir archivos confidenciales
- Mantén tus claves API y tokens en el archivo `config.js` (que está en `.gitignore`)
- Para sistemas en producción, usa variables de entorno

## Desarrollo

Para trabajar en el proyecto localmente:

```bash
# Iniciar un servidor local
python -m http.server 8000
# o con PHP
php -S localhost:8000
# o con Node.js
npx serve
```

## Contacto

Para cualquier consulta sobre este repositorio, contacta a [tu-email@ejemplo.com]

## Configuración del Sistema de Informes Semanales

La aplicación cuenta con un sistema de informes semanales que envía estadísticas y métricas importantes por correo electrónico cada lunes a las 9:00 AM. A continuación se explica cómo configurarlo correctamente:

### Archivo de Credenciales

Las credenciales se almacenan en un archivo JSON separado para mayor seguridad. 

1. Se ha creado una carpeta `credentials` en la raíz del proyecto
2. Dentro de esta carpeta debe existir un archivo llamado `credentials.json`
3. Puede usar el script `actualizar-credenciales.bat` para crear inicialmente este archivo

### Estructura del archivo credentials.json

```json
{
  "google_analytics": {
    "api_key": "YOUR_GA_API_KEY",
    "client_id": "YOUR_GA_CLIENT_ID",
    "client_secret": "YOUR_GA_CLIENT_SECRET",
    "refresh_token": "YOUR_GA_REFRESH_TOKEN",
    "property_id": "G-VSWS87PY47"
  },
  "email": {
    "service": "gmail",
    "from": "solucionesworld2016@gmail.com",
    "app_password": "hvyj qclp lcuy gsgt"
  },
  "emailjs": {
    "service_id": "service_adelgaza",
    "template_id": "template_cuestionario",
    "public_key": "YOUR_EMAILJS_PUBLIC_KEY",
    "private_key": "YOUR_EMAILJS_PRIVATE_KEY"
  }
}
```

### Configuración del Informe Semanal

El sistema de informes semanales está configurado para utilizar las credenciales del archivo JSON. Los archivos relevantes son:

- `config.js` - Configuración general que carga las credenciales
- `analytics.js` - Sistema de análisis que recopila los datos
- `cuestionario/weekly-report.js` - Generación y envío del informe
- `cuestionario/schedule-report.js` - Programación del informe

### Ejecución manual del informe

Para ejecutar manualmente el informe semanal:

```bash
cd cuestionario
node weekly-report.js
```

### Programación automática

Para iniciar el programador que enviará los informes cada lunes:

```bash
cd cuestionario
node schedule-report.js
```

## Seguridad

El archivo de credenciales debe mantenerse seguro y nunca subirse a repositorios públicos. El archivo `.gitignore` ya está configurado para excluir la carpeta `credentials/`. 