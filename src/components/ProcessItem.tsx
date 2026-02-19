import { Edit2, GitBranch, Monitor, Trash2, User } from "lucide-react";
import type Process from "../types/process";
import { useAuthStore } from "../context/AuthContext";
import { toast } from "sonner";
import { api } from "../api";

interface ProcessItemProps {
  process: Process;
  level?: number;
  setSelectedProcess?: (process: Process | null) => void;
  handleEditingProcess: () => void;
}

function ProcessItem({ process, level = 0, setSelectedProcess, handleEditingProcess}: ProcessItemProps) {

  const token = useAuthStore((state) => state.token);

  const deleteProcess = () => {
    api.delete(`/process/${process.externalId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res: any) => {
      if(res.status === 204) toast.success('Processo deletado com sucesso!');
    }).catch((err: any) => {
      if(err.response.status === 404) toast.error(err.response.data.message);
    });
  }

  return(
    <div className="select-none">
      <div className={`bg-[#383838] border border-[#4A4A4A] rounded-2xl shadow-sm group flex items-center justify-between p-3 rounded-lg hover:bg-[#454545] border border-transparent hover:border-[#555] transition-all mb-1 ${level > 0 ? 'ml-6 border-l border-[#4A4A4A] pl-4' : ''}`}>
        <div className="flex items-center gap-3 flex-1">
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
              <span className="px-2 py-0.5 bg-[#454545] rounded text-zinc-400">{process.area.name}</span>
              <span>.</span>
              <span>{process.type === 'systemic' ? "Sistêmico" : "Manual"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => {
            setSelectedProcess!(process)
          }}
          className="p-2 text-zinc-400 hover:text-indigo-400 hover:bg-[#505050] rounded-lg tooltip"
          title="Visualizar Detalhes"
          >
            <GitBranch size={16}/>
          </button>

          <button onClick={() => {
            handleEditingProcess();
          }}
          className="p-2 text-zinc-400 hover:text-blue-400 hover:bg-[#505050] rounded-lg"
          >
            <Edit2 size={16}/>
          </button> 

          <button onClick={deleteProcess}
          className="p-2 text-zinc-400 hover:text-red-400 hover:bg-[#505050] rounded-lg"
          >
            <Trash2 size={16}/>
          </button> 
        </div>
      </div>
    </div>
  );
}

export default ProcessItem;