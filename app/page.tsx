"use client";
import { useState } from 'react';
import { Terminal } from './terminal';
import { NormalSite } from './NormalSite';
import { Monitor, Terminal as TerminalIcon } from 'lucide-react';

export default function App() {
  const [isTerminalMode, setIsTerminalMode] = useState(true);

  return (
    <div className="w-screen h-screen relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsTerminalMode(!isTerminalMode)}
        className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-all ${
          isTerminalMode
            ? 'bg-green-500 text-black hover:bg-green-400'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {isTerminalMode ? (
          <>
            <Monitor className="w-5 h-5" />
            <span>Normal View</span>
          </>
        ) : (
          <>
            <TerminalIcon className="w-5 h-5" />
            <span>Terminal View</span>
          </>
        )}
      </button>

      {/* Content */}
      {isTerminalMode ? <Terminal /> : <NormalSite />}
    </div>
  );
}