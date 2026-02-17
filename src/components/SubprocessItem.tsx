import { Monitor, User } from "lucide-react";
import type { Subprocess } from "../types/subprocess";

interface SubprocessItemProps {
    subprocess: Subprocess;
    areaName: string;
}

function SubprocessItem({ subprocess, areaName }: SubprocessItemProps) {
    return (
    <div className="select-none">
        <div className="bg-[#383838] border border-[#4A4A4A] rounded-2xl shadow-sm group flex items-center justify-between p-3 rounded-lg hover:bg-[#454545] border border-transparent hover:border-[#555] transition-all mb-1 ml-6 border-l border-[#4A4A4A] pl-4">
            <div className="flex items-center gap-3 flex-1">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${subprocess.type === 'systemic' ? 'bg-cyan-900/30 text-cyan-400' : 'bg-orange-900/30 text-orange-400'}`}>
                {subprocess.type === 'systemic' ? (
                <Monitor size={16} />
                ) : (
                <User size={16} />
                )}
            </div>

            <div className="flex flex-col">
                <span className="font-medium text-white">
                {subprocess.name}
                </span>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="px-2 py-0.5 bg-[#454545] rounded text-zinc-400">{areaName}</span>
                <span>.</span>
                <span>{subprocess.type === 'systemic' ? "Sistêmico" : "Manual"}</span>
                </div>
            </div>
            </div>
        </div>
    </div>
    );
}

export default SubprocessItem;