import { motion } from "motion/react";
import type Area from "../../types/area";
import { Edit2, Layers, Trash2 } from "lucide-react";

interface AreaCardProps {
    area: Area;
    openEdit: (area: Area) => void;
}

function AreaCard({ area, openEdit}: AreaCardProps) {
    return(
        <motion.div
            layout
            key={area.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#383838] border border-[#4A4A4A] rounded-2xl p-6 hover:border-indigo-500/30 transition-all group relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                <button
                onClick={() => openEdit(area)}
                className='p-2 bg-[#454545] text-zinc-300 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors'
                >
                  <Edit2 size={16} />
                </button>
                <button
                onClick={() => {}}
                className="p-2 bg-[#454545] text-zinc-300 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-[#454545] rounded-xl text-indigo-400 group-hover:bg-indigo-900/20 group-hover:text-indigo-300 transition-colors">
                  <Layers size={24} />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">{area.name}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4 min-h-[40px]">
                {area.description || 'Sem descrição disponível.'}
              </p>

              <div className="flex items-center text-xs font-medium text-zinc-500 mt-auto pt-4 border-t border-[#4A4A4A]">
                <span>ID: {area.id}</span>
              </div>
        </motion.div>
    );
}

export default AreaCard;