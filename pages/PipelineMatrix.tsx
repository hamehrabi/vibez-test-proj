import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const PipelineMatrix: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pipeline Matrix</h1>
          <p className="text-slate-500 text-sm">Manage deal progression across lifecycle phases.</p>
        </div>
        <button onClick={() => alert('Create new deal modal')} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-primary-dark transition-colors active:scale-95">New Deal</button>
      </div>

      <div className="flex-1 overflow-auto border border-gray-200 rounded-xl bg-white shadow-sm">
        <table className="w-full border-collapse min-w-[1000px]">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="p-4 text-left border-b border-r border-gray-200 w-[200px] sticky left-0 bg-gray-50 z-20">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase text-slate-500">Phase</span>
                  <span className="text-xs font-normal text-slate-400">vs Status</span>
                </div>
              </th>
              {['Prospect', 'Contacted', 'Meeting', 'Negotiation', 'Closed'].map((header, i) => (
                <th key={header} className="p-4 text-left border-b border-r border-gray-200 min-w-[240px]">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700">{header}</span>
                    <span className="bg-gray-200 text-slate-600 text-[10px] px-1.5 rounded-full">{10 - i * 2}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
             <MatrixRow title="Awareness" value="£1.2M" color="bg-blue-400" progress="w-1/4" />
             <MatrixRow title="Interest" value="£850k" color="bg-blue-500" progress="w-1/3">
                <MatrixCard col={2} title="Bristol City" value="£95,000" tag="Discovery" />
             </MatrixRow>
             <MatrixRow title="Evaluation" value="£450k" color="bg-primary" progress="w-1/2">
                <MatrixCard col={3} title="Manchester CC" value="£210,000" tag="Tech Review" color="teal" />
                <MatrixCard col={4} title="Sheffield City" value="£180,000" tag="Pricing" color="indigo" />
             </MatrixRow>
             <MatrixRow title="Pilot" value="£200k" color="bg-indigo-500" progress="w-2/3">
                 <MatrixCard col={4} title="Westminster CC" value="£200,000" tag="Success Plan" color="green" success />
             </MatrixRow>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MatrixRow = ({ title, value, color, progress, children }: any) => (
  <tr className="group hover:bg-gray-50/50">
    <th className="p-4 text-left border-r border-gray-200 align-top bg-white sticky left-0 group-hover:bg-gray-50/50 transition-colors">
       <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-slate-900">{title}</span>
          <span className="text-xs text-slate-500">{value} Pipeline</span>
          <div className="h-1 w-full bg-gray-100 rounded-full mt-2 overflow-hidden">
             <div className={`h-full ${color} ${progress} rounded-full`}></div>
          </div>
       </div>
    </th>
    {[0, 1, 2, 3, 4].map((i) => (
      <td key={i} className="p-3 border-r border-gray-200 align-top bg-slate-50/30 h-32 relative hover:bg-slate-100/50 transition-colors">
         {React.Children.map(children, child => {
            if (React.isValidElement(child) && (child.props as any).col === i) {
               return child;
            }
            return null;
         })}
      </td>
    ))}
  </tr>
);

const MatrixCard = ({ title, value, tag, color = "blue", success }: any) => {
    const colorClasses: Record<string, string> = {
        blue: "bg-blue-100 text-blue-700",
        teal: "bg-teal-100 text-teal-700",
        indigo: "bg-indigo-100 text-indigo-700",
        green: "bg-green-100 text-green-700"
    };

    return (
        <div onClick={() => alert(`Details for ${title}`)} className={`bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all mb-2 ${success ? 'border-l-4 border-l-green-500' : ''}`}>
            <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${colorClasses[color]}`}>{tag}</span>
                <button 
                  className="text-slate-300 hover:text-slate-500 p-1 -mr-1"
                  onClick={(e) => { e.stopPropagation(); alert('Card actions menu'); }}
                >
                    <MoreHorizontal size={14} />
                </button>
            </div>
            <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
            <p className="text-xs font-medium text-primary mt-0.5">{value}</p>
        </div>
    )
}

export default PipelineMatrix;