import { Layers, Network } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isOpen: boolean;
    toggle: () => void;
}

function Sidebar({ activeTab, setActiveTab, isOpen, toggle }: SidebarProps) {

    const menuItems: any = [
        { id: 'processes', label: 'Mapa de Processo', icon: Network},
        { id: 'areas', label: 'Áreas e Setores', icon: Layers}
    ];

    return(
        <>
            <motion.aside>
                <div className={`fixed top-0 left-0 h-full w-64 bg-[#383838] border-r border-[#4A4A4A] z-30 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className='flex items-center justify-between p-5 border-b border-[#4A4A4A]'>
                        <div className='flex items-center gap-3'>
                            {/*
                            <div className='w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-900/20'>
                                <Network className='w-5 h-5 text-white'/>
                            </div>*/}
                            <span className='text-lg font-bold text-white tracking-tight'>FluxoMap</span>
                        </div>
                    </div>

                    <nav className='p-3 space-y-1 flex-1'>
                        {/*Passar para um component */}
                        {menuItems.map((item: any) => (
                            <button
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group text-sm font-medium ${activeTab === item.id ? 'bg-[#505050] text-white shadow-sm' : 'text-zinc-400 hover:bg-[#454545] hover:text-white'}`}
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                //if (window.innerWidth < 768) toggle();
                            }}
                            >
                                <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className='p-4 border-t border-[#4A4A4A]'> 
                        <div className='flex items-center gap-3 px-2 py-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-[#454545]'>
                            <div className='w-8 h-8 rounded-full bg-[#252525] border border-[#4A4A4A] flex items-center justify-center text-xs font-bold text-zinc-300'>
                                AD
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-sm font-medium text-zinc-200'>
                                    Administrador
                                </span>
                                <span className='text-[10px] text-zinc-500'>
                                    admin@empresa.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.aside>
        </>
    )
}

export default Sidebar;