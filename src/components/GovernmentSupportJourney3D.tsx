// ============================================================
// SevaPath — Signature 3D Government Support Journey Visual
// ============================================================

import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, FileCheck2, Send, ShieldCheck, 
  ArrowRight, Award, User, Clock, Check
} from 'lucide-react';

export default function GovernmentSupportJourney3D() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const stages = [
    { id: 0, label: 'Discover', icon: <Sparkles size={16} />, status: 'Completed', color: '#173B5F' },
    { id: 1, label: 'Eligibility', icon: <CheckCircle2 size={16} />, status: '3 Matched', color: '#16856A' },
    { id: 2, label: 'Documents', icon: <FileCheck2 size={16} />, status: 'Ready (4/4)', color: '#D99A24' },
    { id: 3, label: 'Application', icon: <Send size={16} />, status: 'Simplified', color: '#173B5F' },
    { id: 4, label: 'Support Track', icon: <Award size={16} />, status: 'Direct Benefit', color: '#16856A' },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto select-none perspective-1000">
      {/* ── Atmospheric Ambient Glows behind 3D Object ── */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#173B5F]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#16856A]/15 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* ── Main Isometric / 3D Canvas Stage ── */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/95 via-white/80 to-[#EAF2F8]/60 backdrop-blur-xl border border-white/80 shadow-[0_20px_60px_-15px_rgba(23,59,95,0.12),0_0_0_1px_rgba(23,59,95,0.05)] transition-all duration-500 hover:shadow-[0_25px_70px_-12px_rgba(23,59,95,0.18)]">
        
        {/* Top Header Badge */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E2E6EA]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#173B5F] to-[#16856A] flex items-center justify-center text-white shadow-md shadow-[#173B5F]/20">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#16856A]">Verified Civic Engine</div>
              <div className="text-sm font-bold text-[#17212B]">Government Support Journey</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16856A]/10 border border-[#16856A]/20 text-[#16856A] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#16856A] animate-ping" />
            Active Path
          </div>
        </div>

        {/* ── 3D Visual Layer: Floating Journey Pipeline ── */}
        <div className="relative my-4 space-y-3">
          
          {/* Node 1: Citizen Profile & Match (Floating Back Card) */}
          <div 
            onMouseEnter={() => setHoveredNode(0)}
            onMouseLeave={() => setHoveredNode(null)}
            className="transform transition-all duration-300 hover:translate-x-1 p-3.5 rounded-2xl bg-white border border-[#E2E6EA] shadow-sm flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAF2F8] text-[#173B5F] flex items-center justify-center font-bold text-xs shadow-inner">
                <User size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#17212B]">Citizen Profile Evaluated</div>
                <div className="text-[11px] text-[#66727E]">Farmer & Small Business • Telangana</div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#EAF2F8] text-[#173B5F] text-[11px] font-semibold flex items-center gap-1">
              <Check size={12} className="text-[#16856A]" /> Verified
            </span>
          </div>

          {/* Connecting Conduit 1 */}
          <div className="flex justify-center">
            <div className="w-0.5 h-3 bg-gradient-to-b from-[#173B5F] to-[#16856A]" />
          </div>

          {/* Node 2: Primary Floating Highlight Card (Eligibility Check - 3D Popout) */}
          <div 
            onMouseEnter={() => setHoveredNode(1)}
            onMouseLeave={() => setHoveredNode(null)}
            className="transform transition-all duration-300 hover:-translate-y-1 p-4 rounded-2xl bg-gradient-to-r from-white to-[#F0FAF7] border-2 border-[#16856A]/30 shadow-[0_12px_30px_rgba(22,133,106,0.12)] relative overflow-hidden"
          >
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#16856A]/15 to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="flex items-start justify-between relative z-10 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#16856A] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  ✓
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#16856A]">High Confidence Match</span>
                  <h4 className="text-sm font-bold text-[#173B5F]">Rythu Bharosa Support</h4>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#16856A] text-white shadow-sm shadow-[#16856A]/30">
                100% Match
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-[#16856A]/15 text-[11px]">
              <div className="flex items-center gap-1.5 text-[#17212B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16856A]" />
                <span>₹15,000 / year direct</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#66727E]">
                <Clock size={12} className="text-[#D99A24]" />
                <span>~20 mins prep time</span>
              </div>
            </div>
          </div>

          {/* Connecting Conduit 2 */}
          <div className="flex justify-center">
            <div className="w-0.5 h-3 bg-gradient-to-b from-[#16856A] to-[#D99A24]" />
          </div>

          {/* Node 3: 3D Layered Document Stack Card */}
          <div 
            onMouseEnter={() => setHoveredNode(2)}
            onMouseLeave={() => setHoveredNode(null)}
            className="relative transform transition-all duration-300 hover:translate-x-1"
          >
            {/* Stack background sheet effect */}
            <div className="absolute -inset-1 bg-white/60 rounded-2xl -rotate-1 border border-[#E2E6EA] pointer-events-none" />
            
            <div className="relative p-3.5 rounded-2xl bg-white border border-[#E2E6EA] shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FEF3CD] text-[#D99A24] flex items-center justify-center font-bold text-xs shadow-inner">
                  <FileCheck2 size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#17212B]">Auto Document Checklist</div>
                  <div className="text-[11px] text-[#66727E]">Pattadar Passbook, Aadhaar, Bank Details</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#E8F5E9] text-[#16856A] text-[11px] font-bold">
                4/4 Ready
              </span>
            </div>
          </div>

          {/* Connecting Conduit 3 */}
          <div className="flex justify-center">
            <div className="w-0.5 h-3 bg-gradient-to-b from-[#D99A24] to-[#173B5F]" />
          </div>

          {/* Node 4: Plain Language Form Explainer & Tracker */}
          <div 
            onMouseEnter={() => setHoveredNode(3)}
            onMouseLeave={() => setHoveredNode(null)}
            className="transform transition-all duration-300 hover:translate-x-1 p-3.5 rounded-2xl bg-gradient-to-r from-white to-[#EAF2F8] border border-[#173B5F]/20 shadow-sm flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#173B5F] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-[#173B5F]/20">
                <Send size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#173B5F]">Form Explainer & Submission</div>
                <div className="text-[11px] text-[#66727E]">Official Portal Link • Step-by-Step Guided</div>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#16856A] text-white flex items-center justify-center text-xs font-bold">
              ✓
            </div>
          </div>
        </div>

        {/* ── Interactive Progress Pill Bar ── */}
        <div className="mt-5 pt-4 border-t border-[#E2E6EA]/60">
          <div className="flex items-center justify-between text-[11px] text-[#66727E] mb-2 font-medium">
            <span>Progress: Eligibility Verified</span>
            <span className="font-bold text-[#16856A]">Step 3 of 5</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#E2E6EA]/70 overflow-hidden p-0.5">
            <div className="h-full rounded-full bg-gradient-to-r from-[#173B5F] via-[#16856A] to-[#1a9d7e] transition-all duration-700 w-3/5 shadow-sm" />
          </div>
        </div>

        {/* Floating Mini Decorative Badge */}
        <div className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#16856A]/30 shadow-lg shadow-[#16856A]/10 flex items-center gap-2 text-xs font-bold text-[#16856A] animate-float">
          <span className="text-base">🇮🇳</span>
          <span>100% Free Public Good</span>
        </div>

        <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl bg-[#173B5F] text-white shadow-lg shadow-[#173B5F]/25 flex items-center gap-1.5 text-xs font-semibold animate-float-reverse">
          <Sparkles size={13} className="text-[#D99A24]" />
          <span>Telugu & English</span>
        </div>

      </div>
    </div>
  );
}
