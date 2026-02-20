import { Layers, Network, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuthStore } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isOpen: boolean;
}

function Sidebar({ activeTab, setActiveTab, isOpen }: SidebarProps) {

    const email = useAuthStore((state) => state.email);
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate();

    const menuItems: any = [
        { id: 'areas', label: 'Áreas e Setores', icon: Layers},
        { id: 'processes', label: 'Mapa de Processo', icon: Network}
    ];

    return(
        <>
            <motion.aside>
                <div className={`fixed top-0 left-0 h-full w-64 bg-[#383838] border-r border-[#4A4A4A] z-30 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className='flex items-center justify-between p-5 border-b border-[#4A4A4A]'>
                        <div className='flex items-center gap-3'>
                            <span className='text-lg font-bold text-white tracking-tight'>FluxoMap</span>
                        </div>
                    </div>

                    <nav className='p-3 space-y-1 flex-1'>
                        {menuItems.map((item: any) => (
                            <button
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group text-sm font-medium ${activeTab === item.id ? 'bg-[#505050] text-white shadow-sm' : 'text-zinc-400 hover:bg-[#454545] hover:text-white'}`}
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                            }}
                            >
                                <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className='p-1 border-t border-[#4A4A4A]   '> 
                        <button 
                        onClick={() => {
                            logout();
                            navigate('/');
                        }}
                        className='flex items-center gap-3 px-2 py-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-[#454545]'>
                            <div className='w-8 h-8 rounded-full bg-[#252525] border border-[#4A4A4A] flex items-center justify-center text-xs font-bold text-zinc-300'>
                                {email?.charAt(0).toUpperCase()}
                            </div>
                            <span className='text-sm font-medium text-zinc-200'>
                                {email}
                            </span>
                            
                            <LogOut size={18}/>
                            
                        </button>
                    </div>
                </div>
            </motion.aside>
        </>
    )
}

export default Sidebar;