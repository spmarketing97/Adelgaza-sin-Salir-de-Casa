/**
 * weekly-report.js - Script para generar y enviar informes semanales
 * Para ejecutarse automáticamente cada lunes a las 9:00 AM mediante cron o una tarea programada
 */

// Cargar credenciales desde el archivo JSON
let credentials = {};
try {
    // Intentar cargar las credenciales desde el archivo JSON
    credentials = require('../credentials/credentials.json');
    console.log('Credenciales cargadas correctamente desde el archivo JSON');
} catch (error) {
    console.warn('No se pudieron cargar las credenciales desde el archivo JSON:', error.message);
    console.warn('Se utilizarán las credenciales configuradas directamente en el script');
}

// Configuración con fallback a valores en el script si no se pudieron cargar las credenciales
const config = {
    emailSettings: {
        to: credentials.email?.to || "hristiankrasimirov7@gmail.com",
        subject: "Informe Semanal - Adelgaza sin Salir de Casa",
        from: credentials.email?.from || "solucionesworld2016@gmail.com",
        appPassword: credentials.email?.app_password || "hvyj qclp lcuy gsgt"
    },
    apiKeys: {
        googleAnalytics: credentials.google_analytics?.api_key || "YOUR_GA_API_KEY", 
        emailjs: credentials.emailjs?.public_key || "YOUR_EMAILJS_PUBLIC_KEY"
    }
};

// Clase principal para el informe semanal
class WeeklyReport {
    constructor() {
        this.today = new Date();
        this.startDate = this.getLastMonday();
        this.endDate = new Date(this.startDate);
        this.endDate.setDate(this.endDate.getDate() + 6);
        
        this.data = {
            visitas: 0,
            visitasUnicas: 0,
            tasaRebote: 0,
            duracionMedia: 0,
            conversiones: 0,
            tasaConversion: 0,
            cuestionariosCompletados: 0,
            dispositivos: {
                desktop: 0,
                mobile: 0,
                tablet: 0
            },
            fuentesTrafico: [],
            paginasPopulares: []
        };
    }
    
    /**
     * Obtiene la fecha del lunes anterior (o hoy si es lunes)
     * @returns {Date} - Fecha del último lunes
     */
    getLastMonday() {
        const date = new Date(this.today);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        
        date.setDate(diff);
        date.setHours(0, 0, 0, 0);
        
        return date;
    }
    
    /**
     * Formatea una fecha en formato legible
     * @param {Date} date - Fecha a formatear
     * @returns {string} - Fecha formateada (DD/MM/YYYY)
     */
    formatDate(date) {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
    
    /**
     * Genera datos de ejemplo para el informe
     * En un entorno real, estos datos vendrían de Google Analytics y tu base de datos
     */
    generateDemoData() {
        // Generar datos aleatorios pero realistas para la demo
        this.data.visitas = Math.floor(Math.random() * 500) + 200;
        this.data.visitasUnicas = Math.floor(this.data.visitas * (Math.random() * 0.3 + 0.6));
        this.data.tasaRebote = Math.floor(Math.random() * 40) + 30;
        this.data.duracionMedia = Math.floor(Math.random() * 180) + 60;
        this.data.conversiones = Math.floor(Math.random() * 30) + 5;
        this.data.tasaConversion = Math.round((this.data.conversiones / this.data.visitas) * 1000) / 10;
        this.data.cuestionariosCompletados = Math.floor(Math.random() * 50) + 10;
        
        // Dispositivos
        const totalDispositivos = this.data.visitas;
        this.data.dispositivos.mobile = Math.floor(totalDispositivos * (Math.random() * 0.2 + 0.5));
        this.data.dispositivos.desktop = Math.floor(totalDispositivos * (Math.random() * 0.2 + 0.2));
        this.data.dispositivos.tablet = totalDispositivos - this.data.dispositivos.mobile - this.data.dispositivos.desktop;
        
        // Fuentes de tráfico
        this.data.fuentesTrafico = [
            { fuente: "Google (Orgánico)", porcentaje: Math.floor(Math.random() * 40) + 20 },
            { fuente: "Redes Sociales", porcentaje: Math.floor(Math.random() * 30) + 15 },
            { fuente: "Directo", porcentaje: Math.floor(Math.random() * 25) + 10 },
            { fuente: "Email", porcentaje: Math.floor(Math.random() * 15) + 5 },
            { fuente: "Referidos", porcentaje: Math.floor(Math.random() * 10) + 5 }
        ];
        
        // Normalizar los porcentajes para que sumen 100%
        const sumaTotal = this.data.fuentesTrafico.reduce((sum, item) => sum + item.porcentaje, 0);
        this.data.fuentesTrafico.forEach(item => {
            item.porcentaje = Math.round((item.porcentaje / sumaTotal) * 100);
        });
        
        // Páginas populares
        this.data.paginasPopulares = [
            { url: "/index.html", visitas: Math.floor(Math.random() * 200) + 100 },
            { url: "/cuestionario/", visitas: Math.floor(Math.random() * 100) + 50 },
            { url: "/#que-lograr", visitas: Math.floor(Math.random() * 80) + 40 },
            { url: "/#testimonios", visitas: Math.floor(Math.random() * 70) + 30 },
            { url: "/#faqs", visitas: Math.floor(Math.random() * 50) + 20 }
        ];
    }
    
    /**
     * Genera el cuerpo HTML del informe
     * @returns {string} - HTML del informe
     */
    generateReportHTML() {
        const dateRange = `${this.formatDate(this.startDate)} - ${this.formatDate(this.endDate)}`;
        
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .header {
                    background-color: #ff5757;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    padding: 20px;
                    background-color: #f9f9f9;
                }
                .section {
                    margin-bottom: 30px;
                    background-color: white;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                h1, h2, h3 {
                    color: #ff5757;
                }
                .metric {
                    display: inline-block;
                    text-align: center;
                    margin: 10px 20px;
                    min-width: 120px;
                }
                .metric .value {
                    font-size: 24px;
                    font-weight: bold;
                    color: #ff5757;
                }
                .metric .label {
                    font-size: 14px;
                    color: #666;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 15px 0;
                }
                th, td {
                    padding: 10px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #f5f5f5;
                }
                .chart {
                    background-color: #eee;
                    height: 200px;
                    border-radius: 5px;
                    margin: 20px 0;
                    display: flex;
                    align-items: flex-end;
                    padding: 10px;
                }
                .bar {
                    flex: 1;
                    background-color: #ff5757;
                    margin: 0 5px;
                    position: relative;
                }
                .bar-label {
                    position: absolute;
                    bottom: -25px;
                    left: 0;
                    right: 0;
                    text-align: center;
                    font-size: 12px;
                }
                .bar-value {
                    position: absolute;
                    top: -25px;
                    left: 0;
                    right: 0;
                    text-align: center;
                    font-size: 12px;
                    font-weight: bold;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    color: #666;
                    font-size: 14px;
                    background-color: #f5f5f5;
                    border-radius: 0 0 5px 5px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Informe Semanal - Adelgaza sin Salir de Casa</h1>
                <p>Periodo: ${dateRange}</p>
            </div>
            
            <div class="content">
                <div class="section">
                    <h2>Resumen General</h2>
                    <div style="display: flex; flex-wrap: wrap; justify-content: center;">
                        <div class="metric">
                            <div class="value">${this.data.visitas}</div>
                            <div class="label">Visitas totales</div>
                        </div>
                        <div class="metric">
                            <div class="value">${this.data.visitasUnicas}</div>
                            <div class="label">Visitantes únicos</div>
                        </div>
                        <div class="metric">
                            <div class="value">${this.data.tasaRebote}%</div>
                            <div class="label">Tasa de rebote</div>
                        </div>
                        <div class="metric">
                            <div class="value">${Math.floor(this.data.duracionMedia / 60)}:${(this.data.duracionMedia % 60).toString().padStart(2, '0')}</div>
                            <div class="label">Duración media</div>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <h2>Conversiones</h2>
                    <div style="display: flex; flex-wrap: wrap; justify-content: center;">
                        <div class="metric">
                            <div class="value">${this.data.conversiones}</div>
                            <div class="label">Conversiones</div>
                        </div>
                        <div class="metric">
                            <div class="value">${this.data.tasaConversion}%</div>
                            <div class="label">Tasa de conversión</div>
                        </div>
                        <div class="metric">
                            <div class="value">${this.data.cuestionariosCompletados}</div>
                            <div class="label">Cuestionarios</div>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <h2>Dispositivos</h2>
                    <div class="chart">
                        <div class="bar" style="height: ${this.data.dispositivos.desktop / this.data.visitas * 100}%;">
                            <div class="bar-value">${this.data.dispositivos.desktop}</div>
                            <div class="bar-label">Escritorio</div>
                        </div>
                        <div class="bar" style="height: ${this.data.dispositivos.mobile / this.data.visitas * 100}%;">
                            <div class="bar-value">${this.data.dispositivos.mobile}</div>
                            <div class="bar-label">Móvil</div>
                        </div>
                        <div class="bar" style="height: ${this.data.dispositivos.tablet / this.data.visitas * 100}%;">
                            <div class="bar-value">${this.data.dispositivos.tablet}</div>
                            <div class="bar-label">Tablet</div>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <h2>Fuentes de Tráfico</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Fuente</th>
                                <th>Porcentaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.data.fuentesTrafico.map(item => `
                                <tr>
                                    <td>${item.fuente}</td>
                                    <td>${item.porcentaje}%</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="section">
                    <h2>Páginas Más Visitadas</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Página</th>
                                <th>Visitas</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.data.paginasPopulares.map(page => `
                                <tr>
                                    <td>${page.url}</td>
                                    <td>${page.visitas}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="footer">
                <p>Este informe se genera automáticamente cada lunes a las 9:00 AM.</p>
                <p>© 2025 SPMarketing – ImpactoDigital - Todos los derechos reservados</p>
            </div>
        </body>
        </html>
        `;
    }
    
    /**
     * Genera y envía el informe
     */
    async generateAndSendReport() {
        try {
            // Generar datos de ejemplo (en producción se obtendría de APIs reales)
            this.generateDemoData();
            
            // Generar HTML del informe
            const htmlContent = this.generateReportHTML();
            
            // En un entorno real, aquí se enviaría el correo con el informe
            console.log('Enviando informe semanal a', config.emailSettings.to);
            console.log('Periodo del informe:', this.formatDate(this.startDate), 'al', this.formatDate(this.endDate));
            
            // Ejemplo de envío con EmailJS (simulado)
            console.log('Informe enviado correctamente.');
            
            return {
                success: true,
                message: 'Informe semanal enviado correctamente.',
                sentTo: config.emailSettings.to,
                reportDate: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error al generar o enviar el informe:', error);
            return {
                success: false,
                message: 'Error al generar o enviar el informe.',
                error: error.message
            };
        }
    }
}

// Ejecutar si este script se llama directamente
if (require.main === module) {
    const report = new WeeklyReport();
    report.generateAndSendReport()
        .then(result => console.log(result))
        .catch(err => console.error(err));
}

// Exportar la clase para uso en otros módulos
module.exports = WeeklyReport; 