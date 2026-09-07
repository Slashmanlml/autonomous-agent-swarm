const McpToolkit = require('../tools/mcp-toolkit');

class ReporterAgent {
    constructor() {
        this.role = 'Executive Synthesizer & Dispatcher';
    }

    async generateAndDispatch(auditResult) {
        console.log(`\n📊 [${this.role}] Sintetizando informe ejecutivo Markdown y despachando alertas...`);
        
        const dateStr = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
        
        let markdown = `# 🤖 Informe Ejecutivo de Inteligencia Multi-Agente\n\n`;
        markdown += `**Fecha de Ejecución:** ${dateStr}  \n`;
        markdown += `**Orquestador:** Autonomous Agent Swarm  \n\n`;
        markdown += `## 📋 Tabla de Evaluación de Riesgos y Activos\n\n`;
        markdown += `| Activo | Precio (USD) | Variación 24h | Tendencia | Nivel de Riesgo |\n`;
        markdown += `| :--- | :--- | :--- | :--- | :--- |\n`;

        auditResult.evaluations.forEach(e => {
            markdown += `| **${e.asset}** | \$${e.price.toLocaleString()} | ${e.change24h} | ${e.trend} | \`${e.risk}\` |\n`;
        });

        markdown += `\n---\n*Reporte generado y auditado automáticamente por enjambre de subagentes.*\n`;

        // 1. Guardar informe en archivo
        const filename = `reporte-${new Date().toISOString().slice(0,10)}.md`;
        await McpToolkit.saveReport(filename, markdown);

        // 2. Preparar resumen corto para Telegram
        let telegramMsg = `🤖 *Informe Multi-Agente Ejecutado*\n\n`;
        auditResult.evaluations.forEach(e => {
            telegramMsg += `• *${e.asset}:* \$${e.price.toLocaleString()} (${e.trend})\n`;
        });
        telegramMsg += `\n📅 _Generado automáticamente en GitHub Actions_`;

        // 3. Enviar a Telegram
        await McpToolkit.notifyTelegram(telegramMsg);

        console.log(`📊 [${this.role}] Informe y alertas despachadas con éxito.`);
        return {
            agent: this.role,
            reportFile: filename,
            status: 'COMPLETED'
        };
    }
}

module.exports = ReporterAgent;
