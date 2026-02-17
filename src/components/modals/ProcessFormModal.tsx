import { AnimatePresence, motion } from "motion/react";
import type Area from "../../types/area";
import { Monitor, User } from "lucide-react";
import type { Process, ProcessType } from "../../types/process";
import { useEffect, useState } from "react";

interface ProcessFormModalProps {
    setIsModalOpen: (isOpen: boolean) => void;
    editingProcess: Process | null;
}

function ProcessFormModal({ setIsModalOpen, editingProcess}: ProcessFormModalProps) {

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

    const [formData, setFormData] = useState({
        name: "",
        areaId: areas[0]?.id || "",
        type: "manual" as ProcessType,
        description: "",
    });

    useEffect(() => {
        if (editingProcess) {
            console.log(editingProcess);
            setFormData({
                name: editingProcess.name,
                areaId: editingProcess.areaId,
                type: editingProcess.type,
                description: editingProcess.description || "",
            });
        }        
    }, [])
    
    function handleSubmit() {
        console.log("submit");
    }

    return (
        <AnimatePresence>
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsModalOpen(false)}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative bg-[#383838] border border-[#4A4A4A] rounded-2xl p-8 w-full max-w-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">
                            {editingProcess ? "Editar Processo" : "Novo Processo"}
                        </h2>

                        <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Nome do Processo</label>
                                <input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-[#454545] border border-[#555] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Ex: Integração de Novos Funcionários"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Área Responsável</label>
                                <select
                                required
                                value={formData.areaId}
                                onChange={(e) => setFormData({ ...formData, areaId: e.target.value })}
                                className="w-full bg-[#454545] border border-[#555] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="" disabled>Selecione uma área</option>
                                    {areas.map((area) => (
                                        <option value={area.id} key={area.id}>{ area.name }</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Tipo de Processo</label>
                                <div className="flex gap-2">
                                    <button 
                                    type="button"
                                    className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${formData.type === 'manual' ? 'bg-orange-900/30 border-orange-500/50 text-orange-400' : 'bg-[#454545] border-[#555] text-zinc-400 hover:bg-[#505050]'}`}
                                    onClick={() => setFormData({ ...formData, type: 'manual' })}
                                    >
                                        <User size={18} />
                                        Manual
                                    </button>

                                    <button 
                                    type="button"
                                    className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${formData.type === 'systemic' ? 'bg-cyan-900/30 border-cyan-500/50 text-cyan-400' : 'bg-[#454545] border-[#555] text-zinc-400 hover:bg-[#505050]'}`}
                                    onClick={() => setFormData({ ...formData, type: 'systemic' })}
                                    >
                                        <Monitor size={18} />
                                        Sistêmico
                                    </button>
                                </div>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Descrição</label>
                                <textarea 
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-[#454545] border border-[#555] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[80px]"
                                placeholder="Detalhes sobre o funcionamento deste processo..."
                                />
                            </div>

                            <div className="col-span-2 flex justify-end gap-3 pt-6 border-t border-[#4A4A4A]">
                                <button 
                                onClick={() => setIsModalOpen(false)}
                                type="button"
                                className="px-5 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-[#454545] transition-colors"
                                >
                                    Cancelar
                                </button>

                                <button 
                                type="submit"
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-900/20 transition-all font-medium"
                                >
                                    Salvar Processo
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
        </AnimatePresence>
    )
}

export default ProcessFormModal;