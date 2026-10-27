import { useEffect, useRef, useState } from "react";

export default function useMusic(lista) {
  const audio = useRef(null);
  const atual = useRef(0);
  const [tocando, setTocando] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [faixa, setFaixa] = useState(0);

  if (!audio.current) audio.current = new Audio();

  function tocar(i) {
    if (!lista.length) return;
    atual.current = i;
    setFaixa(i);
    audio.current.src = lista[i].src;
    audio.current.play().catch(() => setTocando(false));
  }

  useEffect(() => {
    const a = audio.current;
    const aoTocar = () => setTocando(true);
    const aoPausar = () => setTocando(false);
    const aoTerminar = () => tocar((atual.current + 1) % lista.length);
    a.addEventListener("play", aoTocar);
    a.addEventListener("pause", aoPausar);
    a.addEventListener("ended", aoTerminar);
    return () => {
      a.removeEventListener("play", aoTocar);
      a.removeEventListener("pause", aoPausar);
      a.removeEventListener("ended", aoTerminar);
    };
  }, []);

  useEffect(() => {
    audio.current.volume = volume;
  }, [volume]);

  function alternar() {
    const a = audio.current;
    if (!a.src) return tocar(0);
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  }

  return {
    iniciar: () => tocar(0),
    proxima: () => tocar((atual.current + 1) % lista.length),
    alternar,
    tocando,
    volume,
    setVolume,
    titulo: lista[faixa]?.titulo,
    varias: lista.length > 1,
  };
}
