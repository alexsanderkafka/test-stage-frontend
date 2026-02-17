import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import AreaManager from './pages/AreaManager';
import ProcessView from './pages/ProcessView.tsx';
import Sidebar from './navigation/Sidebar.tsx';
import { motion, AnimatePresence } from 'motion/react';

function App(){

  const [activeTab, setActiveTab] = useState<string>('areas');
  //const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function renderContent() {
    switch (activeTab) {
      case 'areas':
        return <AreaManager />;
      case 'processes':
        return <ProcessView />;
      default:
        return <AreaManager />;
    }
  }


  return (
    <div className='flex h-screen bg-[#252525] text-white font-sans overflow-hidden'>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={true} />

      <main className='flex-1 flex flex-col overflow-hidden relative'>
        <AnimatePresence mode='wait'>
          <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className='flex-1 h-full overflow-hidden'
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
