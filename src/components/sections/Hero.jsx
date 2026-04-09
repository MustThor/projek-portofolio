import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, X } from 'lucide-react';
import Button from '../ui/Button';
import ParticleField from '../ui/ParticleField';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const phrases = ['Full Stack Developer', 'UI/UX Designer', 'Fresh Graduate Informatics'];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 2000;

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const type = () => {
      if (!isDeleting) {
        if (typedText.length < currentPhrase.length) {
          setTypedText(currentPhrase.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentPhrase.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    const interval = setInterval(
      type,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearInterval(interval);
  }, [typedText, phraseIndex, isDeleting, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative overflow-hidden"
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 dot-grid" />

      {/* Interactive particles */}
      <ParticleField />

      {/* Gradient Orb 1 */}
      <motion.div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30 dark:opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, rgba(59,130,246,0.3) 50%, transparent 70%)' }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Gradient Orb 2 */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full opacity-25 dark:opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, rgba(20,184,166,0.25) 50%, transparent 70%)' }}
        animate={{ x: [0, -35, 25, 0], y: [0, 25, -35, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Accent Orb */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[200px] h-[200px] rounded-full opacity-20 dark:opacity-10 blur-2xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)' }}
        animate={{ x: [0, 20, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <span className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200">
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block w-2 h-2 rounded-full bg-emerald-500"
            />
            Available for Work
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 gradient-text leading-tight"
        >
          Fathin Thariq Wiyono
        </motion.h1>

        {/* Typing */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mb-8"
        >
          {typedText}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-1 h-7 ml-1 bg-primary-600 dark:bg-primary-400 align-middle rounded-full"
          />
        </motion.p>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="w-24 h-0.5 mx-auto mb-8 bg-gradient-to-r from-transparent via-primary-500 to-transparent"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Full Stack Developer with a strong foundation in UI/UX and software development,
          committed to building scalable applications with clean code and intuitive user experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button onClick={() => scrollToSection('#projects')}>View My Work</Button>
          <Button variant="outline" onClick={() => scrollToSection('#contact')}>
            Get In Touch
          </Button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center gap-6 mb-12"
        >
          {[
            { Icon: Github, href: 'https://github.com/MustThor', label: 'GitHub' },
            { Icon: Linkedin, href: 'https://www.linkedin.com/in/fathin-thariq-wiyono-236433217/', label: 'LinkedIn' },
            { Icon: X, href: 'https://x.com/jmbngan_', label: 'X' },
            { Icon: Mail, href: 'mailto:fathin.thariq09@gmail.com', label: 'Email' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
              className="social-glow text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
              aria-label={label}
            >
              <Icon size={26} />
            </a>
          ))}
        </motion.div>

        {/* Scroll Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex justify-center"
        >
          <button
            onClick={() => scrollToSection('#about')}
            className="text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="Scroll down"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={28} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
