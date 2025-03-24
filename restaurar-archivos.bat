@echo off
echo ======================================================
echo RESTAURANDO ARCHIVOS DEL PROYECTO ADELGAZA SIN SALIR DE CASA
echo ======================================================
echo.

rem Verificar si existe el directorio de respaldo
if not exist ".\respaldo\" (
    echo No se encontró el directorio de respaldo.
    echo Ejecuta primero "guardar-archivos.bat" para crear un respaldo.
    goto :EOF
)

rem Crear directorios si no existen
if not exist ".\img\" mkdir ".\img"
if not exist ".\Video\" mkdir ".\Video"

rem Restaurar imágenes
echo Restaurando imágenes...
xcopy ".\respaldo\img\*.*" ".\img\" /Y /I
echo.

rem Restaurar videos
echo Restaurando videos...
xcopy ".\respaldo\Video\*.*" ".\Video\" /Y /I
echo.

echo Archivos restaurados correctamente.
echo.
echo ======================================================

pause 