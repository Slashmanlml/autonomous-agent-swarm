const fs = require('fs');
const path = require('path');

class McpToolkit {
    static async fetchMarketData() {
        console.log('  🔧 [MCP Tool: fetchMarketData] Ejecutando consulta de mercado...');
        try {
            const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true');
            const data = await res.json();
            return {
                status: 'SUCCESS',
                timestamp: new Date().toISOString(),
                assets: {
                    bitcoin: { price: data.bitcoin?.usd || 0, change24h: data.bitcoin?.usd_24h_change || 0 },
                    ethereum: { price: data.ethereum?.usd || 0, change24h: data.ethereum?.usd_24h_change || 0 },
                    solana: { price: data.solana?.usd || 0, change24h: data.solana?.usd_24h_change || 0 }
                }
            };
        } catch (e) {
            return { status: 'ERROR', message: e.message };
        }
    }

    static async saveReport(filename, content) {
        console.log(`  🔧 [MCP Tool: saveReport] Persistiendo reporte en: ${filename}...`);
        const reportPath = path.join(__dirname, '..', '..', 'data', 'reports', filename);
        fs.writeFileSync(reportPath, content, 'utf-8');
        return { status: 'SAVED', path: reportPath };
    }

    static async notifyTelegram(text) {
        console.log('  🔧 [MCP Tool: notifyTelegram] Despachando notificación push...');
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            console.log('    ⚠️ [Telegram] Sin credenciales configuradas, omitiendo envío.');
            return { status: 'SKIPPED' };
        }

        try {
            const url = `https://api.telegram.org/bot${token}/sendMessage`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' })
            });
            const data = await res.json();
            return { status: data.ok ? 'SENT' : 'FAILED', response: data };
        } catch (e) {
            return { status: 'ERROR', error: e.message };
        }
    }
}

module.exports = McpToolkit;
