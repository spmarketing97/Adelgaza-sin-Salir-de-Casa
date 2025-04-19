# Landing Page - Adelgaza sin Salir de Casa

Esta es una landing page profesional creada para el programa "Adelgaza sin Salir de Casa".

## Estructura de Archivos

- `index.html`: Archivo principal HTML de la landing page
- `img/`: Carpeta que contiene todas las imágenes
  - `img/banner.jpg`: Imagen del banner principal para el header (respaldo si el video no funciona)
  - `img/logo.jpg`: Imagen del logo para el favicon y footer
  - `img/fitness-image.jpg`: Imagen de resultados que aparece encima del precio
  - `img/certificado.jpg`: Imagen del certificado que aparece al final
  - `img/favicon.jpg`: Favicon para la pestaña del navegador
  - `img/testimonio1.jpg`: Imagen de Zenaida Rodriguez para el slider de testimonios
  - `img/testimonio2.jpg`: Imagen de Yolanda Arias para el slider de testimonios
  - `img/testimonio3.jpg`: Imagen de Eliana Herrera para el slider de testimonios
  - `img/testimonio4.jpg`: Imagen de David Monroy para el slider de testimonios
  - `img/testimonio5.jpg`: Imagen de Mary Herrera para el slider de testimonios
  - `img/testimonio6.jpg`: Imagen para el testimonio ficticio (Carlos Méndez)
  - `img/testimonio7.jpg`: Imagen para el testimonio ficticio (Laura Gómez)
- `Video/`: Carpeta que contiene los archivos de video
  - `Video/banner-video.mp4`: Video principal para el banner de la página
- `analytics.js`: Sistema de análisis e informes semanales
- `config.js`: Archivo de configuración (versión segura para GitHub)

## Configuración de Credenciales

Para proteger tus datos sensibles, sigue estos pasos:

1. No modifiques directamente `config.js`, ya que este archivo se puede subir a GitHub sin riesgo.

2. Crea un archivo `config.local.js` con tus credenciales reales:
   ```javascript
   // Configuración local con credenciales reales
   // NO SUBIR ESTE ARCHIVO A GITHUB
   
   // Configuración de credenciales reales para el entorno local
   process.env.EMAIL = 'tu-email@example.com';
   process.env.APP_PASSWORD = 'tu-contraseña-app';
   process.env.REPORT_RECIPIENT = 'destinatario@example.com';
   process.env.REPORT_SUBJECT = 'Adelgaza sin Salir de Casa';
   process.env.ANALYTICS_ID = 'G-VSWS87PY47';
   ```

3. Incluye `config.local.js` en el archivo `.gitignore` para evitar que se suba a GitHub.

4. Para asegurarte de que el archivo no se suba, ejecuta este comando en la terminal:
   ```
   git update-index --assume-unchanged config.local.js
   ```

## Archivos Seguros para Subir a GitHub

Los siguientes archivos se pueden subir a GitHub sin riesgo:
- `index.html`
- `analytics.js`
- `config.js` (versión segura sin credenciales)
- Carpetas `img/` y `Video/`
- Archivos `.bat`
- `README.md`

## Archivos NO Seguros para GitHub (incluidos en .gitignore)

Estos archivos contienen información sensible y NO deben subirse a GitHub:
- `.env`
- `config.local.js`

## Instrucciones de Implementación

1. Reemplaza los archivos de marcador de posición en la carpeta `img` con las imágenes reales:
   - Sustituye `img/banner.jpg` con la primera imagen (banner principal como respaldo)
   - Sustituye `img/logo.jpg` con la segunda imagen (logo)
   - Sustituye `img/fitness-image.jpg` con la tercera imagen (persona mostrando resultados)
   - Sustituye `img/certificado.jpg` con la cuarta imagen (certificado)
   - Sustituye `img/favicon.jpg` con la imagen para el favicon
   - Sustituye `img/testimonio1.jpg` a `img/testimonio5.jpg` con las imágenes de testimonios proporcionadas
   - Añade imágenes para los testimonios ficticios en `img/testimonio6.jpg` y `img/testimonio7.jpg`

2. Coloca el archivo de video del banner en la carpeta `Video/`:
   - Nombra el archivo de video como `banner-video.mp4` 
   - Asegúrate de que el video tenga un formato compatible (MP4 es recomendado para la mayoría de navegadores)
   - El video se reproducirá automáticamente, en silencio y en bucle

3. Revisa el archivo HTML para asegurarte de que todos los enlaces y recursos están correctamente vinculados.

4. El temporizador de cuenta regresiva está configurado para 25 minutos. Si necesitas cambiar este tiempo, modifica la variable `twentyFiveMinutes` en el script al final del archivo HTML.

5. El enlace del CTA está configurado para dirigir a: https://hotm.art/AdelgazasinSalirdeCasa-LanCheckOut

6. Sube todos los archivos y la carpeta `img` y `Video` a tu servidor web para publicar la landing page.

## Instrucciones para Guardar/Restaurar Archivos

Para evitar perder tus imágenes y videos al cerrar la carpeta del proyecto, utiliza los siguientes archivos batch:

1. **guardar-archivos.bat**: Ejecuta este archivo antes de cerrar la carpeta del proyecto para crear un respaldo de todas las imágenes y videos.

2. **restaurar-archivos.bat**: Si al abrir el proyecto notas que faltan imágenes o videos, ejecuta este archivo para restaurarlos desde el respaldo.

3. **iniciar-proyecto.bat**: Ejecuta este archivo cada vez que abras el proyecto para asegurarte de que todos los archivos estén en su lugar correcto.

### Pasos recomendados:

1. Al abrir el proyecto por primera vez, ejecuta `iniciar-proyecto.bat`.
2. Coloca tus imágenes y videos en las carpetas correspondientes.
3. Antes de cerrar la carpeta, ejecuta `guardar-archivos.bat` para asegurar que todo quede respaldado.
4. Si en algún momento pierdes archivos, ejecuta `restaurar-archivos.bat`.

## Características

- Diseño minimalista y profesional
- Banner con video reproducible automáticamente
- Temporizador de cuenta regresiva de 25 minutos
- Secciones organizadas con toda la información del programa
- Slider de testimonios con navegación automática y manual
- Botón de contacto por Telegram en el footer
- Totalmente responsive para adaptarse a diferentes dispositivos
- Animación pulsante en el botón CTA para aumentar las conversiones
- Organización clara de los beneficios, niveles y bonos del programa
- Sistema de análisis e informes semanales

Para cualquier modificación o personalización adicional, edita el archivo `index.html`. 