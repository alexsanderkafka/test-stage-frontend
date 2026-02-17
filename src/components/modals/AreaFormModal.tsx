import { AnimatePresence, motion } from "motion/react";
import type Area from "../../types/area";
import { useEffect, useState } from "react";

interface AreaFormModalProps{
    setIsModalOpen: (isOpen: boolean) => void;
    editingArea: Area | null;
}

function AreaFormModal({ setIsModalOpen, editingArea }: AreaFormModalProps){

  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    if (editingArea) {
      setFormData({ name: editingArea.name, description: editingArea.description });
    }
  }, [])
    
  return(
        <AnimatePresence>
        
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className='absolute inset-0 bg-black/80 backdrop-blur-sm'
            />
            
            <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className='relative bg-[#383838] border border-[#4A4A4A] rounded-2xl p-8 w-full max-w-md shadow-2xl z-50'
            >
              <h2 className='text-2xl font-bold text-white mb-6'>Nova Área</h2>

              <form onSubmit={() => {}} className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-zinc-400 mb-2'>Nome da Área</label>
                  <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className='w-full bg-[#454545] border border-[#555] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-zinc-500'
                  placeholder='Ex: Recursos Humanos'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-zinc-400 mb-2'>Descrição</label>
                  <input 
                  type="text" 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className='w-full bg-[#454545] border border-[#555] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-zinc-500'
                  placeholder='Descreva as responsabilidades desta área...'
                  />
                </div>

                <div className='flex justify-end gap-3 pt-4'>
                  <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-[#454545] transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                  type='submit'
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-900/20 transition-all font-medium"
                  >
                    {editingArea ? 'Salvar Alterações' : 'Criar Área'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
      </AnimatePresence>
  );
}

export default AreaFormModal;