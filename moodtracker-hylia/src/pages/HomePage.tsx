// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { getRandomTip, type Tip } from "../lib/api";

export default function HomePage() {
  const [tip, setTip] = useState<Tip | null>(null);
  const [loadingTip, setLoadingTip] = useState(false);
  const [tipError, setTipError] = useState<string | null>(null);

  async function loadTip() {
    try {
      setLoadingTip(true);
      setTipError(null);
      const data = await getRandomTip();
      setTip(data);
    } catch (err) {
      console.error(err);
      setTipError("Não foi possível carregar uma dica agora.");
    } finally {
      setLoadingTip(false);
    }
  }

  useEffect(() => {
    loadTip();
  }, []);

  return (
    <main className="app-container py-10 space-y-8">
      {/* Hero / resumo do projeto */}
      <section className="app-card p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-3">
            <h1 className="app-main-title text-[#3691E0]">
              Bem-vindo ao MoodTracker
            </h1>
            <p className="app-text-muted max-w-2xl">
              Acompanhe seu humor, energia e carga de trabalho ao longo dos
              dias, identifique sinais de burnout e receba análises geradas
              por Inteligência Artificial para entender melhor seu momento.
            </p>
          </div>

          <div className="text-sm text-right space-y-2">
            <div className="app-pill">
              <span className="mr-1">●</span> Backend ativo em nuvem (Render)
            </div>
            <p className="text-xs text-slate-300">
              API:{" "}
              <code className="text-[#3691E0]">
                /users, /checkins, /risk, /tips, /feedbacks, /config
              </code>
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 pt-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Backend
            </p>
            <p className="text-sm text-slate-200">
              Java + Quarkus, Oracle DB e integração com OpenAI, já
              implantados em ambiente de nuvem.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Análise de Burnout
            </p>
            <p className="text-sm text-slate-200">
              Score de risco de 0.0 a 1.0, com resumo interpretativo em
              linguagem natural gerado por IA.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Foco Acadêmico
            </p>
            <p className="text-sm text-slate-200">
              Projeto Global Solution integrando front-end, back-end, banco de
              dados e IA generativa.
            </p>
          </div>
        </div>
      </section>

      {/* Cards principais do “app” */}
      <section className="grid gap-6 md:grid-cols-3">
        {/* Card 1 – Check-ins diários */}
        <article className="app-card p-5 flex flex-col justify-between">
          <header className="app-card-header">
            <div>
              <h2 className="app-card-title">Check-ins diários</h2>
              <p className="app-card-subtitle">
                Registro de humor, energia e carga de trabalho.
              </p>
            </div>
            <span className="app-pill">/users/&#123;id&#125;/checkins</span>
          </header>

          <ul className="mt-2 space-y-1 text-xs text-slate-300">
            <li>• Registro diário do estado emocional.</li>
            <li>• Filtros por período (from/to).</li>
            <li>• Base para as análises de risco.</li>
          </ul>

          <button className="mt-4 app-primary-btn w-full justify-center">
            Em breve: registrar check-in
          </button>
        </article>

        {/* Card 2 – Análise por IA */}
        <article className="app-card p-5 flex flex-col justify-between">
          <header className="app-card-header">
            <div>
              <h2 className="app-card-title">Análise com IA</h2>
              <p className="app-card-subtitle">
                Score de risco e resumo interpretativo.
              </p>
            </div>
            <span className="app-pill">
              POST /users/checkins/&#123;id&#125;/analysis
            </span>
          </header>

          <ul className="mt-2 space-y-1 text-xs text-slate-300">
            <li>• Envia o check-in para a API da OpenAI.</li>
            <li>• Recebe um score de risco de burnout.</li>
            <li>• Retorna um texto em linguagem natural explicando o risco.</li>
          </ul>

          <button className="mt-4 app-primary-btn w-full justify-center">
            Em breve: analisar um check-in
          </button>
        </article>

        {/* Card 3 – Risco consolidado + dicas */}
        <article className="app-card p-5 flex flex-col justify-between">
          <header className="app-card-header">
            <div>
              <h2 className="app-card-title">Risco & Dicas</h2>
              <p className="app-card-subtitle">
                Visão geral dos últimos dias e sugestões.
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="app-pill">GET /users/&#123;id&#125;/risk</span>
              <span className="app-pill">GET /tips/random</span>
            </div>
          </header>

          <ul className="mt-2 space-y-1 text-xs text-slate-300">
            <li>• Calcula o risco médio dos últimos N dias.</li>
            <li>• Retorna um “badge” de risco para facilitar a leitura.</li>
            <li>• Sugere uma dica de bem-estar aleatória.</li>
          </ul>

          <button className="mt-4 app-primary-btn w-full justify-center">
            Em breve: ver resumo da semana
          </button>
        </article>
      </section>

      {/* Dica real da API */}
      <section className="app-card p-5 md:p-6 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="app-page-title text-[#3691E0] text-lg md:text-xl">
              Dica de bem-estar (ao vivo da API)
            </h2>
            <p className="app-text-muted text-xs md:text-sm">
              Endpoint: <code className="text-[#3691E0]">GET /tips/random</code>
            </p>
          </div>

          <button
            type="button"
            onClick={loadTip}
            className="app-primary-btn text-xs md:text-sm"
            disabled={loadingTip}
          >
            {loadingTip ? "Carregando..." : "Gerar nova dica"}
          </button>
        </div>

        {tipError && <p className="app-error mt-1">{tipError}</p>}

        <div className="mt-2 border border-[#485561] rounded-xl px-4 py-3 bg-[#252C33]/80">
          {loadingTip && !tip && (
            <p className="app-text-muted text-sm">Carregando dica...</p>
          )}

          {!loadingTip && tip && (
            <>
              <h3 className="text-sm font-semibold text-slate-100 mb-1">
                {tip.title ?? "Dica de hoje"}
              </h3>
              <p className="app-text-muted text-sm">
                {tip.description ?? "Aproveite este momento para cuidar de você."}
              </p>
            </>
          )}

          {!loadingTip && !tip && !tipError && (
            <p className="app-text-muted text-sm">
              Nenhuma dica carregada ainda. Clique em “Gerar nova dica”.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
