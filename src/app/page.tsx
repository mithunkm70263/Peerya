"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { ScrollReveal } from "@/components/ScrollReveal";

function CursorTracker() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 transition-transform duration-75"
      style={{
        background: `radial-gradient(circle 500px at ${pos.x}px ${pos.y}px, rgba(124, 58, 237, 0.08), transparent 80%)`
      }}
      aria-hidden="true"
    />
  );
}

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda",
  "Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
  "Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso",
  "Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic",
  "Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Cote d'Ivoire",
  "Croatia","Cuba","Cyprus","Czechia","Democratic Republic of the Congo","Denmark",
  "Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador",
  "Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland",
  "France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada",
  "Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary",
  "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica",
  "Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos",
  "Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania",
  "Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta",
  "Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova",
  "Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia",
  "Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria",
  "North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine",
  "Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
  "Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia",
  "Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe",
  "Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore",
  "Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea",
  "South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland",
  "Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo",
  "Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States",
  "Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen",
  "Zambia","Zimbabwe",
];

const skillInterests = [
  "Machine Learning","Web Development","Cybersecurity","Video Editing",
  "Content Creation","UI/UX Design","App Development","Other",
];

const skillLevels = [
  { title: "Absolute Beginner", description: "You are starting from zero and want a team that helps you build momentum." },
  { title: "Beginner",          description: "You know the basics and need structure, repetition, and accountability." },
  { title: "Intermediate",      description: "You can build projects and want sharper peers pushing your consistency." },
  { title: "Near-Advanced",     description: "You are close to professional level and ready to mentor while growing." },
];

const commitmentPeriods = [
  { title: "6 Months",  description: "Get started, build momentum, and see real results" },
  { title: "12 Months", description: "One full year to go from beginner to builder" },
  { title: "18 Months", description: "Deep immersion with your team across multiple projects" },
  { title: "24 Months", description: "The full Peerya experience. Strangers to co-founders." },
];

const tickerItems = [
  "🇮🇳 ML Engineer from India",
  "🇳🇬 Video Editor from Nigeria",
  "🇧🇷 Web Developer from Brazil",
  "🇩🇪 Cybersecurity student from Germany",
  "🇵🇭 App Developer from Philippines",
  "🇺🇸 Data Scientist from USA",
  "🇬🇧 UI Designer from UK",
  "🇯🇵 Content Creator from Japan",
  "🇰🇷 ML Researcher from South Korea",
  "🇿🇦 Full-Stack Dev from South Africa",
];

const stats = [
  { number: "95%", label: "of self-learners quit before reaching their goals — not from lack of ability, but lack of accountability." },
  { number: "195", label: "countries represented in our early applicant pool — your future team is already out there." },
  { number: "100", label: "spots available in the founding cohort. First-movers shape how Peerya is built." },
];

const problemCards = [
  "79% of people aged 18–24 report feeling lonely while trying to build their skills alone.",
  "95% of self-learners quit before achieving their goals — not from lack of ability, but lack of accountability.",
  "No platform has ever combined structured teams, long-term commitment, and AI accountability in one place. Until now.",
];

const steps = [
  { title: "Tell us who you are",    body: "You join and tell us your skill, goals, and experience level." },
  { title: "Get matched globally",   body: "We match you into a committed team of 5–10 people across the world." },
  { title: "Meet your AI agent",     body: "Your AI agent runs structured team meetings twice a week, assigns daily tasks, and tracks everyone's progress." },
  { title: "Grow together",          body: "You grow together for 6–24 months — and build real things, real friendships, and real careers." },
];

const features = [
  { title: "AI Voice Agent",        body: "An embedded AI agent knows every member's goals and progress in real time. It runs your meetings, assigns tasks, and keeps the whole team on track." },
  { title: "Long-Term Commitment",  body: "Not a 30-day challenge. Not a cohort. A commitment that builds the kind of trust that turns teammates into co-founders." },
  { title: "Skill Level Matching",  body: "Every team is deliberately structured across experience levels — so knowledge flows naturally and nobody feels lost or unchallenged." },
  { title: "Co-founder Matching",   body: "Post your startup idea, accept applications, and hand-pick your founding team. Peerya is where the next generation of companies begin." },
];

const sampleTeam = [
  { initials: "AM", name: "Aarav Mehta",  country: "🇮🇳", skill: "Machine Learning", level: "Near-Advanced", mentor: true },
  { initials: "KO", name: "Kemi Okafor",  country: "🇳🇬", skill: "Machine Learning", level: "Intermediate" },
  { initials: "LS", name: "Lucas Silva",  country: "🇧🇷", skill: "Machine Learning", level: "Intermediate" },
  { initials: "EM", name: "Elena Müller", country: "🇩🇪", skill: "Machine Learning", level: "Beginner" },
  { initials: "JR", name: "Jia Reyes",    country: "🇵🇭", skill: "Machine Learning", level: "Absolute Beginner" },
];

const faqs = [
  { question: "How are teams formed?",          answer: "We match you based on skill interest and experience level. Every team has a deliberate mix from absolute beginner to near-advanced so knowledge flows naturally." },
  { question: "What is the commitment period?", answer: "Unlike 30-day challenges that fade, Peerya teams commit long term. This is what builds real trust, real friendships, and real careers." },
  { question: "What does the AI voice agent do?", answer: "It knows every member's goals and progress. It runs your twice-weekly team meetings, assigns personalized daily tasks, and keeps the whole team accountable." },
  { question: "Is this free?",                  answer: "Free during the private beta. We are focused on getting the experience right before anything else." },
  { question: "Can I find a co-founder here?",  answer: "Yes. Once inside Peerya you can post your idea, accept applications, and hand-pick your founding team from real builders who have proven themselves through daily work." },
];

/* ─────────────────────────────────────────────
   PARTICLE CANVAS COMPONENT
   ───────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.15,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef} aria-hidden="true" />;
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
   ───────────────────────────────────────────── */
function AnimatedStat({ number, label }: { number: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="stat-item">
      <div className={`stat-number${visible ? " stat-visible" : ""}`}>{number}</div>
      <p className="stat-label">{label}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */
export default function Home() {
  const [fullName,           setFullName]           = useState("");
  const [email,              setEmail]              = useState("");
  const [country,            setCountry]            = useState("");
  const [skillInterest,      setSkillInterest]      = useState(skillInterests[0]);
  const [skillLevel,         setSkillLevel]         = useState(skillLevels[1].title);
  const [commitmentPeriod,   setCommitmentPeriod]   = useState(commitmentPeriods[1].title);
  const [submitted,          setSubmitted]          = useState(false);
  const [submittedName,      setSubmittedName]      = useState("");
  const [formNote,           setFormNote]           = useState("No spam. Ever. Just a personal note when your team is ready.");
  const [submitting,         setSubmitting]         = useState(false);
  const [showValidationError,setShowValidationError]= useState(false);

  // EmailJS init
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) emailjs.init(publicKey);
  }, []);

  const tickerContent = useMemo(() => [...tickerItems, ...tickerItems], []);
  const shareText = "Just applied to join Peerya — a global peer learning platform where you commit to a team for 6-24 months and actually build things together. Check it out: peerya.com";
  const firstName = submittedName.split(" ")[0] || "builder";

  const missingFields = {
    fullName:        showValidationError && !fullName.trim(),
    email:           showValidationError && !email.trim(),
    country:         showValidationError && !country.trim(),
    skillInterest:   showValidationError && !skillInterest.trim(),
    skillLevel:      showValidationError && !skillLevel.trim(),
    commitmentPeriod:showValidationError && !commitmentPeriod.trim(),
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fullName.trim() || !email.trim() || !country.trim() || !skillInterest.trim() || !skillLevel.trim() || !commitmentPeriod.trim()) {
      setShowValidationError(true);
      setFormNote("Please fill in all fields before applying.");
      return;
    }
    if (submitting) return;
    setShowValidationError(false);
    setSubmitting(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: fullName.trim(), email: email.trim(), country: country.trim(), skillInterest, skillLevel, commitmentPeriod }),
      });
      const data = (await response.json()) as { error?: string; count?: number; message?: string };
      if (!response.ok) { setFormNote(data.error ?? "Something went wrong. Please try again."); return; }

      try {
        const emailParams = {
          fullName: fullName.trim(),
          firstName: fullName.trim().split(/\s+/)[0] || "builder",
          email: email.trim(),
          country: country.trim(),
          skillInterest, skillLevel, commitmentPeriod,
          count: data.count || 0,
          time: new Date().toISOString(),
        };
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
        await Promise.all([
          emailjs.send(serviceId, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_APPLICANT!, emailParams),
          emailjs.send(serviceId, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_FOUNDER!,   emailParams),
        ]);
      } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : JSON.stringify(error);
        console.error("Failed to send email via EmailJS:", errMsg, error);
      }

      setSubmittedName(fullName.trim());
      setSubmitted(true);
    } catch {
      setFormNote("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ─── JSX ─── */
  return (
    <main className="site-shell">
      <CursorTracker />
      <ParticleCanvas />
      <ScrollReveal />

      {/* ── NAV ── */}
      <nav className="navbar" aria-label="Primary navigation">
        <a className="brand" href="#hero" aria-label="Peerya home">Peerya</a>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#why-peerya">Why Peerya</a>
            <a href="#faq">FAQ</a>
          </div>
          <a className="button button-small" href="#waitlist">Join Waitlist</a>
        </div>
      </nav>

      <div className="nav-proof">Built by a student. For every student building alone.</div>

      {/* ── HERO ── */}
      <section id="hero" className="hero section glow-section">
        <div className="hero-copy reveal">
          <p className="beta-badge">Private Beta — First 100 members only</p>
          <p className="eyebrow">Teams for serious self-learners</p>
          <h1>
            Nobody learns<br />
            <span className="gradient-text">alone</span> anymore.
          </h1>
          <p className="hero-subhead">
            Peerya forms committed teams of 5–10 people across the world,
            matched by skill and experience level, guided by an AI agent that
            keeps everyone accountable — every single day.
          </p>
          <div className="hero-actions">
            <a className="button button-large" href="#waitlist">Join the Waitlist</a>
            <a className="button button-ghost button-large" href="#how-it-works">See how it works</a>
          </div>
          <p className="cohort-note" style={{ marginTop: "20px" }}>
            Limited spots in the first cohort — applications close soon.
          </p>
        </div>

        <div className="hero-visual reveal" aria-hidden="true">
          <div className="hero-window-bar">
            <span /><span /><span />
            <strong>Peerya Team OS</strong>
          </div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="team-node node-main"><span>AI</span></div>
          <div className="team-node node-a">ML</div>
          <div className="team-node node-b">UX</div>
          <div className="team-node node-c">FE</div>
          <div className="team-node node-d">DS</div>
          <div className="pulse-card pulse-one">
            <span>AI assigns daily tasks</span>
            <strong>Every member</strong>
          </div>
          <div className="pulse-card pulse-two">
            <span>Next team sync</span>
            <strong>Tue 7:30 PM</strong>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <section className="ticker-bar" aria-label="Global builders joining Peerya">
        <div className="ticker-track">
          {tickerContent.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section stats-section">
        <div className="stats-grid reveal-stagger">
          {stats.map((s) => (
            <AnimatedStat key={s.number} number={s.number} label={s.label} />
          ))}
        </div>
      </section>

      {/* ── TEAM PREVIEW ── */}
      <section id="team-preview" className="section product-section glow-section">
        <div className="section-heading reveal">
          <p className="eyebrow">A team that feels real on day one</p>
          <h2>What your team looks like.</h2>
          <p>
            A small, committed group with complementary skills, different levels,
            and one near-advanced member who can raise the ceiling for everyone.
          </p>
        </div>
        <div className="product-card reveal">
          <div className="product-top">
            <div>
              <span>Peerya Team 03</span>
              <strong>Machine Learning Builder Group</strong>
            </div>
            <p>5 members · 4 countries · AI guided</p>
          </div>
          <div className="member-list">
            {sampleTeam.map((member) => (
              <article className="member-row" key={member.name}>
                <div className="member-avatar">{member.initials}</div>
                <div className="member-info">
                  <h3>
                    {member.name} <span>{member.country}</span>
                    {member.mentor ? <em aria-label="Mentor">♕</em> : null}
                  </h3>
                  <p>{member.skill}</p>
                </div>
                <span className="level-badge">{member.level}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section id="problem" className="section">
        <div className="section-heading reveal">
          <p className="eyebrow">The quiet blocker</p>
          <h2>The problem nobody talks about.</h2>
        </div>
        <div className="card-grid three">
          {problemCards.map((card, index) => (
            <article className="glass-card reveal" key={card}>
              <span className="card-number">0{index + 1}</span>
              <p>{card}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="section glow-section">
        <div className="section-heading reveal">
          <p className="eyebrow">A real operating system</p>
          <h2>How Peerya works.</h2>
        </div>
        <div className="timeline">
          {steps.map((step, index) => (
            <article className="timeline-step reveal" key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── WHY PEERYA ── */}
      <section id="why-peerya" className="section">
        <div className="section-heading reveal">
          <p className="eyebrow">Built for compounding trust</p>
          <h2>Why Peerya is different.</h2>
        </div>
        <div className="card-grid two">
          {features.map((feature) => (
            <article
              id={feature.title === "Co-founder Matching" ? "for-founders" : undefined}
              className="feature-card reveal"
              key={feature.title}
            >
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section id="founder" className="section founder-section glow-section">
        <div className="founder-avatar reveal" aria-label="Founder — Mithun">M</div>
        <div className="founder-copy reveal">
          <p className="eyebrow">Founder story</p>
          <h2>Why I built this.</h2>
          <blockquote>
            I&apos;m Mithun, a first year engineering student in India. I&apos;m
            building ML projects, an AI assistant, and a YouTube channel — all
            at the same time, and almost entirely alone. My college friends
            don&apos;t match my energy. The people who would get it are scattered
            across the world. I built Peerya because I needed it — and I know
            I&apos;m not the only one.
          </blockquote>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section faq-section">
        <div className="section-heading reveal">
          <p className="eyebrow">Questions before you apply</p>
          <h2>FAQ.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details className="faq-item reveal" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section id="waitlist" className="section waitlist-section glow-section">
        <div className="waitlist-panel reveal">
          {submitted ? (
            <div className="success-screen" role="status" aria-live="polite">
              <div className="success-check">✓</div>
              <h2>You&apos;re in, {firstName}.</h2>
              <p>
                Check your email — we just sent you a confirmation. We&apos;ll
                reach out personally when your Peerya team is ready.
              </p>
              <div className="share-actions">
                <a
                  className="share-button"
                  href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Share on X
                </a>
                <a
                  className="share-button"
                  href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Share on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="spots-remaining">🔥 Filling fast — limited to 100 seats</div>
              <p className="eyebrow">Private beta</p>
              <h2>Apply for the first 100.</h2>
              <p>
                The first 100 members will personally shape how Peerya works.
                Tell us who you are and what kind of team you need.
              </p>
              <form className="waitlist-form" onSubmit={handleSubmit}>
                <div className={`field-row ${missingFields.fullName ? "field-error" : ""}`}>
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName" name="fullName" type="text"
                    placeholder="Alex Johnson"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className={`field-row ${missingFields.email ? "field-error" : ""}`}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className={`field-row ${missingFields.country ? "field-error" : ""}`}>
                  <label htmlFor="country">Country</label>
                  <input
                    id="country" name="country" list="countries"
                    placeholder="Search your country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                  <datalist id="countries">
                    {countries.map((c) => <option value={c} key={c} />)}
                  </datalist>
                </div>

                <div className={`field-row ${missingFields.skillInterest ? "field-error" : ""}`}>
                  <label htmlFor="skillInterest">Skill Interest</label>
                  <select
                    id="skillInterest" name="skillInterest"
                    value={skillInterest}
                    onChange={(e) => setSkillInterest(e.target.value)}
                  >
                    {skillInterests.map((s) => <option value={s} key={s}>{s}</option>)}
                  </select>
                </div>

                <fieldset className={`level-field ${missingFields.skillLevel ? "field-error" : ""}`}>
                  <legend>Skill Level</legend>
                  <div className="level-grid">
                    {skillLevels.map((level) => (
                      <label
                        className={`level-card ${skillLevel === level.title ? "selected" : ""}`}
                        key={level.title}
                      >
                        <input
                          type="radio" name="skillLevel" value={level.title}
                          checked={skillLevel === level.title}
                          onChange={(e) => setSkillLevel(e.target.value)}
                        />
                        <span>{level.title}</span>
                        <p>{level.description}</p>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className={`level-field ${missingFields.commitmentPeriod ? "field-error" : ""}`}>
                  <legend>Commitment Period</legend>
                  <div className="level-grid">
                    {commitmentPeriods.map((period) => (
                      <label
                        className={`level-card ${commitmentPeriod === period.title ? "selected" : ""}`}
                        key={period.title}
                      >
                        <input
                          type="radio" name="commitmentPeriod" value={period.title}
                          checked={commitmentPeriod === period.title}
                          onChange={(e) => setCommitmentPeriod(e.target.value)}
                        />
                        <span>{period.title}</span>
                        <p>{period.description}</p>
                      </label>
                    ))}
                  </div>
                  <p className="commitment-note">
                    You can choose to continue with the same team after your commitment period ends.
                  </p>
                </fieldset>

                <button className="button submit-button" type="submit" disabled={submitting}>
                  {submitting ? "Applying…" : "Apply for Early Access →"}
                </button>
              </form>
              <p className="form-note" aria-live="polite">{formNote}</p>
            </>
          )}
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section className="section closing-section">
        <div className="closing-copy reveal">
          <h2 className="gradient-text">Your people are out there.</h2>
          <p>They&apos;re just waiting for Peerya to find them.</p>
          <a className="button button-large closing-cta" href="#waitlist">
            Apply for Early Access — Free
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div>
          <a className="brand" href="#hero">Peerya</a>
          <p>Nobody learns alone anymore.</p>
        </div>
        <div className="footer-links">
          <a href="https://x.com" target="_blank" rel="noreferrer">Twitter/X</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <p className="copyright">© 2026 Peerya. Built by Mithun.</p>
      </footer>
    </main>
  );
}
