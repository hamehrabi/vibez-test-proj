import React, { useState } from 'react';
import { Timer, LogOut, CheckCircle, Linkedin, History, FileText, ArrowLeft, ArrowRight, Bold, Italic, Link } from 'lucide-react';

const FocusMode: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [complete, setComplete] = useState(false);

  const handleComplete = () => {
    setComplete(true);
    setTimeout(() => {
        onExit();
    }, 1000);
  }

  if (complete) {
      return (
          <div className="min-h-screen bg-emerald-500 flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
              <div className="bg-white/20 p-8 rounded-full mb-6">
                 <CheckCircle size={64} />
              </div>
              <h1 className="text-4xl font-black mb-2">Task Complete!</h1>
              <p className="text-emerald-100">Redirecting to dashboard...</p>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
       <header className="h-18 bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3 sticky top-0 z-30">
          <div className="flex flex-col w-64 gap-1.5">
             <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Task 3 of 10</span>
                <span>30%</span>
             </div>
             <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[30%]"></div>
             </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-3 bg-gray-100 px-5 py-2 rounded-full cursor-default">
             <Timer size={20} className="text-primary" />
             <span className="text-slate-900 font-mono font-bold text-lg tracking-widest">24:58</span>
          </div>

          <button onClick={onExit} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
             <span className="text-sm font-semibold">Exit Focus Mode</span>
             <LogOut size={18} />
          </button>
       </header>

       <main className="flex-1 overflow-y-auto pb-32">
          <div className="max-w-[960px] mx-auto py-8 px-4 flex flex-col gap-6">
             <div className="flex flex-col items-center gap-4 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="relative">
                   <img src="https://picsum.photos/120/120" alt="Martyn" className="size-28 rounded-full border-4 border-white shadow-lg object-cover" />
                   <div className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-sm">
                      <div className="size-3 bg-green-500 rounded-full"></div>
                   </div>
                </div>
                <div className="text-center space-y-1">
                   <h1 className="text-3xl font-black text-slate-900">Martyn</h1>
                   <p className="text-lg text-slate-500">Head of Procurement at <span className="font-semibold text-slate-900">Leeds City Council</span></p>
                   <p className="text-sm text-slate-400">United Kingdom · Local Government</p>
                </div>
             </div>

             <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-5 relative overflow-hidden group">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0077b5]"></div>
                 <div className="size-14 rounded-xl bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5] shrink-0">
                    <Linkedin size={32} />
                 </div>
                 <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">Send LinkedIn Follow-up</h3>
                    <p className="text-slate-500 text-sm mt-1">Suggested action based on recent activity: <span className="font-medium text-slate-900">Email Open</span></p>
                 </div>
                 <button onClick={() => alert('Opening LinkedIn in new tab...')} className="bg-[#0077b5] hover:bg-[#006097] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md flex items-center gap-2 active:scale-95 transition-transform">
                    Open LinkedIn <ArrowRight size={16} />
                 </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                   <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
                      <History size={18} className="text-slate-400" />
                      <span className="text-xs font-bold uppercase text-slate-500">Last Interaction</span>
                   </div>
                   <div className="flex gap-4">
                      <div className="flex flex-col items-center mt-1">
                         <div className="size-2.5 rounded-full bg-primary ring-4 ring-primary/10"></div>
                         <div className="w-0.5 h-full bg-gray-100 mt-1 min-h-[20px]"></div>
                      </div>
                      <div>
                         <p className="font-medium text-sm text-slate-900">Sent 'Intro to Council Solutions' email</p>
                         <p className="text-xs text-slate-500 mt-1">Jan 12, 2024 · Opened 2 days ago</p>
                      </div>
                   </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                   <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                         <FileText size={18} className="text-slate-400" />
                         <span className="text-xs font-bold uppercase text-slate-500">Relationship Notes</span>
                      </div>
                      <button onClick={() => alert('Edit notes modal')} className="text-primary text-xs font-medium hover:underline">Edit</button>
                   </div>
                   <ul className="space-y-3">
                      <li className="flex gap-3 text-sm text-slate-900"><span className="text-slate-300">•</span> Interested in budget optimization for Q2.</li>
                      <li className="flex gap-3 text-sm text-slate-900"><span className="text-slate-300">•</span> Mentioned "Project Green" initiative.</li>
                   </ul>
                </div>
             </div>

             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-primary">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 uppercase">Message Template</span>
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">FOLLOW-UP #2</span>
                   </div>
                   <button onClick={() => alert('Change template modal')} className="text-primary text-xs font-bold hover:underline">Change Template</button>
                </div>
                <textarea className="w-full h-48 p-5 bg-transparent border-0 focus:ring-0 resize-none text-base text-slate-800" defaultValue={`Hi Martyn,\n\nFollowing up on my previous note regarding the Leeds City Council budget optimization goals for Q2.\n\nI'd love to share how other councils are handling the recent compliance changes.\n\nBest,\n[Your Name]`} />
                <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 flex gap-1">
                   <button onClick={() => alert('Text made bold')} className="p-1.5 rounded hover:bg-gray-200 text-slate-500"><Bold size={16} /></button>
                   <button onClick={() => alert('Text italicized')} className="p-1.5 rounded hover:bg-gray-200 text-slate-500"><Italic size={16} /></button>
                   <button onClick={() => alert('Link inserted')} className="p-1.5 rounded hover:bg-gray-200 text-slate-500"><Link size={16} /></button>
                </div>
             </div>
          </div>
       </main>

       <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
          <div className="max-w-[960px] mx-auto flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-3 w-full sm:w-auto">
                <button onClick={() => alert('Log activity modal')} className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-gray-200 text-slate-900 font-semibold text-sm hover:bg-gray-50">Log Activity</button>
                <button onClick={() => alert('Snoozed for 2 days')} className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-gray-200 text-slate-900 font-semibold text-sm hover:bg-gray-50">Snooze</button>
                <button onClick={() => { if(confirm('Are you sure you want to skip?')) onExit(); }} className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-gray-200 text-slate-400 font-semibold text-sm hover:text-red-600 hover:bg-red-50 hover:border-red-200">Skip</button>
             </div>
             <button onClick={handleComplete} className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2.5 active:translate-y-0.5 transition-all">
                <CheckCircle size={24} />
                <span>Complete Task</span>
             </button>
          </div>
       </footer>
    </div>
  );
};

export default FocusMode;