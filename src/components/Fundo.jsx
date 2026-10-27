const luzes = [
  { cor: "rgba(176,18,47,0.55)", x: "-15%", y: "-10%", tam: "85vmax", dur: 28, atraso: 0 },
  { cor: "rgba(88,28,135,0.6)", x: "40%", y: "-20%", tam: "80vmax", dur: 34, atraso: -8 },
  { cor: "rgba(122,15,46,0.5)", x: "25%", y: "45%", tam: "90vmax", dur: 38, atraso: -15 },
  { cor: "rgba(59,18,92,0.6)", x: "-30%", y: "50%", tam: "75vmax", dur: 31, atraso: -4 },
];

const grao =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export default function Fundo() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-noite">
      {luzes.map((l, i) => (
        <div
          key={i}
          className="absolute animate-deriva rounded-full"
          style={{
            left: l.x,
            top: l.y,
            width: l.tam,
            height: l.tam,
            background: `radial-gradient(circle, ${l.cor} 0%, transparent 62%)`,
            animationDuration: `${l.dur}s`,
            animationDelay: `${l.atraso}s`,
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 35%, rgba(10,2,10,0.7) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: grao }}
      />
    </div>
  );
}