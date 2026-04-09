import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { sendEmail } from '../../utils/emailService';
import Button from '../ui/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [lastSent, setLastSent] = useState(0);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Honeypot check — bots fill hidden fields
    if (honeypot) {
      setStatus('success');
      setStatusMessage("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
      return;
    }

    // Rate limiting — 60 seconds between sends
    const now = Date.now();
    const cooldown = 60000;
    if (now - lastSent < cooldown) {
      const remaining = Math.ceil((cooldown - (now - lastSent)) / 1000);
      setStatus('error');
      setStatusMessage(`Please wait ${remaining}s before sending another message.`);
      setTimeout(() => { setStatus('idle'); setStatusMessage(''); }, 3000);
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      const result = await sendEmail(formData);

      if (result.success) {
        setStatus('success');
        setStatusMessage("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
        setLastSent(Date.now());
      } else {
        setStatus('error');
        setStatusMessage('Failed to send message. Please try again or contact me directly.');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('An error occurred. Please try again or contact me directly.');
    }

    setTimeout(() => {
      setStatus('idle');
      setStatusMessage('');
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'fathin.thariq09@gmail.com',
      link: 'mailto:fathin.thariq09@gmail.com',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+62 851-5530-4019',
      link: 'tel:+6285155304019',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Colomadu, Jawa Tengah, Indonesia',
      link: null,
      color: 'from-rose-500 to-pink-500',
    },
  ];

  const inputBaseClass =
    'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 input-glow text-sm';
  const inputBorderClass = (field) =>
    errors[field] ? 'border-red-500' : 'border-gray-200 dark:border-gray-600/50';

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Section divider top */}
      <div className="section-divider mb-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Get In Touch
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Let's build something amazing together
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Let's Work Together
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-sm">
              I'm always open to discussing new projects, creative ideas, or opportunities to be
              part of your vision. Feel free to reach out through the form or contact me directly.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                    whileHover={{ x: 4 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white dark:bg-gray-800/80 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700/50"
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-0.5">
                        {item.label}
                      </p>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="gradient-border bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
            >
              {/* Honeypot — hidden from users, bots will fill this */}
              <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name */}
              <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                  Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`${inputBaseClass} ${inputBorderClass('name')}`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`${inputBaseClass} ${inputBorderClass('email')}`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Subject */}
              <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry"
                  className={`${inputBaseClass} ${inputBorderClass('subject')}`}
                />
                {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className={`${inputBaseClass} ${inputBorderClass('message')} resize-none`}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </Button>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm border border-emerald-200 dark:border-emerald-700/30"
                >
                  <CheckCircle size={18} />
                  {statusMessage}
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center gap-2 text-red-700 dark:text-red-400 text-sm border border-red-200 dark:border-red-700/30"
                >
                  <XCircle size={18} />
                  {statusMessage}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
