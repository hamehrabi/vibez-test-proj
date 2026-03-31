import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';
import { TrendingUp, Users, Send, CheckCircle2, MoreHorizontal } from 'lucide-react';

const data = [
  { name: '0-10', leads: 45 },
  { name: '10-20', leads: 120 },
  { name: '20-30', leads: 210 },
  { name: '30-40', leads: 350 },
  { name: '40-50', leads: 480 },
  { name: '50-60', leads: 390 },
  { name: '60-70', leads: 250 },
  { name: '70-80', leads: 100 },
];

const activityData = [
  { name: 'Email', value: 500, color: '#3067df' },
  { name: 'Phone', value: 120, color: '#38bdf8' },
  { name: 'LinkedIn', value: 50, color: '#818cf8' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h2>
           <p className="text-slate-500 mt-1">Overview of outreach performance</p>
        </div>
        <div className="flex gap-3">
           <select 
             onChange={(e) => alert(`Time range changed to: ${e.target.value}`)}
             className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 font-medium shadow-sm cursor-pointer hover:border-primary outline-none focus:ring-2 focus:ring-primary/50"
           >
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>This Year</option>
           </select>
           <button onClick={() => alert('Report download started...')} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-primary/20 transition-all active:scale-95">
              Export Report
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <StatCard title="Total Orgs" value="1,240" change="+12%" icon={<Users size={20} />} trend="up" />
         <StatCard title="Velocity" value="14 Days" change="0%" icon={<Send size={20} />} trend="neutral" />
         <StatCard title="Response Rate" value="4.2%" change="-0.8%" icon={<CheckCircle2 size={20} />} trend="down" />
         <StatCard title="Pending Tasks" value="24" change="3 Urgent" icon={<TrendingUp size={20} />} trend="neutral" urgent />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex justify-between items-center mb-6">
              <div>
                 <h3 className="text-lg font-bold text-slate-900">Pipeline Funnel</h3>
                 <p className="text-sm text-slate-500">Conversion rates per stage</p>
              </div>
              <button onClick={() => alert('View funnel options')} className="text-slate-400 hover:text-primary"><MoreHorizontal /></button>
           </div>
           
           <div className="space-y-4">
              <FunnelRow stage="Prospects" count={1000} percent={100} color="bg-blue-100" textColor="text-primary" width="100%" />
              <FunnelRow stage="Contacted" count={400} percent={40} color="bg-blue-100" textColor="text-primary" width="75%" indent />
              <FunnelRow stage="Replies" count={50} percent={5} color="bg-blue-100" textColor="text-primary" width="50%" indent />
              <FunnelRow stage="Meetings" count={10} percent={1} color="border-2 border-primary bg-primary/10" textColor="text-primary" width="25%" indent />
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="mb-6">
                 <h3 className="text-lg font-bold text-slate-900">Activity</h3>
                 <p className="text-sm text-slate-500">Volume by channel</p>
            </div>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                   <Bar dataKey="value" radius={[4, 4, 0, 0]} onClick={() => alert('View activity details')}>
                      {activityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} style={{ cursor: 'pointer' }} />
                      ))}
                   </Bar>
                   <Tooltip cursor={{fill: 'transparent'}} />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
         <div className="flex justify-between items-center mb-6">
             <div>
                 <h3 className="text-lg font-bold text-slate-900">Score Distribution</h3>
                 <p className="text-sm text-slate-500">Engagement scores</p>
              </div>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-xs text-slate-500"><div className="size-3 rounded-full bg-primary" /> Active</div>
              </div>
         </div>
         <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barGap={2}>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} dy={10} />
                 <Tooltip 
                   cursor={{fill: '#f1f5f9'}}
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                 />
                 <Bar dataKey="leads" fill="#3067df" radius={[2, 2, 0, 0]} onClick={() => alert('Filtering by score range...')}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fillOpacity={index === 4 ? 1 : 0.3 + (index * 0.05)} style={{ cursor: 'pointer' }} />
                    ))}
                 </Bar>
              </BarChart>
            </ResponsiveContainer>
         </div>
      </div>

    </div>
  );
};

const StatCard = ({ title, value, change, icon, trend, urgent }: any) => (
  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group cursor-pointer" onClick={() => alert(`Showing details for ${title}`)}>
     <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <span className="text-primary/60 group-hover:text-primary transition-colors">{icon}</span>
     </div>
     <div className="flex items-end gap-2 mt-2">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <span className={`text-xs font-bold px-1.5 py-0.5 rounded flex items-center mb-1 ${
          urgent ? 'bg-amber-100 text-amber-700' : 
          trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 
          trend === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-gray-100 text-slate-500'
        }`}>
           {change}
        </span>
     </div>
  </div>
);

const FunnelRow = ({ stage, count, percent, color, textColor, width, indent }: any) => (
  <div className="relative flex items-center group h-12 cursor-pointer hover:bg-slate-50 rounded-lg pr-2 transition-colors" onClick={() => alert(`View ${stage} deals`)}>
     <div className="w-32 text-sm font-medium text-slate-500 pl-2">{stage}</div>
     <div className={`flex-1 h-full relative ${indent ? 'pl-8' : ''}`}>
        <div className={`absolute inset-y-0 left-0 rounded-lg transition-all duration-500 ${color} group-hover:brightness-95`} style={{ width }}></div>
        <div className={`absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-bold ${textColor}`}>{count.toLocaleString()}</div>
     </div>
     <div className="w-16 text-right text-xs font-medium text-slate-400">{percent}%</div>
  </div>
);

export default Dashboard;