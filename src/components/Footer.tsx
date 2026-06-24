import { Linkedin, Instagram, MessageCircle, Facebook } from 'lucide-react';

interface FooterProps {
  leadCount: number;
}

export default function Footer({ leadCount }: FooterProps) {
  const scrollTo = (href: string) => {
    const elementId = href.substring(1);
    const element = document.getElementById(elementId);
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -95, duration: 1.2 });
      } else {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - 95,
          behavior: "smooth",
        });
      }
    }
  };

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/kirankumar-pandey-841859218" },
    { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/918596059607" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/kp_biobali" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/share/1FpxeyvRHF/" },
  ];

  const links = [
    { label: "Frameworks", href: "#bottlenecks" },
    { label: "Process", href: "#process" },
    { label: "Team", href: "#team" },
    { label: "Clients", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Diagnostic", href: "#consult" },
  ];

  return (
    <footer className="relative bg-[#050D1A] text-slate-100 overflow-hidden pt-24 sm:pt-32">
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#050D1A] pointer-events-none z-0" />
      
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#C5A059]/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-900/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full mb-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Brand & Description */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-4xl sm:text-5xl font-display font-medium text-white mb-6 tracking-tight">
              Let's re-engineer your<br />
              <span className="text-[#C5A059]">business performance.</span>
            </h2>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              AVYSTRA helps founders and leaders build the clarity, accountability, and systems necessary for scalable, decisive growth.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-xs font-mono text-[#C5A059] uppercase tracking-widest mb-6">Navigation</h3>
            <ul className="space-y-4">
              {links.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className="text-lg hover:text-[#C5A059] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="col-span-1">
            <h3 className="text-xs font-mono text-[#C5A059] uppercase tracking-widest mb-6">Connect</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <a href="mailto:info@avystra.co.in" className="hover:text-[#C5A059] transition-colors">info@avystra.co.in</a>
              </li>
              <li>
                <a href="tel:+918596059607" className="hover:text-[#C5A059] transition-colors">+91 85960 59607</a>
              </li>
            </ul>
            <div className="flex gap-4 mt-8">
              {socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 rounded-full bg-slate-800/50 hover:bg-[#C5A059]/20 hover:text-[#C5A059] transition-all"
                  aria-label={link.name}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-slate-500">
          <p>&copy; {new Date().getFullYear()} AVYSTRA Consulting. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="cursor-pointer hover:text-[#C5A059] transition-colors">Privacy Policy</span>
            {leadCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#C5A059]/20 bg-[#C5A059]/5 text-[10px] text-[#C5A059]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                {leadCount} Active Diagnostics
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Massive Brand Name */}
      <div className="w-full overflow-hidden flex justify-center items-end -mb-[1%] lg:-mb-[2%] select-none pointer-events-none pt-8 md:pt-4 relative">
        <h1 className="text-[25vw] leading-[0.70] font-display font-black tracking-tighter text-[#0A1526] uppercase text-center whitespace-nowrap relative z-0">
          AVYSTRA
        </h1>
      </div>
    </footer>
  );
}

