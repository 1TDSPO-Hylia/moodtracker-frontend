// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import {
  getRandomTip,
  getUserById,
  getUserCheckins,
  getUserConfig,
  getUserFeedback,
  sendFeedback,
  type Tip,
  type User,
  type Checkin,
  type Config,
  type Feedback,
} from "../lib/api";

const DEMO_USER_ID = 8;



export default function HomePage() {
  // --- estado para DICA ---
  const [tip, setTip] = useState<Tip | null>(null);
  const [loadingTip, setLoadingTip] = useState(false);
  const [tipError, setTipError] = useState<string | null>(null);

  // --- estado para PAINEL DO USUÁRIO 1 ---
  const [user, setUser] = useState<User | null>(null);
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [config, setConfig] = useState<Config | null>(null);
  const [demoError, setDemoError] = useState<string | null>(null);
  const [loadingDemo, setLoadingDemo] = useState(false);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);
const [feedbackError, setFeedbackError] = useState<string | null>(null);


const [rating, setRating] = useState<number | null>(null);
const [comment, setComment] = useState("");
const [sendingFeedback, setSendingFeedback] = useState(false);

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

async function loadDemoUserData() {
  setLoadingDemo(true);
  setDemoError(null);

  let hadError = false;

  // USER
  try {
    const u = await getUserById(DEMO_USER_ID);
    setUser(u);
  } catch (err) {
    console.error("Erro ao carregar usuário demo:", err);
    hadError = true;
  }



  // CHECKINS
  try {
    const cs = await getUserCheckins(DEMO_USER_ID);
    setCheckins(cs);
  } catch (err) {
    console.error("Erro ao carregar check-ins demo:", err);
    hadError = true;
  }

  // CONFIG
  try {
    const cfg = await getUserConfig(DEMO_USER_ID);
    setConfig(cfg);
  } catch (err) {
    console.error("Erro ao carregar config demo:", err);
    hadError = true;
  }

  if (hadError) {
    setDemoError(
      "Alguns dados de demonstração não puderam ser carregados, mas o painel exibe o que foi obtido com sucesso."
    );
  }

  setLoadingDemo(false);
}


  useEffect(() => {
  loadTip();
  loadDemoUserData();
  loadFeedbacks();
}, []);

  // helper pra formatar data de check-in
  function formatDate(dateStr: string | undefined) {
    if (!dateStr) return "-";
    // tenta lidar tanto com ISO quanto com '2024-11-21T00:00:00' etc.
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("pt-BR");
  }

  async function loadFeedbacks() {
  try {
    setLoadingFeedbacks(true);
    setFeedbackError(null);
    const list = await getUserFeedback(DEMO_USER_ID);
    setFeedbacks(list);
  } catch (err) {
    console.error("Erro ao carregar feedbacks:", err);
    setFeedbackError("Não foi possível carregar os feedbacks deste usuário.");
  } finally {
    setLoadingFeedbacks(false);
  }
}

async function handleSubmitFeedback(e: React.FormEvent) {
  e.preventDefault();
  if (rating == null) {
    setFeedbackError("Escolha uma nota de 1 a 5 antes de enviar.");
    return;
  }
  if (!comment.trim()) {
    setFeedbackError("Escreva um comentário antes de enviar.");
    return;
  }

  try {
    setSendingFeedback(true);
    setFeedbackError(null);

    await sendFeedback({
  usuarioId: DEMO_USER_ID,
  avaliacao: rating,
  comentario: comment.trim(),
});

    setComment("");
    setRating(null);

    // recarrega a lista depois de enviar
    await loadFeedbacks();
  } catch (err) {
    console.error("Erro ao enviar feedback:", err);
    setFeedbackError("Não foi possível enviar o feedback agora.");
  } finally {
    setSendingFeedback(false);
  }
}

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
              <h2 className="app-card-title
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
              Dica de bem-estar
            </h2>
            <p className="app-text-muted text-xs md:text-sm">
              
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
                {/* usando campos em pt-BR, como vem do backend */}
                { (tip as any).titulo ?? "Dica de hoje" }
              </h3>
              <p className="app-text-muted text-sm">
                { (tip as any).descricao ?? "Aproveite este momento para cuidar de você." }
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

      <section className="app-card p-5 md:p-6 space-y-4">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="app-page-title text-lg md:text-xl text-[#3691E0]">
              Painel de Demonstração – Usuário 1
            </h2>
            <p className="app-text-muted text-xs md:text-sm">
              Integração real com os endpoints de usuários, check-ins, risco e
              configurações.
            </p>
          </div>

          <button
            type="button"
            onClick={loadDemoUserData}
            className="app-primary-btn text-xs md:text-sm"
            disabled={loadingDemo}
          >
            {loadingDemo ? "Atualizando..." : "Recarregar dados"}
          </button>
        </header>

        {demoError && <p className="app-error">{demoError}</p>}

        <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)]">
          <div className="space-y-3">
            <div className="border border-[#485561] rounded-xl p-3 bg-[#252C33]/80 space-y-1">
              <p className="text-xs text-slate-400 mb-1">
                GET /users/{DEMO_USER_ID}
              </p>
              {user ? (
                <>
                  <p className="text-sm font-semibold text-slate-100">
                    { (user as any).nome ?? (user as any).name ?? "Usuário 1" }
                  </p>
                  <p className="text-xs text-slate-300">
                    {(user as any).email}
                  </p>
                </>
              ) : (
                <p className="app-text-muted text-xs">
                  Carregando dados do usuário...
                </p>
              )}
            </div>

            {/* Card check-ins */}
            <div className="border border-[#485561] rounded-xl p-3 bg-[#252C33]/80">
              <p className="text-xs text-slate-400 mb-2">
                GET /users/{DEMO_USER_ID}/checkins
              </p>

              {checkins.length === 0 ? (
                <p className="app-text-muted text-xs">
                  Nenhum check-in encontrado para o usuário de demonstração.
                </p>
              ) : (
                <div className="space-y-2 max-h-56 overflow-auto pr-1">
                  {checkins.slice(0, 5).map((c) => (
                    <div
                      key={c.id}
                      className="text-xs border border-[#485561] rounded-lg px-2 py-1 flex justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <p className="text-slate-100">
                          {formatDate((c as any).dataCheckin)}
                        </p>
                        <p className="text-slate-300">
                          Humor: {(c as any).humor} • Energia:{" "}
                          {(c as any).energia} • Carga:{" "}
                          {(c as any).cargaTrabalho}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Coluna direita: risco + config */}
          <div className="space-y-3">


            {/* Card configurações */}
            <div className="border border-[#485561] rounded-xl p-3 bg-[#252C33]/80 space-y-1">
              <p className="text-xs text-slate-400 mb-1">
                GET /config/users/{DEMO_USER_ID}
              </p>
              {config ? (
                <>
                  <p className="text-sm font-semibold text-slate-100">
                    Tema: {(config as any).tema}
                  </p>
                  <p className="app-text-muted text-xs">
                    Notificações:{" "}
                    {(config as any).notificacaoAtiva === true ||
                    (config as any).notificacaoAtiva === 1
                      ? "Ativadas"
                      : "Desativadas"}
                  </p>
                  <p className="app-text-muted text-xs">
                    Horário limite:{" "}
                    {(config as any).horarioLimite ?? "não definido"}
                  </p>
                  <p className="app-text-muted text-xs">
                    Fuso horário:{" "}
                    {(config as any).fusoHorario ?? "não definido"}
                  </p>
                </>
              ) : (
                <p className="app-text-muted text-xs">
                  Carregando configurações do usuário...
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="app-text-muted text-[11px] mt-1">
          Nesta seção, o front-end consome diretamente os endpoints da API
          MoodTracker, utilizando um usuário de demonstração (ID {DEMO_USER_ID}){" "}
          para evidenciar a integração com banco Oracle e regras de negócio do
          backend Java + Quarkus.
        </p>
      </section>

      {/* FEEDBACKS DO USUÁRIO DEMO */}
<section className="app-card p-5 md:p-6 space-y-4">
  <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
    <div>
      <h2 className="app-page-title text-lg md:text-xl text-[#3691E0]">
        Feedbacks do Usuário {DEMO_USER_ID}
      </h2>
      <p className="app-text-muted text-xs md:text-sm">
        Integração com os endpoints GET /feedbacks/users/{DEMO_USER_ID} e
        POST /feedbacks.
      </p>
    </div>
    <button
      type="button"
      onClick={loadFeedbacks}
      className="app-primary-btn text-xs md:text-sm"
      disabled={loadingFeedbacks}
    >
      {loadingFeedbacks ? "Atualizando..." : "Recarregar feedbacks"}
    </button>
  </header>

  {feedbackError && <p className="app-error">{feedbackError}</p>}

  <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)]">
    {/* Lista de feedbacks */}
    <div className="border border-[#485561] rounded-xl p-3 bg-[#252C33]/80">
      <p className="text-xs text-slate-400 mb-2">
        GET /feedbacks/users/{DEMO_USER_ID}
      </p>

      {loadingFeedbacks && feedbacks.length === 0 ? (
        <p className="app-text-muted text-xs">Carregando feedbacks...</p>
      ) : feedbacks.length === 0 ? (
        <p className="app-text-muted text-xs">
          Nenhum feedback registrado ainda para este usuário.
        </p>
      ) : (
        <div className="space-y-2 max-h-56 overflow-auto pr-1">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="text-xs border border-[#485561] rounded-lg px-2 py-1"
            >
              <p className="text-slate-100">
  Nota:{" "}
  <span className="font-semibold">
    {(fb as any).avaliacao ??
     (fb as any).rating ??
     (fb as any).nota ??
     "–"}
  </span>
</p>
<p className="text-slate-300 mt-0.5">
  {(fb as any).comentario ??
   (fb as any).comment ??
   ""}
</p>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Formulário de novo feedback */}
    <form
      onSubmit={handleSubmitFeedback}
      className="border border-[#485561] rounded-xl p-3 bg-[#252C33]/80 space-y-3"
    >
      <p className="text-xs text-slate-400 mb-1">
        POST /feedbacks
      </p>

      <div className="space-y-1">
        <label className="text-xs text-slate-200">
          Nota (1 a 5)
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={`px-2 py-1 rounded-md text-xs border ${
                rating === n
                  ? "bg-[#3691E0] border-[#3691E0] text-white"
                  : "bg-transparent border-[#485561] text-slate-200 hover:bg-[#485561]"
              }`}
              onClick={() => setRating(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-slate-200">
          Comentário
        </label>
        <textarea
          className="w-full min-h-[70px] rounded-md border border-[#485561] bg-[#252C33] px-3 py-2 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-[#3691E0] resize-vertical"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="app-primary-btn text-xs md:text-sm w-full justify-center"
        disabled={sendingFeedback}
      >
        {sendingFeedback ? "Enviando..." : "Enviar feedback"}
      </button>
    </form>
  </div>
</section>
    </main>
  );
}
