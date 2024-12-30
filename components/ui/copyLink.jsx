'use client'
import React from 'react';

const CopyLink = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <button 
      onClick={handleCopy}
      className="text-[#d4a373] hover:underline flex items-center gap-2"
    >
      <span>Copy link</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </button>
  );
};

export default CopyLink;