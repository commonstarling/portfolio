import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import headshot from './assets/headshot-optimized.png';
import './styles.css';

const skills = [
  { name: 'React', level: 'Advanced', mark: 'R', tone: 'blue' },
  { name: 'TypeScript', level: 'Advanced', mark: 'TS', tone: 'ink' },
  { name: 'Next.js', level: 'Advanced', mark: 'N', tone: 'dark' },
  { name: 'Node.js', level: 'Proficient', mark: 'JS', tone: 'green' },
  { name: 'UI / UX', level: 'Proficient', mark: '✦', tone: 'coral' },
  { name: 'Figma', level: 'Proficient', mark: 'F', tone: 'purple' },
];

const projects = [
  {
    number: '01',
    title: 'Luma Finance',
    description: 'A clear, calm dashboard that makes personal finances feel a little less complicated.',
    tags: ['React', 'TypeScript', 'Recharts'],
    color: 'mint',
    image: 'dashboard',
  },
  {
    number: '02',
    title: 'Drift Journal',
    description: 'A focused writing space built for capturing thoughts without the usual digital noise.',
    tags: ['Next.js', 'Supabase', 'Framer Motion'],
    color: 'lavender',
    image: 'journal',
  },
  {
    number: '03',
    title: 'Northwind Studio',
    description: 'A playful studio site for a team that believes serious work can still have personality.',
    tags: ['React', 'GSAP', 'Sanity'],
    color: 'peach',
    image: 'studio',
  },
];

const routes = ['/', '/skills', '/projects'];

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to) => {
    if (to === path) return;
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { path: routes.includes(path) ? path : '/', navigate };
}

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

function Header({ path, navigate }) {
  const [open, setOpen] = useState(false);
  const go = (event, to) => {
    event.preventDefault();
    setOpen(false);
    navigate(to);
  };

  return (
    <header className="header">
      <a className="logo" href="/" onClick={(e) => go(e, '/')}>SR<span>.</span></a>
      <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span></span><span></span>
      </button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
        {[['/', 'Home'], ['/skills', 'Skills'], ['/projects', 'Projects']].map(([to, label]) => (
          <a key={to} className={path === to ? 'active' : ''} href={to} onClick={(e) => go(e, to)}>{label}</a>
        ))}
        <a className="nav-cta" href="mailto:hello@example.com">Let’s talk <Arrow diagonal /></a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>Made with curiosity, caffeine, and React.</p>
      <div><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:hello@example.com">Email</a></div>
      <span>© {new Date().getFullYear()} Sheena Ramirez</span>
    </footer>
  );
}

function Portrait() {
  return (
    <div className="portrait-wrap">
      <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
      <div className="spark spark-one">✦</div><div className="spark spark-two">✦</div>
      <div className="portrait-card">
        <img src={headshot} alt="Sheena Ramirez" />
      </div>
    </div>
  );
}

function Home({ navigate }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span></span> Senior software developer · Chicago, IL</div>
          <h1>I build digital things that feel <em>human.</em></h1>
          <p className="hero-intro">I’m Sheena — a senior software developer with a soft spot for thoughtful design, smooth interactions, and the tiny details that make people smile.</p>
          <div className="hero-actions">
            <a className="button primary" href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects'); }}>See my work <Arrow /></a>
            <a className="text-link" href="/skills" onClick={(e) => { e.preventDefault(); navigate('/skills'); }}>What I’m good at <Arrow diagonal /></a>
          </div>
        </div>
        <Portrait />
      </section>
      <section className="ticker" aria-label="Specialties">
        {['React', 'TypeScript', 'Creative coding', 'Good coffee', 'Design systems'].map((item) => <React.Fragment key={item}><span>{item}</span><i>✦</i></React.Fragment>)}
      </section>
      <section className="home-section">
        <div className="section-heading"><span>Selected work</span><h2>A few things I’ve made<br />with <em>care.</em></h2></div>
        <div className="project-preview">
          {projects.slice(0, 2).map((project) => <ProjectCard key={project.number} project={project} />)}
        </div>
        <a className="button outline" href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects'); }}>Explore all projects <Arrow /></a>
      </section>
    </main>
  );
}

function SkillCard({ skill, index }) {
  return (
    <article className="skill-card">
      <span className={`skill-mark ${skill.tone}`}>{skill.mark}</span>
      <div><h3>{skill.name}</h3><p>{skill.level}</p></div>
      <span className="skill-index">0{index + 1}</span>
    </article>
  );
}

function Skills() {
  return (
    <main className="page">
      <section className="page-intro skills-intro">
        <div className="eyebrow"><span></span> Skills & tools</div>
        <h1>My digital<br /><em>toolbox.</em></h1>
        <p>I like turning complex problems into simple, expressive experiences. These are the tools I reach for most often.</p>
      </section>
      <section className="skills-grid">
        {skills.map((skill, index) => <SkillCard key={skill.name} skill={skill} index={index} />)}
      </section>
      <section className="approach">
        <span className="section-label">How I work</span>
        <div className="approach-grid">
          <h2>Good work lives where <em>code</em> and <em>care</em> meet.</h2>
          <div className="principles">
            <article><span>01</span><div><h3>Start with why</h3><p>Understand the real problem before opening the editor.</p></div></article>
            <article><span>02</span><div><h3>Make it clear</h3><p>Simple interfaces beat clever ones almost every time.</p></div></article>
            <article><span>03</span><div><h3>Sweat the details</h3><p>Polish is not extra. It’s part of how a product earns trust.</p></div></article>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProjectVisual({ type }) {
  if (type === 'dashboard') return <div className="mock dashboard-mock"><div className="mock-sidebar"><b>luma</b><i></i><i></i><i></i></div><div className="mock-body"><span>Good morning, Alex</span><h4>$24,680.00</h4><div className="chart"><i></i></div><div className="mini-cards"><i></i><i></i><i></i></div></div></div>;
  if (type === 'journal') return <div className="mock journal-mock"><div className="journal-nav">drift <span>•••</span></div><div className="journal-body"><small>WEDNESDAY, JUNE 12</small><h4>Small moments worth remembering.</h4><p>The light through the kitchen window this morning...</p><i></i><i></i><i></i></div></div>;
  return <div className="mock studio-mock"><div className="studio-nav">NORTHWIND <span>WORK · ABOUT</span></div><div className="studio-body"><small>INDEPENDENT CREATIVE STUDIO</small><h4>We make ideas<br />move.</h4><div className="shape s1"></div><div className="shape s2"></div></div></div>;
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className={`project-visual ${project.color}`}><ProjectVisual type={project.image} /></div>
      <div className="project-info">
        <span>{project.number}</span>
        <div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <i key={tag}>{tag}</i>)}</div></div>
        <a href="#project-detail" aria-label={`View ${project.title}`}>↗</a>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <main className="page">
      <section className="page-intro projects-intro">
        <div className="eyebrow"><span></span> Selected projects</div>
        <h1>Work made with<br /><em>intention.</em></h1>
        <p>A selection of digital products, thoughtful interfaces, and experiments I’ve helped bring to life.</p>
      </section>
      <section className="projects-list">
        {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
      </section>
      <section className="contact-banner" id="project-detail">
        <div><span>Have something in mind?</span><h2>Let’s make it <em>real.</em></h2></div>
        <a className="button light" href="mailto:hello@example.com">Start a conversation <Arrow diagonal /></a>
      </section>
    </main>
  );
}

function App() {
  const { path, navigate } = useRoute();
  return (
    <div className="site-shell">
      <Header path={path} navigate={navigate} />
      {path === '/skills' ? <Skills /> : path === '/projects' ? <Projects /> : <Home navigate={navigate} />}
      <Footer />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
