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