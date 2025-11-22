export default function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-muted-foreground flex justify-between">
        <span>MoodTracker &copy; {new Date().getFullYear()}</span>
        <span>FIAP – Global Solution</span>
      </div>
    </footer>
  );
}
