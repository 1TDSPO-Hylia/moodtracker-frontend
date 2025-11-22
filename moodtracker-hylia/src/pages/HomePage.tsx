export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          MoodTracker
        </h1>
        <p className="max-w-xl mx-auto text-muted-foreground">
          Monitoramento de humor, risco de burnout e insights inteligentes
          em tempo real. Aqui vai ficar o “app” principal (check-ins, gráficos, etc).
        </p>
      </div>
    </main>
  );
}
