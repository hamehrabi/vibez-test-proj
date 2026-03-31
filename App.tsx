import React, { useState } from 'react';
import { LayoutDashboard, Kanban, GitBranch, Play, Upload, User, Search, Bell, Settings, LogOut, CheckCircle2, Menu } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import PipelineBoard from './pages/PipelineBoard';
import PipelineMatrix from './pages/PipelineMatrix';
import Automations from './pages/Automations';
import AutomationBuilder from './pages/AutomationBuilder';
import FocusMode from './pages/FocusMode';
import ImportWizard from './pages/ImportWizard';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);

  // Focus Mode handles its own layout
  if (currentView === 'focus_mode') {
    return <FocusMode onExit={() => setCurrentView('dashboard')} />;
  }

  // Builder Mode handles its own layout mostly
  if (currentView === 'automation_builder') {
    return <AutomationBuilder onExit={() => setCurrentView('automations')} />;
  }
  
  // Import Mode handles its own layout
  if (currentView === 'import') {
     return <ImportWizard onExit={() => setCurrentView('dashboard')} />;
  }

  const handleNotImplemented = () => {
    alert("This feature is part of the full Pro version.");
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light">
      {/* Sidebar */}
      <aside 
        className={`flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      >
        <div className="flex items-center gap-3 px-6 py-6 h-20">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
             <GitBranch size={24} />
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col animate-fadeIn cursor-pointer" onClick={() => setCurrentView('dashboard')}>
              <h1 className="text-base font-bold leading-none text-slate-900">OutreachFlow</h1>
              <p className="text-xs text-slate-500 mt-1">Pro Edition</p>
            </div>
          )}
        </div>

        <nav className="flex flex-1 flex-col gap-2 px-3">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            isActive={currentView === 'dashboard'} 
            isOpen={isSidebarOpen}
            onClick={() => setCurrentView('dashboard')} 
          />
          <NavItem 
            icon={<Kanban size={20} />} 
            label="Pipeline Board" 
            isActive={currentView === 'pipeline_board'} 
            isOpen={isSidebarOpen}
            onClick={() => setCurrentView('pipeline_board')} 
          />
           <NavItem 
            icon={<User size={20} />} 
            label="Pipeline Matrix" 
            isActive={currentView === 'pipeline_matrix'} 
            isOpen={isSidebarOpen}
            onClick={() => setCurrentView('pipeline_matrix')} 
          />
          <NavItem 
            icon={<GitBranch size={20} />} 
            label="Automations" 
            isActive={currentView === 'automations'} 
            isOpen={isSidebarOpen}
            onClick={() => setCurrentView('automations')} 
          />
          <NavItem 
            icon={<Play size={20} />} 
            label="Focus Mode" 
            isActive={(currentView as ViewState) === 'focus_mode'} 
            isOpen={isSidebarOpen}
            onClick={() => setCurrentView('focus_mode')} 
          />
           <NavItem 
            icon={<Upload size={20} />} 
            label="Import Data" 
            isActive={(currentView as ViewState) === 'import'} 
            isOpen={isSidebarOpen}
            onClick={() => setCurrentView('import')} 
          />
        </nav>

        <div className="p-4 border-t border-gray-100">
           <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer ${!isSidebarOpen && 'justify-center'}`} onClick={handleNotImplemented}>
              <img src="https://picsum.photos/40/40" alt="User" className="size-9 rounded-full object-cover" />
              {isSidebarOpen && (
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-slate-900 truncate">Martyn</p>
                  <p className="text-xs text-slate-500 truncate">Admin Workspace</p>
                </div>
              )}
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg text-slate-500">
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
               <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search anything..." 
                 className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/50" 
               />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowLogModal(true)}
              className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm shadow-blue-200"
            >
              <CheckCircle2 size={16} />
              Quick Log
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>
            <button onClick={handleNotImplemented} className="p-2 hover:bg-gray-100 rounded-full text-slate-500 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button onClick={handleNotImplemented} className="p-2 hover:bg-gray-100 rounded-full text-slate-500">
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-auto bg-background-light p-6">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'pipeline_board' && <PipelineBoard />}
          {currentView === 'pipeline_matrix' && <PipelineMatrix />}
          {currentView === 'automations' && <Automations onEdit={() => setCurrentView('automation_builder')} />}
        </div>
        
        {/* Modal Overlay */}
        {showLogModal && (
          <div className="absolute inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={(e) => {
              if (e.target === e.currentTarget) setShowLogModal(false);
          }}>
             <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Log Activity</h3>
                      <p className="text-xs text-slate-500">Record a new interaction</p>
                    </div>
                  </div>
                  <button onClick={() => setShowLogModal(false)} className="text-slate-400 hover:text-slate-600">
                    <LogOut size={18} />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase">Organization</label>
                        <select className="w-full mt-1 bg-gray-50 border-gray-200 rounded-lg text-sm">
                           <option>Brighton Council</option>
                           <option>Manchester City</option>
                        </select>
                      </div>
                       <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase">Contact</label>
                        <select className="w-full mt-1 bg-gray-50 border-gray-200 rounded-lg text-sm">
                           <option>Martyn</option>
                        </select>
                      </div>
                   </div>
                   <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase">Summary</label>
                      <textarea className="w-full mt-1 bg-gray-50 border-gray-200 rounded-xl text-sm p-3 h-24 resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="What happened?"></textarea>
                   </div>
                   <div className="pt-4 flex justify-end gap-3">
                      <button onClick={() => setShowLogModal(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                      <button onClick={() => {
                          alert('Activity logged successfully!');
                          setShowLogModal(false);
                      }} className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-lg shadow-lg shadow-blue-500/20">Log Activity</button>
                   </div>
                </div>
             </div>
          </div>
        )}

      </main>
    </div>
  );
};

const NavItem = ({ icon, label, isActive, isOpen, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, isOpen: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-slate-500 hover:bg-gray-50 hover:text-slate-900'}`}
  >
    <span className={isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}>{icon}</span>
    {isOpen && <span className="whitespace-nowrap">{label}</span>}
  </button>
);

export default App;