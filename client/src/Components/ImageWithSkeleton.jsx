import { useState } from "react"
import { motion } from "framer-motion"

function ImageWithSkeleton({ src, alt, className = "" }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-slate-800/50 animate-pulse rounded-xl" />
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/30 rounded-xl text-slate-500">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : undefined}
          transition={{ duration: 0.4 }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          loading="lazy"
          className={`w-full h-full object-cover ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  )
}

export default ImageWithSkeleton
