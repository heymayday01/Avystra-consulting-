import { motion } from 'motion/react';
import { 
  XCircle, 
  CheckCircle, 
  ShieldCheck, 
  Users,
  Target,
  Zap,
  TrendingUp,
  BarChart
} from 'lucide-react';

export default function WorkshopVsSystem() {
  return (
    <section className="relative py-24 bg-cream-bg overflow-hidden">
      
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#C5A059]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-[10px] text-[#0A192F] font-mono tracking-widest font-bold uppercase">How We Work</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-medium text-4xl sm:text-6xl text-[#0A192F] tracking-tight leading-tight"
          >
            Not a Workshop.<br />
            <span className="text-[#C5A059] italic font-serif">A Performance System.</span>
          </motion.h2>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-12">
          
          {/* Most Consultants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-8 px-3 py-1 bg-slate-50 rounded-lg">
                The Workshop Trap
              </span>
              
              <div className="space-y-6">
                {[
                  { text: "One-day training sessions", icon: Target },
                  { text: "Passive information dump", icon: Zap },
                  { text: "No follow-up mechanics", icon: XCircle }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-slate-700 font-sans text-base font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-10 mt-10 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Outcome</p>
                <p className="text-2xl font-display font-medium text-slate-900 tracking-tight mt-1">Temporary relief.</p>
              </div>
              <XCircle className="w-10 h-10 text-slate-200" />
            </div>
          </motion.div>

          {/* AVYSTRA System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="p-10 rounded-[2.5rem] bg-[#0A192F] text-white flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <Target size={200} />
            </div>
            
            <div className="relative z-10">
              <span className="inline-block text-[10px] font-mono font-bold text-[#C5A059] uppercase tracking-widest mb-8 px-3 py-1 bg-[#C5A059]/10 rounded-lg border border-[#C5A059]/20">
                The AVYSTRA System
              </span>

              <div className="space-y-5">
                {[
                  { step: "01", name: "Assess deep root causes" },
                  { step: "02", name: "Design custom performance frameworks" },
                  { step: "03", name: "Implement with discipline" },
                  { step: "04", name: "Measure actual business impact" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="text-2xl font-display font-bold text-[#C5A059]/40 w-10">
                      {item.step}
                    </span>
                    <span className="text-white font-sans text-base font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-10 mt-10 border-t border-[#C5A059]/20 flex items-center justify-between relative z-10">
              <div>
                <p className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider">Outcome</p>
                <p className="text-2xl font-display font-medium text-white tracking-tight mt-1">Sustained Growth.</p>
              </div>
              <CheckCircle className="w-10 h-10 text-[#C5A059]" />
            </div>
          </motion.div>

        </div>

        {/* Bottom Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] bg-white border border-slate-100 flex items-center gap-6 shadow-sm"
          >
            <div className="w-14 h-14 rounded-full bg-[#C5A059]/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7 text-[#C5A059]" />
            </div>
            <p className="text-slate-700 font-sans leading-relaxed">
              We build <strong className="text-[#0A192F]">accountability, ownership, and performance systems</strong> that stick, long after we leave.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-[2rem] bg-[#0A192F] text-white flex items-center gap-6"
          >
            <div className="w-14 h-14 rounded-full bg-[#C5A059]/10 flex items-center justify-center shrink-0">
              <Users className="w-7 h-7 text-[#C5A059]" />
            </div>
            <p className="font-sans font-medium text-lg leading-snug">
              Stronger Leaders.<br />Stronger Teams.<br />Stronger Business.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
