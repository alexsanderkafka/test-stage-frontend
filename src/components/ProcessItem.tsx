import { useState } from "react";
import type { Process } from "../types/process";
import type Area from "../types/area";
import { ChevronDown, ChevronRight, Edit2, GitBranch, Monitor, Plus, Trash2, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import SubprocessItem from "./SubprocessItem";

interface ProcessItemProps {
  process: Process;
  level?: number;
  viewingTreeId?: string | null; 
  setViewingTreeId?: (id: string | null) => void;
}

function ProcessItem({ process, level = 0, setViewingTreeId }: ProcessItemProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const areas: Area[] = [
    { id: '1', name: 'Recursos Humanos', description: 'Gestão de pessoas e cultura' },
    { id: '2', name: 'Tecnologia', description: 'Infraestrutura e desenvolvimento' },
    { id: '3', name: 'Financeiro', description: 'Contas a pagar e receber' },
    { id: '4', name: 'Financeiro', description: 'Contas a pagar e receber' },
    { id: '5', name: 'Recursos Humanos', description: 'Gestão de pessoas e cultura' },
    { id: '6', name: 'Tecnologia', description: 'Infraestrutura e desenvolvimento' },
    { id: '7', name: 'Financeiro', description: 'Contas a pagar e receber' },
    { id: '8', name: 'Financeiro', description: 'Contas a pagar e receber' }
  ]


  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const subs = process.subprocesses || [];
  const hasSubs = subs.length > 0;
  const isExpanded = expanded[process.id];
  const areaName = areas.find(a => a.id === process.areaId)?.name;

  return(
    <div className="select-none">
      <div className={`bg-[#383838] border border-[#4A4A4A] rounded-2xl shadow-sm group flex items-center justify-between p-3 rounded-lg hover:bg-[#454545] border border-transparent hover:border-[#555] transition-all mb-1 ${level > 0 ? 'ml-6 border-l border-[#4A4A4A] pl-4' : ''}`}>
        <div className="flex items-center gap-3 flex-1">
          <button onClick={() => hasSubs && toggleExpand(process.id)}>
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${process.type === 'systemic' ? 'bg-cyan-900/30 text-cyan-400' : 'bg-orange-900/30 text-orange-400'}`}>
            {process.type === 'systemic' ? (
              <Monitor size={16} />
            ) : (
              <User size={16} />
            )}
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-white">
              {process.name}
            </span>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="px-2 py-0.5 bg-[#454545] rounded text-zinc-400">{areaName}</span>
              <span>.</span>
              <span>{process.type === 'systemic' ? "Sistêmico" : "Manual"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setViewingTreeId!(process.id)}
          className="p-2 text-zinc-400 hover:text-indigo-400 hover:bg-[#505050] rounded-lg tooltip"
          title="Visualizar Detalhes"
          >
            <GitBranch size={16}/>
          </button>

          <button onClick={() => {}}
          className="p-2 text-zinc-400 hover:text-white hover:bg-[#505050] rounded-lg tooltip"
          title="Adicionar Subprocesso"
          >
            <Plus size={16}/>
          </button> 

          <button onClick={() => {}}
          className="p-2 text-zinc-400 hover:text-blue-400 hover:bg-[#505050] rounded-lg"
          >
            <Edit2 size={16}/>
          </button> 

          <button onClick={() => {}}
          className="p-2 text-zinc-400 hover:text-red-400 hover:bg-[#505050] rounded-lg"
          >
            <Trash2 size={16}/>
          </button> 
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && hasSubs && (
          <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
          >
            {subs.map((subProcess) => (
              <SubprocessItem subprocess={subProcess} areaName={areaName || ''} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProcessItem;