import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface FilterTagProps {
  activeFilter: string;
  onRemove: () => void;
}

const FilterTag: React.FC<FilterTagProps> = ({ activeFilter, onRemove }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-teal-400 px-4 py-2 text-sm font-medium text-black shadow-md">
      <span>{activeFilter}</span>
      <button
        onClick={onRemove}
        className="ml-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 p-1 text-white transition-all duration-300 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
      >
        <FaTimes className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Remove filter</span>
      </button>
    </span>
  );
};

export default FilterTag;
