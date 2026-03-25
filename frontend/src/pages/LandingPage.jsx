// import { Link } from 'react-router-dom'

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
//       {/* Background Glows */}
//       <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-[120px]" />
//       <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

//       <div className="relative z-10 text-center max-w-3xl">
//         <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-electric-500/30 bg-electric-500/5 text-electric-400 text-xs font-mono tracking-widest uppercase">
//           Now in Private Beta
//         </div>
//         <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight mb-6">
//           Interviewing <br />
//           <span className="text-electric-500">Reimagined.</span>
//         </h1>
//         <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
//           The AI-powered assistant that handles your scheduling, 
//           prep, and feedback in one seamless workflow.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link 
//             to="/login" 
//             className="px-8 py-4 bg-electric-500 hover:bg-electric-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-electric-500/20 active:scale-95"
//           >
//             Get Started Free
//           </Link>
//           <button className="px-8 py-4 bg-navy-900 border border-navy-700 text-white font-bold rounded-2xl hover:bg-navy-800 transition-all active:scale-95">
//             Watch Demo
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }






import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    /* Using [#0a0a23] for your Navy-950 and [relative] to ensure children stay on top */
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Glows - Using arbitrary values for the blur and color */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff] text-sm font-medium">
          NOW IN PRIVATE BETA
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
          Interviewing <br />
          <span className="text-[#00f2ff]">Reimagined.</span>
        </h1>

        <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
          The AI-powered assistant that handles your scheduling, 
          prep, and feedback in one seamless workflow.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-4 bg-[#00f2ff] hover:bg-[#00d8e4] text-[#020617] font-bold rounded-2xl transition-all shadow-lg shadow-[#00f2ff]/20"
          >
            Get Started Free
          </Link>
          
          <button className="px-8 py-4 bg-slate-900 border border-slate-800 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all">
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  )
}