import { FileText, GitBranch, Monitor, Trash2, User, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import type { Process } from "../types/process";
import Card from "./Card";
import AddCard from "./cards/AddCard";

interface ProcessTreeProps{
    processId: string;
    onClose: () => void;
}

function BranchLine(){
    return <div className="w-px h-8 bg-[#4A4A4A] mx-auto my-2" />
}

function ProcessTree({ processId, onClose }: ProcessTreeProps) {

    const processes: Process[] = [
    { 
      id: 'p1', 
      areaId: '1', 
      subprocesses: [
        {
          id: '1',
          name: 'Triagem de Currículos',
          type: 'manual',
          description: 'Análise inicial dos candidatos',
        },
        {
          id: '2',
          name: 'Estudo de Caso',
          type: 'manual',
          description: 'Teste prático para avaliar habilidades dos candidatos',
        },
        {
          id: '3',
          name: 'Entrevista Técnica',
          type: 'manual',
          description: 'Teste prático para avaliar habilidades dos candidatos',
        },
      ],
      name: 'Recrutamento e Seleção', 
      type: 'manual', 
      description: 'Processo de contratação de novos colaboradores',
      owners: ['Ana Silva'],
      tools: ['LinkedIn', 'Gupy'],
      documentation: ['Procedimento RH-001']
    },
    { 
      id: 'p4', 
      areaId: '2', 
      subprocesses: [
        {
        id: '4',
        name: 'Build da Aplicação',
        type: 'systemic',
        description: 'Compilar o código fonte e gerar os artefatos da aplicação',
      },
      {
        id: '5',
        name: 'Execução de Testes Automatizados',
        type: 'systemic',
        description: 'Executar testes unitários e de integração',
      },
      {
        id: '6',
        name: 'Criação da Imagem Docker',
        type: 'systemic',
        description: 'Gerar e publicar a imagem Docker no registry',
      },
      ], 
      name: 'Deploy de Aplicação', 
      type: 'systemic', 
      description: 'Processo automatizado de deploy',
      owners: ['DevOps Team', 'Claudia'],
      tools: ['GitHub Actions', 'AWS'],
      documentation: ['Wiki Eng-Deploy']
    },
    ]

    const process = processes.find(p => p.id === processId);

    const owners = process?.owners;
    const tools = process?.tools;
    const docs = process?.documentation;
    const subprocesses = process?.subprocesses || [];

    return(
        <div className="fixed inset-0 z-50 bg-[#252525]/95 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#4A4A4A] bg-[#252525]">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <GitBranch className="text-indigo-500"/>
                        Visão Detalhada
                    </h2>
                    <p className="text-zinc-500 text-sm">Visualizando hierarquia de: <span className="text-white">{process?.name}</span></p>
                </div>
                <button
                onClick={onClose}
                className="p-2 hover:bg-[#383838] rounded-full text-zinc-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>
            </div>
            <div className="flex-1 overflow-auto p-8 bg-[#252525]">
                <div className="min-w-max mx-auto flex flex-col items-center">
                    <Card className="!min-w-[300px] border-indigo-500/30 bg-[#383838]">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${process!.type === 'systemic' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                {process!.type === 'systemic' ? <Monitor size={24} /> : <User size={24} />}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{process!.name}</h3>
                                <p className="text-zinc-400 text-sm">{process?.description || 'Sem descrição disponível'}</p>
                            </div>
                        </div>
                    </Card>

                    <BranchLine />

                    <div className="relative w-full max-w-4xl h-8">
                        <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-[#4A4A4A]" />
                        
                        <div className="absolute bottom-0 left-[12.5%] right-[12.5%] h-px bg-[#4A4A4A]" />
                        <div className="absolute bottom-0 left-[12.5%] w-px h-4 bg-[#4A4A4A] -translate-y-4" />
                        <div className="absolute bottom-0 left-[37.5%] w-px h-4 bg-[#4A4A4A] -translate-y-4" /> 
                        <div className="absolute bottom-0 right-[37.5%] w-px h-4 bg-[#4A4A4A] -translate-y-4" /> 
                        <div className="absolute bottom-0 right-[12.5%] w-px h-4 bg-[#4A4A4A] -translate-y-4" /> 
                    </div>
                
                    <div className="grid grid-cols-4 gap-8 w-full max-w-6xl mt-4 items-start">
                        <div className="flex flex-col gap-4 items-center">
                            <div className="bg-[#383838] px-3 py-1 rounded-full border border-[#4A4A4A] text-xs font-medium text-zinc-400 mb-2">
                                Subprocessos
                            </div>
                            <AnimatePresence>
                                {subprocesses.map(sub => (
                                    <Card key={sub.id} className="w-full">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="min-w-8 h-8 rounded bg-[#252525] flex items-center justify-center text-zinc-500">
                                                <GitBranch size={14} />
                                            </div>
                                            <span className="text-sm font-medium text-zinc-200 truncate">{sub.name}</span>
                                        </div>
                                        <button
                                        onClick={() => {}}
                                        className="text-zinc-600 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </Card>
                                ))}
                            </AnimatePresence>
                            <AddCard label="Adicionar Subprocesso" onClick={() => {}} />
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <div className="bg-[#383838] px-3 py-1 rounded-full border border-[#4A4A4A] text-xs font-medium text-zinc-400 mb-2">
                                Pessoas / Responsáveis
                            </div>
                            <AnimatePresence>
                                {owners!.map((owner, idx) => (
                                    <Card
                                    key={idx}
                                    className="w-full"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="min-w-8 h-8 rounded bg-orange-900/20 flex items-center justify-center text-orange-400">
                                                <User size={14} />
                                            </div>
                                            <span className="text-sm font-medium text-zinc-200 truncate">{owner}</span>
                                        </div>
                                        <button
                                        onClick={() => {}}
                                        className="text-zinc-600 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </Card>
                                ))}
                            </AnimatePresence>
                            <AddCard label="Adicionar Pessoa" onClick={() => {}} />
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <div className="bg-[#383838] px-3 py-1 rounded-full border border-[#4A4A4A] text-xs font-medium text-zinc-400 mb-2">
                                Ferramentas
                            </div>
                            <AnimatePresence>
                                {tools!.map((tool, idx) => (
                                    <Card
                                    key={idx}
                                    className="w-full"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="min-w-8 h-8 rounded bg-cyan-900/20 flex items-center justify-center text-cyan-400">
                                                <Monitor size={14} />
                                            </div>
                                            <span className="text-sm font-medium text-zinc-200 truncate">{tool}</span>
                                        </div>
                                        <button
                                        onClick={() => {}}
                                        className="text-zinc-600 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </Card>
                                ))}
                            </AnimatePresence>
                            <AddCard label="Adicionar Ferramenta" onClick={() => {}} />
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <div className="bg-[#383838] px-3 py-1 rounded-full border border-[#4A4A4A] text-xs font-medium text-zinc-400 mb-2">
                                Documentação
                            </div>
                            <AnimatePresence>
                                {docs!.map((doc, idx) => (
                                    <Card
                                    key={idx}
                                    className="w-full"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="min-w-8 h-8 rounded bg-[#252525] flex items-center justify-center text-zinc-500">
                                                <FileText size={14} />
                                            </div>
                                            <span className="text-sm font-medium text-zinc-200 truncate">{doc}</span>
                                        </div>
                                        <button
                                        onClick={() => {}}
                                        className="text-zinc-600 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </Card>
                                ))}
                            </AnimatePresence>
                            <AddCard label="Adicionar Ferramenta" onClick={() => {}} />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ProcessTree;