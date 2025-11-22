// src/pages/AboutPage.tsx
import { useEffect, useState } from "react";
// Ajuste os paths abaixo para as imagens que você tiver no projeto:
import GustaPic from "../assets/images/gusta-picture.png";
import RafaPic from "../assets/images/rafa-picture.png";
import LuccaPic from "../assets/images/lucca-picture.png";

type FAQItem = { q: string; a: string };

type TeamMember = {
  rm: string;
  name: string;
  role: string;
  img: string;
  linkedin: string;
  github: string;
};

const faqs: FAQItem[] = [
  {
    q: "O que é o MoodTracker?",
    a: "O MoodTracker é uma plataforma para monitorar humor, energia e carga de trabalho, ajudando a identificar sinais de burnout e cuidar da saúde mental ao longo do tempo.",
  },
  {
    q: "Como o MoodTracker avalia o risco de burnout?",
    a: "A cada check-in, o usuário registra seu estado emocional e, opcionalmente, envia o dado para análise por IA. A API do MoodTracker usa o modelo GPT da OpenAI para gerar um score de risco e um resumo interpretativo.",
  },
  {
    q: "Preciso preencher check-ins todos os dias?",
    a: "A ideia é que o uso seja frequente, mas o usuário é quem decide a rotina. Quanto mais dados, melhor a análise histórica e o cálculo do risco consolidado dos últimos dias.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Os dados são armazenados em um banco de dados Oracle e expostos via API com boas práticas de backend. O objetivo acadêmico do projeto também contempla responsabilidade no tratamento das informações.",
  },
  {
    q: "O MoodTracker substitui acompanhamento profissional?",
    a: "Não. O MoodTracker é uma ferramenta de apoio à jornada de bem-estar. Ele não substitui psicólogos, psiquiatras ou médicos. Em casos de sofrimento intenso, procure ajuda profissional especializada.",
  },
];

const team: TeamMember[] = [
  {
    rm: "561408",
    name: "Gustavo Crevelari Porto",
    role: "Back-end, Integração com IA e Arquitetura",
    img: GustaPic,
    linkedin: "https://www.linkedin.com/in/gustavocrevelari/",
    github: "https://github.com/GusCrevelari",
  },
  {
    rm: "561671",
    name: "Rafaela Ferreira Santos",
    role: "Pesquisa em Saúde, Experiência do Usuário e Conteúdo",
    img: RafaPic,
    linkedin:
      "https://www.linkedin.com/in/rafaela-ferreira-santos-8470051b7/",
    github: "https://github.com/fsrafaela",
  },
  {
    rm: "561996",
    name: "Lucca de Araujo Gomes",
    role: "Modelagem de Dados, Testes e Suporte ao Back-end",
    img: LuccaPic,
    linkedin: "https://www.linkedin.com/in/luccaagomes02",
    github: "https://github.com/LuArGo",
  },
];

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Contato
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    document.title = "Sobre – MoodTracker";
  }, []);

  const toggleFAQ = (i: number) => {
    setOpenIndex((curr) => (curr === i ? null : i));
  };

  function validateContact() {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Informe seu nome.";
    if (!email.trim()) newErrors.email = "Informe seu email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Email inválido.";
    if (!message.trim()) newErrors.message = "Escreva sua mensagem.";
    return newErrors;
  }

  function handleSubmitContact(e: React.FormEvent) {
    e.preventDefault();
    const v = validateContact();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSubmittedName(name);
    setShowSuccess(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-16">
      {/* Navegação interna da página */}
      <nav className="flex flex-wrap gap-3 text-sm mb-4">
        <a href="#sobre" className="px-3 py-1 rounded-full border hover:bg-slate-100">
          Sobre o projeto
        </a>
        <a href="#faq" className="px-3 py-1 rounded-full border hover:bg-slate-100">
          FAQ
        </a>
        <a href="#contato" className="px-3 py-1 rounded-full border hover:bg-slate-100">
          Contato
        </a>
        <a href="#integrantes" className="px-3 py-1 rounded-full border hover:bg-slate-100">
          Integrantes
        </a>
      </nav>

      {/* SOBRE / MISSÃO */}
      <section id="sobre" className="space-y-8">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)] md:items-center">
          <figure className="order-2 md:order-1 flex justify-center">
          </figure>

          <div className="order-1 md:order-2 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Nossa Missão
            </h1>
            <p className="text-muted-foreground">
              O <strong>MoodTracker</strong> é uma plataforma acadêmica focada em bem-estar
              emocional e prevenção de burnout. Nosso objetivo é tornar o
              acompanhamento do estado mental mais acessível, visual e
              orientado por dados.
            </p>
            <p className="text-muted-foreground">
              Através de check-ins diários de humor, energia e carga de
              trabalho, o MoodTracker ajuda usuários a perceber padrões,
              identificar sinais de alerta e refletir sobre seu dia a dia de
              forma simples e intuitiva.
            </p>
            <p className="text-muted-foreground">
              Com integração à API da OpenAI, cada check-in pode ser analisado
              por Inteligência Artificial, que gera um score estimado de risco
              de burnout e um resumo interpretativo em linguagem natural.
              Assim, o usuário não vê apenas números, mas também uma narrativa
              que o ajuda a compreender melhor seu momento.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <figure className="flex justify-center">
          </figure>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto">
            O projeto foi desenvolvido como parte da Global Solution na FIAP,
            integrando conceitos de <strong>engenharia de software</strong>,{" "}
            <strong>bancos de dados</strong>, <strong>arquitetura em camadas</strong> e{" "}
            <strong>Inteligência Artificial</strong>. Nosso compromisso é
            aproximar tecnologia e saúde mental de forma ética, responsável e
            acolhedora.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Perguntas Frequentes
        </h2>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            const btnId = `faq-q-${i}`;
            const panelId = `faq-panel-${i}`;

            return (
              <div
                key={i}
                className="border rounded-xl overflow-hidden bg-white/60"
              >
                <button
                  id={btnId}
                  className={`w-full text-left px-4 py-3 text-sm md:text-base font-medium flex justify-between items-center ${
                    isOpen ? "bg-slate-100" : ""
                  }`}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleFAQ(i)}
                >
                  <span>{item.q}</span>
                  <span className="ml-4 text-lg">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="px-4 transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    paddingTop: isOpen ? "8px" : "0px",
                    paddingBottom: isOpen ? "12px" : "0px",
                    overflow: "hidden",
                  }}
                >
                  <p className="text-sm md:text-base text-muted-foreground">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl border px-4 py-4 md:px-6 md:py-5 bg-slate-50">
          <h3 className="text-lg font-semibold mb-1">
            Alguma outra pergunta?
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            Será um prazer ouvir seu feedback sobre o MoodTracker e ideias de
            melhoria.
          </p>
          <a href="#contato" className="inline-flex text-sm font-medium underline">
            Ir para o formulário de contato
          </a>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Contato
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          Este formulário tem caráter demonstrativo e acadêmico. Use-o para
          enviar sugestões, relatar bugs ou compartilhar como o tema de
          burnout e saúde mental impacta sua rotina. Os dados não são
          encaminhados para um serviço real de suporte.
        </p>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)] md:items-start">
          <form
            className="space-y-4 border rounded-2xl p-4 md:p-6 bg-white/70 shadow-sm"
            onSubmit={handleSubmitContact}
          >
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-sm font-medium"
              >
                Nome
              </label>
              <input
                id="name"
                type="text"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="message"
                className="text-sm font-medium"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                className="w-full min-h-[100px] rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400 resize-vertical"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {errors.message && (
                <p className="text-xs text-red-600">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              Enviar mensagem
            </button>

            {showSuccess && (
              <p className="mt-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">
                Obrigado {submittedName || "usuário"}! Sua mensagem foi
                registrada para fins demonstrativos no projeto.
              </p>
            )}
          </form>

          <figure className="flex justify-center">
          </figure>
        </div>
      </section>

      {/* INTEGRANTES */}
      <section id="integrantes" className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Integrantes
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          O MoodTracker foi construído por uma equipe multidisciplinar,
          unindo tecnologia, pesquisa em saúde e design de experiência para
          explorar novas formas de cuidado com o bem-estar emocional.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {team.map((person) => (
            <article
              key={person.rm}
              className="border rounded-2xl p-4 bg-white/70 shadow-sm flex flex-col items-center text-center space-y-3"
            >
              <figure className="w-24 h-24 rounded-full overflow-hidden border">
                <img
                  src={person.img}
                  alt={`Foto de ${person.name}`}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="space-y-1">
                <h3 className="text-base font-semibold">{person.name}</h3>
                <p className="text-xs text-muted-foreground">
                  RM: {person.rm}
                </p>
                <p className="text-xs text-muted-foreground">
                  {person.role}
                </p>
              </div>
              <div className="flex gap-3 text-xs">
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                >
                  LinkedIn
                </a>
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                >
                  GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
