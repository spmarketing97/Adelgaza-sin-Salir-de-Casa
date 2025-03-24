@echo off
echo ======================================================
echo GUARDANDO ARCHIVOS DEL PROYECTO ADELGAZA SIN SALIR DE CASA
echo ======================================================
echo.

rem Crear directorio de respaldo si no existe
if not exist ".\respaldo\" mkdir ".\respaldo"
if not exist ".\respaldo\img\" mkdir ".\respaldo\img"
if not exist ".\respaldo\Video\" mkdir ".\respaldo\Video"

rem Copiar archivos de imágenes a respaldo
echo Guardando imágenes...
xcopy ".\img\*.*" ".\respaldo\img\" /Y /I
echo.

rem Copiar archivos de video a respaldo
echo Guardando videos...
xcopy ".\Video\*.*" ".\respaldo\Video\" /Y /I
echo.

echo Archivos guardados correctamente en la carpeta "respaldo".
echo Si las imágenes o videos desaparecen, ejecuta "restaurar-archivos.bat".
echo.
echo ======================================================

pause 