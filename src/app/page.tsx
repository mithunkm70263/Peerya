"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, useInView, Variants } from "framer-motion";
import Tilt from "react-parallax-tilt";
import dynamic from "next/dynamic";

import { CustomCursor } from "@/components/CustomCursor";
import { AnimatedBackground } from "@/components/AnimatedBackground";

// Lazy load the 3D scene to avoid blocking initial paint
const Hero3DScene = dynamic(() => import("@/components/Hero3DScene").then(m => m.Hero3DScene), { ssr: false });

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

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2, // Drifting horizontally slightly
        vy: -Math.random() * 0.5 - 0.2,  // Drifting UPWARD
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        // Fireflies reset to bottom
        if (p.y > canvas.height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        // Ember/Firefly glow
        ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(245, 158, 11, ${p.alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }} />;
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
   ───────────────────────────────────────────── */
function AnimatedStat({ number, label, delay = 0 }: { number: string; label: string, delay?: number }) {
  const isPercent = number.includes("%");
  const value = parseInt(number.replace(/\D/g, ""));
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        let current = 0;
        const target = value;
        const duration = 1500;
        const step = Math.max(1, Math.floor(target / (duration / 16)));
        
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(current);
          }
        }, 16);
      }, delay * 1000);
    }
  }, [inView, value, delay]);

  return (
    <motion.div 
      ref={ref} 
      className="stat-item glass-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
    >
      <div className="stat-number">{count}{isPercent ? "%" : ""}</div>
      <p className="stat-label">{label}</p>
    </motion.div>
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

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  /* ─── JSX ─── */
  return (
    <main className="site-shell">
      <CustomCursor />
      <AnimatedBackground />

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

      <div className="nav-proof relative z-10">Built by a student. For every student building alone.</div>

      {/* ── HERO ── */}
      <section id="hero" className="hero section relative z-10">
        <motion.div 
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="beta-badge">Private Beta — First 100 members only</motion.p>
          <motion.p variants={fadeInUp} className="eyebrow">Teams for serious self-learners</motion.p>
          <h1 className="flex flex-col gap-2">
            <motion.span variants={fadeInUp} className="block origin-bottom-left rotate-[-1deg]">Nobody learns</motion.span>
            <motion.span variants={fadeInUp} className="block"><span className="gradient-text">alone</span> anymore.</motion.span>
          </h1>
          <motion.p variants={fadeInUp} className="hero-subhead mt-6">
            Peerya forms committed teams of 5–10 people across the world,
            matched by skill and experience level, guided by an AI agent that
            keeps everyone accountable — every single day.
          </motion.p>
          <motion.div variants={fadeInUp} className="hero-actions">
            <a className="button button-large" href="#waitlist">Join the Waitlist</a>
            <a className="button button-ghost button-large" href="#how-it-works">See how it works</a>
          </motion.div>
          <motion.p variants={fadeInUp} className="cohort-note" style={{ marginTop: "20px" }}>
            Limited spots in the first cohort — applications close soon.
          </motion.p>
        </motion.div>

        {/* 3D Scene replacement for static visual */}
        <div className="relative w-full h-[600px] flex items-center justify-center">
          <Hero3DScene />
        </div>
      </section>

      {/* ── TICKER ── */}
      <section className="ticker-bar relative z-10" aria-label="Global builders joining Peerya">
        <div className="ticker-track">
          {tickerContent.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section stats-section relative z-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-1 rounded-[var(--radius-lg)]">
          {stats.map((s, index) => (
            <AnimatedStat key={s.number} number={s.number} label={s.label} delay={index * 0.15} />
          ))}
        </div>
      </section>

      {/* ── TEAM PREVIEW ── */}
      <section id="team-preview" className="section product-section relative z-10">
        <motion.div 
          className="section-heading"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="eyebrow">A team that feels real on day one</motion.p>
          <motion.h2 variants={fadeInUp}>What your team looks like.</motion.h2>
          <motion.p variants={fadeInUp}>
            A small, committed group with complementary skills, different levels,
            and one near-advanced member who can raise the ceiling for everyone.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="product-card glass-card !p-0 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="product-top">
            <div>
              <span>Peerya Team 03</span>
              <strong>Machine Learning Builder Group</strong>
            </div>
            <p>5 members · 4 countries · AI guided</p>
          </div>
          <div className="member-list p-6 flex flex-col gap-4">
            {sampleTeam.map((member) => (
              <Tilt key={member.name} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.02} transitionSpeed={1000}>
                <article className="member-row glass-card !p-4 !min-h-0 flex items-center justify-between !border-[rgba(255,255,255,0.08)]">
                  <div className="flex items-center gap-4">
                    <div className="member-avatar shadow-lg shadow-violet-500/20">{member.initials}</div>
                    <div className="member-info">
                      <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                        {member.name} <span>{member.country}</span>
                        {member.mentor ? <em aria-label="Mentor" className="bg-amber-500 text-black text-xs px-2 py-0.5 rounded-full not-italic">♕</em> : null}
                      </h3>
                      <p className="text-slate-400 text-sm">{member.skill}</p>
                    </div>
                  </div>
                  <span className="level-badge border-cyan-500/30 text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full text-sm font-semibold">{member.level}</span>
                </article>
              </Tilt>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PROBLEM ── */}
      <section id="problem" className="section relative z-10">
        <motion.div 
          className="section-heading"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="eyebrow">The quiet blocker</motion.p>
          <motion.h2 variants={fadeInUp}>The problem nobody talks about.</motion.h2>
        </motion.div>
        
        <motion.div 
          className="card-grid three"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
        >
          {problemCards.map((card, index) => (
            <motion.article variants={fadeInUp} className="glass-card" key={card}>
              <span className="card-number">0{index + 1}</span>
              <p>{card}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="section relative z-10">
        <motion.div 
          className="section-heading"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="eyebrow">A real operating system</motion.p>
          <motion.h2 variants={fadeInUp}>How Peerya works.</motion.h2>
        </motion.div>
        <motion.div 
          className="timeline"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
        >
          {steps.map((step, index) => (
            <motion.article variants={fadeInUp} className="timeline-step glass-card !p-8" key={step.title}>
              <span className="text-4xl font-black text-violet-500/20 absolute top-4 right-6">{index + 1}</span>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p>{step.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ── WHY PEERYA ── */}
      <section id="why-peerya" className="section relative z-10">
        <motion.div 
          className="section-heading"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="eyebrow">Built for compounding trust</motion.p>
          <motion.h2 variants={fadeInUp}>Why Peerya is different.</motion.h2>
        </motion.div>
        <motion.div 
          className="card-grid two"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
        >
          {features.map((feature) => (
            <motion.article
              variants={fadeInUp}
              id={feature.title === "Co-founder Matching" ? "for-founders" : undefined}
              className="feature-card glass-card"
              key={feature.title}
            >
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p>{feature.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ── FOUNDER ── */}
      <section id="founder" className="section founder-section relative z-10">
        <motion.div 
          initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
          whileInView={{ opacity: 1, rotate: -3, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          viewport={{ once: true }}
          className="founder-avatar overflow-hidden p-0" aria-label="Founder"
        >
          <img src="/founder_avatar.jpg" alt="Founder" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div 
          className="founder-copy"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="eyebrow">Founder story</motion.p>
          <motion.h2 variants={fadeInUp}>Why I built this.</motion.h2>
          <motion.blockquote variants={fadeInUp} className="text-xl leading-relaxed text-slate-300 italic pl-6 border-l-2 border-violet-500/50 mt-8">
            I&apos;m a first year engineering student in India. I&apos;m
            building ML projects, an AI assistant, and a YouTube channel — all
            at the same time, and almost entirely alone. My college friends
            don&apos;t match my energy. The people who would get it are scattered
            across the world. I built Peerya because I needed it — and I know
            I&apos;m not the only one.
          </motion.blockquote>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section faq-section relative z-10">
        <motion.div 
          className="section-heading"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="eyebrow">Questions before you apply</motion.p>
          <motion.h2 variants={fadeInUp}>FAQ.</motion.h2>
        </motion.div>
        <motion.div 
          className="faq-list flex flex-col gap-4"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
        >
          {faqs.map((faq) => (
            <motion.details variants={fadeInUp} className="faq-item glass-card !p-6 cursor-pointer" key={faq.question}>
              <summary className="font-bold text-lg outline-none select-none">{faq.question}</summary>
              <p className="mt-4 pt-4 border-t border-white/10 text-slate-400">{faq.answer}</p>
            </motion.details>
          ))}
        </motion.div>
      </section>

      {/* ── WAITLIST ── */}
      <section id="waitlist" className="section waitlist-section relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="waitlist-panel glass-card !max-w-2xl mx-auto"
        >
          {submitted ? (
            <div className="success-screen" role="status" aria-live="polite">
              <div className="success-check text-4xl mb-4 text-green-400">✓</div>
              <h2 className="text-3xl font-bold mb-4">You&apos;re in, {firstName}.</h2>
              <p className="text-slate-400 mb-8">
                Check your email — we just sent you a confirmation. We&apos;ll
                reach out personally when your Peerya team is ready.
              </p>
              <div className="share-actions flex gap-4 justify-center">
                <a
                  className="button button-ghost"
                  href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Share on X
                </a>
                <a
                  className="button button-ghost"
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
              <div className="spots-remaining inline-block bg-amber-500/10 text-amber-500 border border-amber-500/20 px-4 py-1 rounded-full text-sm font-bold mb-6">🔥 Filling fast — limited to 100 seats</div>
              <p className="eyebrow">Private beta</p>
              <h2 className="text-4xl font-bold mb-4">Apply for the first 100.</h2>
              <p className="text-slate-400 mb-8">
                The first 100 members will personally shape how Peerya works.
                Tell us who you are and what kind of team you need.
              </p>
              <form className="waitlist-form flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className={`field-row flex flex-col gap-2 ${missingFields.fullName ? "field-error" : ""}`}>
                  <label htmlFor="fullName" className="text-sm font-semibold text-slate-300">Full Name</label>
                  <input
                    id="fullName" name="fullName" type="text"
                    className="bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="Alex Johnson"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className={`field-row flex flex-col gap-2 ${missingFields.email ? "field-error" : ""}`}>
                  <label htmlFor="email" className="text-sm font-semibold text-slate-300">Email Address</label>
                  <input
                    id="email" name="email" type="email"
                    className="bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className={`field-row flex flex-col gap-2 ${missingFields.country ? "field-error" : ""}`}>
                  <label htmlFor="country" className="text-sm font-semibold text-slate-300">Country</label>
                  <input
                    id="country" name="country" list="countries"
                    className="bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="Search your country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                  <datalist id="countries">
                    {countries.map((c) => <option value={c} key={c} />)}
                  </datalist>
                </div>

                <div className={`field-row flex flex-col gap-2 ${missingFields.skillInterest ? "field-error" : ""}`}>
                  <label htmlFor="skillInterest" className="text-sm font-semibold text-slate-300">Skill Interest</label>
                  <select
                    id="skillInterest" name="skillInterest"
                    className="bg-[#0f1424] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500 transition-colors appearance-none"
                    value={skillInterest}
                    onChange={(e) => setSkillInterest(e.target.value)}
                  >
                    {skillInterests.map((s) => <option value={s} key={s}>{s}</option>)}
                  </select>
                </div>

                <fieldset className={`level-field mt-4 ${missingFields.skillLevel ? "field-error" : ""}`}>
                  <legend className="text-sm font-semibold text-slate-300 mb-4">Skill Level</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skillLevels.map((level) => (
                      <label
                        className={`glass-card !p-4 cursor-pointer relative overflow-hidden transition-all ${skillLevel === level.title ? "!border-violet-500 bg-violet-500/10 shadow-[0_0_20px_rgba(124,58,237,0.2)]" : "opacity-70 hover:opacity-100"}`}
                        key={level.title}
                      >
                        <input
                          type="radio" name="skillLevel" value={level.title}
                          className="absolute opacity-0"
                          checked={skillLevel === level.title}
                          onChange={(e) => setSkillLevel(e.target.value)}
                        />
                        <span className="block font-bold mb-2">{level.title}</span>
                        <p className="text-sm text-slate-400">{level.description}</p>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className={`level-field mt-6 ${missingFields.commitmentPeriod ? "field-error" : ""}`}>
                  <legend className="text-sm font-semibold text-slate-300 mb-4">Commitment Period</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {commitmentPeriods.map((period) => (
                      <label
                        className={`glass-card !p-4 cursor-pointer relative overflow-hidden transition-all ${commitmentPeriod === period.title ? "!border-violet-500 bg-violet-500/10 shadow-[0_0_20px_rgba(124,58,237,0.2)]" : "opacity-70 hover:opacity-100"}`}
                        key={period.title}
                      >
                        <input
                          type="radio" name="commitmentPeriod" value={period.title}
                          className="absolute opacity-0"
                          checked={commitmentPeriod === period.title}
                          onChange={(e) => setCommitmentPeriod(e.target.value)}
                        />
                        <span className="block font-bold mb-2">{period.title}</span>
                        <p className="text-sm text-slate-400">{period.description}</p>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-4 text-center">
                    You can choose to continue with the same team after your commitment period ends.
                  </p>
                </fieldset>

                <button className="button button-large mt-6 w-full group relative overflow-hidden" type="submit" disabled={submitting}>
                  <span className="relative z-10">{submitting ? "Applying…" : "Apply for Early Access →"}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </form>
              <p className="text-center text-sm text-slate-400 mt-4" aria-live="polite">{formNote}</p>
            </>
          )}
        </motion.div>
      </section>

      {/* ── CLOSING ── */}
      <section className="section closing-section relative z-10 text-center min-h-[60vh] flex flex-col items-center justify-center overflow-hidden">
        <ParticleCanvas />
        <motion.div 
          className="closing-copy relative z-10"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="gradient-text !text-6xl md:!text-8xl mb-6">Your people are out there.</motion.h2>
          <motion.p variants={fadeInUp} className="text-2xl text-slate-300 mb-10">They&apos;re just waiting for Peerya to find them.</motion.p>
          <motion.div variants={fadeInUp}>
            <a className="button button-large shadow-[0_0_40px_rgba(124,58,237,0.6)] animate-pulse" href="#waitlist">
              Apply for Early Access — Free
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer relative z-10 border-t border-white/10 mt-20 pt-10 pb-20 flex flex-col md:flex-row justify-between items-center px-8 text-slate-400 max-w-6xl mx-auto">
        <div className="mb-6 md:mb-0">
          <a className="brand text-2xl !text-white" href="#hero">Peerya</a>
          <p className="mt-2 text-sm">Nobody learns alone anymore.</p>
        </div>
        <div className="flex gap-6 mb-6 md:mb-0">
          <a href="https://x.com/km_mikey90617" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter/X</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
        <p className="text-sm">© 2026 Peerya. Built by a fellow builder.</p>
      </footer>
    </main>
  );
}
