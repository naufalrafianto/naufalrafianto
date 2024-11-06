'use client';
import * as React from 'react';
import { motion } from 'framer-motion';

export const IconBox: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <motion.div
    className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-3 backdrop-blur-sm"
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
  >
    <div className="mb-2 text-2xl text-white">{icon}</div>
    <div className="text-sm text-gray-200">{text}</div>
  </motion.div>
);
