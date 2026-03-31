import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Upload, AlertTriangle, ArrowRight as ArrowRightSm, CheckCircle } from 'lucide-react';

const ImportWizard: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [step, setStep] = useState(2); // Start at mapping for demo

  const handleNext = () => {
      if (step < 4) {
          setStep(step + 1);
      } else {
          onExit();
      }
  }

  const handleBack = () => {
      if (step > 1) {
          setStep(step - 1);
      } else {
          onExit();
      }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light">
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
         <div className="flex items-center gap-4">
            <button onClick={onExit} className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100"><ArrowLeft size={20} /></button>
            <h2 className="text-lg font-bold text-slate-900">Import Data</h2>
         </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
         <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col h-[80vh]">
            <div className="p-8 border-b border-gray-200 bg-white z-10">
               <div className="flex items-center justify-between mb-8 relative">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
                  <Step number={1} label="Upload" status={step > 1 ? "completed" : step === 1 ? "active" : "pending"} />
                  <Step number={2} label="Map Columns" status={step > 2 ? "completed" : step === 2 ? "active" : "pending"} />
                  <Step number={3} label="Review" status={step > 3 ? "completed" : step === 3 ? "active" : "pending"} />
                  <Step number={4} label="Import" status={step === 4 ? "active" : "pending"} />
               </div>
               {step === 2 && (
                   <>
                        <h1 className="text-2xl font-bold text-slate-900">Map your columns</h1>
                        <p className="text-slate-500 text-sm mt-1">Match the columns from your uploaded CSV "leads_uk_q3.csv" to OutreachFlow fields.</p>
                   </>
               )}
               {step !== 2 && (
                   <>
                        <h1 className="text-2xl font-bold text-slate-900">{step === 1 ? 'Upload File' : step === 3 ? 'Review Data' : 'Importing...'}</h1>
                        <p className="text-slate-500 text-sm mt-1">Demonstration mode.</p>
                   </>
               )}
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-slate-50">
               {step === 2 ? (
                   <>
                       <div className="grid grid-cols-12 gap-4 px-4 pb-2 text-xs font-semibold uppercase text-slate-500 border-b border-gray-200 mb-2">
                          <div className="col-span-5">File Column (CSV)</div>
                          <div className="col-span-1"></div>
                          <div className="col-span-6">OutreachFlow Field</div>
                       </div>
                       
                       <MappingRow label="First Name" sample="Martyn, John, Emily..." field="first_name" matched />
                       <MappingRow label="Last Name" sample="Jenkins, Smith, Doe..." field="last_name" matched />
                       <MappingRow label="Email Address" sample="m.jenkins@council..." field="email" matched required />
                       <MappingRow label="Organization Name" sample="Bristol City Council..." field="" warning />
                   </>
               ) : (
                   <div className="flex items-center justify-center h-full text-slate-400">Step content placeholder</div>
               )}
            </div>

            <div className="p-6 bg-white border-t border-gray-200 flex justify-between items-center z-10">
               <button onClick={handleBack} className="px-6 py-2.5 rounded-lg border border-gray-300 text-slate-700 font-medium hover:bg-gray-50">Back</button>
               <div className="flex items-center gap-4">
                  {step === 2 && <span className="text-sm text-slate-500">3 of 4 columns mapped</span>}
                  <button onClick={handleNext} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white font-medium shadow-lg transition-all active:scale-95">
                     {step === 4 ? 'Finish' : 'Next'} <ArrowRight size={18} />
                  </button>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
};

const Step = ({ number, label, status }: any) => {
   const isCompleted = status === 'completed';
   const isActive = status === 'active';
   
   return (
      <div className="flex flex-col items-center gap-2 bg-white px-2 z-10">
         <div className={`size-8 rounded-full flex items-center justify-center border-2 transition-all ${isCompleted ? 'bg-green-500 border-green-500 text-white' : isActive ? 'bg-primary border-primary text-white ring-4 ring-primary/20' : 'bg-gray-100 border-gray-200 text-slate-400'}`}>
            {isCompleted ? <Check size={16} /> : <span className="text-sm font-bold">{number}</span>}
         </div>
         <span className={`text-xs font-bold transition-colors ${isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-slate-400'}`}>{label}</span>
      </div>
   );
};

const MappingRow = ({ label, sample, field, matched, required, warning }: any) => (
   <div className={`bg-white p-4 rounded-xl shadow-sm border ${warning ? 'border-l-4 border-l-amber-400 border-gray-200' : 'border-gray-200'} grid grid-cols-12 items-center gap-4 group hover:border-primary/50 transition-colors`}>
      <div className="col-span-5">
         <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-900">{label}</span>
            {required && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-slate-500 uppercase">Required</span>}
         </div>
         <span className="text-xs text-slate-500 truncate block">{sample}</span>
      </div>
      <div className="col-span-1 flex justify-center text-slate-300 group-hover:text-primary"><ArrowRightSm size={20} /></div>
      <div className="col-span-6 relative">
         <select 
            className={`w-full rounded-lg text-sm block py-2.5 pl-3 pr-10 ${warning ? 'border-amber-400 text-slate-600 focus:ring-amber-400' : 'border-gray-300 focus:ring-primary'}`}
            defaultValue={field}
         >
            <option value="" disabled>Select a field...</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="email">Email Address</option>
            <option value="company">Company</option>
         </select>
         <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            {matched && <CheckCircle size={20} className="text-green-500" />}
            {warning && <AlertTriangle size={20} className="text-amber-500" />}
         </div>
      </div>
   </div>
);

export default ImportWizard;