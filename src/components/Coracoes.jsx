import { useMemo } from "react";

const cores = ["#d8b4fe", "#fda4af", "#e9a0b4", "#c4a1e8"];

export default function Coracoes() {
  const lista = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        esquerda: Math.random() * 100,
        tamanho: 18 + Math.random() * 40,
        duracao: 18 + Math.random() * 18,
        atraso: -Math.random() * 36,
        opacidade: 0.07 + Math.random() * 0.12,
        cor: cores[i % cores.length],
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {lista.map((c) => (
        <svg
          key={c.id}
          viewBox="0 0 24 24"
          className="absolute -bottom-16 animate-subir"
          style={{
            left: `${c.esquerda}%`,
            width: c.tamanho,
            height: c.tamanho,
            fill: c.cor,
            opacity: c.opacidade,
            animationDuration: `${c.duracao}s`,
            animationDelay: `${c.atraso}s`,
          }}
        >
          <path d="M12 21s-7.5-4.6-9.5-9.2C1 8 3.2 4.5 6.7 4.5c2 0 3.5 1 5.3 3 1.8-2 3.3-3 5.3-3 3.5 0 5.7 3.5 4.2 7.3C19.5 16.4 12 21 12 21z" />
        </svg>
      ))}
    </div>
  );
}
