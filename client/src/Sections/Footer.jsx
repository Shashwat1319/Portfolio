function Footer() {
  return (
    <footer className="bg-slate-950 py-12 border-t border-white/5 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} <span className="text-white font-medium">Shashwat Srivastava</span>. 
          Built with passion using MERN.
        </p>
      </div>
    </footer>
  )
}

export default Footer
