import { motion } from 'motion/react';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#F8F9FA]"
    >
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-[#C5A059] font-serif text-3xl font-bold"
      >
        AVYSTRA
      </motion.div>
    </motion.div>
  );
}
