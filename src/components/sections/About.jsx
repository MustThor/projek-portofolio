import { motion } from 'framer-motion';
import { MapPin, Calendar, Briefcase, Heart } from 'lucide-react';

const About = () => {
  const infoItems = [
    { icon: MapPin, label: 'Location', value: 'Colomadu, Jawa Tengah', color: 'from-rose-500 to-pink-500' },
    { icon: Calendar, label: 'Education', value: 'S1 Informatika — GPA 3.25', color: 'from-blue-500 to-cyan-500' },
    { icon: Briefcase, label: 'Status', value: 'Open to Work', color: 'from-emerald-500 to-teal-500' },
    { icon: Heart, label: 'Interests', value: 'Full Stack Dev, UI/UX Design', color: 'from-purple-500 to-violet-500' },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-50" />

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
            About Me
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Get to know more about my background
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="gradient-border bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Hello! I'm <span className="gradient-text">Fathin Thariq Wiyono</span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                A Fresh Graduate with a Bachelor of Computer Science degree from Universitas Telkom
                (GPA 3.25/4.0). I have hands-on experience in UI/UX design and software development,
                including redesigning KBB SuperAPP and Smart ASN during my internship at Diskominfotik
                Kabupaten Bandung Barat.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                As a Freelance Full Stack Developer, I built JimpitanKu — a community-driven
                application. I'm proficient in multiple programming languages including C++,
                JavaScript, PHP (Laravel), Flutter (Dart), and Python.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                My thesis focused on "Suicide Detection on Twitter Social Media Using CNN-LSTM
                Method with Word2Vec Feature Expansion". I'm a strong team player with excellent
                communication skills, committed to continuous learning and delivering high-quality
                solutions.
              </p>
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {infoItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 * (index + 1) }}
                  whileHover={{ x: 6, scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg flex items-center space-x-4 border-l-4 border-transparent hover:shadow-xl transition-all duration-300"
                  style={{
                    borderImage: `linear-gradient(to bottom, var(--tw-gradient-stops)) 1`,
                  }}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
