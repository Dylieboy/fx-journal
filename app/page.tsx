"use client";
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, PlusSquare, BookOpen, LogOut, 
  Menu, X, Target, Brain, TrendingUp, ShieldCheck, 
  Trash2, Lock, Mail
} from 'lucide-react';

// --- TYPES & INTERFACES ---

interface Trade {
  id: string;
  market: string;
  currency: string;
  lots: string;
  date: string;
  lose: number;
  target: number;
  actual: number;
  outcome: 'Win' | 'Loss';
  setup: string;
  notes: string;
  lesson: string;
}

type ViewState = 'overview' | 'add' | 'journal' | 'auth';

interface NavItemProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface StatBoxProps {
  label: string;
  value: string;
  highlight?: boolean;
}

interface InputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
}

interface JournalStatProps {
  label: string;
  value: string;
  highlight?: boolean;
}

// --- MAIN COMPONENT ---

export default function FXJournal() {
  const [view, setView] = useState<ViewState>('auth');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [trades, setTrades] = useState<Trade[]>([]);

  const [formData, setFormData] = useState({
    market: 'XAUUSD', currency: 'USD', lots: '2.00', date: '2026-05-06',
    lose: 100, target: 200, actual: 180, outcome: 'Win' as 'Win' | 'Loss',
    setup: '', notes: '', lesson: ''
  });

  const navigate = (targetView: ViewState) => {
    setView(targetView);
    setIsMobileMenuOpen(false);
  };

  const stats = useMemo(() => {
    const totalPL = trades.reduce((acc, t) => acc + t.actual, 0);
    const winRate = trades.length > 0 ? (trades.filter(t => t.outcome === 'Win').length / trades.length * 100).toFixed(0) : 0;
    const totalRR = trades.length > 0 ? (trades.reduce((acc, t) => acc + (t.target / t.lose), 0) / trades.length).toFixed(2) : "0.00";
    return { totalPL, winRate, totalRR };
  }, [trades]);

  const saveTrade = () => {
    const newTrade: Trade = { ...formData, id: Math.random().toString(36).substr(2, 9) };
    setTrades([newTrade, ...trades]);
    navigate('journal');
    setFormData({ ...formData, setup: '', notes: '', lesson: '' });
  };

  if (view === 'auth') {
    return (
      <div className="h-screen bg-[#05070a] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full"></div>
        <div className="glass-card w-full max-w-md p-10 rounded-[2.5rem] relative z-10 border-white/5 animate-in fade-in zoom-in duration-500">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center border border-teal-500/30 text-teal-400 font-black mb-4 shadow-xl shadow-teal-500/10">FX</div>
            <h2 className="text-3xl font-bold text-white tracking-tighter">{isLogin ? 'Secure Entry' : 'Create Desk'}</h2>
            <p className="text-slate-500 text-sm mt-2">{isLogin ? 'Enter your credentials to access the vault' : 'Start your professional trading journal'}</p>
          </div>
          
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-teal-400 transition-colors" size={18} />
              <input type="email" placeholder="Email Address" className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-teal-500/50 text-white text-sm transition-all shadow-inner" />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-teal-400 transition-colors" size={18} />
              <input type="password" placeholder="Password" className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-teal-500/50 text-white text-sm transition-all shadow-inner" />
            </div>
            <button onClick={() => navigate('overview')} className="w-full bg-teal-400 hover:bg-teal-300 text-black font-black py-5 rounded-2xl shadow-xl shadow-teal-500/10 transition-all uppercase tracking-widest text-xs mt-4">
              {isLogin ? 'Authorize Entry' : 'Build Vault'}
            </button>
            <button onClick={() => setIsLogin(!isLogin)} className="w-full text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-teal-400 transition-colors py-2">
              {isLogin ? "Don't have an account? Sign Up" : "Already registered? Sign In"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#05070a] overflow-hidden selection:bg-teal-500/30">
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}/>}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0c10] border-r border-white/5 lg:m-4 lg:rounded-3xl lg:border p-6 flex flex-col justify-between transition-transform duration-500 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:bg-transparent lg:border-white/5`}>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center border border-teal-500/30 text-teal-400 font-black shadow-lg">FX</div>
              <div><h1 className="font-bold text-sm text-white">FX Journal</h1><p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Pro Station</p></div>
            </div>
            <button className="lg:hidden text-slate-400 p-2" onClick={() => setIsMobileMenuOpen(false)}><X size={20}/></button>
          </div>
          <nav className="space-y-2">
            <NavItem active={view === 'overview'} icon={<LayoutDashboard size={18}/>} label="Overview" onClick={() => navigate('overview')} />
            <NavItem active={view === 'add'} icon={<PlusSquare size={18}/>} label="Add Trade" onClick={() => navigate('add')} />
            <NavItem active={view === 'journal'} icon={<BookOpen size={18}/>} label="The Vault" onClick={() => navigate('journal')} />
          </nav>
        </div>
        <button onClick={() => navigate('auth')} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-white/5 font-bold text-[10px] text-rose-500/70 hover:text-rose-400 hover:bg-rose-500/5 transition-all uppercase tracking-[0.2em]">
          <LogOut size={14}/> Exit Session
        </button>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <header className="lg:hidden flex items-center justify-between p-5 border-b border-white/5 bg-[#05070a]/80 backdrop-blur-xl sticky top-0 z-30">
           <button onClick={() => setIsMobileMenuOpen(true)} className="p-2.5 text-slate-300 bg-white/5 rounded-xl border border-white/10"><Menu size={22} /></button>
           <div className="text-[10px] font-black text-teal-500 uppercase tracking-[0.3em]">Vault Mobile</div>
           <div className="w-10"></div> 
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-10 scroll-smooth">
          <div className="max-w-[1100px] mx-auto w-full">
            
            {view === 'overview' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="glass-card p-10 lg:p-14 rounded-[3rem] flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 blur-[100px] -mr-40 -mt-40 rounded-full group-hover:bg-teal-500/20 transition-colors duration-1000"></div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400 mb-2">Performance Command</p>
                    <h2 className="text-4xl lg:text-7xl font-bold text-white tracking-tighter leading-none mb-6">Overview</h2>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
                        <TrendingUp size={14} className="text-teal-400"/>
                        <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{stats.winRate}% Efficiency</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => navigate('add')} className="w-full lg:w-auto bg-white text-black font-black px-10 py-5 rounded-2xl shadow-2xl hover:bg-teal-400 transition-all active:scale-95 text-xs uppercase tracking-widest relative z-10">New Entry</button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatBox label="Net P/L" value={`$${stats.totalPL.toFixed(2)}`} highlight={stats.totalPL >= 0} />
                  <StatBox label="Win Rate" value={`${stats.winRate}%`} />
                  <StatBox label="Avg RR" value={`${stats.totalRR}R`} />
                  <StatBox label="Trades" value={trades.length.toString()} />
                </div>
              </div>
            )}

            {view === 'add' && (
              <div className="max-w-3xl mx-auto space-y-8 py-4 animate-in slide-in-from-bottom-8 duration-700">
                <div className="text-center lg:text-left">
                  <p className="text-[10px] font-black uppercase text-teal-400 tracking-[0.3em] mb-2 font-mono">Execution Log</p>
                  <h2 className="text-5xl font-bold text-white tracking-tighter">Add Trade</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-8">
                  <Input label="Market" value={formData.market} onChange={(v: string) => setFormData({...formData, market: v})} />
                  <Input label="Date" type="date" value={formData.date} onChange={(v: string) => setFormData({...formData, date: v})} />
                  <Input label="Lot size" value={formData.lots} onChange={(v: string) => setFormData({...formData, lots: v})} />
                  <Input label="Entry Prepared" value={formData.lose.toString()} onChange={(v: string) => setFormData({...formData, lose: Number(v)})} />
                  <Input label="Profit Target" value={formData.target.toString()} onChange={(v: string) => setFormData({...formData, target: Number(v)})} />
                  <Input label="Final P/L" value={formData.actual.toString()} onChange={(v: string) => setFormData({...formData, actual: Number(v)})} />
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Session Result</label>
                    <select className="w-full bg-[#0a0c10] border border-white/5 rounded-2xl p-4 outline-none focus:border-teal-500/50 text-sm font-bold text-white transition-all appearance-none cursor-pointer" 
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, outcome: e.target.value as 'Win' | 'Loss'})} value={formData.outcome}>
                      <option value="Win">Win</option>
                      <option value="Loss">Loss</option>
                    </select>
                  </div>
                </div>
                <Input label="Setup" value={formData.setup} onChange={(v: string) => setFormData({...formData, setup: v})} placeholder="e.g. London Breakout" />
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Psychological Notes</label>
                   <textarea rows={4} className="w-full bg-[#0a0c10] border border-white/5 rounded-2xl p-5 outline-none text-sm text-white placeholder:text-slate-800 transition-all focus:border-teal-500/50" 
                     value={formData.notes} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, notes: e.target.value})} placeholder="Describe your mindset during this trade..." />
                </div>
                <button onClick={saveTrade} className="w-full bg-teal-400 text-black font-black py-6 rounded-2xl shadow-2xl shadow-teal-500/10 active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-xs">Save to Vault</button>
              </div>
            )}

            {view === 'journal' && (
              <div className="space-y-8 animate-in fade-in duration-1000">
                <div className="glass-card p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
                    <div className="text-center sm:text-left">
                      <h2 className="text-4xl font-bold text-white tracking-tighter mb-2">The Trading Vault</h2>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Where champions are built through data</p>
                    </div>
                    <div className="bg-black/40 border border-white/5 px-6 py-4 rounded-3xl text-center shadow-inner">
                      <p className="text-[8px] font-black text-slate-600 uppercase mb-1">Vault Capacity</p>
                      <p className="text-xl font-mono text-white font-black">{trades.length}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {trades.map((t) => (
                    <div key={t.id} className="group relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${t.outcome === 'Win' ? 'from-teal-500/5' : 'from-rose-500/5'} to-transparent rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700`}></div>
                      <div className="glass-card p-8 lg:p-12 rounded-[3.5rem] border-white/5 hover:border-white/10 transition-all relative z-10">
                        
                        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-10 border-b border-white/5 pb-8">
                          <div className="flex gap-6 items-start">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 ${t.outcome === 'Win' ? 'bg-teal-500/10 border-teal-500/30 text-teal-400 group-hover:bg-teal-500 group-hover:text-black' : 'bg-rose-500/10 border-rose-500/30 text-rose-400 group-hover:bg-rose-500 group-hover:text-black'}`}>
                              {t.outcome === 'Win' ? <TrendingUp size={28}/> : <ShieldCheck size={28}/>}
                            </div>
                            <div>
                              <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tighter uppercase">{t.market}</h3>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.date}</span>
                                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${t.outcome === 'Win' ? 'text-teal-400' : 'text-rose-400'}`}>{t.outcome} Session</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                             <JournalStat label="Volume" value={`${t.lots} Lots`} />
                             <JournalStat label="Net Result" value={`$${t.actual.toFixed(2)}`} highlight={t.actual >= 0} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                          <div className="space-y-6">
                            <div className="flex items-center gap-3">
                              <Target className="text-teal-500" size={18} />
                              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Strategy Analysis</h4>
                            </div>
                            <div className="bg-black/30 p-6 rounded-3xl border border-white/5 shadow-inner">
                              <p className="text-xs font-bold text-teal-500/80 uppercase tracking-widest mb-2">Setup Triggered</p>
                              <p className="text-lg text-slate-200 font-bold tracking-tight">{t.setup || "No setup specified"}</p>
                              <div className="grid grid-cols-2 gap-4 mt-6">
                                <div><p className="text-[8px] text-slate-600 uppercase font-black mb-1">Max Risk</p><p className="text-sm font-mono text-white">${t.lose.toFixed(2)}</p></div>
                                <div><p className="text-[8px] text-slate-600 uppercase font-black mb-1">Reward Multiplier</p><p className="text-sm font-mono text-white">{(t.target/t.lose).toFixed(2)}R</p></div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="flex items-center gap-3">
                              <Brain className="text-purple-400" size={18} />
                              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Mental Archive</h4>
                            </div>
                            <div className="bg-[#111] p-6 rounded-3xl border border-white/5 italic shadow-inner relative">
                               <p className="text-sm text-slate-400 leading-relaxed font-medium">"{t.notes || "No notes recorded for this session."}"</p>
                               <div className="absolute top-4 right-6 text-slate-800 font-serif text-4xl opacity-50">”</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-8 border-t border-white/5">
                           <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">Entry ID: {t.id}</p>
                           <button onClick={() => setTrades(trades.filter(x => x.id !== t.id))} className="flex items-center gap-2 text-rose-500/30 hover:text-rose-500 transition-colors py-2 px-4 rounded-xl hover:bg-rose-500/5">
                             <Trash2 size={14} />
                             <span className="text-[10px] font-black uppercase tracking-widest">Destroy Entry</span>
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {trades.length === 0 && (
                    <div className="text-center py-32 glass-card rounded-[3rem] border-dashed border-white/10 group cursor-pointer" onClick={() => navigate('add')}>
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                        <PlusSquare className="text-slate-700" size={32}/>
                      </div>
                      <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">The vault is empty. Log your first session.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS WITH FULL TYPES ---

function NavItem({ active, icon, label, onClick }: NavItemProps) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-[12px] ${active ? 'bg-white/5 text-white border border-white/5 shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}>
      <span className={active ? 'text-teal-400' : ''}>{icon}</span> {label}
    </button>
  );
}

function StatBox({ label, value, highlight }: StatBoxProps) {
  return (
    <div className="glass-card p-6 lg:p-8 rounded-[2rem] border-white/5 hover:scale-[1.02] transition-all">
      <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{label}</p>
      <p className={`text-2xl lg:text-3xl font-bold font-mono tracking-tighter ${highlight ? 'text-teal-400' : 'text-white'}`}>{value}</p>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }: InputProps) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} 
        placeholder={placeholder} 
        className="w-full bg-[#0a0c10] border border-white/5 rounded-2xl p-4 outline-none focus:border-teal-500/50 font-mono text-sm text-white transition-all shadow-inner" 
      />
    </div>
  );
}

function JournalStat({ label, value, highlight }: JournalStatProps) {
  return (
    <div className="bg-[#05070a] px-6 py-4 rounded-2xl border border-white/5 shadow-inner min-w-[120px]">
      <p className="text-[7px] font-black text-slate-600 uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className={`text-sm lg:text-md font-bold font-mono leading-none ${highlight ? 'text-teal-400' : 'text-slate-200'}`}>{value}</p>
    </div>
  );
}