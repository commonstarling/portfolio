import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import headshot from './assets/headshot-smiling.webp';
import './styles.css';

const skills = [
  { name: 'JavaScript', level: 'Advanced', mark: 'JS', tone: 'ink' },
  { name: 'TypeScript', level: 'Advanced', mark: 'TS', tone: 'ink' },
  { name: 'Vue', level: 'Advanced', mark: 'V', tone: 'blue' },
  { name: 'Data Visualizations', level: 'Advanced', mark: 'DV', tone: 'blue', details: 'AG-Grid, Highcharts, D3' },
  { name: 'GitHub Copilot', level: 'Advanced', mark: 'GC', tone: 'coral' },
  { name: 'Figma', level: 'Proficient', mark: 'F', tone: 'purple' },
  { name: 'React', level: 'Proficient', mark: 'R', tone: 'blue' },
  { name: 'Next.js', level: 'Proficient', mark: 'N', tone: 'dark' },
  { name: 'Node.js', level: 'Proficient', mark: 'JS', tone: 'green' },
];

const projects = [
  {
    number: '01',
    title: 'MarketPulse',
    description: 'A simple, clean dashboard for tracking personal investment portfolio trends.',
    tags: ['React', 'TypeScript', 'AG Grid', 'Highcharts'],
    color: 'mint',
    image: 'dashboard',
  },
];

const routes = ['/', '/skills', '/projects', '/contact'];

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

function SocialIcon({ type }) {
  if (type === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.5 8.1H3.2V19h3.3V8.1ZM4.8 3a1.9 1.9 0 1 0 0 3.8A1.9 1.9 0 0 0 4.8 3ZM19.5 12.7c0-3.3-1.8-4.9-4.2-4.9-1.9 0-2.8 1.1-3.3 1.8V8.1H8.7V19H12v-5.4c0-1.4.3-2.8 2.1-2.8 1.8 0 1.8 1.7 1.8 2.9V19h3.3l.3-6.3Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5a9.7 9.7 0 0 0-3.1 18.9c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.3-.3-4.6-1.1-4.6-4.8 0-1.1.4-1.9 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.2 9.2 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.5 1 2.6 0 3.7-2.3 4.5-4.6 4.8.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.7 9.7 0 0 0 12 2.5Z" />
    </svg>
  );
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
      <div className="header-left">
        <a className="logo" href="/" onClick={(e) => go(e, '/')}>SR<span>.</span></a>
        <div className="header-socials" aria-label="Social links">
          <a href="https://www.linkedin.com/in/sheenaramirez/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <SocialIcon type="linkedin" />
          </a>
          <a href="https://github.com/commonstarling" target="_blank" rel="noreferrer" aria-label="GitHub">
            <SocialIcon type="github" />
          </a>
        </div>
      </div>
      <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span></span><span></span>
      </button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
        {[['/', 'Home'], ['/skills', 'Skills']].map(([to, label]) => (
          <a key={to} className={path === to ? 'active' : ''} href={to} onClick={(e) => go(e, to)}>{label}</a>
        ))}
        <a className={path === '/contact' ? 'nav-cta active' : 'nav-cta'} href="/contact" onClick={(e) => go(e, '/contact')}>Let’s talk <Arrow diagonal /></a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>Made with curiosity, caffeine, and React.</p>
      <div><a href="https://github.com/commonstarling" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/sheenaramirez/" target="_blank" rel="noreferrer">LinkedIn</a><a href="/contact">Contact</a></div>
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
            <a className="button primary" href="/skills" onClick={(e) => { e.preventDefault(); navigate('/skills'); }}>What I’m good at<Arrow /></a>
          </div>
        </div>
        <Portrait />
      </section>
      <section className="ticker" aria-label="Specialties">
        {['JavaScript/TypeScript', 'Data Visualization', 'Technical Communication', 'Design Systems'].map((item) => <React.Fragment key={item}><span>{item}</span><i>✦</i></React.Fragment>)}
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
        <p>A selection of the languages, frameworks, and tools I use to build thoughtful digital experiences.</p>
      </section>
      <section className="skills-grid">
        {skills.map((skill, index) => <SkillCard key={skill.name} skill={skill} index={index} />)}
      </section>
      {/* <section className="approach">
        <span className="section-label">How I work</span>
        <div className="approach-grid">
          <h2>Good work lives where <em>code</em> and <em>care</em> meet.</h2>
          <div className="principles">
            <article><span>01</span><div><h3>Start with why</h3><p>Understand the real problem before opening the editor.</p></div></article>
            <article><span>02</span><div><h3>Make it clear</h3><p>Simple interfaces beat clever ones almost every time.</p></div></article>
            <article><span>03</span><div><h3>Sweat the details</h3><p>Polish is not extra. It’s part of how a product earns trust.</p></div></article>
          </div>
        </div>
      </section> */}
    </main>
  );
}

function ProjectVisual({ type }) {
  if (type === 'dashboard') return <div className="mock dashboard-mock"><div className="mock-sidebar"><b>MarketPulse</b><i></i><i></i><i></i></div><div className="mock-body"><span>Good morning, Alex</span><h4>$24,680.00</h4><div className="chart"><i></i></div><div className="mini-cards"><i></i><i></i><i></i></div></div></div>;
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
        <a href="https://marketpulse.aged-dust-c01f.workers.dev/" target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title}`}>↗</a>
      </div>
    </article>
  );
}

function Projects({ navigate }) {
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
        <a className="button light" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Start a conversation <Arrow diagonal /></a>
      </section>
    </main>
  );
}

function Contact() {
  const [status, setStatus] = useState('idle');

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/info@sheenamramirez.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error('Unable to send message');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="page contact-page">
      <section className="page-intro contact-intro">
        <div className="eyebrow"><span></span> Get in touch</div>
        <h1>Let’s start a<br /><em>conversation.</em></h1>
        <p>Have a project, an opportunity, or simply an interesting idea? Send me a note and I’ll get back to you.</p>
      </section>
      <section className="contact-layout">
        <aside className="contact-details">
          <span className="section-label">Prefer email?</span>
          <a href="mailto:info@sheenamramirez.com">info@sheenamramirez.com</a>
          <p>Based in Chicago and open to thoughtful collaborations near and far.</p>
          <div className="contact-socials">
            <a href="https://www.linkedin.com/in/sheenaramirez/" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
            <a href="https://github.com/commonstarling" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
          </div>
        </aside>
        <form className="contact-form" onSubmit={submit}>
          <input type="hidden" name="_subject" value="New portfolio contact" />
          <input type="hidden" name="_template" value="table" />
          <input className="contact-honey" type="text" name="_honey" tabIndex="-1" autoComplete="off" />
          <div className="form-row">
            <label>
              <span>Name</span>
              <input type="text" name="name" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" autoComplete="email" required />
            </label>
          </div>
          <label>
            <span>Subject</span>
            <input type="text" name="subject" required />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="6" required></textarea>
          </label>
          <div className="form-submit">
            <button className="button primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'} <Arrow />
            </button>
            <p className={`form-status ${status}`} role="status" aria-live="polite">
              {status === 'sent' && 'Thanks — your message is on its way.'}
              {status === 'error' && 'Something went wrong. Please email me directly instead.'}
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

function App() {
  const { path, navigate } = useRoute();
  return (
    <div className="site-shell">
      <Header path={path} navigate={navigate} />
      {path === '/skills' ? <Skills /> : path === '/projects' ? <Projects navigate={navigate} /> : path === '/contact' ? <Contact /> : <Home navigate={navigate} />}
      <Footer />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
