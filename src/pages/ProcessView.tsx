import { ChevronDown, ChevronRight, Edit2, GitBranch, Monitor, Plus, Trash2, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { div, view } from "motion/react-client";
import { useState } from "react";
import ProcessTree from "./ProcessTree";

interface Area {
  id: string;
  name: string;
  description: string;
}

export type ProcessType = 'manual' | 'systemic';

export interface Process {
  id: string;
  areaId: string;
  parentId: string | null;
  name: string;
  type: ProcessType;
  description?: string;
  tools?: string;
  owners?: string;
  documentation?: string;
  // Visual position for initial load if needed, but reactflow handles this mostly
  position?: { x: number; y: number }; 
}

export interface ProcessItemProps {
  process: Process;
  level?: number;
  viewingTreeId?: string | null; 
  setViewingTreeId?: (id: string | null) => void;
}

function ProcessItem({ process, level = 0,  viewingTreeId, setViewingTreeId }: ProcessItemProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  
  const processes: Process[] = [
    { 
      id: 'p1', 
      areaId: '1', 
      parentId: null, 
      name: 'Recrutamento e Seleção', 
      type: 'manual', 
      description: 'Processo de contratação de novos colaboradores',
      owners: 'Ana Silva',
      tools: 'LinkedIn, Gupy',
      documentation: 'Procedimento RH-001'
    },
    { 
      id: 'p2', 
      areaId: '1', 
      parentId: 'p1', 
      name: 'Triagem de Currículos', 
      type: 'manual', 
      description: 'Análise inicial dos candidatos',
      owners: 'João Paulo',
      tools: 'Gupy',
      documentation: 'Checklist de requisitos'
    },
    { 
      id: 'p3', 
      areaId: '1', 
      parentId: 'p1', 
      name: 'Entrevista Técnica', 
      type: 'manual', 
      description: 'Avaliação de hard skills',
      owners: 'Tech Leads',
      tools: 'Google Meet',
      documentation: 'Roteiro de entrevista'
    },
    { 
      id: 'p4', 
      areaId: '2', 
      parentId: null, 
      name: 'Deploy de Aplicação', 
      type: 'systemic', 
      description: 'Processo automatizado de deploy',
      owners: 'DevOps Team',
      tools: 'GitHub Actions, AWS',
      documentation: 'Wiki Eng-Deploy'
    },
  ]

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
  
  function getSubProcesses(parentId: string | null) {
    return processes.filter(p => p.parentId === parentId);
  }

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const subs = getSubProcesses(process.id);
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
              <ProcessItem key={subProcess.id} process={subProcess} level={level + 1}/>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProcessView() {

  const [viewingTreeId, setViewingTreeId] = useState<string | null>(null);

  const processes: Process[] = [
    { 
      id: 'p1', 
      areaId: '1', 
      parentId: null, 
      name: 'Recrutamento e Seleção', 
      type: 'manual', 
      description: 'Processo de contratação de novos colaboradores',
      owners: 'Ana Silva',
      tools: 'LinkedIn, Gupy',
      documentation: 'Procedimento RH-001'
    },
    { 
      id: 'p2', 
      areaId: '1', 
      parentId: 'p1', 
      name: 'Triagem de Currículos', 
      type: 'manual', 
      description: 'Análise inicial dos candidatos',
      owners: 'João Paulo',
      tools: 'Gupy',
      documentation: 'Checklist de requisitos'
    },
    { 
      id: 'p3', 
      areaId: '1', 
      parentId: 'p1', 
      name: 'Entrevista Técnica', 
      type: 'manual', 
      description: 'Avaliação de hard skills',
      owners: 'Tech Leads',
      tools: 'Google Meet',
      documentation: 'Roteiro de entrevista'
    },
    { 
      id: 'p4', 
      areaId: '2', 
      parentId: null, 
      name: 'Deploy de Aplicação', 
      type: 'systemic', 
      description: 'Processo automatizado de deploy',
      owners: 'DevOps Team',
      tools: 'GitHub Actions, AWS',
      documentation: 'Wiki Eng-Deploy'
    },
  ]

  function getSubProcesses(parentId: string | null) {
    return processes.filter(p => p.parentId === parentId);
  }

  const rootProcesses = getSubProcesses(null);

  return (
    <div className="h-full flex flex-col bg-[#252525]">
      <div className="flex items-center justify-between px-8 py-6 border-b border-[#4A4A4A]">
        <h1 className="text-2xl font-bold text-white">Gestão de Processos</h1>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-6 md:p-12 bg-[#252525] text-white relative">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">List de Processos</h1>
              <p className="text-zinc-400 mt-2">Gerencie a hierarquia de processos da sua organização.</p>
            </div>
            <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-900/20 transition-all"
            onClick={() => {}}
            >
              <Plus size={20}/>
              <span>Novo Processo</span>
            </button>
          </div>

          <div className="">
            {rootProcesses.length > 0 ? (
              <div className="space-y-2">
                {rootProcesses.map((process: Process) => (
                  /*Passar para component */
                  <ProcessItem key={process.id} process={process} viewingTreeId={viewingTreeId} setViewingTreeId={setViewingTreeId}/>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-zinc-500">
                <p>Nenhum processo cadastrado.</p>
              </div>
            )}
          </div>

          <AnimatePresence>
            {viewingTreeId && (
              <ProcessTree 
              processId={viewingTreeId}
              onClose={() => setViewingTreeId(null)}
              />
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  )
}

export default ProcessView;
