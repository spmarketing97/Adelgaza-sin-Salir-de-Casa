/**
 * timer.js - Módulo de temporizador de cuenta regresiva
 * Gestiona la funcionalidad del temporizador de cuenta regresiva de la oferta
 * 
 * @version 1.0.0
 * @author SPMarketing - ImpactoDigital
 */

(function() {
    'use strict';
    
    // Fecha objetivo para la cuenta regresiva (por defecto: 1 día desde ahora)
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1);
    
    // Si hay un atributo data-end-date en el elemento del temporizador, usarlo como fecha objetivo
    const timerElement = document.querySelector('.countdown-timer');
    if (timerElement && timerElement.dataset.endDate) {
        const endDateStr = timerElement.dataset.endDate;
        const endDate = new Date(endDateStr);
        
        // Verificar que la fecha es válida
        if (!isNaN(endDate.getTime())) {
            targetDate = endDate;
        }
    }
    
    // Elementos del temporizador
    const daysElement = document.getElementById('countdown-days');
    const hoursElement = document.getElementById('countdown-hours');
    const minutesElement = document.getElementById('countdown-minutes');
    const secondsElement = document.getElementById('countdown-seconds');
    
    /**
     * Actualiza el temporizador con el tiempo restante
     */
    function updateTimer() {
        // Obtener el tiempo restante en milisegundos
        const now = new Date();
        let timeRemaining = targetDate.getTime() - now.getTime();
        
        // Si la fecha objetivo ya pasó, reiniciar a 24 horas
        if (timeRemaining < 0) {
            targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 1);
            timeRemaining = targetDate.getTime() - now.getTime();
        }
        
        // Calcular días, horas, minutos y segundos
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        // Actualizar los elementos del DOM
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // Agregar clase de animación al cambiar los segundos
        if (secondsElement) {
            secondsElement.classList.add('pulse');
            setTimeout(() => {
                secondsElement.classList.remove('pulse');
            }, 500);
        }
    }
    
    /**
     * Inicializa el temporizador
     */
    function initTimer() {
        // Ejecutar inmediatamente para evitar retraso en la primera visualización
        updateTimer();
        
        // Actualizar cada segundo
        setInterval(updateTimer, 1000);
        
        // Agregar eventos para resaltar secciones al hacer hover
        const timerSections = document.querySelectorAll('.countdown-section');
        timerSections.forEach(section => {
            section.addEventListener('mouseenter', function() {
                this.classList.add('highlight');
            });
            
            section.addEventListener('mouseleave', function() {
                this.classList.remove('highlight');
            });
        });
    }
    
    // Inicializar temporizador si existe en la página
    if (timerElement) {
        initTimer();
    }
})(); 