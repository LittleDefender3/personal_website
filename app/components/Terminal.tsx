"use client";

import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  type KeyboardEvent,
} from "react";
import type { OutputLine } from "@/app/lib/types";
import {
  executeCommand,
  getAllCommandNames,
  getWelcomeLines,
} from "@/app/lib/commands";
import styles from "./Terminal.module.css";

const PROMPT = "visitor@dylanhawkins:~$";

// ── state ─────────────────────────────────────────────────────────────────

interface TerminalState {
  lines: OutputLine[];
  input: string;
  cmdHistory: string[];
  historyIdx: number; // -1 = not navigating
  suggestions: string[];
  suggestionIdx: number; // index of Tab-highlighted suggestion; -1 = first
}

type TerminalAction =
  | { type: "SET_INPUT"; value: string }
  | { type: "EXECUTE"; allCommands: string[] }
  | { type: "HISTORY_UP" }
  | { type: "HISTORY_DOWN" }
  | { type: "TAB"; allCommands: string[] }
  | { type: "CTRL_C" }
  | { type: "CLEAR_TERMINAL" }
  | { type: "RESET_TERMINAL" }
  | { type: "CLEAR_SUGGESTIONS" };

const initialState: TerminalState = {
  lines: getWelcomeLines(),
  input: "",
  cmdHistory: [],
  historyIdx: -1,
  suggestions: [],
  suggestionIdx: 0,
};

function terminalReducer(
  state: TerminalState,
  action: TerminalAction
): TerminalState {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        input: action.value,
        historyIdx: -1,
        suggestions: [],
        suggestionIdx: 0,
      };

    case "EXECUTE": {
      const trimmed = state.input.trim();
      const cmdLine: OutputLine = {
        id: `cmd-${Date.now()}`,
        type: "command",
        content: trimmed ? `${PROMPT} ${trimmed}` : PROMPT,
      };
      if (!trimmed) {
        return {
          ...state,
          lines: [...state.lines, cmdLine],
          input: "",
          suggestions: [],
          suggestionIdx: 0,
        };
      }
      const result = executeCommand(trimmed);
      const newHistory = [trimmed, ...state.cmdHistory];

      if (result.resetTerminal) {
        return {
          ...state,
          lines: getWelcomeLines(),
          input: "",
          cmdHistory: newHistory,
          historyIdx: -1,
          suggestions: [],
          suggestionIdx: 0,
        };
      }

      if (result.clearTerminal) {
        return {
          ...state,
          lines: [],
          input: "",
          cmdHistory: newHistory,
          historyIdx: -1,
          suggestions: [],
          suggestionIdx: 0,
        };
      }
      return {
        ...state,
        lines: [...state.lines, cmdLine, ...result.output],
        input: "",
        cmdHistory: newHistory,
        historyIdx: -1,
        suggestions: [],
        suggestionIdx: 0,
      };
    }

    case "HISTORY_UP": {
      const nextIdx = Math.min(
        state.historyIdx + 1,
        state.cmdHistory.length - 1
      );
      return {
        ...state,
        historyIdx: nextIdx,
        input: state.cmdHistory[nextIdx] ?? state.input,
        suggestions: [],
        suggestionIdx: 0,
      };
    }

    case "HISTORY_DOWN": {
      if (state.historyIdx <= 0) {
        return { ...state, historyIdx: -1, input: "", suggestions: [], suggestionIdx: 0 };
      }
      const prevIdx = state.historyIdx - 1;
      return {
        ...state,
        historyIdx: prevIdx,
        input: state.cmdHistory[prevIdx] ?? "",
        suggestions: [],
        suggestionIdx: 0,
      };
    }

    case "TAB": {
      const q = state.input.toLowerCase();
      if (!q) return state;
      const matches = action.allCommands.filter((c) => c.startsWith(q));
      if (matches.length === 1) {
        return { ...state, input: matches[0], suggestions: [], suggestionIdx: 0 };
      }
      if (matches.length > 1) {
        // Cycle through suggestions on repeated Tab presses
        if (
          state.suggestions.length > 0 &&
          matches.join() === state.suggestions.join()
        ) {
          const nextIdx = (state.suggestionIdx + 1) % matches.length;
          return {
            ...state,
            input: matches[nextIdx],
            suggestions: matches,
            suggestionIdx: nextIdx,
          };
        }
        // First Tab press: show suggestions and complete to first match
        return {
          ...state,
          input: matches[0],
          suggestions: matches,
          suggestionIdx: 0,
        };
      }
      return state;
    }

    case "CTRL_C": {
      const cmdLine: OutputLine = {
        id: `cmd-${Date.now()}`,
        type: "command",
        content: `${PROMPT} ${state.input}^C`,
      };
      return {
        ...state,
        lines: [...state.lines, cmdLine],
        input: "",
        historyIdx: -1,
        suggestions: [],
        suggestionIdx: 0,
      };
    }

    case "CLEAR_TERMINAL":
      return {
        ...state,
        lines: [],
        input: "",
        historyIdx: -1,
        suggestions: [],
        suggestionIdx: 0,
      };

    case "RESET_TERMINAL":
      return {
        ...state,
        lines: getWelcomeLines(),
        input: "",
        historyIdx: -1,
        suggestions: [],
        suggestionIdx: 0,
      };

    case "CLEAR_SUGGESTIONS":
      return { ...state, suggestions: [], suggestionIdx: 0 };

    default:
      return state;
  }
}

// ── component ────────────────────────────────────────────────────────────

export default function Terminal() {
  const [state, dispatch] = useReducer(terminalReducer, initialState);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const allCommands = getAllCommandNames();

  // Auto-scroll to bottom whenever lines change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [state.lines]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          dispatch({ type: "EXECUTE", allCommands });
          break;
        case "ArrowUp":
          e.preventDefault();
          dispatch({ type: "HISTORY_UP" });
          break;
        case "ArrowDown":
          e.preventDefault();
          dispatch({ type: "HISTORY_DOWN" });
          break;
        case "Tab":
          e.preventDefault();
          dispatch({ type: "TAB", allCommands });
          break;
        case "l":
          if (e.ctrlKey) {
            e.preventDefault();
            dispatch({ type: "CLEAR_TERMINAL" });
          }
          break;
        case "c":
          if (e.ctrlKey) {
            e.preventDefault();
            dispatch({ type: "CTRL_C" });
          }
          break;
      }
    },
    [allCommands]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_INPUT", value: e.target.value });
    },
    []
  );

  function renderLine(line: OutputLine) {
    const cls = `${styles.line} ${styles[`line_${line.type}` as keyof typeof styles] ?? ""}`;
    if (line.isHtml) {
      return (
        <div
          key={line.id}
          className={cls}
          // Content is generated from our own command definitions, not from user input
          dangerouslySetInnerHTML={{ __html: line.content }}
        />
      );
    }
    return (
      <div key={line.id} className={cls}>
        {line.content || "\u00A0"}
      </div>
    );
  }

  return (
    <div
      className={styles.terminal}
      onClick={focusInput}
      role="application"
      aria-label="Interactive terminal portfolio for Dylan Hawkins"
    >
      {/* CRT scanline overlay */}
      <div className={styles.scanlines} aria-hidden="true" />

      {/* Glass panel */}
      <div className={styles.terminalInner}>
        {/* Terminal body */}
        <div
          ref={bodyRef}
          className={styles.body}
          aria-live="polite"
          aria-label="Terminal output"
          role="log"
        >
          {state.lines.map(renderLine)}

          {/* Tab autocomplete suggestions */}
          {state.suggestions.length > 0 && (
            <div className={styles.suggestions} role="listbox" aria-label="Autocomplete suggestions">
              {state.suggestions.map((s, i) => (
                <span
                  key={s}
                  className={`${styles.suggestion}${i === state.suggestionIdx ? ` ${styles.suggestionActive}` : ""}`}
                  role="option"
                  aria-selected={i === state.suggestionIdx}
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Current input row */}
          <div className={styles.inputRow}>
            <span className={styles.prompt} aria-hidden="true">
              {PROMPT}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={state.input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={styles.input}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal command input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
