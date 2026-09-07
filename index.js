const SwarmOrchestrator = require('./src/agents/orchestrator');

async function main() {
    const orchestrator = new SwarmOrchestrator();
    await orchestrator.runPipeline();
}

main().catch(err => {
    console.error('❌ Error crítico en el enjambre:', err);
    process.exit(1);
});
