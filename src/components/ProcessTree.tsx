import { FileText, GitBranch, Monitor, Trash2, User, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import Card from "./Card";
import AddCard from "./cards/AddCard";
import type Process from "../types/process";
import type { People } from "../types/people";
import type { Tool } from "../types/tool";
import type { Documentation } from "../types/Documentations";
import { useState } from "react";
import AddItemModal from "./modals/AddItemModal";
import { useAuthStore } from "../context/AuthContext";
import { api } from "../api";
import { toast } from "sonner";

interface ProcessTreeProps{
    process: Process;
    onClose: () => void;
}

function BranchLine(){
    return <div className="w-px h-8 bg-[#4A4A4A] mx-auto my-2" />
}

function ProcessTree({ process, onClose }: ProcessTreeProps) {
    
    const [addingType, setAddingType] = useState<'subprocess' | 'people' | 'tool' | 'doc' | null>(null);
    const token = useAuthStore((state) => state.token);

    const deleteItem = (endpoint: string, itemExternlaId: string, message: string) => {
        api.delete(`/${endpoint}/${itemExternlaId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res: any) => {
            if(res.status === 204) toast.success(message);
        }).catch(() => {
            toast.error('Não foi possível deletar o item!');
        });
    }

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
                                {process.type === 'systemic' ? <Monitor size={24} /> : <User size={24} />}
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
                                {process.subprocess?.map(sub => (
                                    <Card key={sub.externalId} className="w-full">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="min-w-8 h-8 rounded bg-[#252525] flex items-center justify-center text-zinc-500">
                                                <GitBranch size={14} />
                                            </div>
                                            <span className="text-sm font-medium text-zinc-200 truncate">{sub.name}</span>
                                        </div>
                                        <button
                                        onClick={() => {
                                            deleteItem('subprocess', sub.externalId, 'Subprocesso deletado com sucesso!');
                                        }}
                                        className="text-zinc-600 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </Card>
                                ))}
                            </AnimatePresence>
                            <AddCard label="Adicionar Subprocesso" onClick={() => {
                                setAddingType('subprocess');
                            }} />
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <div className="bg-[#383838] px-3 py-1 rounded-full border border-[#4A4A4A] text-xs font-medium text-zinc-400 mb-2">
                                Pessoas / Responsáveis
                            </div>
                            <AnimatePresence>
                                {process.peoples?.map((people: People) => (
                                    <Card
                                    key={people.externalId}
                                    className="w-full"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="min-w-8 h-8 rounded bg-orange-900/20 flex items-center justify-center text-orange-400">
                                                <User size={14} />
                                            </div>
                                            <span className="text-sm font-medium text-zinc-200 truncate">{people.name}</span>
                                        </div>
                                        <button
                                        onClick={() => {
                                            deleteItem('people', people.externalId, 'Pessoa deletada com sucesso!');
                                        }}
                                        className="text-zinc-600 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </Card>
                                ))}
                            </AnimatePresence>
                            <AddCard label="Adicionar Pessoa" onClick={() => {
                                setAddingType('people');
                            }} />
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <div className="bg-[#383838] px-3 py-1 rounded-full border border-[#4A4A4A] text-xs font-medium text-zinc-400 mb-2">
                                Ferramentas
                            </div>
                            <AnimatePresence>
                                {process.tools?.map((tool: Tool) => (
                                    <Card
                                    key={tool.externalId}
                                    className="w-full"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="min-w-8 h-8 rounded bg-cyan-900/20 flex items-center justify-center text-cyan-400">
                                                <Monitor size={14} />
                                            </div>
                                            <span className="text-sm font-medium text-zinc-200 truncate">{tool.name}</span>
                                        </div>
                                        <button
                                        onClick={() => {
                                            deleteItem('tool', tool.externalId, 'Ferramenta deletada com sucesso!');
                                        }}
                                        className="text-zinc-600 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </Card>
                                ))}
                            </AnimatePresence>
                            <AddCard label="Adicionar Ferramenta" onClick={() => {
                                setAddingType('tool');
                            }} />
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <div className="bg-[#383838] px-3 py-1 rounded-full border border-[#4A4A4A] text-xs font-medium text-zinc-400 mb-2">
                                Documentação
                            </div>
                            <AnimatePresence>
                                {process.documentations?.map((doc: Documentation) => (
                                    <Card
                                    key={doc.externalId}
                                    className="w-full"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="min-w-8 h-8 rounded bg-[#252525] flex items-center justify-center text-zinc-500">
                                                <FileText size={14} />
                                            </div>
                                            <span className="text-sm font-medium text-zinc-200 truncate">{doc.name}</span>
                                        </div>
                                        <button
                                        onClick={() => {
                                            deleteItem('documentation', doc.externalId, 'Documento deletado com sucesso!');
                                        }}
                                        className="text-zinc-600 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </Card>
                                ))}
                            </AnimatePresence>
                            <AddCard label="Adicionar Ferramenta" onClick={() => {
                                setAddingType('doc');
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            {addingType && (
                <AddItemModal addingType={addingType} setAddingType={setAddingType} processExternalId={process.externalId}/>
            )}
        </div>
    )
}

export default ProcessTree;