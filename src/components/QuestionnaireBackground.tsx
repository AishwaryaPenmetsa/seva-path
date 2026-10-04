// ============================================================
// SevaPath — Dedicated Rich Civic-Tech Background for Questionnaire
// ============================================================

import React from 'react';

export default function QuestionnaireBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0" 
      aria-hidden="true"
    >
      {/* ── Base Tint & Deep Gradient Mesh ────────────────────────── */}
      <div 
        className="absolute inset-0 bg-[#F5F7F9]"
        style={{
          background: `
            radial-gradient(circle at 10% 15%, rgba(23, 59, 95, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 90% 20%, rgba(22, 133, 106, 0.09) 0%, transparent 50%),
            radial-gradient(circle at 85% 85%, rgba(217, 154, 36, 0.07) 0%, transparent 45%),
            radial-gradient(circle at 15% 85%, rgba(22, 133, 106, 0.07) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, #FAFBF9 0%, #EFF3F6 100%)
          `
        }}
      />

      {/* ── Layer 1: Atmospheric Glow Orbs ────────────────────────── */}
      {/* Deep Navy Top-Left Ambient Wash */}
      <div 
        className="absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full blur-[100px] opacity-70 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(23, 59, 95, 0.16) 0%, rgba(23, 59, 95, 0.04) 50%, transparent 70%)',
          animationDuration: '14s'
        }}
      />

      {/* Teal Right-Side Flow Orb */}
      <div 
        className="absolute top-1/4 -right-32 w-[550px] h-[550px] rounded-full blur-[110px] opacity-75 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(22, 133, 106, 0.15) 0%, rgba(22, 133, 106, 0.03) 55%, transparent 70%)',
          animationDuration: '18s',
          animationDelay: '3s'
        }}
      />

      {/* Warm Saffron Corner Accents */}
      <div 
        className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full blur-[95px] opacity-60 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(217, 154, 36, 0.14) 0%, rgba(217, 154, 36, 0.03) 50%, transparent 70%)',
          animationDuration: '16s',
          animationDelay: '7s'
        }}
      />

      {/* Bottom-Left Navy/Teal Blend */}
      <div 
        className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full blur-[100px] opacity-65"
        style={{
          background: 'radial-gradient(circle, rgba(23, 59, 95, 0.12) 0%, rgba(22, 133, 106, 0.08) 50%, transparent 70%)',
        }}
      />

      {/* ── Layer 2: Precision Civic Dot Grid & Crosshairs ─────────── */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-40 mix-blend-multiply" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="q-dot-grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#173B5F" fillOpacity="0.22" />
          </pattern>
          <pattern id="q-cross-grid" width="144" height="144" patternUnits="userSpaceOnUse">
            <path d="M 72 66 L 72 78 M 66 72 L 78 72" stroke="#16856A" strokeWidth="0.8" strokeOpacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#q-dot-grid)" />
        <rect width="100%" height="100%" fill="url(#q-cross-grid)" />
      </svg>

      {/* ── Layer 3: Flowing SVG Journey Paths & Connected Nodes ──── */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="q-path-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#173B5F" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#16856A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D99A24" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="q-path-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#16856A" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#173B5F" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#16856A" stopOpacity="0.05" />
          </linearGradient>

          {/* Glowing Filter */}
          <filter id="q-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Primary Left Flowing Pathway */}
        <path 
          d="M -50,150 C 250,80 180,450 80,600 C -20,750 150,850 350,920" 
          fill="none" 
          stroke="url(#q-path-grad-1)" 
          strokeWidth="2.5" 
          strokeDasharray="6 8"
        />

        {/* Secondary Left Supporting Contour */}
        <path 
          d="M -80,220 C 200,160 220,520 120,680 C 40,800 200,880 400,950" 
          fill="none" 
          stroke="#16856A" 
          strokeWidth="1.2" 
          strokeOpacity="0.2" 
        />

        {/* Primary Right Flowing Pathway */}
        <path 
          d="M 1500,100 C 1220,200 1280,480 1380,650 C 1450,780 1280,850 1080,950" 
          fill="none" 
          stroke="url(#q-path-grad-1)" 
          strokeWidth="2.5" 
          strokeDasharray="5 6"
        />

        {/* Secondary Right Supporting Contour */}
        <path 
          d="M 1480,250 C 1260,320 1220,560 1320,720 C 1380,820 1220,890 1020,960" 
          fill="none" 
          stroke="#D99A24" 
          strokeWidth="1.2" 
          strokeOpacity="0.25" 
        />

        {/* Connecting Network Node 1 - Top Left */}
        <g transform="translate(180, 240)">
          <circle cx="0" cy="0" r="18" fill="#173B5F" fillOpacity="0.04" />
          <circle cx="0" cy="0" r="8" fill="#173B5F" fillOpacity="0.12" />
          <circle cx="0" cy="0" r="3.5" fill="#173B5F" />
          <line x1="0" y1="0" x2="60" y2="40" stroke="#173B5F" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 3" />
        </g>

        {/* Connecting Network Node 2 - Mid Left (Saffron) */}
        <g transform="translate(90, 520)">
          <circle cx="0" cy="0" r="22" fill="#D99A24" fillOpacity="0.06" filter="url(#q-glow)" />
          <circle cx="0" cy="0" r="10" fill="#D99A24" fillOpacity="0.15" />
          <circle cx="0" cy="0" r="4" fill="#D99A24" />
          <line x1="0" y1="0" x2="45" y2="-50" stroke="#D99A24" strokeWidth="1" strokeOpacity="0.25" />
        </g>

        {/* Connecting Network Node 3 - Bottom Left (Teal) */}
        <g transform="translate(260, 780)">
          <circle cx="0" cy="0" r="16" fill="#16856A" fillOpacity="0.08" />
          <circle cx="0" cy="0" r="7" fill="#16856A" fillOpacity="0.2" />
          <circle cx="0" cy="0" r="3.5" fill="#16856A" />
        </g>

        {/* Connecting Network Node 4 - Top Right (Teal) */}
        <g transform="translate(1260, 260)">
          <circle cx="0" cy="0" r="20" fill="#16856A" fillOpacity="0.06" filter="url(#q-glow)" />
          <circle cx="0" cy="0" r="9" fill="#16856A" fillOpacity="0.18" />
          <circle cx="0" cy="0" r="4" fill="#16856A" />
          <line x1="0" y1="0" x2="-50" y2="35" stroke="#16856A" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 3" />
        </g>

        {/* Connecting Network Node 5 - Mid Right (Navy) */}
        <g transform="translate(1360, 540)">
          <circle cx="0" cy="0" r="18" fill="#173B5F" fillOpacity="0.05" />
          <circle cx="0" cy="0" r="8" fill="#173B5F" fillOpacity="0.14" />
          <circle cx="0" cy="0" r="3.5" fill="#173B5F" />
        </g>

        {/* Connecting Network Node 6 - Bottom Right (Saffron) */}
        <g transform="translate(1180, 760)">
          <circle cx="0" cy="0" r="22" fill="#D99A24" fillOpacity="0.08" filter="url(#q-glow)" />
          <circle cx="0" cy="0" r="9" fill="#D99A24" fillOpacity="0.2" />
          <circle cx="0" cy="0" r="4" fill="#D99A24" />
        </g>
      </svg>

      {/* ── Layer 4: Understated Civic Motifs (Watermarks at Edge) ─── */}
      
      {/* Top Left Civic Document & Checklist Motif */}
      <div className="absolute top-20 left-10 opacity-25 hidden lg:block transform -rotate-6">
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
          <rect x="5" y="5" width="95" height="125" rx="10" stroke="#173B5F" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 25 30 L 75 30" stroke="#173B5F" strokeWidth="2" strokeLinecap="round" />
          <path d="M 25 45 L 65 45" stroke="#173B5F" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 25 65 L 32 72 L 48 56" stroke="#16856A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 55 65 L 85 65" stroke="#173B5F" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 25 90 L 32 97 L 48 81" stroke="#16856A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 55 90 L 80 90" stroke="#173B5F" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Bottom Left Government Seal / Geometric Mandala Watermark */}
      <div className="absolute bottom-16 left-12 opacity-20 hidden lg:block">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <circle cx="70" cy="70" r="55" stroke="#16856A" strokeWidth="1.2" strokeDasharray="4 4" />
          <circle cx="70" cy="70" r="42" stroke="#173B5F" strokeWidth="1" />
          <circle cx="70" cy="70" r="28" stroke="#D99A24" strokeWidth="1.2" />
          <circle cx="70" cy="70" r="8" fill="#16856A" fillOpacity="0.3" />
          {/* Radial Spokes */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="70"
              y1="70"
              x2={70 + 42 * Math.cos((deg * Math.PI) / 180)}
              y2={70 + 42 * Math.sin((deg * Math.PI) / 180)}
              stroke="#173B5F"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
          ))}
        </svg>
      </div>

      {/* Top Right Form Explainer & Guidance Stamp Motif */}
      <div className="absolute top-24 right-12 opacity-25 hidden lg:block transform rotate-6">
        <svg width="130" height="130" viewBox="0 0 130 130" fill="none">
          <rect x="10" y="10" width="110" height="110" rx="16" stroke="#D99A24" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="35" cy="35" r="12" fill="#D99A24" fillOpacity="0.15" />
          <path d="M 35 28 L 35 38 M 35 41 L 35 43" stroke="#D99A24" strokeWidth="2" strokeLinecap="round" />
          <path d="M 55 35 L 100 35" stroke="#173B5F" strokeWidth="2" strokeLinecap="round" />
          <path d="M 25 65 L 105 65" stroke="#16856A" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 25 80 L 85 80" stroke="#16856A" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 25 95 L 95 95" stroke="#173B5F" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Bottom Right Verified Shield & Pathway Motif */}
      <div className="absolute bottom-20 right-14 opacity-25 hidden lg:block">
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
          <path 
            d="M 60 15 L 105 35 C 105 85 60 120 60 120 C 60 120 15 85 15 35 Z" 
            stroke="#16856A" 
            strokeWidth="1.5" 
            fill="#16856A" 
            fillOpacity="0.04" 
          />
          <path 
            d="M 42 62 L 54 74 L 78 48" 
            stroke="#16856A" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      {/* ── Layer 5: Subtle Center Vignette (Ensures Maximum Card Legibility) ── */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 48%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 70%)'
        }}
      />
    </div>
  );
}
