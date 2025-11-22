// src/pages/HomePage.tsx
export default function HomePage() {
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
              API: <code className="text-[#3691E0]">/users, /checkins, /risk, /tips</code>
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

      {/* Como a interface será evoluída */}
      <section className="app-card p-5 md:p-6 space-y-3">
        <h2 className="app-page-title text-[#3691E0]">
          Como esta tela vai evoluir
        </h2>
        <p className="app-text-muted max-w-3xl">
          Nesta primeira versão, a Home apresenta os principais recursos
          disponíveis no backend MoodTracker. Em versões seguintes, estes
          cards serão conectados diretamente à API, exibindo check-ins reais,
          score de risco, gráficos e dicas em tempo real.
        </p>
        <p className="app-text-muted text-xs">
          Toda a comunicação será feita via HTTP com o backend Java + Quarkus
          hospedado no Render, utilizando o endereço configurado em{" "}
          <code className="text-[#3691E0]">VITE_API_BASE_URL</code>.
        </p>
      </section>
    </main>
  );
}
