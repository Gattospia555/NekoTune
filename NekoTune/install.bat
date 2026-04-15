@echo off
title NekoTune - Installer
color 0b

echo ==============================================
echo        NekoTune Auto-Installer Script
echo ==============================================
echo.

:: Controlla se Node.js è installato
node -v >nul 2>&1
if %errorlevel% neq 0 (
    color 0c
    echo [ERRORE!] Node.js non e' installato!
    echo Per favore, scarica e installa Node.js da: https://nodejs.org/
    echo.
    pause
    exit /b
)

echo [OK] Node.js e' installato. Procedo con l'installazione delle dipendenze...
echo.
echo ==============================================
echo         Installazione in corso...
echo ==============================================

call npm install

if %errorlevel% neq 0 (
    color 0c
    echo.
    echo [ERRORE!] Si e' verificato un problema durante l'installazione delle dipendenze.
    pause
    exit /b
)

color 0a
echo.
echo ==============================================
echo [SUCCESSO] Tutte le dipendenze sono state installate correttamente!
echo ==============================================
echo.

set /p run="Vuoi avviare NekoTune in modalita' sviluppo ora? (S/N): "
if /I "%run%"=="S" (
    echo.
    echo Avviando NekoTune...
    call npm run dev
) else (
    echo.
    echo Compilo il progetto in background per la produzione...
    call npm run build
    echo Fatto! Puoi avviare l'app o chiudere questa finestra.
)

pause
