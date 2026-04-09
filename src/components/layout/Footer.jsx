import { Github, Linkedin, X, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/MustThor' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/fathin-thariq-wiyono-236433217/' },
    { name: 'X', icon: X, href: 'https://x.com/jmbngan_' },
    { name: 'Email', icon: Mail, href: 'mailto:fathin.thariq09@gmail.com' },
  ];

  return (
    <footer className="relative bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Left */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold gradient-text mb-1">Fathin Thariq Wiyono</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Full Stack Developer & UI/UX Designer
            </p>
          </div>

          {/* Social icons */}
          <div className="flex space-x-5">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-glow p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300"
                  aria-label={social.name}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700/50 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Fathin Thariq Wiyono. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
