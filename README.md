# Multi Agent Swarm

Pipeline de tres etapas encadenadas sobre datos de mercado en tiempo real:

```
researcher  ->  consulta la API de CoinGecko (BTC, ETH, SOL con variacion 24 h)
auditor     ->  clasifica el riesgo de cada activo segun la volatilidad
reporter    ->  arma el reporte en Markdown, lo persiste y lo despacha por Telegram
```

> ### Sobre el nombre
>
> **No son agentes y no hay un enjambre.** Son tres clases que se ejecutan en
> secuencia, cada una con una responsabilidad. No interviene ningun modelo de
> lenguaje, no hay decision autonoma ni comunicacion entre ellas.
>
> Del mismo modo, `src/tools/mcp-toolkit.js` **no implementa Model Context
> Protocol**: es un conjunto de funciones auxiliares (`fetch` a una API, guardar
> un archivo, notificar por Telegram).
>
> Dejo la aclaracion porque los nombres sugieren algo bastante mas complejo de lo
> que el codigo hace. Los datos que procesa si son reales.

## Uso

```bash
node index.js
```

Genera un reporte en `data/reports/reporte-AAAA-MM-DD.md`.

## Licencia

MIT
