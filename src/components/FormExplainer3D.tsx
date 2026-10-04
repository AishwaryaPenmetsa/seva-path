// ============================================================
// SevaPath — 3D Form Explainer Visual Component
// ============================================================

import React from 'react';
import { FileText, HelpCircle, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function FormExplainer3D() {
  return (
    <div className="relative my-8 p-6 rounded-3xl bg-gradient-to-br from-white/95 via-white/90 to-[#EAF2F8]/70 backdrop-blur-md border border-[#E2E6EA] shadow-xl shadow-[#173B5F]/5 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#173B5F]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Left: 3D Form Sheet with glowing highlighted fields */}
        <div className="relative p-5 rounded-2xl bg-white border border-[#E2E6EA] shadow-md shadow-slate-200/50 transform md:-rotate-1 hover:rotate-0 transition-transform duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E6EA] mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#173B5F]/10 text-[#173B5F] flex items-center justify-center text-xs font-bold">
                <FileText size={14} />
              </div>
              <span className="text-xs font-bold text-[#17212B]">Official Government Application Form</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#FEF3CD] text-[#7C5B00] font-semibold">
              Sample Form
            </span>
          </div>

          {/* Form Fields representation */}
          <div className="space-y-3">
            <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E6EA]">
              <div className="text-[10px] text-[#66727E] uppercase font-semibold">Field 01: Applicant Full Name</div>
              <div className="h-2 w-3/4 bg-[#CBD5E1] rounded mt-1" />
            </div>

            {/* Glowing active field */}
            <div className="p-3 rounded-xl bg-[#EAF2F8] border-2 border-[#173B5F] shadow-sm relative">
              <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded bg-[#173B5F] text-white text-[9px] font-bold">
                Decoded by SevaPath
              </span>
              <div className="text-[11px] font-bold text-[#173B5F]">
                Field 02: "Pattadar Passbook Khata No. / RoR 1-B"
              </div>
              <div className="text-[10px] text-[#66727E] mt-0.5 flex items-center gap-1">
                <span>→ Found on Page 1 of your land passbook</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E6EA]">
              <div className="text-[10px] text-[#66727E] uppercase font-semibold">Field 03: Aadhaar-Linked Bank Account IFSC</div>
              <div className="h-2 w-1/2 bg-[#CBD5E1] rounded mt-1" />
            </div>
          </div>
        </div>

        {/* Right: Plain Language Explanation Box */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16856A]/10 text-[#16856A] text-xs font-bold">
            <Sparkles size={13} />
            <span>Zero Jargon Translation</span>
          </div>
          <h3 className="text-lg font-bold text-[#173B5F]">
            Confusing Government Wording Made Simple
          </h3>
          <p className="text-xs text-[#66727E] leading-relaxed">
            Never get stuck on legal terms. SevaPath translates complex requirements into plain language, showing exactly what each field means, what document to check, and common errors to avoid.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="p-2.5 rounded-xl bg-white border border-[#E2E6EA] flex items-center gap-2 text-xs font-medium text-[#17212B]">
              <span className="w-5 h-5 rounded-full bg-[#E8F5E9] text-[#16856A] flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
              <span>Where to find it</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#E2E6EA] flex items-center gap-2 text-xs font-medium text-[#17212B]">
              <span className="w-5 h-5 rounded-full bg-[#E8F5E9] text-[#16856A] flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
              <span>Exact sample values</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
