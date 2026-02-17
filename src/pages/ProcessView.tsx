import { AnimatePresence } from "motion/react";
import { useState } from "react";
import ProcessTree from "../components/ProcessTree";
import type { Process, ProcessType } from "../types/process";
import ProcessItem from "../components/ProcessItem";
import PlusButton from "../components/PlusButton";
import ProcessFormModal from "../components/modals/ProcessFormModal";
import type Area from "../types/area";

function ProcessView() {

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

  const [viewingTreeId, setViewingTreeId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    areaId: areas[0]?.id || "",
    type: "manual" as ProcessType,
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProcess, setEditingProcess] =useState<Process | null>(null);

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

  function handleAdd () {
    setEditingProcess(null);
    
    setFormData({
      ...formData,
      areaId: areas[0]?.id || "",
    });
    setIsModalOpen(true);
  }

  function handleEditingProcess(process: Process) {
    setEditingProcess(process);
    setFormData({
      name: process.name,
      areaId: process.areaId,
      type: process.type,
      description: process.description || "",
    });
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
                  <ProcessItem key={process.id} process={process} viewingTreeId={viewingTreeId} setViewingTreeId={setViewingTreeId} handleEditingProcess={() => handleEditingProcess(process)}/>
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

          <ProcessFormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} formData={formData} setFormData={setFormData} editingProcess={editingProcess}/>
        </div>
      </div>
    </div>
  )
}

export default ProcessView;
