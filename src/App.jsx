import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Fundo from "./components/Fundo";
import Coracoes from "./components/Coracoes";
import TelaInicial from "./components/TelaInicial";
import Mural from "./components/Mural";
import Player from "./components/Player";
import useMusic from "./hooks/useMusic";
import { MUSICAS } from "./data/media";

export default function App() {
  const [iniciou, setIniciou] = useState(false);
  const musica = useMusic(MUSICAS);

  function comecar() {
    musica.iniciar();
    setIniciou(true);
  }

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-noite">
      <Fundo />
      <Coracoes />
      {iniciou && <Mural />}
      {iniciou && <Player {...musica} />}
      <AnimatePresence>{!iniciou && <TelaInicial aoClicar={comecar} />}</AnimatePresence>
    </main>
  );
}