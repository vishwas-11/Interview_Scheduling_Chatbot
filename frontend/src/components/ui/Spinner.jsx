export default function Spinner({ size = 'sm' }) {
  const s = size === 'sm' ? 'w-3 h-3' : 'w-5 h-5'
  return (
    <span className={`${s} border-2 border-white/30 border-t-white rounded-full animate-spin inline-block`} />
  )
}