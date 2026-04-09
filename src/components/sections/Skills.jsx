import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { skills } from '../../data/skills';

const Skills = () => {
  const getIcon = (iconName) => {
    const Icon = Icons[iconName];
    return Icon ? <Icon size={18} /> : null;
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
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-10">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 * categoryIndex }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-4">
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
                    className="group relative flex items-center gap-2.5 bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/60 rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 cursor-default"
                  >
                    {/* Icon */}
                    <span className="text-primary-600 dark:text-primary-400 transition-colors">
                      {getIcon(skill.icon)}
                    </span>

                    {/* Name */}
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {skill.name}
                    </span>

                    {/* Level dot indicator */}
                    <span
                      className="ml-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor:
                          skill.level >= 90
                            ? '#22c55e'
                            : skill.level >= 75
                            ? '#3b82f6'
                            : '#f59e0b',
                      }}
                      title={`${skill.level}% proficiency`}
                    />

                    {/* Hover tooltip */}
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                      {skill.level}%
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
