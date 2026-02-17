import { Plus } from "lucide-react";
import { motion } from "motion/react";

interface AddCardProps {
    label: string;
    onClick: () => void;
}

function AddCard({ label, onClick }: AddCardProps) {
    return(
        <motion.button
        layout
        onClick={onClick}
        className="w-full bg-[#383838]/50 border-2 border-dashed border-[#4A4A4A] hover:border-indigo-500/50 hover:bg-[#454545] text-zinc-400 hover:text-indigo-400 rounded-xl p-3 flex items-center justify-center gap-2 transition-all group"
        >
            <div className="bg-[#505050] group-hover:bg-indigo-500/20 rounded-lg p-1 transition-colors">
                <Plus size={16} />
            </div>
            <span className="text-sm font-medium">{label}</span>
        </motion.button>
    );
}

export default AddCard;