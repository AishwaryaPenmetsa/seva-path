// ============================================================
// SevaPath — Background Visual Layer (Enhanced)
// ============================================================
// A sophisticated civic-tech visual backdrop using layered SVG:
// 1. Soft radial colour washes (navy, green, amber accents)
// 2. Abstract India-inspired territory contours at edges
// 3. Multi-path journey lines with milestone nodes (Discover→Track)
// 4. Connected civic-network node clusters
// 5. Subtle repeating dot-grid / topo-lines
// 6. Faint civic iconography (documents, shields, compass, pillars)
// 7. Organic soft blobs for depth
// 8. A top decorative accent band
// All kept at calibrated low opacity — collectively distinctive,
// individually nearly invisible. Content remains fully readable.
// ============================================================

export default function SevaPathBackground() {
  return (
    <div
      className="seva-bg"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {/* ══════════════════════════════════════════════════
          LAYER 1 — Soft radial colour washes
          ══════════════════════════════════════════════════ */}
      <div className="seva-bg-wash seva-bg-wash--top-left" />
      <div className="seva-bg-wash seva-bg-wash--top-right" />
      <div className="seva-bg-wash seva-bg-wash--bottom-right" />
      <div className="seva-bg-wash seva-bg-wash--bottom-left" />
      <div className="seva-bg-wash seva-bg-wash--center" />

      {/* ══════════════════════════════════════════════════
          LAYER 2 — Subtle dot-grid / topo field
          A faint repeating pattern that adds texture
          across the entire background
          ══════════════════════════════════════════════════ */}
      <svg
        className="seva-bg-dotgrid"
        xmlns="http://www.w3.org/2000/svg"
        width="100%" height="100%"
      >
        <defs>
          <pattern id="sevaDotGrid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="#173B5F" opacity="0.35" />
          </pattern>
          {/* Fade mask: strong centre fade, visible at far edges */}
          <radialGradient id="dotGridFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="35%" stopColor="white" stopOpacity="0" />
            <stop offset="65%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </radialGradient>
          <mask id="dotGridMask">
            <rect width="100%" height="100%" fill="url(#dotGridFade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#sevaDotGrid)" mask="url(#dotGridMask)" />
      </svg>

      {/* ══════════════════════════════════════════════════
          LAYER 3 — Abstract territory / topo contours
          India-inspired organic contour clusters at edges
          ══════════════════════════════════════════════════ */}
      <svg
        className="seva-bg-contours"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Vignette mask: centre clear, edges visible */}
          <radialGradient id="contourFade" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="45%" stopColor="white" stopOpacity="0" />
            <stop offset="75%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </radialGradient>
          <mask id="contourMask">
            <rect width="100%" height="100%" fill="url(#contourFade)" />
          </mask>
        </defs>

        <g mask="url(#contourMask)">
          {/* ── Top-right territory cluster (navy) ── */}
          <g opacity="0.06" fill="none" stroke="#173B5F" strokeWidth="0.9">
            <path d="M980 40 Q1050 100 1020 180 Q990 260 1060 300 Q1130 340 1100 420 Q1070 480 1120 520" className="seva-contour seva-contour--1" />
            <path d="M1020 20 Q1090 80 1060 160 Q1030 240 1100 280 Q1170 320 1140 400 Q1110 460 1160 500" className="seva-contour seva-contour--2" />
            <path d="M1060 0 Q1130 60 1100 140 Q1070 220 1140 260 Q1210 300 1180 380 Q1150 440 1200 480" className="seva-contour seva-contour--3" />
            <ellipse cx="1260" cy="120" rx="140" ry="90" className="seva-contour seva-contour--4" />
            <ellipse cx="1300" cy="170" rx="110" ry="70" className="seva-contour seva-contour--5" />
            <ellipse cx="1340" cy="80" rx="80" ry="55" />
            {/* Additional topo rings */}
            <path d="M1200 50 Q1280 30 1350 80 Q1420 130 1380 200" />
            <path d="M1150 90 Q1220 70 1290 110 Q1360 150 1320 220" />
          </g>

          {/* ── Bottom-left territory cluster (green) ── */}
          <g opacity="0.05" fill="none" stroke="#16856A" strokeWidth="0.9">
            <path d="M80 600 Q150 560 200 620 Q250 680 320 660 Q390 640 400 720 Q410 800 350 840" className="seva-contour seva-contour--6" />
            <path d="M40 640 Q110 600 160 660 Q210 720 280 700 Q350 680 360 760 Q370 840 310 880" className="seva-contour seva-contour--7" />
            <path d="M120 560 Q190 520 240 580 Q290 640 360 620 Q430 600 440 680 Q450 760 390 800" className="seva-contour seva-contour--8" />
            <ellipse cx="160" cy="740" rx="140" ry="80" className="seva-contour seva-contour--9" />
            <ellipse cx="120" cy="800" rx="100" ry="60" />
            {/* Additional topo rings */}
            <path d="M60 700 Q130 680 170 740 Q210 800 160 850" />
            <path d="M20 760 Q90 740 130 800 Q170 860 120 900" />
          </g>

          {/* ── Top-left territory accent (navy, lighter) ── */}
          <g opacity="0.035" fill="none" stroke="#173B5F" strokeWidth="0.7">
            <path d="M40 60 Q100 30 160 70 Q220 110 200 180 Q180 250 120 260" />
            <path d="M60 90 Q120 60 180 100 Q240 140 220 210 Q200 280 140 290" />
            <ellipse cx="100" cy="140" rx="100" ry="65" />
            <path d="M0 180 Q60 160 100 200 Q140 240 120 300" />
          </g>

          {/* ── Bottom-right territory accent (green, lighter) ── */}
          <g opacity="0.035" fill="none" stroke="#16856A" strokeWidth="0.7">
            <path d="M1300 700 Q1360 680 1400 720 Q1440 760 1420 820" />
            <path d="M1320 730 Q1380 710 1420 750 Q1460 790 1440 850" />
            <ellipse cx="1380" cy="780" rx="90" ry="55" />
          </g>

          {/* ── Sparse mid-field contours (very faint) ── */}
          <g opacity="0.025" fill="none" stroke="#173B5F" strokeWidth="0.6">
            <path d="M400 60 Q500 130 480 230 Q460 330 560 360" />
            <path d="M500 830 Q600 760 650 800 Q700 840 800 810" />
          </g>
          <g opacity="0.02" fill="none" stroke="#16856A" strokeWidth="0.5">
            <path d="M700 20 Q750 80 720 150 Q690 220 740 260" />
            <path d="M650 860 Q700 800 750 830 Q800 860 850 840" />
          </g>
        </g>
      </svg>

      {/* ══════════════════════════════════════════════════
          LAYER 4 — Multi-path Journey Lines with Nodes
          The "Discover → Prepare → Apply → Track" metaphor
          ══════════════════════════════════════════════════ */}
      <svg
        className="seva-bg-journey"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="journeyGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#173B5F" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#16856A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#173B5F" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* ── Primary journey path — flowing meandering line ── */}
        <g opacity="0.065">
          <path
            d="M-60 320 C60 300, 140 370, 230 350 S380 270, 470 310 S610 390, 710 360 S850 290, 950 330 S1090 410, 1190 370 S1330 290, 1500 330"
            fill="none"
            stroke="url(#journeyGradient1)"
            strokeWidth="1.6"
            strokeDasharray="10 7"
            className="seva-journey-line"
          />

          {/* Journey milestone nodes */}
          {/* ① Discover */}
          <circle cx="230" cy="350" r="5.5" fill="#173B5F" opacity="0.75" className="seva-node seva-node--1" />
          <circle cx="230" cy="350" r="12" fill="none" stroke="#173B5F" strokeWidth="0.8" opacity="0.3" className="seva-node-ring seva-node-ring--1" />
          <circle cx="230" cy="350" r="19" fill="none" stroke="#173B5F" strokeWidth="0.4" opacity="0.12" className="seva-node-halo seva-node-halo--1" />

          {/* ② Check */}
          <circle cx="470" cy="310" r="4.5" fill="#16856A" opacity="0.65" className="seva-node seva-node--2" />
          <circle cx="470" cy="310" r="10" fill="none" stroke="#16856A" strokeWidth="0.7" opacity="0.25" className="seva-node-ring seva-node-ring--2" />
          <circle cx="470" cy="310" r="17" fill="none" stroke="#16856A" strokeWidth="0.3" opacity="0.1" className="seva-node-halo seva-node-halo--2" />

          {/* ③ Prepare */}
          <circle cx="710" cy="360" r="5.5" fill="#173B5F" opacity="0.75" className="seva-node seva-node--3" />
          <circle cx="710" cy="360" r="12" fill="none" stroke="#173B5F" strokeWidth="0.8" opacity="0.3" className="seva-node-ring seva-node-ring--3" />
          <circle cx="710" cy="360" r="19" fill="none" stroke="#173B5F" strokeWidth="0.4" opacity="0.12" className="seva-node-halo seva-node-halo--3" />

          {/* ④ Apply */}
          <circle cx="950" cy="330" r="5" fill="#16856A" opacity="0.7" className="seva-node seva-node--4" />
          <circle cx="950" cy="330" r="11" fill="none" stroke="#16856A" strokeWidth="0.7" opacity="0.28" className="seva-node-ring seva-node-ring--4" />
          <circle cx="950" cy="330" r="18" fill="none" stroke="#16856A" strokeWidth="0.35" opacity="0.1" className="seva-node-halo seva-node-halo--4" />

          {/* ⑤ Track */}
          <circle cx="1190" cy="370" r="5.5" fill="#173B5F" opacity="0.75" className="seva-node seva-node--5" />
          <circle cx="1190" cy="370" r="12" fill="none" stroke="#173B5F" strokeWidth="0.8" opacity="0.3" className="seva-node-ring seva-node-ring--5" />
          <circle cx="1190" cy="370" r="19" fill="none" stroke="#173B5F" strokeWidth="0.4" opacity="0.12" className="seva-node-halo seva-node-halo--5" />

          {/* Small connecting branches from nodes */}
          <line x1="230" y1="350" x2="200" y2="310" stroke="#173B5F" strokeWidth="0.6" opacity="0.3" />
          <circle cx="200" cy="310" r="2" fill="#173B5F" opacity="0.3" />
          <line x1="470" y1="310" x2="500" y2="280" stroke="#16856A" strokeWidth="0.6" opacity="0.25" />
          <circle cx="500" cy="280" r="2" fill="#16856A" opacity="0.25" />
          <line x1="710" y1="360" x2="740" y2="330" stroke="#173B5F" strokeWidth="0.6" opacity="0.3" />
          <circle cx="740" cy="330" r="2" fill="#173B5F" opacity="0.25" />
          <line x1="950" y1="330" x2="920" y2="300" stroke="#16856A" strokeWidth="0.6" opacity="0.25" />
          <circle cx="920" cy="300" r="2" fill="#16856A" opacity="0.22" />
          <line x1="1190" y1="370" x2="1220" y2="340" stroke="#173B5F" strokeWidth="0.6" opacity="0.3" />
          <circle cx="1220" cy="340" r="2" fill="#173B5F" opacity="0.25" />
        </g>

        {/* ── Secondary journey line — lower, gentler ── */}
        <g opacity="0.035">
          <path
            d="M-40 680 C100 660, 200 710, 330 685 S510 630, 650 670 S830 730, 970 695 S1150 640, 1290 680 S1410 710, 1500 690"
            fill="none"
            stroke="#16856A"
            strokeWidth="1"
            strokeDasharray="5 9"
            className="seva-journey-line seva-journey-line--secondary"
          />
          <circle cx="330" cy="685" r="3" fill="#16856A" opacity="0.5" />
          <circle cx="650" cy="670" r="3.5" fill="#16856A" opacity="0.5" />
          <circle cx="970" cy="695" r="3" fill="#16856A" opacity="0.5" />
          <circle cx="1290" cy="680" r="3" fill="#16856A" opacity="0.45" />
        </g>

        {/* ── Tertiary journey line — upper, sparse ── */}
        <g opacity="0.025">
          <path
            d="M-20 140 C120 130, 260 170, 400 150 S600 110, 780 145 S980 190, 1140 155 S1320 120, 1500 150"
            fill="none"
            stroke="#173B5F"
            strokeWidth="0.8"
            strokeDasharray="3 10"
            className="seva-journey-line seva-journey-line--tertiary"
          />
          <circle cx="400" cy="150" r="2.5" fill="#173B5F" opacity="0.4" />
          <circle cx="780" cy="145" r="2.5" fill="#173B5F" opacity="0.4" />
          <circle cx="1140" cy="155" r="2.5" fill="#173B5F" opacity="0.35" />
        </g>
      </svg>

      {/* ══════════════════════════════════════════════════
          LAYER 5 — Civic network node clusters
          Connected dots/lines suggesting an information network
          ══════════════════════════════════════════════════ */}
      <svg
        className="seva-bg-network"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Top-left network cluster ── */}
        <g opacity="0.045">
          <line x1="50" y1="70" x2="130" y2="130" stroke="#173B5F" strokeWidth="0.7" />
          <line x1="130" y1="130" x2="110" y2="230" stroke="#173B5F" strokeWidth="0.7" />
          <line x1="130" y1="130" x2="230" y2="150" stroke="#173B5F" strokeWidth="0.7" />
          <line x1="230" y1="150" x2="270" y2="90" stroke="#16856A" strokeWidth="0.7" />
          <line x1="230" y1="150" x2="290" y2="230" stroke="#173B5F" strokeWidth="0.5" />
          <line x1="290" y1="230" x2="350" y2="200" stroke="#16856A" strokeWidth="0.4" />
          <line x1="50" y1="70" x2="80" y2="30" stroke="#173B5F" strokeWidth="0.5" />
          <line x1="110" y1="230" x2="60" y2="280" stroke="#16856A" strokeWidth="0.4" />
          <circle cx="50" cy="70" r="3.5" fill="#173B5F" opacity="0.55" />
          <circle cx="130" cy="130" r="4.5" fill="#16856A" opacity="0.55" />
          <circle cx="110" cy="230" r="3" fill="#173B5F" opacity="0.45" />
          <circle cx="230" cy="150" r="4" fill="#173B5F" opacity="0.55" />
          <circle cx="270" cy="90" r="3" fill="#16856A" opacity="0.45" />
          <circle cx="290" cy="230" r="2.5" fill="#173B5F" opacity="0.35" />
          <circle cx="350" cy="200" r="2" fill="#16856A" opacity="0.3" />
          <circle cx="80" cy="30" r="2.5" fill="#173B5F" opacity="0.35" />
          <circle cx="60" cy="280" r="2" fill="#16856A" opacity="0.3" />
        </g>

        {/* ── Bottom-right network cluster ── */}
        <g opacity="0.045">
          <line x1="1140" y1="620" x2="1220" y2="680" stroke="#16856A" strokeWidth="0.7" />
          <line x1="1220" y1="680" x2="1320" y2="660" stroke="#173B5F" strokeWidth="0.7" />
          <line x1="1220" y1="680" x2="1200" y2="770" stroke="#16856A" strokeWidth="0.7" />
          <line x1="1320" y1="660" x2="1380" y2="720" stroke="#173B5F" strokeWidth="0.5" />
          <line x1="1320" y1="660" x2="1360" y2="580" stroke="#16856A" strokeWidth="0.5" />
          <line x1="1380" y1="720" x2="1420" y2="790" stroke="#173B5F" strokeWidth="0.4" />
          <line x1="1200" y1="770" x2="1140" y2="820" stroke="#16856A" strokeWidth="0.4" />
          <line x1="1360" y1="580" x2="1400" y2="540" stroke="#173B5F" strokeWidth="0.4" />
          <circle cx="1140" cy="620" r="3.5" fill="#16856A" opacity="0.55" />
          <circle cx="1220" cy="680" r="4.5" fill="#173B5F" opacity="0.55" />
          <circle cx="1320" cy="660" r="4" fill="#16856A" opacity="0.55" />
          <circle cx="1200" cy="770" r="3" fill="#173B5F" opacity="0.45" />
          <circle cx="1380" cy="720" r="2.5" fill="#173B5F" opacity="0.35" />
          <circle cx="1360" cy="580" r="3" fill="#16856A" opacity="0.45" />
          <circle cx="1420" cy="790" r="2" fill="#173B5F" opacity="0.3" />
          <circle cx="1140" cy="820" r="2" fill="#16856A" opacity="0.3" />
          <circle cx="1400" cy="540" r="2.5" fill="#173B5F" opacity="0.35" />
        </g>

        {/* ── Left-edge mid cluster ── */}
        <g opacity="0.03">
          <line x1="0" y1="440" x2="50" y2="410" stroke="#173B5F" strokeWidth="0.6" />
          <line x1="50" y1="410" x2="90" y2="470" stroke="#173B5F" strokeWidth="0.6" />
          <line x1="50" y1="410" x2="110" y2="390" stroke="#16856A" strokeWidth="0.5" />
          <line x1="110" y1="390" x2="130" y2="440" stroke="#173B5F" strokeWidth="0.4" />
          <circle cx="50" cy="410" r="2.5" fill="#173B5F" opacity="0.45" />
          <circle cx="90" cy="470" r="2" fill="#173B5F" opacity="0.35" />
          <circle cx="110" cy="390" r="2" fill="#16856A" opacity="0.35" />
          <circle cx="130" cy="440" r="1.5" fill="#173B5F" opacity="0.25" />
        </g>

        {/* ── Right-edge mid cluster ── */}
        <g opacity="0.03">
          <line x1="1440" y1="390" x2="1380" y2="420" stroke="#16856A" strokeWidth="0.6" />
          <line x1="1380" y1="420" x2="1400" y2="490" stroke="#16856A" strokeWidth="0.6" />
          <line x1="1380" y1="420" x2="1340" y2="380" stroke="#173B5F" strokeWidth="0.5" />
          <line x1="1340" y1="380" x2="1310" y2="430" stroke="#16856A" strokeWidth="0.4" />
          <circle cx="1380" cy="420" r="2.5" fill="#16856A" opacity="0.45" />
          <circle cx="1400" cy="490" r="2" fill="#16856A" opacity="0.35" />
          <circle cx="1340" cy="380" r="2" fill="#173B5F" opacity="0.35" />
          <circle cx="1310" cy="430" r="1.5" fill="#16856A" opacity="0.25" />
        </g>

        {/* ── Top-right sparse cluster ── */}
        <g opacity="0.025">
          <line x1="900" y1="40" x2="950" y2="80" stroke="#173B5F" strokeWidth="0.5" />
          <line x1="950" y1="80" x2="920" y2="130" stroke="#16856A" strokeWidth="0.4" />
          <circle cx="900" cy="40" r="2" fill="#173B5F" opacity="0.35" />
          <circle cx="950" cy="80" r="2.5" fill="#16856A" opacity="0.35" />
          <circle cx="920" cy="130" r="1.8" fill="#16856A" opacity="0.25" />
        </g>

        {/* ── Bottom-left sparse cluster ── */}
        <g opacity="0.025">
          <line x1="500" y1="820" x2="550" y2="860" stroke="#16856A" strokeWidth="0.5" />
          <line x1="550" y1="860" x2="600" y2="840" stroke="#173B5F" strokeWidth="0.4" />
          <circle cx="500" cy="820" r="2" fill="#16856A" opacity="0.35" />
          <circle cx="550" cy="860" r="2.5" fill="#173B5F" opacity="0.35" />
          <circle cx="600" cy="840" r="1.8" fill="#173B5F" opacity="0.25" />
        </g>
      </svg>

      {/* ══════════════════════════════════════════════════
          LAYER 6 — Civic iconography at far edges
          ══════════════════════════════════════════════════ */}
      <svg
        className="seva-bg-symbols"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 📄 Document icon — top-right edge */}
        <g opacity="0.04" transform="translate(1340, 55) scale(0.85)" className="seva-symbol seva-symbol--1">
          <rect x="0" y="0" width="30" height="38" rx="3" fill="none" stroke="#173B5F" strokeWidth="1.2" />
          <line x1="6" y1="10" x2="24" y2="10" stroke="#173B5F" strokeWidth="1" />
          <line x1="6" y1="16" x2="24" y2="16" stroke="#173B5F" strokeWidth="1" />
          <line x1="6" y1="22" x2="18" y2="22" stroke="#173B5F" strokeWidth="1" />
          <line x1="6" y1="28" x2="20" y2="28" stroke="#173B5F" strokeWidth="0.8" />
          <polyline points="20,0 30,10" fill="none" stroke="#173B5F" strokeWidth="0.8" />
          <line x1="20" y1="0" x2="20" y2="10" stroke="#173B5F" strokeWidth="0.6" />
        </g>

        {/* 🛡 Shield / verification icon — bottom-left edge */}
        <g opacity="0.04" transform="translate(35, 770) scale(0.85)" className="seva-symbol seva-symbol--2">
          <path d="M16 2 L30 9 L30 22 Q30 33 16 40 Q2 33 2 22 L2 9 Z" fill="none" stroke="#16856A" strokeWidth="1.2" />
          <polyline points="10,20 15,27 24,15" fill="none" stroke="#16856A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* 🔍 Search / discovery icon — left mid */}
        <g opacity="0.03" transform="translate(15, 390) scale(0.75)" className="seva-symbol seva-symbol--3">
          <circle cx="15" cy="15" r="11" fill="none" stroke="#173B5F" strokeWidth="1.1" />
          <line x1="23" y1="23" x2="33" y2="33" stroke="#173B5F" strokeWidth="1.3" strokeLinecap="round" />
        </g>

        {/* 🏛 Government building / pillar icon — right mid */}
        <g opacity="0.03" transform="translate(1385, 470) scale(0.7)" className="seva-symbol seva-symbol--4">
          {/* Pediment triangle */}
          <polyline points="0,14 18,2 36,14" fill="none" stroke="#16856A" strokeWidth="1" />
          {/* Base beam */}
          <line x1="-2" y1="14" x2="38" y2="14" stroke="#16856A" strokeWidth="1" />
          {/* Columns */}
          <line x1="6" y1="14" x2="6" y2="32" stroke="#16856A" strokeWidth="1.2" />
          <line x1="18" y1="14" x2="18" y2="32" stroke="#16856A" strokeWidth="1.2" />
          <line x1="30" y1="14" x2="30" y2="32" stroke="#16856A" strokeWidth="1.2" />
          {/* Floor */}
          <line x1="0" y1="32" x2="36" y2="32" stroke="#16856A" strokeWidth="1" />
          <line x1="-2" y1="35" x2="38" y2="35" stroke="#16856A" strokeWidth="0.8" />
        </g>

        {/* 👤 Person / user icon — top-left area */}
        <g opacity="0.025" transform="translate(320, 30) scale(0.65)" className="seva-symbol seva-symbol--5">
          <circle cx="16" cy="10" r="8" fill="none" stroke="#173B5F" strokeWidth="1" />
          <path d="M2 34 Q2 22 16 22 Q30 22 30 34" fill="none" stroke="#173B5F" strokeWidth="1" />
        </g>

        {/* 📋 Checklist icon — bottom-right area */}
        <g opacity="0.025" transform="translate(1280, 830) scale(0.6)" className="seva-symbol seva-symbol--6">
          <rect x="0" y="0" width="28" height="36" rx="2" fill="none" stroke="#173B5F" strokeWidth="1" />
          <line x1="10" y1="10" x2="22" y2="10" stroke="#173B5F" strokeWidth="0.8" />
          <line x1="10" y1="18" x2="22" y2="18" stroke="#173B5F" strokeWidth="0.8" />
          <line x1="10" y1="26" x2="22" y2="26" stroke="#173B5F" strokeWidth="0.8" />
          <polyline points="4,9 5.5,11 8,8" fill="none" stroke="#16856A" strokeWidth="0.9" />
          <polyline points="4,17 5.5,19 8,16" fill="none" stroke="#16856A" strokeWidth="0.9" />
          <rect x="4" y="24" width="4" height="4" rx="0.5" fill="none" stroke="#173B5F" strokeWidth="0.7" />
        </g>

        {/* 🔔 Notification / tracking icon — bottom center-right */}
        <g opacity="0.02" transform="translate(1100, 860) scale(0.55)">
          <path d="M6 24 Q6 10 16 6 Q26 10 26 24 L6 24 Z" fill="none" stroke="#173B5F" strokeWidth="1" />
          <line x1="3" y1="24" x2="29" y2="24" stroke="#173B5F" strokeWidth="0.9" />
          <circle cx="16" cy="28" r="2.5" fill="none" stroke="#173B5F" strokeWidth="0.8" />
        </g>
      </svg>

      {/* ══════════════════════════════════════════════════
          LAYER 7 — Organic soft blobs for depth & warmth
          ══════════════════════════════════════════════════ */}
      <svg
        className="seva-bg-blobs"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Blue blobs */}
        <ellipse cx="1380" cy="50" rx="220" ry="150" fill="#EAF2F8" opacity="0.5" className="seva-blob seva-blob--1" />
        <ellipse cx="50" cy="850" rx="240" ry="130" fill="#EAF2F8" opacity="0.45" className="seva-blob seva-blob--2" />

        {/* Very faint green accents */}
        <ellipse cx="-50" cy="180" rx="180" ry="110" fill="#16856A" opacity="0.025" className="seva-blob seva-blob--3" />
        <ellipse cx="1490" cy="720" rx="200" ry="120" fill="#16856A" opacity="0.02" className="seva-blob seva-blob--4" />

        {/* Very faint navy accents */}
        <ellipse cx="1480" cy="100" rx="160" ry="100" fill="#173B5F" opacity="0.02" className="seva-blob seva-blob--5" />
        <ellipse cx="-40" cy="700" rx="170" ry="100" fill="#173B5F" opacity="0.02" className="seva-blob seva-blob--6" />

        {/* Subtle amber warmth at edges */}
        <ellipse cx="1440" cy="450" rx="80" ry="200" fill="#D99A24" opacity="0.012" className="seva-blob seva-blob--7" />
        <ellipse cx="0" cy="500" rx="80" ry="200" fill="#D99A24" opacity="0.012" className="seva-blob seva-blob--8" />

        {/* Faint soft-blue mid halos */}
        <ellipse cx="350" cy="100" rx="160" ry="100" fill="#EAF2F8" opacity="0.25" className="seva-blob seva-blob--9" />
        <ellipse cx="1100" cy="800" rx="160" ry="100" fill="#EAF2F8" opacity="0.2" className="seva-blob seva-blob--10" />
      </svg>

      {/* ══════════════════════════════════════════════════
          LAYER 8 — Top decorative accent band
          A very subtle horizontal ornamental strip below header
          ══════════════════════════════════════════════════ */}
      <svg
        className="seva-bg-accent-band"
        viewBox="0 0 1440 8"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="accentBandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#173B5F" stopOpacity="0" />
            <stop offset="15%" stopColor="#173B5F" stopOpacity="0.12" />
            <stop offset="40%" stopColor="#16856A" stopOpacity="0.08" />
            <stop offset="60%" stopColor="#16856A" stopOpacity="0.08" />
            <stop offset="85%" stopColor="#173B5F" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#173B5F" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="1440" height="1.5" y="0" fill="url(#accentBandGrad)" />
        {/* Subtle secondary line */}
        <rect width="1440" height="0.5" y="3" fill="url(#accentBandGrad)" opacity="0.3" />
      </svg>

      {/* ══════════════════════════════════════════════════
          LAYER 9 — Centre vignette / content-clear mask
          Keeps the central card area visually clean
          ══════════════════════════════════════════════════ */}
      <div className="seva-bg-vignette" />
    </div>
  );
}
