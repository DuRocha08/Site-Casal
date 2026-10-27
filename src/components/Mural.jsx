import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FOTOS, VIDEOS, SITE } from "../data/media";

const MAX_NA_TELA = 6;
const MAX_VIDEOS = 2;
const FORMAS = [
  "rounded-[2rem]",
  "rounded-t-[999px] rounded-b-[1.5rem]",
  "rounded-2xl",
];
const CORACAO =
  "M12 21s-7.5-4.6-9.5-9.2C1 8 3.2 4.5 6.7 4.5c2 0 3.5 1 5.3 3 1.8-2 3.3-3 5.3-3 3.5 0 5.7 3.5 4.2 7.3C19.5 16.4 12 21 12 21z";

const aleatorio = (min, max) => Math.random() * (max - min) + min;
const embaralhar = (lista) => [...lista].sort(() => Math.random() - 0.5);

function escolherPosicao(largura, altura, existentes) {
  const maxX = Math.max(11, window.innerWidth - largura - 10);
  const maxY = Math.max(61, window.innerHeight - altura - 90);
  let melhor = null;
  let maiorDist = -1;
  for (let i = 0; i < 14; i++) {
    const x = aleatorio(10, maxX);
    const y = aleatorio(60, maxY);
    const cx = x + largura / 2;
    const cy = y + altura / 2;
    const dist = existentes.length
      ? Math.min(...existentes.map((e) => Math.hypot(e.cx - cx, e.cy - cy)))
      : 999;
    if (dist > maiorDist) {
      maiorDist = dist;
      melhor = { x, y, cx, cy };
    }
  }
  return melhor;
}

export default function Mural() {
  const [itens, setItens] = useState([]);
  const [toques, setToques] = useState([]);
  const [cliques, setCliques] = useState(0);
  const [ocioso, setOcioso] = useState(false);
  const itensRef = useRef([]);
  const contador = useRef(0);
  const filas = useRef({ foto: [], video: [] });

  useEffect(() => {
    setOcioso(false);
    const t = setTimeout(() => setOcioso(true), 9000);
    return () => clearTimeout(t);
  }, [cliques]);

  function proximo(tipo) {
    const origem = tipo === "foto" ? FOTOS : VIDEOS;
    if (!origem.length) return null;
    if (!filas.current[tipo].length) filas.current[tipo] = embaralhar(origem);
    return filas.current[tipo].pop();
  }

  function marcarToque(e) {
    const id = Date.now() + Math.random();
    setToques((t) => [...t, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setToques((t) => t.filter((i) => i.id !== id)), 1300);
  }

  function revelar() {
    if (!FOTOS.length && !VIDEOS.length) return;

    const videosNaTela = itensRef.current.filter((i) => i.tipo === "video").length;
    let tipo = FOTOS.length ? "foto" : "video";
    if (FOTOS.length && VIDEOS.length && videosNaTela < MAX_VIDEOS && Math.random() < 0.35) {
      tipo = "video";
    }

    const midia = proximo(tipo);
    if (!midia) return;

    const base = window.innerWidth < 640 ? window.innerWidth * 0.46 : 240;
    const largura = base * aleatorio(0.82, 1.15);
    const altura = Math.min(largura * 1.5, window.innerHeight * 0.5);
    const pos = escolherPosicao(largura, altura, itensRef.current);
    contador.current += 1;

    const novo = {
      id: contador.current,
      tipo,
      src: midia.src,
      legenda: midia.legenda,
      largura,
      forma: FORMAS[Math.floor(Math.random() * FORMAS.length)],
      giro: aleatorio(-5, 5),
      ...pos,
    };

    const limite = window.innerWidth < 640 ? 5 : MAX_NA_TELA;
    itensRef.current = [...itensRef.current, novo].slice(-limite);
    setItens(itensRef.current);
  }

  function aoTocar(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    marcarToque(e);
    revelar();
    setCliques((c) => c + 1);
  }

  return (
    <div
      onPointerDown={aoTocar}
      className="absolute inset-0 z-10 cursor-pointer touch-none overflow-hidden"
    >
      <p className="pointer-events-none absolute inset-x-0 top-6 text-center font-serif text-xs uppercase tracking-[0.4em] text-papel/50 sm:text-sm">
        {SITE.titulo}
      </p>

      <AnimatePresence>
        {cliques === 0 && (
          <motion.div
            key="dica"
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ delay: 0.8, duration: 1.2 }}
          >
            <p className="animate-respirar text-balance text-center font-serif text-2xl italic leading-snug text-papel sm:text-4xl">
              Toque em qualquer lugar da tela...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cliques > 0 && ocioso && (
          <motion.p
            key="dica-ociosa"
            className="pointer-events-none absolute inset-x-0 bottom-20 text-center font-hand text-2xl text-papel/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            toque de novo...
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {itens.map((m, i) => {
          const idade = itens.length - 1 - i;
          return (
            <motion.figure
              key={m.id}
              initial={{ opacity: 0, scale: 0.86, rotate: m.giro - 4, filter: "blur(12px)" }}
              animate={{
                opacity: Math.max(0.45, 1 - idade * 0.12),
                scale: 1,
                rotate: m.giro,
                filter: "blur(0px)",
              }}
              exit={{ opacity: 0, scale: 0.94, filter: "blur(10px)", transition: { duration: 0.8 } }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute"
              style={{ width: m.largura, left: m.x, top: m.y, zIndex: 10 + m.id }}
            >
              <div
                className={`overflow-hidden ${m.forma}`}
                style={{
                  boxShadow:
                    "0 25px 70px -20px rgba(8,0,12,0.6), 0 0 0 1px rgba(255,235,240,0.1)",
                }}
              >
                {m.tipo === "foto" ? (
                  <img
                    src={m.src}
                    alt={m.legenda}
                    className="block h-auto max-h-[50vh] w-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <video
                    src={m.src}
                    className="block h-auto max-h-[50vh] w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
              </div>
              {m.legenda && (
                <figcaption className="mt-3 text-center font-hand text-2xl leading-none text-papel/85">
                  {m.legenda}
                </figcaption>
              )}
            </motion.figure>
          );
        })}
      </AnimatePresence>

      {toques.map((t) => (
        <span
          key={t.id}
          className="pointer-events-none absolute z-[900]"
          style={{ left: t.x, top: t.y }}
        >
          <motion.span
            className="absolute rounded-full border border-rose-200/70"
            style={{ width: 120, height: 120, marginLeft: -60, marginTop: -60 }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.span
            className="absolute rounded-full border border-rose-300/50"
            style={{ width: 70, height: 70, marginLeft: -35, marginTop: -35 }}
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
          />
          <motion.svg
            viewBox="0 0 24 24"
            className="absolute h-6 w-6 fill-rose-200"
            style={{ marginLeft: -12, marginTop: -12 }}
            initial={{ scale: 0.5, opacity: 1, y: 0 }}
            animate={{ scale: 1.4, opacity: 0, y: -34 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <path d={CORACAO} />
          </motion.svg>
        </span>
      ))}
    </div>
  );
}