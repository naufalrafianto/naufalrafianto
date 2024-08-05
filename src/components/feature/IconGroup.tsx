'use client';

import { Button } from '@/components/common/Button';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Tipe untuk item ikon
export type IconGroupItem = {
  href: string;
  icon: React.ComponentType<any>;
  ariaLabel: string;
  title: string;
  onClick?: () => void;
  download?: string;
};

// Tipe untuk props IconGroup
export type IconGroupProps = {
  icons: IconGroupItem[];
};

// Komponen IconGroup yang reusable
export const IconGroup: React.FC<IconGroupProps> = ({ icons }) => {
  return (
    <div className="flex gap-3">
      {icons.map((item, index) => {
        const MotionButton = motion(Button);
        return (
          <MotionButton
            key={index}
            variant="outline"
            size="logo"
            title={item.title}
            onClick={item.onClick}
            aria-label={item.ariaLabel}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
          >
            <Link
              href={item.href}
              target={item.href === '#' ? undefined : '_blank'}
              rel={item.href === '#' ? undefined : 'noopener noreferrer'}
              aria-label={item.ariaLabel}
              download={item.download}
            >
              <item.icon className="h-6 w-6" />
            </Link>
          </MotionButton>
        );
      })}
    </div>
  );
};
