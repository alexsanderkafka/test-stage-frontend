import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAuthStore } from "../../context/AuthContext";
import { api } from "../../api";
import { toast } from "sonner";

interface AddItemModalProps{
    addingType: string;
    setAddingType: (type: any) => void;
    processExternalId: string;
}


export default function AddItemModal({ addingType, setAddingType, processExternalId }: AddItemModalProps){

    const token = useAuthStore((state) => state.token);
    const [newValue, setNewValue] = useState('');

    const addConfig: any = {
        subprocess: {
            endpoint: "subprocess",
            successMessage: "Subprocesso criado com sucesso!",
            errorMessage: "Não foi possível criar o subprocesso!"
        },
        people: {
            endpoint: "people",
            successMessage: "Pessoa adicionada com sucesso!",
            errorMessage: "Não foi possível criar o subprocesso!"
        },
        tool: {
            endpoint: "tool",
            successMessage: "Nova ferramenta adicionada com sucesso!",
            errorMessage: "Não foi possível adicionar a ferramenta!"
        },
        doc: {
            endpoint: "documentation",
            successMessage: "Documento adicionado com sucesso!",
            errorMessage: "Não foi possível adicionar o documento!"
        }
    }

    const handleAddItem = () => {
        if(!newValue) return;

        const data: Record<string, string> = {
            name: newValue
        }

        const config = addConfig[addingType];

        api.post(`/${config.endpoint}/${processExternalId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res: any) => {
            if(res.status === 201) toast.success(config.successMessage);
                
        }).catch(() => {
            toast.success(config.errorMessage);
        });

        setAddingType(null);
    }

    return(
        <AnimatePresence>
            <div className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#383838] border border-[#4A4A4A] p-6 rounded-2xl w-full max-w-sm shadow-xl"
                >
                    <h3 className="text-lg font-bold text-white mb-4">
                        {addingType === 'subprocess' && 'Novo Subprocesso'}
                        {addingType === 'people' && 'Adicionar Responsável'}
                        {addingType === 'tool' && 'Adicionar Ferramenta'}
                        {addingType === 'doc' && 'Adicionar Documentação'}
                    </h3>

                    <input
                    autoFocus
                    value={newValue}
                    onChange={e => setNewValue(e.target.value)}
                    className="w-full bg-[#454545] border border-[#555] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                    placeholder={addingType === 'subprocess' ? 'Nome do subprocesso...' : 'Nome...'}
                    />

                    <div className="flex justify-end gap-2">
                        <button 
                            onClick={() => setAddingType(null)}
                            className="px-4 py-2 text-zinc-400 hover:text-white"
                        >
                            Cancelar
                        </button>

                        <button 
                        onClick={handleAddItem}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                        >
                            Adicionar
                        </button>
                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    );
}