class AuditorAgent {
    constructor() {
        this.role = 'Risk & Quality Auditor';
    }

    async analyze(researchResult) {
        console.log(`\n🛡️ [${this.role}] Analizando riesgos, volatilidad y estado del sistema...`);
        const assets = researchResult.data.assets || {};
        
        const evaluations = Object.entries(assets).map(([name, info]) => {
            let riskLevel = 'BAJO';
            if (Math.abs(info.change24h) > 5) riskLevel = 'ALTO';
            else if (Math.abs(info.change24h) > 2) riskLevel = 'MEDIO';

            return {
                asset: name.toUpperCase(),
                price: info.price,
                change24h: `${info.change24h.toFixed(2)}%`,
                risk: riskLevel,
                trend: info.change24h >= 0 ? '🟢 ALCISTA' : '🔴 BAJISTA'
            };
        });

        console.log(`🛡️ [${this.role}] Auditoría completada. Evaluaciones: ${evaluations.length} activos analizados.`);
        return {
            agent: this.role,
            timestamp: new Date().toISOString(),
            evaluations
        };
    }
}

module.exports = AuditorAgent;
