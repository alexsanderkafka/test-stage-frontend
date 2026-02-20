import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import ProcessTree from "../components/ProcessTree";
import ProcessItem from "../components/ProcessItem";
import PlusButton from "../components/PlusButton";
import ProcessFormModal from "../components/modals/ProcessFormModal";
import type Process from "../types/process";
import { useAuthStore } from "../context/AuthContext";
import { useProcessStore } from "../context/ProcessContext";

function ProcessView() {

  const token = useAuthStore((state) => state.token);
  const userExternalId = useAuthStore((state) => state.userExternalId);

  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProcess, setEditingProcess] =useState<Process | null>(null);

  const processes = useProcessStore((state) => state.processes);
  const getAllProcess = useProcessStore((state) => state.getAllProcess);

  useEffect(() => {
    getAllProcess(userExternalId!, token!);
  }, [])

  function handleAdd () {
    setEditingProcess(null);
    setIsModalOpen(true);
  }

  function handleEditingProcess(process: Process) {
    setEditingProcess(process);
    setIsModalOpen(true);
  }
  
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
            <PlusButton onClick={() => {
              handleAdd();
            }} label="Novo Processo" />
          </div>

          <div className="">
            {processes.length > 0 ? (
              <div className="space-y-2">
                {processes.map((process: Process) => (
                  <ProcessItem key={process.externalId} process={process} setSelectedProcess={setSelectedProcess} handleEditingProcess={() => handleEditingProcess(process)}/>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-zinc-500">
                <p>Nenhum processo cadastrado.</p>
              </div>
            )}
          </div>

          <AnimatePresence>
            {selectedProcess && (
              <ProcessTree 
              externalId={selectedProcess.externalId}
              onClose={() => setSelectedProcess(null)}
              />
            )}
          </AnimatePresence>

          {isModalOpen && (
            <ProcessFormModal setIsModalOpen={setIsModalOpen} editingProcess={editingProcess}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProcessView;
