import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Zap, 
  Activity, 
  Server, 
  Database, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Gauge, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Globe
} from 'lucide-react';
import { sound } from '../utils/audio';

export const ArchitecturePlayground: React.FC = () => {
  const { t, locale } = useLanguage();
  const [trafficLoad, setTrafficLoad] = useState<number>(15000); // req/sec
  const [architectureMode, setArchitectureMode] = useState<'k4oow' | 'legacy'>('k4oow');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [livePackets, setLivePackets] = useState<number[]>([]);

  // Simulation calculations based on selected mode and traffic
  const isK4ooW = architectureMode === 'k4oow';

  // Metrics math
  const latency = isK4ooW
    ? Math.max(12, Math.round(18 + (trafficLoad / 50000) * 14)) // 18ms - 32ms
    : Math.min(5200, Math.round(420 + Math.pow(trafficLoad / 5000, 2.3) * 120)); // 420ms - 5000ms+

  const cpuLoad = isK4ooW
    ? Math.min(42, Math.round(8 + (trafficLoad / 50000) * 28))
    : Math.min(100, Math.round(35 + (trafficLoad / 50000) * 85));

  const cacheHitRatio = isK4ooW ? 99.2 : 0;

  const statusLevel = isK4ooW
    ? 'OPTIMAL'
    : trafficLoad > 20000
    ? 'CRITICAL_OVERLOAD'
    : trafficLoad > 8000
    ? 'HIGH_LATENCY'
    : 'DEGRADED';

  // Periodic visual ping animation
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setLivePackets(prev => {
        const nextId = Date.now();
        return [...prev.slice(-6), nextId];
      });
    }, 900);
    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <section id="architecture-playground" className="py-24 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-cyan-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>
              {locale === 'ua' ? 'Інтерактивна лабораторія навантаження' : 'Interactive High-Load Simulator'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {locale === 'ua' ? 'Симуляція стійкості під піковим трафіком' : 'High-Concurrency Architecture Lab'}
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            {locale === 'ua'
              ? 'Протестуйте в реальному часі поведінку системи при навантаженні від 500 до 50 000 запитів/сек. Подивіться, як кешування Nginx FastCGI та Redis рятують бізнес від падіння.'
              : 'Simulate high-traffic spikes from 500 to 50,000 requests/sec in real-time. Experience how Nginx FastCGI micro-caching and Redis shield infrastructure from collapsing.'}
          </p>
        </div>

        {/* Interactive Control Deck */}
        <div className="rounded-2xl bg-[#0b101d]/90 border border-cyan-500/25 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          {/* Top Row Controls: Architecture Switcher & Traffic Slider */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-white/10 items-center">
            {/* Architecture Selector */}
            <div className="lg:col-span-6 space-y-3">
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">
                {locale === 'ua' ? '1. Оберіть конфігурацію стеку:' : '1. Select Stack Architecture:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setArchitectureMode('k4oow');
                    sound.playClick();
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isK4ooW
                      ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                      : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-cyan-300 font-mono">
                      K4ooW High-Load Stack
                    </span>
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-xs text-slate-300">
                    Nginx FastCGI + Redis Object Cache + Brotli + Edge CDN
                  </p>
                </button>

                <button
                  onClick={() => {
                    setArchitectureMode('legacy');
                    sound.playClick();
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    !isK4ooW
                      ? 'bg-rose-950/50 border-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] ring-1 ring-rose-500'
                      : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-rose-300 font-mono">
                      Generic Shared LAMP
                    </span>
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  </div>
                  <p className="text-xs text-slate-400">
                    Apache / Heavy Visual Builders / Direct MySQL queries
                  </p>
                </button>
              </div>
            </div>

            {/* Traffic Load Slider */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {locale === 'ua' ? '2. Інтенсивність запитів:' : '2. Simulated Traffic Intensity:'}
                </label>
                <span className="text-sm font-mono font-bold text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-500/30">
                  {trafficLoad.toLocaleString()} {locale === 'ua' ? 'зап/сек' : 'req/s'}
                </span>
              </div>

              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={trafficLoad}
                onChange={(e) => setTrafficLoad(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-white/10"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>500 req/s (Standard Day)</span>
                <span>15,000 req/s (Flash Sale)</span>
                <span>50,000 req/s (Viral Spike)</span>
              </div>
            </div>
          </div>

          {/* Interactive Topology Graph */}
          <div className="py-8">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>{locale === 'ua' ? 'Жива топологія проходження трафіку' : 'Live Request Flow Topology'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Node 1: Edge CDN */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 relative group">
                <div className="flex items-center gap-2 text-cyan-400 mb-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold">1. Edge CDN / WAF</span>
                </div>
                <p className="text-xs text-slate-400">
                  {isK4ooW ? 'Cloudflare Enterprise cache & DDoS shield' : 'Basic DNS without edge caching'}
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Latency: {isK4ooW ? '2ms' : '15ms'}</span>
                  <span className="text-emerald-400 font-bold">{isK4ooW ? '99.9% SHIELD' : 'UNPROTECTED'}</span>
                </div>
              </div>

              {/* Node 2: Nginx Web Server */}
              <div className={`p-4 rounded-xl border relative transition-all ${
                isK4ooW ? 'bg-cyan-950/40 border-cyan-500/40' : 'bg-slate-950/80 border-white/10'
              }`}>
                <div className="flex items-center gap-2 text-cyan-300 mb-2">
                  <Server className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold">2. Nginx FastCGI</span>
                </div>
                <p className="text-xs text-slate-300">
                  {isK4ooW ? 'FastCGI Micro-caching (RAM served)' : 'Apache multi-process blocking pool'}
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">RAM Cache:</span>
                  <span className={isK4ooW ? 'text-cyan-300 font-bold' : 'text-rose-400'}>
                    {isK4ooW ? 'HIT (99.2%)' : 'DISABLED'}
                  </span>
                </div>
              </div>

              {/* Node 3: App Core & Redis */}
              <div className={`p-4 rounded-xl border relative transition-all ${
                isK4ooW ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-950/80 border-white/10'
              }`}>
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <Cpu className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold">3. App & Redis Pool</span>
                </div>
                <p className="text-xs text-slate-300">
                  {isK4ooW ? 'Redis In-Memory Key-Value Caching' : 'Direct disk PHP interpreter load'}
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">Query Cache:</span>
                  <span className={isK4ooW ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                    {isK4ooW ? '0.2ms In-Memory' : 'Disk I/O Slow'}
                  </span>
                </div>
              </div>

              {/* Node 4: Database Cluster */}
              <div className={`p-4 rounded-xl border relative transition-all ${
                isK4ooW ? 'bg-violet-950/30 border-violet-500/40' : 'bg-slate-950/80 border-white/10'
              }`}>
                <div className="flex items-center gap-2 text-violet-400 mb-2">
                  <Database className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold">4. MySQL / DB Core</span>
                </div>
                <p className="text-xs text-slate-300">
                  {isK4ooW ? 'Protected by Redis; only writes hit DB' : 'Overwhelmed with read queries'}
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">DB Load:</span>
                  <span className={isK4ooW ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {isK4ooW ? '< 5% Quiet' : `${Math.min(100, Math.round(trafficLoad / 350))}% Maxed`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Telemetry Dashboard Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            {/* Latency Gauge */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-1">
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Response Time (TTFB)</span>
                <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className={`text-2xl font-mono font-bold ${
                latency < 50 ? 'text-emerald-400' : latency < 300 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {latency} ms
              </div>
              <p className="text-[11px] text-slate-400">
                {isK4ooW ? '✓ Instant sub-second delivery' : '✗ Server queue backlog building'}
              </p>
            </div>

            {/* Server CPU Load */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-1">
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Server CPU Utilization</span>
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className={`text-2xl font-mono font-bold ${
                cpuLoad < 45 ? 'text-emerald-400' : cpuLoad < 80 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {cpuLoad}%
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    cpuLoad < 45 ? 'bg-emerald-400' : cpuLoad < 80 ? 'bg-amber-400' : 'bg-rose-500'
                  }`} 
                  style={{ width: `${cpuLoad}%` }}
                />
              </div>
            </div>

            {/* Cache Hit Rate */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-1">
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Cache Hit Efficiency</span>
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className={`text-2xl font-mono font-bold ${isK4ooW ? 'text-cyan-300' : 'text-slate-500'}`}>
                {cacheHitRatio}%
              </div>
              <p className="text-[11px] text-slate-400">
                {isK4ooW ? '✓ 99.2% requests served from RAM' : '✗ 0% (Every request executes PHP)'}
              </p>
            </div>

            {/* System Health Status */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-1">
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Infrastructure Health</span>
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className={`text-xl font-mono font-bold ${
                isK4ooW ? 'text-emerald-400' : trafficLoad > 10000 ? 'text-rose-400 animate-pulse' : 'text-amber-400'
              }`}>
                {statusLevel}
              </div>
              <p className="text-[11px] text-slate-400">
                {isK4ooW ? '100% Uptime Guaranteed' : 'High Risk of 502/504 Bad Gateway'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
