import React, { useState } from 'react';
import { 
  Droplets, 
  Dna, 
  Construction, 
  RefreshCw, 
  Calculator,
  AlertCircle,
  Info,
  ChevronRight,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

interface CalculationResults {
  cement: number;
  water: number;
  stone: number;
  sand: number;
}

export default function App() {
  // --- State Management ---
  const [cement, setCement] = useState<string>("");
  const [wcRatio, setWcRatio] = useState<string>("0.5");
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [error, setError] = useState<string>("");

  // --- Logic & Calculation ---
  const calculateMix = () => {
    const cementVal = parseFloat(cement);

    // Validation
    if (isNaN(cementVal) || cementVal < 180 || cementVal > 400) {
      setError("กรุณาระบุปริมาณปูนระหว่าง 180 - 400 กก./ลบ.ม.");
      setResults(null);
      return;
    }

    setError("");
    const wc = parseFloat(wcRatio);
    
    // Simplified calculation logic based on user request
    setResults({
      cement: cementVal,
      water: cementVal * wc,
      stone: cementVal * 4,
      sand: cementVal * 2
    });
  };

  const resetForm = () => {
    setCement("");
    setWcRatio("0.5");
    setResults(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-12 md:py-20">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-amber-500 rounded-xl mb-6 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <Construction className="text-slate-950 w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
            Concrete Mix Design
          </h1>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
            Professional Engineering Tool v1.0
          </p>
        </motion.header>

        <main className="grid gap-8">
          <AnimatePresence mode="wait">
            {!results ? (
              <motion.div
                key="input-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl"
              >
                <div className="space-y-8">
                  {/* Cement Input */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                        <Dna className="w-4 h-4 text-amber-500" />
                        ปริมาณปูนซีเมนต์ (Cement Content)
                      </label>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">kg/m³</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="ระบุ 180 - 400"
                        value={cement}
                        onChange={(e) => setCement(e.target.value)}
                        className={cn(
                          "w-full bg-slate-950/50 border-2 rounded-2xl p-4 font-mono text-lg transition-all outline-none",
                          error 
                            ? "border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
                            : "border-slate-800 focus:border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
                        )}
                      />
                      {error && (
                        <motion.p 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-red-400 text-xs flex items-center gap-1.5 mt-2 ml-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5" /> {error}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* W/C Ratio Selection */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                      <Droplets className="w-4 h-4 text-blue-400" />
                      อัตราส่วนน้ำต่อปูน (W/C Ratio)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["0.3", "0.4", "0.5", "0.6"].map((ratio) => (
                        <button
                          key={ratio}
                          onClick={() => setWcRatio(ratio)}
                          className={cn(
                            "py-3 px-4 rounded-xl font-mono text-sm transition-all border-2",
                            wcRatio === ratio
                              ? "bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700"
                          )}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono mt-2 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      {wcRatio === "0.3" && "แข็งแรงพิเศษ - เหนียวมาก"}
                      {wcRatio === "0.4" && "แข็งแรงสูง"}
                      {wcRatio === "0.5" && "มาตรฐานทั่วไป"}
                      {wcRatio === "0.6" && "น้ำเยอะ - ทำงานง่าย"}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={calculateMix}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-5 rounded-2xl shadow-lg shadow-amber-500/20 transition-colors flex items-center justify-center gap-3 text-lg"
                  >
                    <Calculator className="w-6 h-6" />
                    คำนวณสัดส่วน
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                  {/* Decorative corner grid */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,_var(--color-slate-800)_1px,_transparent_1px)] [background-size:16px_16px] opacity-20" />
                  
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
                    <div>
                      <h2 className="text-xl font-bold text-white uppercase tracking-tight">ผลการคำนวณสัดส่วน</h2>
                      <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">Design Mix Proportions</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ResultCard 
                      label="ปูนซีเมนต์ (Cement)" 
                      value={results.cement} 
                      unit="kg/m³" 
                      color="amber"
                      icon={<Dna className="w-4 h-4" />}
                    />
                    <ResultCard 
                      label="น้ำ (Water)" 
                      value={results.water} 
                      unit="kg/m³" 
                      color="blue"
                      icon={<Droplets className="w-4 h-4" />}
                    />
                    <ResultCard 
                      label="หิน (Stone/Coarse)" 
                      value={results.stone} 
                      unit="kg/m³" 
                      color="slate"
                      icon={<Database className="w-4 h-4" />}
                    />
                    <ResultCard 
                      label="ทราย (Sand/Fine)" 
                      value={results.sand} 
                      unit="kg/m³" 
                      color="orange"
                      icon={<ChevronRight className="w-4 h-4" />}
                    />
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="text-slate-500 text-xs font-mono uppercase">W/C Ratio:</div>
                      <div className="bg-slate-950 border border-slate-800 px-3 py-1 rounded-lg font-mono text-amber-500 font-bold">
                        {wcRatio}
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono text-center sm:text-right">
                      * คำนวณตามสัดส่วนมาตรฐานเบื้องต้น<br />ควรทดสอบหน้างานจริงอีกครั้ง
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetForm}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-400 font-semibold py-4 rounded-2xl hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  เริ่มต้นคำนวณใหม่
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-16 text-center space-y-4">
          <div className="flex justify-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono text-slate-600 uppercase">Precision</span>
              <div className="w-8 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-full h-full bg-amber-500/50" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono text-slate-600 uppercase">Reliability</span>
              <div className="w-8 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-full h-full bg-blue-500/50" />
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-[10px] font-mono uppercase tracking-widest">
            © 2026 Civil Engineering Learning Tool • Built for Precision
          </p>
        </footer>
      </div>
    </div>
  );
}

function ResultCard({ label, value, unit, color, icon }: { 
  label: string; 
  value: number; 
  unit: string; 
  color: "amber" | "blue" | "slate" | "orange";
  icon: React.ReactNode;
}) {
  const colorClasses = {
    amber: "text-amber-500 bg-amber-500/5 border-amber-500/20",
    blue: "text-blue-400 bg-blue-400/5 border-blue-400/20",
    slate: "text-slate-300 bg-slate-300/5 border-slate-300/20",
    orange: "text-orange-400 bg-orange-400/5 border-orange-400/20",
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={cn(
        "p-5 rounded-2xl border transition-colors",
        colorClasses[color]
      )}
    >
      <div className="flex items-center gap-2 mb-3 opacity-70">
        {icon}
        <p className="text-[10px] font-bold uppercase tracking-wider">{label}</p>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold font-mono tracking-tighter">
          {value.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
        </span>
        <span className="text-[10px] font-mono opacity-50 uppercase">{unit}</span>
      </div>
    </motion.div>
  );
}
