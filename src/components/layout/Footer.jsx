import { Github, Linkedin, X, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/MustThor' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/fathin-thariq-wiyono-236433217/' },
    { name: 'X', icon: X, href: 'https://x.com/jmbngan_' },
    { name: 'Email', icon: Mail, href: 'mailto:fathin.thariq09@gmail.com' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Fathin Thariq Wiyono</h3>
            <p className="text-sm">Full Stack Developer & UI/UX Designer</p>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label={social.name}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Fathin Thariq Wiyono. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
