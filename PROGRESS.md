# SevaPath Implementation Progress

## STEP 0 — AUDIT
- [x] Check '#demo' links (only in guard checks; real links used across all 20 schemes & resources)
- [x] Check isDemoData notices (all 20 schemes set to `isDemoData: false`)
- [x] Check "Try Demo" (none found)
- [x] Check fake login in AuthModal / ProfilePage (ProfilePage uses device local storage + export/clear; AuthModal unused)
- [x] Check chat fallback in AskSevaPath (pure retrieval, no paid API)
- [x] Check `/for/:persona` routes (implemented in PersonaHubPage)
- [x] Check NotFound route (`path="*"` in App.tsx)
- [x] Check ErrorBoundary (implemented and wrapping router in App.tsx)
- [ ] Hindi in translations (missing 'hi' in Language type and translations.ts)
- [ ] Replace navy/green hex (#173B5F, #16856A, #1EB993) with warm palette across components
- [x] Check package name ("seva-path" in package.json)
- [x] Check tsconfig.tsbuildinfo (untracked and in .gitignore)

## P0 — CORE FUNCTION
- [ ] 1. No dead or fake links anywhere: officialApplicationUrl, officialInfoUrl, optional officialStatusUrl, departmentName. Buttons "Open official application" and "Official information" open new tab with rel="noopener noreferrer". If missing, show "Check the official department: {departmentName}". "View official page" must NEVER open SevaPath itself.
- [ ] 2. Student hub (/for/student): tabs Scholarships, Internships, Hackathons, each item with official link, deadline field, "Track this". Other personas (farmer, senior, job-seeker, woman) list matching benefits.
- [ ] 3. Chat (AskSevaPath) = retrieval over benefits + resources + help guides: tokenise EN/TE/HI, score on title/description/tags/category/persona, return top 3 as clickable cards. If nothing matches, say so and offer persona/category links. Enter to send, keyboard accessible, "answers come from SevaPath's saved data, not live government data" note.
- [ ] 4. Matching: use user's real questionnaire answers (age, state, occupation, income, education, needs). "Don't know" never counts as a match (show "need more info"). Each result shows why it matched / why not.
- [ ] 5. Real data: ~15–20 schemes (central + AP/Telangana) with real names, short plain-language eligibility, documents, sourceUrl, lastVerified. Where unsure, leave it out and list in VERIFY.md under "TO FILL BY HUMAN".

## P1 — COMPLETE THE JOURNEY
- [ ] 6. Separate categories, never mixed: Education, Scholarships, Housing, Loans & Finance, Jobs & Skills, Farming, Health, Women & Family, Business. Routes /find/:category with counts and short descriptions. One main category per scheme, secondary tags allowed.
- [ ] 7. Application stages: Started → Documents ready → Submitted → Under verification → Decision. First two set by app; Submitted/Under verification/Decision set BY THE USER (date + optional note; decision = approved / rejected / waiting). Label: "Updated by you. SevaPath cannot see your official status." Allow next, back, edit dates. Show "Open official status page" when available. Never auto-mark a stage.
- [ ] 8. Deadlines: deadline { type: 'rolling'|'dated'|'unknown', date?, note?, sourceUrl, lastVerified } on cards and detail pages. Unknown → "Check the official portal for the current deadline."
- [ ] 9. Helplines: helpline { number, hours?, sourceUrl } per scheme/department, shown in "Need help?" box on detail pages and on /help. Fill only from official sources readable in repo; otherwise leave empty + VERIFY.md.
- [ ] 10. Documents: per-document "Attach file", stored in IndexedDB (not localStorage), max 5 MB, pdf/jpg/png, preview, remove, "Clear all files". Warning: "Files stay on this device only. Nothing is uploaded. Don't use on a shared computer." No network calls with these files.
- [ ] 11. Replace fake login with local profile (name, language) + "Export my data" (JSON) and "Clear my data". Note that data lives only on this device.
- [ ] 12. Form Explainer: library of 3–4 form guides (income certificate, caste/category certificate, scholarship registration) explained field by field, labelled "general guidance".

## P2 — HELP, TRUST, NAVIGATION
- [ ] 13. /help: step-by-step guides (income certificate, applying on NSP, reading a form, nearest CSC), FAQ, small glossary of official words, printable document checklist (print CSS). Each guide has lastVerified. Chat links to these.
- [ ] 14. Navigation: Home, Find Help, For You, Form Guides, Help Map, My Applications, Help. Visible "next step" guide: discover → check → prepare → apply → track. Language switcher (EN/TE/HI) persists on every page and across reloads.
- [ ] 15. Hindi: add hi to switcher and translations; translate all UI strings; chat understands Devanagari. Add NOTES.md: "Hindi drafted by machine — needs native speaker review."
- [ ] 16. States: empty, loading, and error states for lists, search, chat, and file attach. NotFound route (path="*") and top-level ErrorBoundary.
- [ ] 17. Every scheme/resource shows source link + lastVerified. Footer/About: "Informational, not an official government website."
- [ ] 18. Telugu audit: move hardcoded English strings into translations.

## P3 — POLISH
- [ ] 19. Replace navy/green (#173B5F, #16856A, #1EB993) everywhere with warm palette: Charcoal #151719, Ivory #F1EDE4, Sand #D8CDBB, Terracotta #B85F45, Sage #728477, Indigo #30364F, Off-white #FAF8F3.
- [ ] 20. Accessibility + mobile: labels on all inputs, visible focus, AA contrast, skip link, aria on chat, reduced-motion; test layouts at 360px width.
- [ ] 21. Performance: lazy-load routes and 3D components; remove unused CSS/keyframes.
- [ ] 22. Housekeeping: package name "seva-path"; untrack tsconfig.tsbuildinfo; OG/meta tags in index.html; /public/images with README; "Give feedback" constant URL.

## QUALITY GATE
- [ ] 23. scripts/check-data.mjs and npm script "check" failing if: any '#demo' remains, any URL is not https or not on allowed domain list, any scheme lacks required fields, en/te/hi translation keys don't match. Fix failures.
