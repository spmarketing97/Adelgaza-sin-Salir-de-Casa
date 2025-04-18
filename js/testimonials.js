/**
 * testimonials.js - Módulo de testimonios
 * Gestiona la funcionalidad de la sección de testimonios
 * 
 * @version 1.0.0
 * @author SPMarketing - ImpactoDigital
 */

(function() {
    'use strict';

    // Elemento contenedor de testimonios
    const testimonialsContainer = document.querySelector('.testimonials-grid');
    
    /**
     * Inicializa las funcionalidades de los testimonios
     */
    function initTestimonials() {
        if (!testimonialsContainer) return;
        
        // Agregar efectos de hover a las tarjetas de testimonios
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach(card => {
            // Efecto de elevación al pasar el mouse
            card.addEventListener('mouseenter', function() {
                this.classList.add('testimonial-hover');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('testimonial-hover');
            });
            
            // Agregar clase para animación de entrada
            card.classList.add('testimonial-animate');
        });
        
        // Animación de entrada escalonada
        animateTestimonials();
        
        // Inicializar filtrado de testimonios si existe
        initTestimonialFilters();
    }
    
    /**
     * Anima la entrada de los testimonios de forma escalonada
     */
    function animateTestimonials() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            // Retrasar la animación para cada tarjeta
            setTimeout(() => {
                card.classList.add('testimonial-visible');
            }, 150 * index);
        });
    }
    
    /**
     * Inicializa los filtros de testimonios por categoría si existen
     */
    function initTestimonialFilters() {
        const filterButtons = document.querySelectorAll('.testimonial-filter');
        if (filterButtons.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover clase activa de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Agregar clase activa al botón actual
                this.classList.add('active');
                
                // Obtener la categoría a filtrar
                const category = this.getAttribute('data-category');
                
                // Filtrar testimonios
                filterTestimonialsByCategory(category);
            });
        });
    }
    
    /**
     * Filtra los testimonios por categoría
     * @param {string} category - Categoría por la que filtrar ("all" muestra todos)
     */
    function filterTestimonialsByCategory(category) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        testimonialCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            // Si es "all" o coincide con la categoría, mostrar
            if (category === 'all' || cardCategory === category) {
                card.style.display = '';
                setTimeout(() => {
                    card.classList.add('testimonial-visible');
                }, 50);
            } else {
                // Ocultar con transición
                card.classList.remove('testimonial-visible');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300); // Tiempo igual a la duración de la transición CSS
            }
        });
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTestimonials);
    } else {
        initTestimonials();
    }
})(); 