import { Plus } from "lucide-react";

interface PlusButtonProps{
    label: string;
    onClick: () => void;
}

function PlusButton({ label, onClick }: PlusButtonProps) {
    return(
        <button 
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-900/20 transition-all"
        onClick={onClick}
        >
            <Plus size={20}/>
            <span>{ label }</span>
        </button>
    );
}

export default PlusButton;