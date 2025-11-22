export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <span>MoodTracker &copy; {new Date().getFullYear()}</span>
        <span>FIAP – Global Solution</span>
      </div>
    </footer>
  );
}
