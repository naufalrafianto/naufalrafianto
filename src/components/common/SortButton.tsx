'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

type SortOption = 'date' | 'title';

interface SortButtonProps {
  options: SortOption[];
  currentSort: SortOption;
  onSortChange: (_option: SortOption) => void;
}

const SortButton: React.FC<SortButtonProps> = ({ options, currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (option: SortOption) => {
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative flex w-full justify-end text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-teal-300 px-3 py-2 text-sm font-semibold text-black transition-colors hover:bg-teal-500"
        >
          Sort by: {currentSort === 'date' ? 'Date' : 'Title'}
          <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-10 mt-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none"
          >
            <div>
              {options.map((option) => (
                <button
                  key={option}
                  className={`block h-full w-full rounded-md px-6 py-4 text-left text-sm ${
                    currentSort === option ? 'bg-teal-100 text-teal-900' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => handleSortChange(option)}
                >
                  {option === 'date' ? 'Date (Newest First)' : 'Title (A-Z)'}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortButton;
