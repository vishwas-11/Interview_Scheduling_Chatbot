// import React from 'react';
// import LineWaves from '../components/layout/LineWaves'; 
// import Navbar from '../components/layout/Navbar';

// export default function LandingPage() {
//   return (
//     <div className="relative w-full h-screen overflow-hidden bg-[#050505]">
      
//       {/* 1. The Shader Background */}
//       <div className="absolute inset-0 z-0">
//         <LineWaves 
//           speed={0.25}
//           innerLineCount={35}
//           outerLineCount={40}
//           warpIntensity={1.0}
//           rotation={-45}
//           color1="#6366f1" // Indigo
//           color2="#a855f7" // Purple
//           color3="#ec4899" // Pink
//           brightness={0.2}
//           enableMouseInteraction={true}
//           mouseInfluence={2.0}
//         />
//       </div>

//       {/* 2. Overlays */}
//       <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none" />

//       {/* 3. Navbar (Styled below) */}
//       <Navbar />

//       {/* 4. Content Layer */}
//       <main className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center pointer-events-none">
//         {/* Badge */}
//         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8 backdrop-blur-sm pointer-events-auto">
//           <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
//           AI-Driven Coordination
//         </div>

//         <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 text-white drop-shadow-2xl">
//           Hire at the speed <br/>
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
//             of intelligence.
//           </span>
//         </h1>
        
//         <p className="max-w-2xl text-lg md:text-xl text-gray-400 mb-10 drop-shadow-md leading-relaxed">
//           The autonomous scheduling engine that syncs calendars, screens candidates, 
//           and books interviews without a single back-and-forth email.
//         </p>
        
//         <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
//           <button 
//             onClick={() => window.location.href = '/login'}
//             className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 hover:scale-105 transition-all shadow-lg shadow-indigo-500/20"
//           >
//             Get Started Free
//           </button>
//           <button className="px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-md">
//             View Demo
//           </button>
//         </div>
//       </main>

//       {/* Bottom Gradient Fade */}
//       <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
//     </div>
//   );
// }








import React from 'react';
import LineWaves from '../components/layout/LineWaves'; 
import Navbar from '../components/layout/Navbar';

export default function LandingPage() {
  const handleAuthRedirect = () => {
    window.location.href = '/login';
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050505]">
      
      {/* 1. The Shader Background */}
      <div className="absolute inset-0 z-0">
        <LineWaves 
          speed={0.25}
          innerLineCount={35}
          outerLineCount={40}
          warpIntensity={1.0}
          rotation={-45}
          color1="#6366f1" 
          color2="#a855f7" 
          color3="#ec4899" 
          brightness={0.2}
          enableMouseInteraction={true}
          mouseInfluence={2.0}
        />
      </div>

      {/* 2. Overlays */}
      <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none" />

      {/* 3. Navbar */}
      <Navbar />

      {/* 4. Content Layer */}
      <main className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8 backdrop-blur-sm pointer-events-auto">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          AI-Powered Scheduling
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 text-white drop-shadow-2xl">
          Hire at the speed <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            of intelligence.
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-gray-400 mb-10 drop-shadow-md leading-relaxed">
          The autonomous engine that syncs calendars, screens candidates, 
          and books interviews without a single email.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
          <button 
            onClick={handleAuthRedirect}
            className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 hover:scale-105 transition-all shadow-lg shadow-indigo-500/20"
          >
            Get Started Now
          </button>
        </div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </div>
  );
}