import { motion } from 'framer-motion';
import { MapPin, Calendar, Briefcase, Heart } from 'lucide-react';

const About = () => {
  const infoItems = [
    { icon: MapPin, label: 'Location', value: 'Colomadu, Jawa Tengah' },
    { icon: Calendar, label: 'Education', value: 'S1 Informatika — GPA 3.25' },
    { icon: Briefcase, label: 'Status', value: 'Open to Work' },
    { icon: Heart, label: 'Interests', value: 'Full Stack Dev, UI/UX Design' },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Hello! I'm Fathin Thariq Wiyono
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
                  transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex items-center space-x-4 hover:shadow-xl transition-shadow"
                >
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <Icon size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
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
