'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export type IconGroupItem = {
  href: string;
  icon: React.ComponentType<any>;
  ariaLabel: string;
  title: string;
  onClick?: () => void;
  download?: string;
};

export type IconGroupProps = {
  icons: IconGroupItem[];
};

export const IconGroup: React.FC<IconGroupProps> = ({ icons }) => {
  return (
    <motion.div
      className="z-10 flex flex-wrap justify-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {icons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: index * 0.1,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <Link
            href={item.href}
            target={item.href === '#' ? undefined : '_blank'}
            rel={item.href === '#' ? undefined : 'noopener noreferrer'}
            aria-label={item.ariaLabel}
            className="block"
          >
            {/* Glow Effect Background */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/0 via-teal-500/30 to-teal-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

            {/* Icon Button */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl 
                          border border-slate-700 bg-slate-900/50 backdrop-blur-sm
                          transition-all duration-300 
                          hover:border-teal-500/50 hover:bg-slate-800/50
                          group-hover:shadow-[0_0_2rem_-0.5rem_theme(colors.teal.500)]"
              onClick={item.onClick}
              title={item.title}
            >
              {/* Icon */}
              <item.icon className="h-5 w-5 text-slate-300 transition-colors duration-300 group-hover:text-teal-400" />

              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1
                            opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-slate-200
                             shadow-lg">
                  {item.title}
                </div>
                <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45
                              bg-slate-800" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};