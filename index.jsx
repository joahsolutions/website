import { useState, useEffect, useRef } from "react";

// ─── Color tokens ────────────────────────────────────────────────────────────
const C = {
  navy: "#080D1A",
  navyMid: "#0F1629",
  blue: "#3B7BFF",
  blueDark: "#1A4FCC",
  teal: "#00D4C8",
  purple: "#7C5CFC",
  orange: "#FF8C42",
  gold: "#F5A623",
  white: "#FFFFFF",
  offwhite: "#E8ECF4",
  muted: "#8A93A8",
};

// ─── Global styles injected once ────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fraunces:ital,wght@0,700;0,900;1,700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      background: ${C.navy};
      color: ${C.offwhite};
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
      overflow-x: hidden;
    }

    .serif { font-family: 'Fraunces', serif; }

    /* Fade-in on scroll */
    .fade-up {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .fade-up.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Button base */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      border: none;
      text-decoration: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
    }
    .btn:hover { transform: translateY(-2px); }

    .btn-primary {
      background: ${C.blue};
      color: #fff;
      box-shadow: 0 8px 32px rgba(59,123,255,0.35);
    }
    .btn-primary:hover { box-shadow: 0 12px 40px rgba(59,123,255,0.5); }

    .btn-outline {
      background: transparent;
      color: ${C.offwhite};
      border: 1.5px solid rgba(255,255,255,0.25);
    }
    .btn-outline:hover { background: rgba(255,255,255,0.07); }

    /* Card */
    .card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      padding: 36px;
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .card:hover {
      transform: translateY(-6px);
      border-color: rgba(59,123,255,0.3);
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    }

    /* Gradient text */
    .grad-text {
      background: linear-gradient(135deg, ${C.blue} 0%, ${C.teal} 50%, ${C.purple} 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .grad-text-warm {
      background: linear-gradient(135deg, ${C.gold} 0%, ${C.orange} 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Nav */
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 0 5%;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: background 0.4s ease, backdrop-filter 0.4s ease;
    }
    nav.scrolled {
      background: rgba(8,13,26,0.92);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }

    .nav-links { display: flex; gap: 36px; list-style: none; }
    .nav-links a {
      color: ${C.muted};
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: ${C.white}; }

    /* Section */
    section {
      padding: 120px 5%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: ${C.blue};
      margin-bottom: 16px;
    }

    h1, h2, h3 { line-height: 1.15; }

    h1 {
      font-size: clamp(44px, 7vw, 88px);
      font-weight: 900;
      letter-spacing: -2px;
    }

    h2 {
      font-size: clamp(32px, 5vw, 56px);
      font-weight: 800;
      letter-spacing: -1px;
    }

    h3 {
      font-size: 22px;
      font-weight: 700;
    }

    /* Grid */
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(440px, 1fr));
      gap: 60px;
      align-items: center;
    }

    /* Stats row */
    .stats-row {
      display: flex;
      gap: 48px;
      flex-wrap: wrap;
    }

    .stat-num {
      font-size: 52px;
      font-weight: 900;
      letter-spacing: -2px;
      line-height: 1;
    }

    .stat-label {
      font-size: 14px;
      color: ${C.muted};
      margin-top: 4px;
    }

    /* Icon blob */
    .icon-blob {
      width: 64px;
      height: 64px;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      margin-bottom: 20px;
      flex-shrink: 0;
    }

    /* Divider */
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      margin: 0 5%;
    }

    /* Tag pill */
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    /* Orb background decorations */
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      pointer-events: none;
    }

    /* Testimonial card */
    .testimonial-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      padding: 32px;
    }

    /* Process step */
    .process-step {
      display: flex;
      gap: 24px;
      align-items: flex-start;
    }

    .step-num {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: ${C.blue};
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 16px;
      flex-shrink: 0;
    }

    /* Form */
    input, textarea {
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      padding: 14px 18px;
      color: ${C.white};
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      outline: none;
      transition: border-color 0.2s;
    }
    input:focus, textarea:focus {
      border-color: ${C.blue};
    }
    input::placeholder, textarea::placeholder { color: ${C.muted}; }
    textarea { resize: vertical; min-height: 130px; }

    label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: ${C.muted};
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }

    .form-group { margin-bottom: 20px; }

    /* Mobile nav toggle */
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      padding: 4px;
    }
    .hamburger span {
      width: 24px;
      height: 2px;
      background: ${C.white};
      border-radius: 2px;
      transition: all 0.3s;
    }

    @media (max-width: 768px) {
      .hamburger { display: flex; }
      .nav-links {
        position: fixed;
        top: 72px; left: 0; right: 0;
        flex-direction: column;
        background: rgba(8,13,26,0.97);
        padding: 24px 5%;
        gap: 20px;
        display: none;
      }
      .nav-links.open { display: flex; }
      .nav-links a { font-size: 17px; }
      .grid-2 { grid-template-columns: 1fr; }
      section { padding: 80px 5%; }
      .stats-row { gap: 32px; }
    }

    /* Full-width wrapper (breaks out of section max-width) */
    .full-bleed {
      width: 100vw;
      margin-left: calc(-5vw);
    }

    /* CTA section */
    .cta-section {
      margin: 0 5%;
      border-radius: 28px;
      padding: 80px 60px;
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #1A2E6B 0%, #0F1629 40%, #1A1040 100%);
      border: 1px solid rgba(255,255,255,0.1);
    }

    /* Footer */
    footer {
      padding: 60px 5% 40px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 48px;
      margin-bottom: 48px;
    }

    @media (max-width: 900px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 560px) {
      .footer-grid { grid-template-columns: 1fr; }
      .cta-section { padding: 56px 32px; }
    }

    .footer-link {
      color: ${C.muted};
      text-decoration: none;
      font-size: 14px;
      display: block;
      margin-bottom: 12px;
      transition: color 0.2s;
    }
    .footer-link:hover { color: ${C.white}; }
    .footer-col-title {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: ${C.offwhite};
      margin-bottom: 20px;
    }

    /* Animated gradient border on hero */
    @keyframes borderRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }

    .float { animation: float 6s ease-in-out infinite; }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(59,123,255,0.3); }
      50% { box-shadow: 0 0 60px rgba(59,123,255,0.6); }
    }
  `}</style>
);

// ─── Scroll animation hook ───────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Services", "About", "Process", "Contact"];

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      {/* Logo */}
      <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 900, color: "#fff",
        }}>J</div>
        <span style={{ color: C.white, fontWeight: 800, fontSize: 18, letterSpacing: -0.5 }}>
          Joah<span style={{ color: C.blue }}>.</span>
        </span>
      </a>

      {/* Links */}
      <ul className={`nav-links ${open ? "open" : ""}`}>
        {links.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <a href="#contact" className="btn btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>
          Get Started
        </a>
        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 72 }}>
      {/* Background orbs */}
      <div className="orb" style={{ width: 700, height: 700, background: "rgba(59,123,255,0.12)", top: -200, right: -200 }} />
      <div className="orb" style={{ width: 500, height: 500, background: "rgba(124,92,252,0.1)", bottom: -100, left: -100 }} />
      <div className="orb" style={{ width: 300, height: 300, background: "rgba(0,212,200,0.08)", top: "30%", left: "40%" }} />

      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
      }} />

      <section style={{ position: "relative", zIndex: 2, paddingTop: 80, paddingBottom: 80 }}>
        {/* Badge */}
        <div style={{ marginBottom: 28 }}>
          <span className="pill" style={{ background: "rgba(59,123,255,0.15)", color: C.blue, border: `1px solid rgba(59,123,255,0.3)` }}>
            ✦ AI-Powered Solutions
          </span>
        </div>

        {/* Headline */}
        <h1 className="serif" style={{ maxWidth: 900, color: C.white, marginBottom: 28 }}>
          Build the Future<br />
          <span className="grad-text">Faster with AI</span>
        </h1>

        {/* Sub */}
        <p style={{ fontSize: "clamp(17px, 2.5vw, 22px)", color: C.muted, maxWidth: 580, marginBottom: 44, lineHeight: 1.7 }}>
          Joah Solutions helps businesses unlock the full potential of artificial intelligence — from strategy to deployment, we build what's next.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href="#contact" className="btn btn-primary">Start a Project →</a>
          <a href="#services" className="btn btn-outline">Explore Services</a>
        </div>

        {/* Trust badges */}
        <div style={{ marginTop: 64, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>Trusted by teams at</span>
          {["Startups", "Scale-ups", "Enterprises"].map((t) => (
            <span key={t} style={{
              padding: "6px 16px", borderRadius: 50, border: "1px solid rgba(255,255,255,0.1)",
              fontSize: 13, color: C.offwhite, fontWeight: 600,
            }}>{t}</span>
          ))}
        </div>
      </section>

      {/* Floating visual */}
      <div className="float" style={{
        position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)",
        display: "none",
      }}>
        {/* shown only on large screens via inline override below */}
      </div>
    </div>
  );
}

// ─── Stats ───────────────────────────────────────────────────────────────────
function Stats() {
  const items = [
    { num: "120+", label: "AI projects delivered" },
    { num: "98%", label: "Client satisfaction" },
    { num: "40×", label: "Average efficiency gain" },
    { num: "24/7", label: "Dedicated support" },
  ];

  return (
    <div style={{ background: C.navyMid, padding: "0" }}>
      <div className="divider" />
      <section style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="stats-row">
          {items.map((s, i) => (
            <div key={i} className="fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="stat-num grad-text">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <div className="divider" />
    </div>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "🤖",
    color: "rgba(59,123,255,0.15)",
    border: "rgba(59,123,255,0.3)",
    title: "AI Strategy & Consulting",
    desc: "We map your business goals to AI opportunities — identifying where automation, ML, or generative AI delivers the most impact.",
    tags: ["Roadmapping", "ROI Analysis", "Use-case Discovery"],
  },
  {
    icon: "⚡",
    color: "rgba(124,92,252,0.15)",
    border: "rgba(124,92,252,0.3)",
    title: "Custom AI Development",
    desc: "From LLM-powered apps to computer vision pipelines, we build production-grade AI solutions tailored to your stack.",
    tags: ["LLMs", "Computer Vision", "NLP"],
  },
  {
    icon: "📊",
    color: "rgba(0,212,200,0.12)",
    border: "rgba(0,212,200,0.3)",
    title: "Data Engineering & Analytics",
    desc: "Transform raw data into actionable intelligence. We design data pipelines, warehouses, and dashboards that drive decisions.",
    tags: ["ETL Pipelines", "Dashboards", "Predictive Analytics"],
  },
  {
    icon: "🔄",
    color: "rgba(245,166,35,0.12)",
    border: "rgba(245,166,35,0.3)",
    title: "Process Automation",
    desc: "Eliminate repetitive work. We automate workflows end-to-end using AI agents, RPA, and intelligent orchestration.",
    tags: ["AI Agents", "RPA", "Workflow Automation"],
  },
  {
    icon: "🧠",
    color: "rgba(255,140,66,0.12)",
    border: "rgba(255,140,66,0.3)",
    title: "ML Model Training & MLOps",
    desc: "We build, fine-tune, and deploy machine learning models — and set up MLOps infrastructure so they keep improving.",
    tags: ["Fine-tuning", "MLOps", "Model Monitoring"],
  },
  {
    icon: "🔒",
    color: "rgba(59,123,255,0.1)",
    border: "rgba(59,123,255,0.25)",
    title: "AI Security & Governance",
    desc: "Deploy AI responsibly. We implement guardrails, audit trails, compliance frameworks, and explainability tooling.",
    tags: ["Guardrails", "Compliance", "Explainability"],
  },
];

function Services() {
  return (
    <section id="services">
      <div className="section-label fade-up">What We Do</div>
      <h2 className="fade-up" style={{ color: C.white, marginBottom: 16, maxWidth: 700 }}>
        AI services built for <span className="grad-text">real business outcomes</span>
      </h2>
      <p className="fade-up" style={{ color: C.muted, fontSize: 18, maxWidth: 560, marginBottom: 64 }}>
        Every engagement is scoped around measurable results — not buzzwords.
      </p>

      <div className="grid-3">
        {services.map((s, i) => (
          <div key={i} className="card fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="icon-blob" style={{ background: s.color, border: `1px solid ${s.border}` }}>
              {s.icon}
            </div>
            <h3 style={{ color: C.white, marginBottom: 12 }}>{s.title}</h3>
            <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {s.tags.map((t) => (
                <span key={t} className="pill" style={{ background: "rgba(255,255,255,0.06)", color: C.offwhite, fontSize: 11 }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ position: "relative" }}>
      <div className="orb" style={{ width: 500, height: 500, background: "rgba(124,92,252,0.08)", top: 0, right: -200 }} />

      <div className="grid-2" style={{ position: "relative", zIndex: 1 }}>
        {/* Left */}
        <div>
          <div className="section-label fade-up">Our Story</div>
          <h2 className="fade-up serif" style={{ color: C.white, marginBottom: 24 }}>
            We believe AI should <span className="grad-text-warm">work for people</span>
          </h2>
          <p className="fade-up" style={{ color: C.muted, fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
            Joah Solutions was founded on a simple conviction: the most powerful technology in history shouldn't be locked away in research labs. It should be in the hands of builders, operators, and leaders who are solving real problems.
          </p>
          <p className="fade-up" style={{ color: C.muted, fontSize: 17, lineHeight: 1.8, marginBottom: 36 }}>
            We're a team of engineers, data scientists, and strategists who've shipped AI products across healthcare, fintech, logistics, and SaaS. We translate complexity into clarity — and ideas into deployed systems.
          </p>
          <div className="fade-up" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#contact" className="btn btn-primary">Work With Us →</a>
            <a href="#process" className="btn btn-outline">How We Work</a>
          </div>
        </div>

        {/* Right — visual */}
        <div className="fade-up">
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            padding: 32,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}>
            {[
              { icon: "🎯", title: "Mission-First", body: "Every project starts with the business outcome, not the technology." },
              { icon: "🤝", title: "Partner, Not Vendor", body: "We embed with your team and stay accountable to your results." },
              { icon: "🚀", title: "Ship Fast, Iterate", body: "We deliver working prototypes in weeks, not quarters." },
            ].map((v, i) => (
              <div key={i} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "rgba(59,123,255,0.12)", border: "1px solid rgba(59,123,255,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, flexShrink: 0,
                }}>{v.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: C.white, marginBottom: 4 }}>{v.title}</div>
                  <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.6 }}>{v.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
const steps = [
  { label: "Discover", desc: "We run structured workshops to understand your workflows, data, and goals. No assumptions — just deep listening." },
  { label: "Design", desc: "We architect a solution that fits your existing stack, budget, and team. You see the blueprint before we write a line of code." },
  { label: "Build", desc: "Our engineers ship iteratively, with weekly demos so you're never in the dark. We move fast without cutting corners." },
  { label: "Deploy & Scale", desc: "We handle production deployment, monitoring, and model retraining. Your system keeps getting smarter over time." },
];

function Process() {
  return (
    <section id="process" style={{ background: C.navyMid, borderRadius: 28, position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ width: 400, height: 400, background: "rgba(0,212,200,0.07)", top: -100, left: -100 }} />

      <div className="section-label fade-up" style={{ position: "relative", zIndex: 1 }}>How We Work</div>
      <h2 className="fade-up" style={{ color: C.white, marginBottom: 64, maxWidth: 540, position: "relative", zIndex: 1 }}>
        A process built for <span className="grad-text">clarity and speed</span>
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 40, position: "relative", zIndex: 1 }}>
        {steps.map((s, i) => (
          <div key={i} className="process-step fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="step-num">{i + 1}</div>
            <div>
              <h3 style={{ color: C.white, marginBottom: 8 }}>{s.label}</h3>
              <p style={{ color: C.muted, fontSize: 16, maxWidth: 600, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "Joah Solutions transformed our data chaos into a real-time analytics platform. We went from spreadsheets to AI-powered dashboards in 8 weeks.",
    name: "Sarah K.",
    role: "VP of Operations, LogiTrack",
    avatar: "SK",
    color: C.blue,
  },
  {
    quote: "The AI agent they built for our customer support cut ticket resolution time by 60%. The team was exceptional — fast, communicative, and deeply technical.",
    name: "Marcus T.",
    role: "CTO, FinVault",
    avatar: "MT",
    color: C.purple,
  },
  {
    quote: "We'd tried two other AI vendors before Joah. The difference is they actually understand the business problem first. Highly recommended.",
    name: "Priya N.",
    role: "Head of Product, MedSync",
    avatar: "PN",
    color: C.teal,
  },
];

function Testimonials() {
  return (
    <section>
      <div className="section-label fade-up">Client Stories</div>
      <h2 className="fade-up" style={{ color: C.white, marginBottom: 56, maxWidth: 540 }}>
        Real results, <span className="grad-text">real businesses</span>
      </h2>

      <div className="grid-3">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
            <div style={{ fontSize: 32, color: t.color, marginBottom: 20, lineHeight: 1 }}>"</div>
            <p style={{ color: C.offwhite, fontSize: 16, lineHeight: 1.75, marginBottom: 28, fontStyle: "italic" }}>
              {t.quote}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: `${t.color}22`, border: `2px solid ${t.color}55`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 14, color: t.color,
              }}>{t.avatar}</div>
              <div>
                <div style={{ fontWeight: 700, color: C.white, fontSize: 14 }}>{t.name}</div>
                <div style={{ color: C.muted, fontSize: 13 }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <div style={{ padding: "0 5%", marginBottom: 120 }}>
      <div className="cta-section fade-up">
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(59,123,255,0.15)", top: -100, right: -100 }} />
        <div className="orb" style={{ width: 300, height: 300, background: "rgba(124,92,252,0.12)", bottom: -80, left: -80 }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="section-label" style={{ color: C.teal }}>Ready to Start?</div>
          <h2 className="serif" style={{ color: C.white, marginBottom: 20, maxWidth: 600, margin: "0 auto 20px" }}>
            Let's build your AI advantage — <span className="grad-text">together</span>
          </h2>
          <p style={{ color: C.muted, fontSize: 18, marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
            Free 30-minute discovery call. No commitments — just a conversation about what's possible.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" className="btn btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
              Book a Discovery Call →
            </a>
            <a href="mailto:hello@joahsolutions.com" className="btn btn-outline">hello@joahsolutions.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact">
      <div className="grid-2" style={{ gap: 80 }}>
        <div>
          <div className="section-label fade-up">Contact</div>
          <h2 className="fade-up" style={{ color: C.white, marginBottom: 20 }}>
            Let's <span className="grad-text">talk AI</span>
          </h2>
          <p className="fade-up" style={{ color: C.muted, fontSize: 17, lineHeight: 1.8, marginBottom: 40 }}>
            Tell us about your challenge. We'll respond within one business day.
          </p>

          <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: "📧", label: "Email", val: "hello@joahsolutions.com" },
              { icon: "🌐", label: "Website", val: "www.joahsolutions.com" },
              { icon: "📍", label: "Location", val: "Remote-first · Global clients" },
            ].map((c) => (
              <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "rgba(59,123,255,0.12)", border: "1px solid rgba(59,123,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0,
                }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 2, letterSpacing: 1, textTransform: "uppercase" }}>{c.label}</div>
                  <div style={{ color: C.white, fontWeight: 600 }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="card fade-up">
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3 style={{ color: C.white, marginBottom: 8 }}>Message sent!</h3>
              <p style={{ color: C.muted }}>We'll be in touch within one business day.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label>Name</label>
                  <input name="name" value={form.name} onChange={handle} placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handle} placeholder="you@company.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Company</label>
                <input name="company" value={form.company} onChange={handle} placeholder="Company name (optional)" />
              </div>
              <div className="form-group">
                <label>Tell us about your project</label>
                <textarea name="message" value={form.message} onChange={handle} placeholder="What are you trying to build or solve?" required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 16 }}>
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <>
      <div className="divider" />
      <footer>
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 900, color: "#fff",
              }}>J</div>
              <span style={{ color: C.white, fontWeight: 800, fontSize: 18 }}>Joah<span style={{ color: C.blue }}>.</span></span>
            </div>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>
              AI-powered tech solutions for the businesses shaping tomorrow.
            </p>
          </div>

          {/* Services */}
          <div>
            <div className="footer-col-title">Services</div>
            {["AI Strategy", "Custom AI Dev", "Data Engineering", "Automation", "MLOps"].map((l) => (
              <a key={l} href="#services" className="footer-link">{l}</a>
            ))}
          </div>

          {/* Company */}
          <div>
            <div className="footer-col-title">Company</div>
            {["About", "Process", "Careers", "Blog"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="footer-link">{l}</a>
            ))}
          </div>

          {/* Connect */}
          <div>
            <div className="footer-col-title">Connect</div>
            {[
              { label: "Email Us", href: "mailto:hello@joahsolutions.com" },
              { label: "LinkedIn", href: "#" },
              { label: "Twitter / X", href: "#" },
              { label: "GitHub", href: "#" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="footer-link">{l.label}</a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 32, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: C.muted, fontSize: 13 }}>© 2025 Joah Solutions. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a key={l} href="#" style={{ color: C.muted, fontSize: 13, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal();

  return (
    <>
      <GlobalStyles />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Services />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Process />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
