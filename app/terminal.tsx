import { useState, useRef, useEffect } from 'react';

interface CommandHistory {
  command: string;
  output: string[];
}

export function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: '',
      output: [
        'Welcome!',
        'Type "help" to see available commands.',
        'Or click the button in the top right to switch to the normal view.',
        ''
      ]
    }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands: Record<string, () => string[]> = {
    help: () => [
      'Available commands:',
      '  about    - Learn more about me',
      '  skills   - View my technical skills',
      '  projects - See my recent projects',
      '  contact  - Get my contact information',
      '  clear    - Clear the terminal',
      '  help     - Show this help message',
      ''
    ],
    about: () => [
      'about text',
      '',
      '',
      ''
    ],
    skills: () => [
      'Skills:',
      '',
      '',
      '',
      '',
      ''
    ],
    projects: () => [
      'Recent Projects:',
      '  1. Terminal Portfolio - This website!',
      '',
      '',
      ''
    ],
    contact: () => [
      'Contact Information:',
      '  Email: dw.hwkns+dev@gmail.com',
      '  GitHub: github.com/LittleDefender3',
      '  LinkedIn: linkedin.com/in/username',
      ''
    ],
    clear: () => {
      setHistory([]);
      return [];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim().toLowerCase();

    if (!trimmedInput) return;

    let output: string[];
    if (trimmedInput in commands) {
      output = commands[trimmedInput]();
    } else {
      output = [`Command not found: ${trimmedInput}`, 'Type "help" for available commands.', ''];
    }

    if (trimmedInput !== 'clear') {
      setHistory([...history, { command: input, output }]);
    }
    setInput('');
  };

  return (
    <div className="w-full h-full bg-black text-green-400 font-mono p-4 sm:p-6 overflow-hidden flex flex-col text-xs sm:text-sm md:text-base">
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto mb-4 break-words"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) => (
          <div key={i}>
            {entry.command && (
              <div className="flex gap-1 sm:gap-2 break-words">
                <span className="text-green-500 flex-shrink-0">$</span>
                <span className="break-all">{entry.command}</span>
              </div>
            )}
            {entry.output.map((line, j) => (
              <div key={j} className="pl-2 sm:pl-4 text-green-300 break-words">
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-1 sm:gap-2">
        <span className="text-green-500 flex-shrink-0">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-green-400 min-w-0"
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  );
}