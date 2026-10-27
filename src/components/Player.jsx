const Play = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const Pause = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
);

const Proxima = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
    <path d="M6 6l9 6-9 6zM16 6h2v12h-2z" />
  </svg>
);

export default function Player({ tocando, alternar, proxima, varias, volume, setVolume, titulo }) {
  return (
    <div className="fixed bottom-4 right-4 z-[999] flex items-center gap-3 rounded-md bg-black/25 px-3 py-2 text-papel">
      <button onClick={alternar} aria-label="tocar ou pausar">
        {tocando ? <Pause /> : <Play />}
      </button>
      {varias && (
        <button onClick={proxima} aria-label="próxima música">
          <Proxima />
        </button>
      )}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="w-20"
        aria-label="volume"
      />
      {titulo && <span className="hidden font-hand text-lg sm:block">{titulo}</span>}
    </div>
  );
}
