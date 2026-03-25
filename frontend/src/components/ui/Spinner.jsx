// export default function Spinner({ size = 'sm' }) {
//   const s = size === 'sm' ? 'w-3 h-3' : 'w-5 h-5'
//   return (
//     <span className={`${s} border-2 border-white/30 border-t-white rounded-full animate-spin inline-block`} />
//   )
// }





export default function Spinner({ size = 'sm' }) {
  const s = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'
  
  return (
    <div className="relative flex items-center justify-center">
      {/* The Glow */}
      <div 
        className={`${s} absolute bg-indigo-500/30 rounded-full blur-md animate-pulse`} 
      />
      
      {/* The Spinner */}
      <span 
        className={`${s} border-[2.5px] border-indigo-500/20 border-t-indigo-400 rounded-full animate-spin inline-block`}
        style={{ filter: 'drop-shadow(0 0 5px rgba(99, 102, 241, 0.5))' }}
      />
    </div>
  )
}