// src/pages/HomePage.tsx
import { useEffect, useState, type FormEvent } from "react";
import {
  getRandomTip,
  getUserById,
  createUser,
  getUserCheckins,
  getUserConfig,
  getUserFeedback,
  sendFeedback,
  createCheckin,
  analyzeCheckin,
  type Tip,
  type User,
  type Checkin,
  type Config,
  type Feedback,
  type AnalysisResult,
} from "../lib/api";

const DEMO_USER_ID = 8;

export default function HomePage() {

   // --- ANÁLISE DE IA DO ÚLTIMO CHECK-IN ---
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  // --- DICA ---
  const [tip, setTip] = useState<Tip | null>(null);
  const [loadingTip, setLoadingTip] = useState(false);
  const [tipError, setTipError] = useState<string | null>(null);

  // --- PAINEL DEMO (usuário) ---
  const [user, setUser] = useState<User | null>(null);
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [config, setConfig] = useState<Config | null>(null);
  const [demoError, setDemoError] = useState<string | null>(null);
  const [loadingDemo, setLoadingDemo] = useState(false);

  // --- FEEDBACKS ---
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  // --- CADASTRO ---
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);

  // formulário de novo feedback
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [sendingFeedback, setSendingFeedback] = useState(false);

   // --- CHECK-IN (para qualquer usuário, default 10) ---
  const [checkinUserId, setCheckinUserId] = useState<number | "">(10);
  const [ciHumor, setCiHumor] = useState(3);
  const [ciEnergia, setCiEnergia] = useState(3);
  const [ciCarga, setCiCarga] = useState(3);
  const [ciObs, setCiObs] = useState("");
  const [ciLoading, setCiLoading] = useState(false);
  const [ciError, setCiError] = useState<string | null>(null);
  const [ciSuccess, setCiSuccess] = useState<string | null>(null);
  const [lastCheckin, setLastCheckin] = useState<Checkin | null>(null);

  // --- FUNÇÕES ---

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

  async function handleSubmitFeedback(e: FormEvent) {
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
      await loadFeedbacks();
    } catch (err) {
      console.error("Erro ao enviar feedback:", err);
      setFeedbackError("Não foi possível enviar o feedback agora.");
    } finally {
      setSendingFeedback(false);
    }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setRegError(null);
    setRegSuccess(null);

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError("Preencha nome, email e senha.");
      return;
    }

    try {
      setRegLoading(true);
      const created = await createUser({
        nome: regName.trim(),
        email: regEmail.trim(),
        senha: regPassword.trim(),
      });

      const id =
        (created as any).idUsuario ??
        (created as any).id ??
        "desconhecido";

      setRegSuccess(
        `Usuário criado com sucesso (ID: ${id}). Você já pode usar esse usuário na API para check-ins, análises e feedbacks.`
      );
      setRegName("");
      setRegEmail("");
      setRegPassword("");
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
      setRegError("Não foi possível cadastrar o usuário agora.");
    } finally {
      setRegLoading(false);
    }
  }

  useEffect(() => {
    loadTip();
    loadDemoUserData();
    loadFeedbacks();
  }, []);

  // helper para data de check-in
  function formatDate(dateStr: string | undefined) {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("pt-BR");
  }

    async function handleCreateCheckin(e: FormEvent) {
    e.preventDefault();
    setCiError(null);
    setCiSuccess(null);
    setLastCheckin(null);

    if (checkinUserId === "" || Number.isNaN(Number(checkinUserId))) {
      setCiError("Informe um ID de usuário válido (por exemplo, 10).");
      return;
    }

    try {
      setCiLoading(true);

      const created = await createCheckin(Number(checkinUserId), {
        humor: ciHumor,
        energia: ciEnergia,
        cargaTrabalho: ciCarga,
        observacao: ciObs.trim() || undefined,
      });

      setLastCheckin(created);
      const id =
        (created as any).idCheckin ??
        (created as any).id ??
        "desconhecido";

      setCiSuccess(
        `Check-in criado com sucesso (ID do check-in: ${id}). Esse registro já pode ser analisado pela IA via POST /users/checkins/{id}/analysis.`
      );

      
      setCiObs("");
     } catch (err: any) {
  console.error("Erro ao criar check-in:", err);

  const raw =
    err?.message ||
    err?.detail ||
    err?.error ||
    "Não foi possível criar o check-in agora.";

  if (raw.includes("checkin already exists for day")) {
    setCiError(
      "Já existe um check-in registrado hoje para este usuário. " +
      "Use outro usuário ou aguarde o próximo dia para registrar novamente."
    );
  } else {
    setCiError(raw);
  }
} finally {
  setCiLoading(false);
}
  }

    function extractScore(a: any): number | null {
    const raw =
      a?.score ??
      a?.scoreRisco ??
      a?.risco ??
      null;
    return typeof raw === "number" ? raw : null;
  }

  function getBadge(score: number | null): { label: string; color: string } {
    if (score == null) return { label: "Indefinido", color: "bg-slate-500" };
    if (score < 0.33) return { label: "Baixo", color: "bg-emerald-600" };
    if (score < 0.66) return { label: "Moderado", color: "bg-amber-500" };
    return { label: "Alto", color: "bg-red-600" };
  }

  async function handleAnalyzeLastCheckin() {
    setAnalysisError(null);
    setAnalysis(null);

    const checkinId =
      (lastCheckin as any)?.idCheckin ??
      (lastCheckin as any)?.id ??
      null;

    if (!checkinId) {
      setAnalysisError(
        "Nenhum check-in recente encontrado para analisar. Crie um check-in primeiro."
      );
      return;
    }

    try {
      setAnalysisLoading(true);
      const result = await analyzeCheckin(checkinId);
      setAnalysis(result);
    } catch (err) {
      console.error("Erro ao analisar check-in com IA:", err);
      setAnalysisError("Não foi possível analisar este check-in agora.");
    } finally {
      setAnalysisLoading(false);
    }
  }

  // --- JSX ---
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

      {/* Cadastro rápido de usuário */}
      <section className="app-card p-5 md:p-6 space-y-4">
       <header>
          <h2 className="app-page-title text-lg md:text-xl text-[#3691E0]">
            Comece agora – Cadastro de Usuário
          </h2>
          <p className="app-text-muted text-xs md:text-sm mt-1 max-w-2xl">
            Este formulário cria um novo usuário na API MoodTracker via{" "}
            <code className="text-[#3691E0]">POST /users</code>. Ele pode ser
            usado depois para registrar check-ins, chamar a análise por IA e
            enviar feedbacks.
          </p>
        </header>
      <form
          onSubmit={handleRegister}
          className="grid gap-3 md:grid-cols-[minmax(0,1.2fr),minmax(0,0.8fr)] md:items-end"
        >
          <div className="space-y-2">
            <div className="grid gap-2 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-slate-200">Nome</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-[#485561] bg-[#252C33] px-3 py-2 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-[#3691E0]"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-200">Email</label>
                <input
                  type="email"
                  className="w-full rounded-md border border-[#485561] bg-[#252C33] px-3 py-2 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-[#3691E0]"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1 md:max-w-xs">
              <label className="text-xs text-slate-200">Senha</label>
              <input
                type="password"
                className="w-full rounded-md border border-[#485561] bg-[#252C33] px-3 py-2 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-[#3691E0]"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
              <p className="app-text-muted text-[11px] mt-1">
                A senha é usada apenas para fins acadêmicos nesta demo.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="app-primary-btn text-xs md:text-sm w-full justify-center"
              disabled={regLoading}
            >
              {regLoading ? "Cadastrando..." : "Criar usuário na API"}
            </button>

            {regError && <p className="app-error text-xs">{regError}</p>}
            {regSuccess && (
              <p className="text-[11px] text-emerald-300">{regSuccess}</p>
            )}
          </div>
        </form>

       

        <header>
          <h2 className="app-page-title text-lg md:text-xl text-[#3691E0]">
            MoodTracker na prática – Registrar check-in
          </h2>
          <p className="app-text-muted text-xs md:text-sm mt-1 max-w-2xl">
            Aqui o front-end consome o endpoint{" "}
            <code className="text-[#3691E0]">
              POST /users/&#123;userId&#125;/checkins
            </code>{" "}
            para registrar humor, energia e carga de trabalho de um usuário
            real da API (por exemplo, o ID que você acabou de criar no
            cadastro acima).
          </p>
        </header>

        <form
          onSubmit={handleCreateCheckin}
          className="space-y-4"
        >
          <div className="grid gap-3 md:grid-cols-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-200">
                ID do usuário
              </label>
              <input
                type="number"
                className="w-full rounded-md border border-[#485561] bg-[#252C33] px-3 py-2 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-[#3691E0]"
                value={checkinUserId}
                onChange={(e) =>
                  setCheckinUserId(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
              <p className="app-text-muted text-[11px] mt-1">
                Ex.: <span className="font-semibold">10</span> (usuário criado
                agora há pouco).
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-200">Humor (1–5)</label>
              <input
                type="number"
                min={1}
                max={5}
                className="w-full rounded-md border border-[#485561] bg-[#252C33] px-3 py-2 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-[#3691E0]"
                value={ciHumor}
                onChange={(e) => setCiHumor(Number(e.target.value) || 1)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-200">Energia (1–5)</label>
              <input
                type="number"
                min={1}
                max={5}
                className="w-full rounded-md border border-[#485561] bg-[#252C33] px-3 py-2 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-[#3691E0]"
                value={ciEnergia}
                onChange={(e) => setCiEnergia(Number(e.target.value) || 1)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-200">
                Carga de trabalho (1–5)
              </label>
              <input
                type="number"
                min={1}
                max={5}
                className="w-full rounded-md border border-[#485561] bg-[#252C33] px-3 py-2 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-[#3691E0]"
                value={ciCarga}
                onChange={(e) => setCiCarga(Number(e.target.value) || 1)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-200">Observação (opcional)</label>
            <textarea
              className="w-full min-h-[70px] rounded-md border border-[#485561] bg-[#252C33] px-3 py-2 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-[#3691E0] resize-y"
              value={ciObs}
              onChange={(e) => setCiObs(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <button
              type="submit"
              className="app-primary-btn text-xs md:text-sm w-full md:w-auto justify-center"
              disabled={ciLoading}
            >
              {ciLoading ? "Registrando..." : "Registrar check-in na API"}
            </button>

            <div className="text-xs">
              {ciError && <p className="app-error">{ciError}</p>}
              {ciSuccess && (
                <p className="text-[11px] text-emerald-300">{ciSuccess}</p>
              )}
            </div>
          </div>

             {lastCheckin && (
            <div className="mt-2 border border-[#485561] rounded-xl p-3 bg-[#252C33]/80 text-xs text-slate-200 space-y-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    Último check-in criado (ID usuário:{" "}
                    {(lastCheckin as any).idUsuario ?? checkinUserId}
                    ):
                  </p>
                  <p>
                    Data: {formatDate((lastCheckin as any).dataCheckin)}
                  </p>
                  <p>
                    Humor: {(lastCheckin as any).humor} • Energia:{" "}
                    {(lastCheckin as any).energia} • Carga:{" "}
                    {(lastCheckin as any).cargaTrabalho}
                  </p>
                  {((lastCheckin as any).observacao || ciObs) && (
                    <p>
                      Observação:{" "}
                      {(lastCheckin as any).observacao ?? ciObs}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAnalyzeLastCheckin}
                  className="app-primary-btn text-[11px] md:text-xs justify-center"
                  disabled={analysisLoading}
                >
                  {analysisLoading
                    ? "Analisando com IA..."
                    : "Analisar este check-in com IA"}
                </button>
              </div>

              {analysisError && (
                <p className="app-error mt-1">{analysisError}</p>
              )}

              {analysis && (
                <div className="mt-2 border border-[#485561] rounded-lg p-2 bg-[#252C33] space-y-1">
                  {(() => {
                    const score = extractScore(analysis);
                    const { label, color } = getBadge(score);
                    return (
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${color} text-white`}
                          >
                            Risco {label}
                          </span>
                          {score != null && (
                            <span className="text-[11px] text-slate-300">
                              Score: {score.toFixed(2)}
                            </span>
                          )}
                        </div>
                        {analysis.createdAt && (
                          <span className="text-[10px] text-slate-400">
                            Analisado em:{" "}
                            {formatDate(analysis.createdAt as any)}
                          </span>
                        )}
                      </div>
                    );
                  })()}

                  <p className="mt-1 text-[11px] text-slate-200">
                    {(analysis as any).resumo ??
                      (analysis as any).summary ??
                      "Análise gerada pela IA para este check-in."}
                  </p>
                </div>
              )}
            </div>
          )}
        </form>

        
      </section>

      {/* Dica real da API */}
      <section className="app-card p-5 md:p-6 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="app-page-title text-[#3691E0] text-lg md:text-xl">
              Dica de bem-estar
            </h2>
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
                {(tip as any).titulo ?? "Dica de hoje"}
              </h3>
              <p className="app-text-muted text-sm">
                {(tip as any).descricao ??
                  "Aproveite este momento para cuidar de você."}
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

      {/* Painel de demonstração do usuário */}
      <section className="app-card p-5 md:p-6 space-y-4">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="app-page-title text-lg md:text-xl text-[#3691E0]">
              Painel de Demonstração – Usuário {DEMO_USER_ID}
            </h2>
            <p className="app-text-muted text-xs md:text-sm">
              Integração real com os endpoints de usuários, check-ins e
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
          {/* Coluna esquerda: usuário + check-ins */}
          <div className="space-y-3">
            {/* Card usuário */}
            <div className="border border-[#485561] rounded-xl p-3 bg-[#252C33]/80 space-y-1">
              <p className="text-xs text-slate-400 mb-1">
                GET /users/{DEMO_USER_ID}
              </p>
              {user ? (
                <>
                  <p className="text-sm font-semibold text-slate-100">
                    {(user as any).nome ??
                      (user as any).name ??
                      `Usuário ${DEMO_USER_ID}`}
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

          {/* Coluna direita: config */}
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
                      {(fb as any).comentario ?? (fb as any).comment ?? ""}
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
            <p className="text-xs text-slate-400 mb-1">POST /feedbacks</p>

            <div className="space-y-1">
              <label className="text-xs text-slate-200">Nota (1 a 5)</label>
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
              <label className="text-xs text-slate-200">Comentário</label>
              <textarea
                className="w-full min-h-[70px] rounded-md border border-[#485561] bg-[#252C33] px-3 py-2 text-xs text-slate-100 outline-none focus:ring-2 focus:ring-[#3691E0] resize-y"
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
