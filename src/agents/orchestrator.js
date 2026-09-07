const ResearcherAgent = require('./researcher');
const AuditorAgent = require('./auditor');
const ReporterAgent = require('./reporter');

class SwarmOrchestrator {
    constructor() {
        this.researcher = new ResearcherAgent();
        this.auditor = new AuditorAgent();
        this.reporter = new ReporterAgent();
    }

    async runPipeline() {
        console.log('================================================================');
        console.log('🚀 [ORQUESTADOR] INICIANDO ENJAMBRE MULTI-AGENTE AUTÓNOMO');
        console.log('================================================================');
        
        const startTime = Date.now();

        // Paso 1: Disparar Agente Researcher
        const researchOutput = await this.researcher.execute();

        // Paso 2: Pasar datos al Agente Auditor
        const auditOutput = await this.auditor.analyze(researchOutput);

        // Paso 3: Pasar auditoría al Agente Reporter
        const reportOutput = await this.reporter.generateAndDispatch(auditOutput);

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log('================================================================');
        console.log(`✅ [ORQUESTADOR] ENJAMBRE FINALIZADO EN ${duration}s CON ÉXITO`);
        console.log('================================================================');

        return {
            status: 'SUCCESS',
            durationSeconds: duration,
            artifacts: reportOutput.reportFile
        };
    }
}

module.exports = SwarmOrchestrator;
