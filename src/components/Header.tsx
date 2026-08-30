import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoArrow from '@/assets/icons/logo-arrow.webp';
import heroG1 from '@/assets/logo/hero-g1.png';
import heroA from '@/assets/logo/hero-a.png';
import heroP from '@/assets/logo/hero-p.png';
import heroI from '@/assets/logo/hero-i.png';
import heroN from '@/assets/logo/hero-n.png';
import heroG2 from '@/assets/logo/hero-g2.png';

const WORDMARK_LETTERS = [heroG1, heroA, heroP, heroI, heroN, heroG2];

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/proyecto', label: 'Proyecto' },
  { path: '/go-to-market', label: 'Go To Market' },
  { path: '/aboutme', label: 'About me' },
  { path: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    // Plain `overflow: hidden` on body doesn't reliably block background
    // scroll on iOS Safari, and doesn't preserve the scroll offset — the
    // page can visibly jump when the menu opens/closes. Pinning body to
    // `position: fixed` at the current scroll offset (and restoring it on
    // close) is the version that actually holds the page still everywhere.
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, scrollY);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <nav className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 leading-none" aria-label="GAPING">
              <img src={logoArrow} alt="" aria-hidden="true" className="h-[26px] w-auto" />
              <span className="flex items-center">
                {WORDMARK_LETTERS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="inline-block select-none h-[24px] w-auto"
                    style={{ marginRight: i < WORDMARK_LETTERS.length - 1 ? '0.07em' : 0 }}
                  />
                ))}
              </span>
            </Link>

            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative px-4 py-2 font-sans font-medium text-base transition-colors duration-300 rounded-md ${
                        isActive ? 'text-[#42767f]' : 'text-[#6b7280] hover:text-[#42767f]'
                      }`}
                    >
                      {item.label}
                      <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-[#42767f] transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#1f2937] relative z-50"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-white/95 backdrop-blur-lg" onClick={() => setIsMenuOpen(false)} />
          <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-2 px-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-sans font-medium py-4 px-6 rounded-xl transition-colors duration-300 ${
                    isActive ? 'text-[#42767f] bg-[#42767f]/10' : 'text-[#6b7280] hover:text-[#42767f]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
