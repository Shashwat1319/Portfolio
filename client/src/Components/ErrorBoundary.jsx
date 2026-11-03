import { Component } from "react"
import { Link } from "react-router-dom"

/**
 * Must render INSIDE <Router> — the fallback offers a router link home
 * (App's RouterBoundary remounts this boundary on route change, so the
 * link actually clears the error) alongside a hard reload.
 */
class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled UI error:", error, errorInfo.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-slate-950 text-slate-50">
          <h1 className="text-6xl font-black text-gradient mb-4">Oops</h1>
          <p className="text-lg text-slate-400 mb-8 max-w-md">
            Something went wrong while rendering this page. Reloading usually fixes it.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Back to Home
            </Link>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold backdrop-blur-md hover:bg-white/10 transition-all cursor-pointer"
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
