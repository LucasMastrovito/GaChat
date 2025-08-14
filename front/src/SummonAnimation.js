import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rarityColors = {
  basique: "#8a8a8aff",
  rare: "#40489eff",
  mythic: "#b43838ff",
  legendary: "#cfae41ff",
  divin: "#d440cdff",
};

export default function SummonAnimation({ rarity, gifUrl, name, onComplete }) {
  const [showBox, setShowBox] = useState(true);
  const [showCat, setShowCat] = useState(false);

  const handleAnimationEnd = () => {
    setShowBox(false);
    setShowCat(true);
    if (onComplete) onComplete();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: '60vh', width: '100%' }}>
      {/* Nom du chat */}
      <AnimatePresence>
        {showCat && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {name}
          </motion.h2>
        )}
      </AnimatePresence>

      {/* Conteneur boîte + glow */}
      <div style={{ position: "relative", maxWidth: '80vw' }}>
        {/* Glow permanent */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: rarityColors[rarity] || "#fff",
            filter: "blur(40px)",
            zIndex: 0,
          }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 1.2, repeat: 1, ease: "easeInOut" }}
        />

        <AnimatePresence>
          {showBox && (
            <motion.img
              src="/abonnement.png"
              alt="boîte"
              style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 2 }} // animation plus longue
              onAnimationComplete={handleAnimationEnd}
            />
          )}
        </AnimatePresence>

        {/* Chat GIF */}
        <AnimatePresence>
          {showCat && gifUrl && (
            <motion.img
              src={gifUrl}
              alt={name}
              style={{ maxHeight: '40vh', position: "absolute", top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 2, border: '3px solid #293132', boxShadow: '#293132 4px 4px 0 0' }}
              initial={{ scale: 0, x: '-50%' }}
              animate={{ scale: 1, x: '-50%' }}
              exit={{ scale: 0, x: '-50%' }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
