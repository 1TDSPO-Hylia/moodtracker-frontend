export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-4rem-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl app-card p-8 space-y-4">
        <h1 className="app-title">MoodTracker</h1>
        <p className="app-text-muted">
          Monitoramento de humor, energia e carga de trabalho para identificar
          sinais de burnout e apoiar sua jornada de bem-estar mental.
        </p>
        <p className="app-text-muted">
          Esta é a tela principal onde futuramente você poderá registrar
          check-ins, visualizar análises de risco geradas por IA e acompanhar
          a evolução do seu estado emocional ao longo do tempo.
        </p>

        <div className="pt-2">
          <button className="app-primary-btn">
            Em breve: começar check-in
          </button>
        </div>
      </div>
    </main>
  );
}
