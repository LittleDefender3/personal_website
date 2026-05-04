import { useState, useRef, useEffect } from 'react';
import { aboutInfo, skills, projects, contactInfo } from '@/app/data';

interface CommandHistory {
  command: string;
  output: string[];
}

interface TerminalProps {
  history: CommandHistory[];
  setHistory: (history: CommandHistory[]) => void;
}

export function Terminal({ history, setHistory }: TerminalProps) {
  const [input, setInput] = useState('');
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
      `About ${aboutInfo.name}`,
      '',
      `${aboutInfo.title}`,
      `Location: ${aboutInfo.location}`,
      '',
      aboutInfo.bio,
      '',
      `Years of Experience: ${aboutInfo.yearsOfExperience}`,
      ''
    ],
    skills: () => {
      const output = ['Technical Skills:', ''];
      skills.forEach(skillGroup => {
        output.push(`${skillGroup.category}:`);
        skillGroup.items.forEach(item => {
          output.push(`  • ${item}`);
        });
        output.push('');
      });
      return output;
    },
    projects: () => {
      const output = ['Recent Projects:', ''];
      projects.forEach(project => {
        output.push(`${project.id}. ${project.title}`);
        output.push(`   ${project.description}`);
        if (project.technologies) {
          output.push(`   Tech: ${project.technologies.join(', ')}`);
        }
        if (project.github) {
          output.push(`   GitHub: ${project.github}`);
        }
        if (project.link) {
          output.push(`   Link: ${project.link}`);
        }
        output.push('');
      });
      return output;
    },
    contact: () => [
      'Contact Information:',
      `  Email: ${contactInfo.email}`,
      `  GitHub: ${contactInfo.github}`,
      `  LinkedIn: ${contactInfo.linkedin}`,
      contactInfo.website ? `  Website: ${contactInfo.website}` : '',
      ''
    ].filter(line => line !== ''),
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
        className="flex-1 overflow-y-auto break-words"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) => (
          <div key={i} className="mb-2">
            {entry.command && (
              <div className="flex gap-1 sm:gap-2 break-words">
                <span className="text-green-500 flex-shrink-0">$</span>
                <span className="break-all">{entry.command}</span>
              </div>
            )}
            {entry.output.map((line, j) => (
              <div key={j} className="text-green-300 break-words">
                {line}
              </div>
            ))}
          </div>
        ))}
        
        {/* Current input prompt */}
        <div className="flex gap-1 sm:gap-2">
          <span className="text-green-500 flex-shrink-0">$</span>
          <form onSubmit={handleSubmit} className="flex-1 min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent outline-none text-green-400"
              autoFocus
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
}