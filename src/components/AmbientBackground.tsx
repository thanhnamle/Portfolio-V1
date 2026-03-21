import { motion } from "framer-motion";

const blobs = [
  { x: "20%", y: "15%", size: 600, duration: 25, delay: 0, color: "hsl(205 82% 61% / 0.05)" },
  { x: "70%", y: "60%", size: 500, duration: 30, delay: 5, color: "hsl(205 65% 50% / 0.04)" },
  { x: "50%", y: "80%", size: 450, duration: 28, delay: 8, color: "hsl(205 82% 61% / 0.03)" },
];

const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[120px]"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: blob.color,
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 20, -40, 0],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "linear",
            delay: blob.delay,
          }}
        />
      ))}
    </div>
  );
};

export default AmbientBackground;
