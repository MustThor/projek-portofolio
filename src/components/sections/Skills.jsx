import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { skills } from '../../data/skills';

const categoryColors = {
  'Programming Languages': 'from-blue-500 to-indigo-500',
  'Frameworks & Libraries': 'from-purple-500 to-pink-500',
  'Tools & Others': 'from-emerald-500 to-teal-500',
};

const Skills = () => {
  const getIcon = (iconName) => {
    const Icon = Icons[iconName];
    return Icon ? <Icon size={16} /> : null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Skills & Technologies
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Technologies I've been working with
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-8">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 * categoryIndex }}
              className="bg-white dark:bg-gray-800/80 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700/50"
            >
              {/* Category header with gradient bar */}
              <div className={`h-1 bg-gradient-to-r ${categoryColors[category.category] || 'from-primary-500 to-blue-500'}`} />
              <div className="p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-5 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryColors[category.category] || 'from-primary-500 to-blue-500'}`} />
                  {category.category}
                </h3>

                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {category.items.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      whileHover={{ y: -3, scale: 1.03 }}
                      className="group relative flex items-center gap-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600/50 rounded-xl px-4 py-2.5 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-md transition-all duration-200 cursor-default"
                    >
                      {/* Icon */}
                      <span className="text-primary-600 dark:text-primary-400">
                        {getIcon(skill.icon)}
                      </span>

                      {/* Name */}
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                        {skill.name}
                      </span>

                      {/* Mini progress bar (Desktop only) */}
                      <div className="hidden sm:block w-12 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden ml-1">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: skill.level >= 90
                              ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                              : skill.level >= 75
                              ? 'linear-gradient(90deg, #3b82f6, #6366f1)'
                              : 'linear-gradient(90deg, #f59e0b, #f97316)',
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        />
                      </div>

                      {/* Mobile level indicator dot */}
                      <span
                        className="sm:hidden ml-auto w-2 h-2 rounded-full"
                        style={{
                          background: skill.level >= 90
                            ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                            : skill.level >= 75
                            ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
                            : 'linear-gradient(135deg, #f59e0b, #f97316)',
                        }}
                      />

                      {/* Hover tooltip */}
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg z-10">
                        {skill.level}%
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
