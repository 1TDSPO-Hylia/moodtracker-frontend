// src/pages/AboutPage.tsx
import { useEffect, useState } from "react";
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

  function handleSubmitContact(e: React.FormEvent<HTMLFormElement>) {
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
        <a href="#sobre" className="app-chip">
          Sobre o projeto
        </a>
        <a href="#faq" className="app-chip">
          FAQ
        </a>
        <a href="#contato" className="app-chip">
          Contato
        </a>
        <a href="#integrantes" className="app-chip">
          Integrantes
        </a>
      </nav>

      {/* SOBRE / MISSÃO */}
      <section id="sobre" className="space-y-8">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)] md:items-center">

          <div className="order-1 md:order-2 space-y-4">
            <h1 className="app-main-title">Nossa Missão</h1>
            <p className="app-text-muted">
              O <strong>MoodTracker</strong> é uma plataforma acadêmica focada em
              bem-estar emocional e prevenção de burnout. Nosso objetivo é
              tornar o acompanhamento do estado mental mais acessível, visual e
              orientado por dados.
            </p>
            <p className="app-text-muted">
              Através de check-ins diários de humor, energia e carga de
              trabalho, o MoodTracker ajuda usuários a perceber padrões,
              identificar sinais de alerta e refletir sobre seu dia a dia de
              forma simples e intuitiva.
            </p>
            <p className="app-text-muted">
              Com integração à API da OpenAI, cada check-in pode ser analisado
              por Inteligência Artificial, que gera um score estimado de risco
              de burnout e um resumo interpretativo em linguagem natural.
              Assim, o usuário não vê apenas números, mas também uma narrativa
              que o ajuda a compreender melhor seu momento.
            </p>
          </div>
        </div>

        <div className="space-y-4">

          <p className="app-text-muted text-center max-w-3xl mx-auto">
            O projeto foi desenvolvido como parte da Global Solution na FIAP,
            integrando conceitos de <strong>engenharia de software</strong>,{" "}
            <strong>bancos de dados</strong>,{" "}
            <strong>arquitetura em camadas</strong> e{" "}
            <strong>Inteligência Artificial</strong>. Nosso compromisso é
            aproximar tecnologia e saúde mental de forma ética, responsável e
            acolhedora.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="space-y-6">
        <h2 className="app-page-title">Perguntas Frequentes</h2>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            const btnId = `faq-q-${i}`;
            const panelId = `faq-panel-${i}`;

            return (
              <div key={i} className="app-faq-item">
                <button
                  id={btnId}
                  className={`app-faq-question ${
                    isOpen ? "app-faq-question-open" : ""
                  }`}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleFAQ(i)}
                >
                  <span>{item.q}</span>
                  <span className="ml-4 text-lg">{isOpen ? "−" : "+"}</span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="app-faq-answer transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    paddingTop: isOpen ? "8px" : "0px",
                    paddingBottom: isOpen ? "12px" : "0px",
                    overflow: "hidden",
                  }}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        
      </section>

      {/* CONTATO */}
      <section id="contato" className="space-y-6">
        <h2 className="app-page-title">Contato</h2>
        <p className="app-text-muted max-w-2xl">
          Este formulário tem caráter demonstrativo e acadêmico. Use-o para
          enviar sugestões, relatar bugs ou compartilhar como o tema de burnout
          e saúde mental impacta sua rotina. Os dados não são encaminhados para
          um serviço real de suporte.
        </p>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)] md:items-start">
          <form className="app-form-card" onSubmit={handleSubmitContact}>
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">
                Nome
              </label>
              <input
                id="name"
                type="text"
                className="app-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="app-error">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="app-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="app-error">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="text-sm font-medium">
                Mensagem
              </label>
              <textarea
                id="message"
                className="app-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {errors.message && (
                <p className="app-error">{errors.message}</p>
              )}
            </div>

            <button type="submit" className="app-primary-btn">
              Enviar mensagem
            </button>

            {showSuccess && (
              <p className="app-success">
                Obrigado {submittedName || "usuário"}! Sua mensagem foi
                registrada para fins demonstrativos no projeto.
              </p>
            )}
          </form>


        </div>
      </section>

      {/* INTEGRANTES */}
      <section id="integrantes" className="space-y-6">
        <h2 className="app-page-title">Integrantes</h2>
        <p className="app-text-muted max-w-2xl">
          O MoodTracker foi construído por uma equipe multidisciplinar, unindo
          tecnologia, pesquisa em saúde e design de experiência para explorar
          novas formas de cuidado com o bem-estar emocional.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {team.map((person) => (
            <article key={person.rm} className="app-member-card">
              <figure className="app-member-avatar">
                <img
                  src={person.img}
                  alt={`Foto de ${person.name}`}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="space-y-1">
                <h3 className="text-base font-semibold">{person.name}</h3>
                <p className="text-xs app-text-muted">RM: {person.rm}</p>
                <p className="text-xs app-text-muted">{person.role}</p>
              </div>
              <div className="app-member-links">
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#3691E0] hover:text-[#4A84B6]"
                >
                  LinkedIn
                </a>
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#3691E0] hover:text-[#4A84B6]"
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
