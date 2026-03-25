// import React from 'react';

// export default function Navbar() {
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
//       {/* Logo */}
//       <div className="flex items-center gap-2 cursor-pointer group">
//         <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
//           <div className="w-4 h-4 bg-white rounded-sm" />
//         </div>
//         <span className="text-xl font-bold text-white tracking-tighter">SYNCHRON</span>
//       </div>

//       {/* Links */}
//       <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400">
//         <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
//         <a href="#integrations" className="hover:text-white transition-colors">Integrations</a>
//         <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
//       </div>

//       {/* Actions */}
//       <div className="flex items-center gap-6">
//         <button className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
//           Login
//         </button>
//         <button className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all shadow-xl">
//           Try Now
//         </button>
//       </div>
//     </nav>
//   );
// }






import React from 'react';

export default function Navbar() {
  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto w-full">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.href = '/'}>
        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
          <div className="w-4 h-4 bg-white rounded-sm" />
        </div>
        <span className="text-xl font-bold text-white tracking-tighter">SYNCHRON</span>
      </div>

      {/* Minimal Actions */}
      <div className="flex items-center gap-6">
        <button 
          onClick={handleLogin}
          className="text-sm font-semibold text-gray-400 hover:text-white transition-colors"
        >
          Login
        </button>
        <button 
          onClick={handleLogin}
          className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all shadow-xl"
        >
          Try Now
        </button>
      </div>
    </nav>
  );
}