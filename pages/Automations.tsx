import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Zap, Users, PlayCircle, Bolt } from 'lucide-react';
import { Automation } from '../types';

const initialAutomations: Automation[] = [
  { id: '1', name: 'New Prospect 30-Day Sequence', status: 'Active', enrolled: 1240, completed: 850, trigger: "When org enters status 'New Lead'" },
  { id: '2', name: 'Cold Lead Revival', status: 'Paused', enrolled: 45, completed: 12, trigger: "When no activity for 60 days" },
  { id: '3', name: 'Annual Renewal Reminder', status: 'Active', enrolled: 328, completed: 156, trigger: "When contract expiry date is in 90 days" },
];

const Automations: React.FC<{ onEdit: () => void }> = ({ onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAutomations = initialAutomations.filter(auto => {
     const matchesSearch = auto.name.toLowerCase().includes(searchTerm.toLowerCase());
     const matchesStatus = statusFilter === 'All' || auto.status === statusFilter;
     return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
        <div>
           <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <span className="hover:underline cursor-pointer">Home</span> / <span className="hover:underline cursor-pointer">Campaigns</span> / <span className="bg-gray-200 text-slate-900 px-2 py-0.5 rounded">Automations Manager</span>
           </div>
           <h1 className="text-4xl font-black text-slate-900">Automations</h1>
           <p className="text-slate-500 mt-2">Manage your sales outreach sequences and workflows.</p>
        </div>
        <button onClick={onEdit} className="bg-primary hover:bg-primary-dark text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2 active:scale-95 transition-transform">
           <Plus size={20} /> Create Automation
        </button>
      </div>

      <div className="flex gap-4 mb-6">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
                type="text" 
                placeholder="Search automations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary outline-none" 
            />
         </div>
         <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-48 py-3 px-4 rounded-xl border border-gray-200 bg-white font-medium cursor-pointer focus:ring-2 focus:ring-primary outline-none"
         >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
         </select>
      </div>

      <div className="space-y-4">
         {filteredAutomations.map(auto => (
            <div key={auto.id} onClick={onEdit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between hover:border-primary/30 transition-all group cursor-pointer hover:shadow-md">
               <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                     <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{auto.name}</h3>
                     <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${auto.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-slate-500'}`}>{auto.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                     <Bolt size={16} className="text-orange-500" />
                     <span>Trigger: {auto.trigger}</span>
                  </div>
               </div>
               
               <div className="flex items-center gap-8">
                  <div className="text-center">
                     <p className="text-xs text-slate-500 font-bold uppercase">Enrolled</p>
                     <p className="text-xl font-bold text-slate-900">{auto.enrolled}</p>
                  </div>
                  <div className="text-center">
                     <p className="text-xs text-slate-500 font-bold uppercase">Completed</p>
                     <p className="text-xl font-bold text-slate-900">{auto.completed}</p>
                  </div>
                  <div className="h-10 w-px bg-gray-200 mx-2"></div>
                  <div className="flex items-center gap-4">
                     <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="sr-only peer" checked={auto.status === 'Active'} readOnly />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                     </label>
                     <button className="p-2 text-slate-400 hover:bg-gray-50 rounded-lg" onClick={(e) => { e.stopPropagation(); alert('Options menu'); }}><MoreVertical size={20} /></button>
                  </div>
               </div>
            </div>
         ))}
         {filteredAutomations.length === 0 && (
             <div className="text-center py-12 text-slate-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                 No automations found matching your criteria.
             </div>
         )}
      </div>

      <div className="mt-12">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900">Start from a template</h3>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('View All Templates'); }} className="text-primary text-sm font-semibold hover:underline">View all templates</a>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TemplateCard title="Stakeholder Expansion" icon={<Users size={24} />} desc="Reach out to multiple contacts to find the decision maker." color="text-primary bg-blue-50" onClick={onEdit} />
            <TemplateCard title="Re-engagement" icon={<PlayCircle size={24} />} desc="Win back lost opportunities with a gentle nurture sequence." color="text-purple-600 bg-purple-50" onClick={onEdit} />
            <TemplateCard title="Inbound Demo" icon={<Zap size={24} />} desc="Immediate follow-up sequence when a prospect fills form." color="text-emerald-600 bg-emerald-50" onClick={onEdit} />
         </div>
      </div>
    </div>
  );
};

const TemplateCard = ({ title, icon, desc, color, onClick }: any) => (
  <div onClick={onClick} className="bg-white p-6 rounded-xl border border-dashed border-gray-300 hover:border-solid hover:border-primary hover:shadow-md transition-all cursor-pointer h-full flex flex-col group">
      <div className={`size-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${color} group-hover:bg-primary group-hover:text-white`}>
         {icon}
      </div>
      <h4 className="font-bold text-lg mb-2 text-slate-900">{title}</h4>
      <p className="text-sm text-slate-500 mb-6 flex-1">{desc}</p>
      <div className="flex items-center gap-2 text-sm font-bold text-primary mt-auto">
         Use Template <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
  </div>
);

export default Automations;