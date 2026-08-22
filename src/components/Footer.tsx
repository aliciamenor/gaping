import { Link } from 'react-router-dom';
import { Linkedin, Mail } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/proyecto', label: 'Proyecto' },
  { path: '/go-to-market', label: 'Go To Market' },
  { path: '/aboutme', label: 'About me' },
  { path: '/contact', label: 'Contact' },
];

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/aliciamenorgomez/',
    label: 'LinkedIn',
    external: true,
  },
  {
    icon: Mail,
    href: 'mailto:amenorgomez@gmail.com',
    label: 'Email',
    external: false,
  },
];

export default function Footer() {
  return (
    <footer className="text-white pt-[60px] pb-8 mt-auto" style={{ background: 'linear-gradient(135deg, #42767f, #2d5259)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 text-center">
        <h2 className="font-display text-[32px] font-bold mb-3">GAPING</h2>
        <p className="font-sans text-base text-white/70 mb-10">Gap Year en Movimiento</p>

        <nav className="flex flex-wrap justify-center gap-8 mb-8" aria-label="Enlaces del pie">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="font-sans font-medium text-[15px] text-white/80 hover:text-white hover:underline transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex justify-center gap-5 mb-12">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>

        <div className="border-t border-white/15 pt-6">
          <p className="font-sans text-sm text-white/70">
            © 2026 GAPING. Hecho con Claude Code por Alicia Menor.
          </p>
        </div>
      </div>
    </footer>
  );
}
