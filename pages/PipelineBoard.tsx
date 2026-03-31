import React, { useState } from 'react';
import { MoreHorizontal, Plus, Search, Filter, Phone, Mail } from 'lucide-react';
import { Deal } from '../types';

const initialDeals: Deal[] = [
  { id: '1', name: 'Manchester City Council', value: 45000, score: 'Low', stage: 'Prospect', owner: 'M', avatar: 'https://picsum.photos/30/30?1', date: 'Apr 24' },
  { id: '2', name: 'Liverpool City Council', value: 12500, score: 'Med', stage: 'Prospect', owner: 'M', avatar: 'https://picsum.photos/30/30?2', date: 'Overdue', status: 'overdue' },
  { id: '3', name: 'Bristol City Council', value: 75000, score: 'High', stage: 'Engaged', owner: 'M', avatar: 'https://picsum.photos/30/30?3', date: 'Tomorrow' },
  { id: '4', name: 'Leeds City Council', value: 95000, score: 'High', stage: 'Committed', owner: 'M', avatar: 'https://picsum.photos/30/30?4', date: 'May 01' },
];

const PipelineBoard: React.FC = () => {
  const [view, setView] = useState<'board' | 'list'>('board');
  const [filterText, setFilterText] = useState('');
  
  // Filter deals based on the search text
  const filteredDeals = initialDeals.filter(deal => 
    deal.name.toLowerCase().includes(filterText.toLowerCase()) || 
    deal.owner.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-6 shrink-0">
         <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-slate-900">Pipeline</h1>
            <span className="bg-white border border-gray-200 px-2 py-0.5 rounded text-xs font-semibold text-slate-500">{filteredDeals.length} Deals</span>
         </div>
         <button onClick={() => alert('Open Create Deal Modal')} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 active:scale-95 transition-transform">
            <Plus size={16} /> Add Organization
         </button>
      </div>

      <div className="flex items-center justify-between gap-4 mb-4 shrink-0">
          <div className="flex items-center gap-3">
             <div className="flex bg-white border border-gray-200 rounded-lg p-1">
                <button onClick={() => setView('board')} className={`px-3 py-1 rounded text-sm font-semibold transition-all ${view === 'board' ? 'bg-gray-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-gray-50'}`}>Board</button>
                <button onClick={() => setView('list')} className={`px-3 py-1 text-sm font-medium rounded transition-all ${view === 'list' ? 'bg-gray-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-gray-50'}`}>List</button>
             </div>
             <div className="relative w-64">
                <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Filter by name or owner..." 
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)} 
                    className="pl-9 pr-4 py-1.5 w-full border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none" 
                />
             </div>
          </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
         {view === 'board' ? (
             <div className="flex h-full gap-6 min-w-[1000px]">
                <Column title="Prospect" count={filteredDeals.filter(d => d.stage === 'Prospect').length} color="bg-slate-400" deals={filteredDeals.filter(d => d.stage === 'Prospect')} />
                <Column title="Engaged" count={filteredDeals.filter(d => d.stage === 'Engaged').length} color="bg-blue-500" deals={filteredDeals.filter(d => d.stage === 'Engaged')} isDropTarget />
                <Column title="Committed" count={filteredDeals.filter(d => d.stage === 'Committed').length} color="bg-emerald-500" deals={filteredDeals.filter(d => d.stage === 'Committed')} />
                <Column title="No-Go" count={filteredDeals.filter(d => d.stage === 'No-Go').length} color="bg-rose-400" deals={filteredDeals.filter(d => d.stage === 'No-Go')} />
             </div>
         ) : (
             <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-8 text-center text-slate-500">
                    <p>List view mocked for demonstration.</p>
                    <button onClick={() => setView('board')} className="text-primary hover:underline mt-2">Switch back to Board</button>
                </div>
             </div>
         )}
      </div>
    </div>
  );
};

const Column = ({ title, count, color, deals, isDropTarget }: any) => (
  <div className="flex flex-col w-1/4 h-full min-w-[280px]">
     <div className="flex items-center justify-between mb-4 px-1 cursor-pointer hover:bg-slate-50 p-1 rounded">
        <div className="flex items-center gap-2">
           <div className={`size-2.5 rounded-full ${color}`}></div>
           <h3 className="font-bold text-sm uppercase text-slate-900">{title}</h3>
           <span className="bg-gray-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">{count}</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); alert(`Options for ${title} column`); }} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200"><MoreHorizontal size={16} /></button>
     </div>
     
     <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2">
        {isDropTarget && (
           <div className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-xl h-24 flex flex-col items-center justify-center text-primary/60 mb-2 animate-pulse cursor-pointer" onClick={() => alert('Simulating drop...')}>
              <span className="text-xs font-semibold">Drop here</span>
           </div>
        )}
        {deals.map((deal: Deal) => (
           <div key={deal.id} onClick={() => alert(`Opening details for ${deal.name}`)} className={`group bg-white p-4 rounded-xl shadow-sm border border-transparent hover:shadow-md transition-all cursor-pointer border-l-4 ${deal.status === 'overdue' ? 'border-l-rose-500' : 'border-l-transparent'}`}>
              <div className="flex justify-between items-start mb-2">
                 <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{deal.name}</h4>
                    <p className="text-xs text-slate-500">£{deal.value.toLocaleString()} Deal</p>
                 </div>
                 <button className="text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); alert('Options menu'); }}><MoreHorizontal size={16} /></button>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                 <span className={`px-2 py-1 rounded text-[10px] font-bold border ${deal.score === 'High' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : deal.score === 'Med' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-gray-100 text-slate-600 border-gray-200'}`}>
                    Score: {deal.score}
                 </span>
                 <div className="flex -space-x-2">
                    <img src={deal.avatar} alt="Owner" className="size-6 rounded-full border-2 border-white" />
                 </div>
              </div>

              <div className="h-px bg-gray-100 w-full my-3"></div>

              <div className="flex justify-between items-center text-xs text-slate-500">
                 <div className="flex gap-2">
                    <Mail size={14} className="hover:text-primary" />
                    {deal.status === 'overdue' && <Phone size={14} className="text-rose-500 hover:text-rose-700" />}
                 </div>
                 <span className={`font-medium ${deal.status === 'overdue' ? 'text-rose-500 flex items-center gap-1' : ''}`}>
                   {deal.status === 'overdue' && <span className="material-symbols-outlined text-[14px]">warning</span>}
                   {deal.date}
                 </span>
              </div>
           </div>
        ))}
     </div>
  </div>
);

export default PipelineBoard;