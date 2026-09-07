const McpToolkit = require('../tools/mcp-toolkit');

class ResearcherAgent {
    constructor() {
        this.role = 'Data Scout & Researcher';
    }

    async execute() {
        console.log(`\n🔍 [${this.role}] Iniciando recolección de datos...`);
        const marketData = await McpToolkit.fetchMarketData();
        console.log(`🔍 [${this.role}] Datos recolectados exitosamente.`);
        return {
            agent: this.role,
            data: marketData
        };
    }
}

module.exports = ResearcherAgent;
