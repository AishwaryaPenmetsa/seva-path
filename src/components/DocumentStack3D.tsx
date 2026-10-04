// ============================================================
// SevaPath — 3D Document Stack Visual Component
// ============================================================

import React from 'react';
import { FileCheck, Shield, Check, Lock, Sparkles } from 'lucide-react';

interface DocumentStack3DProps {
  readyCount: number;
  totalCount: number;
  benefitName: string;
}

export default function DocumentStack3D({ readyCount, totalCount, benefitName }: DocumentStack3DProps) {
  const percentage = totalCount > 0 ? Math.round((readyCount / totalCount) * 100) : 0;
  
  return (
    <div className="relative my-6 p-6 rounded-3xl bg-gradient-to-br from-white/95 via-white/90 to-[#EAF2F8]/60 backdrop-blur-md border border-[#E2E6EA] shadow-lg shadow-[#173B5F]/5 overflow-hidden">
      {/* Soft Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#16856A]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
        {/* 3D Stack Visual */}
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          {/* Layer 3 - Bottom */}
          <div className="absolute w-20 h-24 bg-white/70 rounded-xl border border-[#E2E6EA] shadow-md rotate-6 transform translate-x-2 translate-y-2" />
          {/* Layer 2 - Middle */}
          <div className="absolute w-20 h-24 bg-white/90 rounded-xl border border-[#E2E6EA] shadow-md -rotate-3 transform -translate-x-1 translate-y-1" />
          {/* Layer 1 - Top active document */}
          <div className="relative w-20 h-24 bg-white rounded-xl border-2 border-[#16856A]/40 shadow-lg flex flex-col items-center justify-between p-2.5 transform transition-transform hover:scale-105 duration-300">
            <div className="w-full flex items-center justify-between">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16856A]" />
              <FileCheck size={14} className="text-[#16856A]" />
            </div>
            <div className="w-full space-y-1 my-auto">
              <div className="w-full h-1 bg-[#E2E6EA] rounded-full" />
              <div className="w-3/4 h-1 bg-[#E2E6EA] rounded-full" />
              <div className="w-1/2 h-1 bg-[#16856A]/40 rounded-full" />
            </div>
            <div className="w-full flex justify-end">
              <div className="w-4 h-4 rounded-full bg-[#16856A] text-white flex items-center justify-center text-[9px] font-bold">
                ✓
              </div>
            </div>
          </div>
        </div>

        {/* Info & Stats */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#16856A]/10 text-[#16856A] text-xs font-bold flex items-center gap-1">
              <Sparkles size={12} /> Document Preparation Vault
            </span>
            <span className="text-xs text-[#66727E] flex items-center gap-1">
              <Lock size={12} /> 100% Client-Side Private
            </span>
          </div>
          <h3 className="text-base font-bold text-[#173B5F] mb-1">
            {benefitName}
          </h3>
          <p className="text-xs text-[#66727E] mb-3">
            Organize verified proofs before visiting the official portal or MeeSeva centre.
          </p>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-2.5 rounded-full bg-[#E2E6EA] overflow-hidden p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#173B5F] to-[#16856A] transition-all duration-500 shadow-sm" 
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#16856A] shrink-0">
              {readyCount} of {totalCount} Ready ({percentage}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
