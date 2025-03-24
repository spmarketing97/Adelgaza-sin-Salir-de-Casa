@echo off
echo ======================================================
echo INICIANDO PROYECTO ADELGAZA SIN SALIR DE CASA
echo ======================================================
echo.

rem Verificar si existen las carpetas necesarias
if not exist ".\img\" mkdir ".\img"
if not exist ".\Video\" mkdir ".\Video"

rem Verificar si hay respaldo
if exist ".\respaldo\" (
    echo Se encontró un respaldo. Restaurando archivos...
    call restaurar-archivos.bat
)

rem Verificar que index.html existe
if not exist ".\index.html" (
    echo ADVERTENCIA: No se encontró el archivo index.html
    echo Por favor, asegúrate de que el archivo esté en la carpeta del proyecto.
) else (
    echo Archivo index.html encontrado correctamente.
)

echo.
echo ======================================================
echo PROYECTO LISTO PARA USAR
echo.
echo No olvides ejecutar "guardar-archivos.bat" antes de cerrar la carpeta
echo para asegurar que tus imágenes y videos no se pierdan.
echo ======================================================

pause 