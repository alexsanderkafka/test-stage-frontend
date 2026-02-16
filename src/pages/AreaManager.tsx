import { Edit2, Layers, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Area {
  id: string;
  name: string;
  description: string;
}

function AreaManager() {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingArea, setEditingArea] = useState<{ id: string, name: string, description: string } | null>(null);

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

  function openEdit(area: Area) {
    setEditingArea(area);
    setFormData({ name: area.name, description: area.description });
    setIsModalOpen(true);
  }

  return (
    <div className='h-full overflow-y-auto p-6 md:p-12 space-y-8 text-white'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-white'>
            Gerenciamento de Áreas
          </h1>
          <p className='text-zinc-400 mt-2'>
            Organize os departamentos e setores da sua empresa para mapear seus processos.
          </p>
        </div>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-900/20'
        >
          <Plus size={20} />
          <span>Nova Área</span>
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <AnimatePresence mode='popLayout'>
          {areas.map((area: Area) => (
            <motion.div
            layout
            key={area.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className='bg-[#383838] border border-[#4A4A4A] rounded-2xl p-6 hover:border-indigo-500/30 transition-all group relative overflow-hidden shadow-sm'
            >
              <div className='absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10'>
                <button
                onClick={() => openEdit(area)}
                className='p-2 bg-[#454545] text-zinc-300 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors'
                >
                  <Edit2 size={16} />
                </button>
                <button
                onClick={() => {}}
                className='p-2 bg-[#454545] text-zinc-300 rounded-lg hover:bg-red-500 hover:text-white transition-colors'
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className='flex items-start justify-between mb-4'>
                <div className='p-3 bg-[#454545] rounded-xl text-indigo-400 group-hover:bg-indigo-900/20 group-hover:text-indigo-300 transition-colors'>
                  <Layers size={24} />
                </div>
              </div>

              <h3 className='text-xl font-semibold text-white mb-2'>{area.name}</h3>
              <p className='text-zinc-400 text-sm leading-relaxed mb-4 min-h-[40px]'>
                {area.description || 'Sem descrição disponível.'}
              </p>

              <div className="flex items-center text-xs font-medium text-zinc-500 mt-auto pt-4 border-t border-[#4A4A4A]">
                <span>ID: {area.id}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {areas.length === 0 && (
          <div className='col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-[#4A4A4A] rounded-2xl text-zinc-500'>
            <Layers size={48} className='mb-4' />
            <p className='text-lg'>Nenhuma área cadastrada.</p>
            <p className='text-sm'>Comece criando um novo departamento para organizar seus processos.</p>
          </div>
        )}
      </div>

      {/*Modal passar para component*/}
      <AnimatePresence>
        {isModalOpen && (
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
                {/*Passar para component */}
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
        )
        }
      </AnimatePresence>
    </div>
  )
}

export default AreaManager;
