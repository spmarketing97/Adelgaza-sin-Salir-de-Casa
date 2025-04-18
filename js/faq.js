/**
 * faq.js - Funcionalidad para la sección de preguntas frecuentes
 * Este archivo controla el comportamiento de la sección FAQ en la página.
 * 
 * @version 1.0.0
 * @author SPMarketing - ImpactoDigital
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los elementos de FAQ
    const faqItems = document.querySelectorAll('.faq-item');

    // Añadir evento de clic a cada pregunta
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                // Comprobar si esta pregunta está activa
                const isActive = question.classList.contains('active');
                
                // Primero, cerrar todas las respuestas abiertas
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                });
                
                document.querySelectorAll('.faq-answer').forEach(a => {
                    a.classList.remove('open');
                    a.style.maxHeight = null;
                });
                
                // Luego, si la pregunta no estaba abierta, abrirla
                if (!isActive) {
                    question.classList.add('active');
                    answer.classList.add('open');
                    
                    // Animación suave de apertura
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        }
    });
    
    // Función para filtrar FAQs según búsqueda
    const searchInput = document.getElementById('faq-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                if (question) {
                    const questionText = question.textContent.toLowerCase();
                    
                    // Mostrar/ocultar según coincidencia
                    if (questionText.includes(searchTerm)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
            
            // Mostrar mensaje si no hay resultados
            const noResults = document.getElementById('faq-no-results');
            if (noResults) {
                const visibleItems = document.querySelectorAll('.faq-item[style="display: block;"]');
                noResults.style.display = visibleItems.length === 0 ? 'block' : 'none';
            }
        });
    }
    
    // Agrupar FAQs por categorías si existen
    const categoryButtons = document.querySelectorAll('.faq-category-btn');
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Resaltar botón activo
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Mostrar solo los FAQs de la categoría seleccionada
                faqItems.forEach(item => {
                    if (category === 'all') {
                        item.style.display = 'block';
                    } else {
                        const itemCategory = item.getAttribute('data-category');
                        item.style.display = (itemCategory === category) ? 'block' : 'none';
                    }
                });
            });
        });
    }
}); 