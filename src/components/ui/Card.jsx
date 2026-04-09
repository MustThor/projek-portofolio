import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, ...props }) => {
  const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden';
  const hoverStyles = hover
    ? 'hover:shadow-2xl hover:-translate-y-2 transition-all duration-300'
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
