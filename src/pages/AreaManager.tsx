import { Layers } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import PlusButton from "../components/PlusButton";
import AreaCard from "../components/cards/AreaCard";
import AreaFormModal from "../components/modals/AreaFormModal";
import type Area from "../types/area";
import { api } from "../api";
import { useAuthStore } from "../context/AuthContext";

function AreaManager() {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingArea, setEditingArea] = useState<Area | null>(null);
  const [areas, setAreas] = useState<Area[]>([]);
  const token = useAuthStore((state) => state.token);
  const userExternalId = useAuthStore((state) => state.userExternalId);

  useEffect(() => {
    getAllAreas();
  }, []);

  const getAllAreas = () => {
    api.get(`/area/${userExternalId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res: any) => {
      setAreas(res.data);
    });
  }

  function openEdit(area: Area) {
    setEditingArea(area);
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
        <PlusButton onClick={() => {
          setIsModalOpen(true);
        }}
        label="Nova Área"
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <AnimatePresence mode='popLayout'>
          {areas.map((area: Area) => (
            <AreaCard area={area} openEdit={openEdit}/>
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

      {isModalOpen && (
        <AreaFormModal setIsModalOpen={setIsModalOpen} editingArea={editingArea} />
      )}
      
    </div>
  )
}

export default AreaManager;
