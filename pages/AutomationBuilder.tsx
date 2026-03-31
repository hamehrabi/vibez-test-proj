import React, { useState } from 'react';
import { Play, Save, ZoomIn, ZoomOut, UserPlus, Mail, Clock, Split, CheckSquare } from 'lucide-react';

interface NodeData {
    id: number;
    x: number;
    y: number;
    color: string;
    icon: React.ReactNode;
    title: string;
    sub: string;
    hasSettings?: boolean;
}

const initialNodes: NodeData[] = [
    { id: 1, x: 60, y: 110, color: "green", icon: <UserPlus size={20} />, title: "Enters Prospect", sub: "List: UK Councils" },
    { id: 2, x: 380, y: 110, color: "orange", icon: <Clock size={24} />, title: "Wait 1 Day", sub: "Delay", hasSettings: true },
    { id: 3, x: 736, y: 110, color: "yellow", icon: <Split size={24} />, title: "Has Replied?", sub: "Check status" },
    { id: 4, x: 1092, y: 110, color: "purple", icon: <CheckSquare size={20} />, title: "Create Task", sub: "Call prospect" },
];

const AutomationBuilder: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [nodes, setNodes] = useState<NodeData[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<number | null>(2);

  const addNode = (color: string, icon: React.ReactNode, title: string, sub: string) => {
      // Simple logic to place new node somewhat visible
      const newNode: NodeData = {
          id: Date.now(),
          x: 100 + (nodes.length * 20),
          y: 250,
          color,
          icon,
          title,
          sub
      };
      setNodes([...nodes, newNode]);
      setSelectedNode(newNode.id);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-16 flex items-center justify-between border-b border-gray-200 px-6 shrink-0 z-20 bg-white">
        <div className="flex items-center gap-4">
           <button onClick={onExit} className="size-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 text-slate-600 transition-colors">←</button>
           <div>
              <h1 className="text-lg font-bold">New Client Onboarding Flow</h1>
              <p className="text-xs text-slate-500">Last saved just now</p>
           </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600">Status</span>
              <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer" onClick={() => alert('Toggle status')}><div className="absolute left-1 top-1 size-3 bg-white rounded-full"></div></div>
           </div>
           <div className="h-6 w-px bg-gray-200"></div>
           <div className="flex gap-2">
              <button onClick={() => alert('Starting simulation test...')} className="flex items-center gap-2 px-4 h-9 rounded-lg bg-gray-100 text-slate-700 text-sm font-semibold hover:bg-gray-200 transition-colors active:scale-95">
                 <Play size={16} /> Test
              </button>
              <button onClick={() => alert('Workflow saved successfully!')} className="flex items-center gap-2 px-4 h-9 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-blue-600 shadow-sm transition-colors active:scale-95">
                 <Save size={16} /> Save Flow
              </button>
           </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
         {/* Sidebar Palette */}
         <aside className="w-64 border-r border-gray-200 bg-white flex flex-col z-10">
            <div className="p-4 border-b border-gray-200">
               <input type="text" placeholder="Search nodes..." className="w-full bg-gray-50 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none transition-shadow" />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
               <NodeGroup title="Triggers">
                  <PaletteNode 
                    icon={<UserPlus size={18} />} 
                    color="bg-green-100 text-green-600" 
                    label="New Prospect" 
                    sub="From CRM list" 
                    onClick={() => addNode("green", <UserPlus size={20} />, "New Prospect", "List: UK Councils")}
                  />
               </NodeGroup>
               <NodeGroup title="Actions">
                  <PaletteNode 
                    icon={<Mail size={18} />} 
                    color="bg-blue-100 text-blue-600" 
                    label="Send Email" 
                    sub="Gmail / Outlook" 
                    onClick={() => addNode("blue", <Mail size={20} />, "Send Email", "Template: Intro")}
                  />
                  <PaletteNode 
                    icon={<CheckSquare size={18} />} 
                    color="bg-purple-100 text-purple-600" 
                    label="Create Task" 
                    sub="Internal to-do" 
                    onClick={() => addNode("purple", <CheckSquare size={20} />, "Create Task", "Assign to Owner")}
                  />
               </NodeGroup>
               <NodeGroup title="Logic">
                  <PaletteNode 
                    icon={<Clock size={18} />} 
                    color="bg-orange-100 text-orange-600" 
                    label="Wait / Delay" 
                    sub="Pause workflow" 
                    onClick={() => addNode("orange", <Clock size={24} />, "Wait", "Duration: 1 Day")}
                  />
                  <PaletteNode 
                    icon={<Split size={18} />} 
                    color="bg-yellow-100 text-yellow-600" 
                    label="Condition" 
                    sub="True / False branch" 
                    onClick={() => addNode("yellow", <Split size={24} />, "Condition", "Check Property")}
                  />
               </NodeGroup>
            </div>
         </aside>

         {/* Canvas */}
         <main className="flex-1 relative bg-slate-50 overflow-hidden cursor-grab active:cursor-grabbing">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* SVG Lines - Static for demo but behind nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
               <path d="M 280 150 C 330 150, 330 150, 380 150" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
               <path d="M 636 150 C 686 150, 686 150, 736 150" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
               <path d="M 992 150 C 1042 150, 1042 150, 1092 150" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
               <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                     <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                  </marker>
               </defs>
            </svg>

            {/* Nodes */}
            {nodes.map(node => (
                <CanvasNode 
                    key={node.id}
                    x={node.x} 
                    y={node.y} 
                    color={node.color} 
                    icon={node.icon} 
                    title={node.title} 
                    sub={node.sub} 
                    selected={selectedNode === node.id}
                    hasSettings={node.hasSettings}
                    onClick={() => setSelectedNode(node.id)}
                />
            ))}

            {/* Controls */}
            <div className="absolute bottom-6 left-6 bg-white p-1 rounded-lg shadow-lg border border-gray-200 flex flex-col gap-1">
               <button onClick={() => alert('Zoom In')} className="p-1.5 hover:bg-gray-100 rounded text-slate-600"><ZoomIn size={20} /></button>
               <button onClick={() => alert('Zoom Out')} className="p-1.5 hover:bg-gray-100 rounded text-slate-600"><ZoomOut size={20} /></button>
            </div>
         </main>

         {/* Config Panel */}
         <aside className={`absolute right-0 top-0 h-full w-80 bg-white border-l border-gray-200 flex flex-col z-20 shadow-xl transition-transform duration-300 ease-in-out ${selectedNode ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
               <h2 className="font-bold text-slate-900">Configure Node</h2>
               <button className="text-slate-400 hover:text-slate-600" onClick={() => setSelectedNode(null)}>×</button>
            </div>
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
               <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Settings</label>
                  <p className="text-xs text-slate-500">Configuration options available for selected node.</p>
                  <div className="flex gap-2">
                     <input type="text" placeholder="Value" className="w-full p-2 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none text-sm" />
                  </div>
               </div>
               <div className="pt-4 border-t border-gray-100 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                     <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" />
                     <div>
                        <span className="block text-sm font-medium text-slate-900">Enable features</span>
                        <span className="text-xs text-slate-500">Allow advanced processing</span>
                     </div>
                  </label>
               </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-3">
               <button onClick={() => alert('Changes applied')} className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm">Apply</button>
               <button onClick={() => setSelectedNode(null)} className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg font-semibold text-sm text-slate-700 transition-colors">Cancel</button>
            </div>
         </aside>
      </div>
    </div>
  );
};

const NodeGroup = ({ title, children }: any) => (
  <div>
     <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{title}</h3>
     <div className="flex flex-col gap-2">{children}</div>
  </div>
);

const PaletteNode = ({ icon, color, label, sub, onClick }: any) => (
  <div onClick={onClick} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:border-primary hover:shadow-sm cursor-grab active:cursor-grabbing transition-all select-none">
     <div className={`size-8 rounded-md flex items-center justify-center ${color}`}>{icon}</div>
     <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-[10px] text-slate-500">{sub}</p>
     </div>
  </div>
);

const CanvasNode = ({ x, y, color, icon, title, sub, selected, hasSettings, onClick }: any) => {
   const colors: any = {
      green: "bg-green-100 text-green-600 border-green-500",
      orange: "bg-orange-100 text-orange-600 border-orange-400",
      yellow: "bg-yellow-100 text-yellow-600 border-yellow-400",
      purple: "bg-purple-100 text-purple-600 border-purple-500",
      blue: "bg-blue-100 text-blue-600 border-blue-500"
   };
   
   return (
      <div 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className={`absolute w-64 bg-white rounded-lg shadow-md border ${selected ? 'border-2 border-primary ring-4 ring-primary/10' : 'border-gray-200'} z-10 cursor-pointer hover:-translate-y-1 transition-transform`}
        style={{ top: y, left: x }}
      >
         <div className={`h-1.5 w-full rounded-t-lg ${colors[color]?.split(' ')[2]?.replace('border-', 'bg-') || 'bg-gray-500'}`}></div>
         <div className="p-4 flex justify-between items-start">
            <div className="flex gap-3">
               <div className={`size-10 rounded-md flex items-center justify-center shrink-0 ${colors[color]?.split(' ').slice(0, 2).join(' ') || 'bg-gray-100'}`}>
                  {icon}
               </div>
               <div>
                  <p className="font-bold text-slate-900">{title}</p>
                  <p className="text-xs text-slate-500">{sub}</p>
               </div>
            </div>
         </div>
         {hasSettings && (
             <div className="mx-4 mb-3 bg-gray-50 p-2 rounded text-xs text-slate-500 flex items-center gap-2">
                <span>ℹ️</span> Skipping weekends enabled
             </div>
         )}
         {/* Handles */}
         <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 size-3 bg-white border-2 border-slate-400 rounded-full"></div>
         <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 size-3 bg-white border-2 border-slate-400 rounded-full"></div>
      </div>
   )
}

export default AutomationBuilder;