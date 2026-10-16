"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

/**
 * Sinal de que há mais conteúdo embaixo: um degradê que esmaece a borda
 * inferior da tela e um "role para ver mais" discreto. Some quando a pessoa
 * chega ao fim da página (ou se a página cabe inteira na tela).
 */
export function MaisAbaixo() {
  const [temMais, setTemMais] = useState(false);

  useEffect(() => {
    function atualizar() {
      const restante = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      setTemMais(restante > 48);
    }
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    // A altura muda depois que o conteúdo anima e carrega.
    const id = setInterval(atualizar, 800);
    return () => {
      window.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
      clearInterval(id);
    };
  }, []);

  return (
    <AnimatePresence>
      {temMais && (
        <motion.div
          key="mais"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, var(--bg) 85%)" }}
        >
          <motion.span
            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-line-2 bg-surface px-3 py-1 text-xs font-bold text-ink-2 shadow-sm"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            role para ver mais <ChevronDown className="h-3.5 w-3.5" />
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
