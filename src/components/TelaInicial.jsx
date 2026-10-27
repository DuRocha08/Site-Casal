import { motion } from "framer-motion";
import { SITE } from "../data/media";

export default function TelaInicial({ aoClicar }) {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <p className="mb-3 font-hand text-2xl text-papel/70">para {SITE.nome}</p>
      <h1 className="mb-12 font-serif text-4xl italic leading-tight text-papel sm:text-6xl">
        Preparei uma coisa
        <br />
        pra você
      </h1>
      <button
        onClick={aoClicar}
        className="animate-pulsar rounded-full border border-papel/30 bg-vinho px-9 py-3.5 font-serif text-lg text-papel transition-colors hover:bg-[#a52140]"
      >
        Clique para uma surpresa ❤️
      </button>
    </motion.div>
  );
}
