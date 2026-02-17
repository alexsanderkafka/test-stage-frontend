import { motion } from "motion/react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

function Card({ children, className }: CardProps) {
    return(
        <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-[#383838] border border-[#4A4A4A] rounded-xl p-4 shadow-lg flex items-center justify-between gap-3 min-w-[200px] ${className}`}
        >
            {children}
        </motion.div>
    );
}

export default Card;