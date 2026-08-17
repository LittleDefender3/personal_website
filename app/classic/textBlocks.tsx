import styles from "./classic.module.css";

const URL_OR_EMAIL = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;

/** Turns bare URLs / email addresses in a line of text into links. */
function linkify(line: string, key: number) {
  const parts = line.split(URL_OR_EMAIL);
  return (
    <span key={key}>
      {parts.map((part, i) => {
        if (/^https?:\/\//.test(part)) {
          return (
            <a key={i} href={part} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
              {part}
            </a>
          );
        }
        if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part)) {
          return (
            <a key={i} href={`mailto:${part}`} className={styles.inlineLink}>
              {part}
            </a>
          );
        }
        return part;
      })}
    </span>
  );
}

/** Splits leading "Key: value" lines (until the first blank line) from the rest of the text. */
export function splitHeader(text: string): { header: Record<string, string>; rest: string } {
  const lines = text.split("\n");
  const header: Record<string, string> = {};
  let i = 0;
  for (; i < lines.length; i++) {
    const m = lines[i].match(/^([A-Za-z][\w ]*):\s*(.*)$/);
    if (!m) break;
    header[m[1].trim()] = m[2].trim();
  }
  while (lines[i] === "") i++;
  return { header, rest: lines.slice(i).join("\n") };
}

/**
 * Renders blank-line-separated blocks of plain text as paragraphs.
 * A block whose first line is short and unpunctuated, followed by more
 * lines, renders that first line as a bold lead-in (e.g. "Leadership &
 * Ethics"). A block made entirely of "- " lines (after an optional heading
 * line) renders as a heading + bullet list.
 */
export function renderBlocks(text: string, skip = 0) {
  const blocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .slice(skip);

  return blocks.map((block, i) => {
    const lines = block.split("\n").map((l) => l.trim());
    const bulletStart = lines.findIndex((l) => l.startsWith("- "));

    if (bulletStart !== -1 && lines.slice(bulletStart).every((l) => l.startsWith("- "))) {
      const heading = bulletStart > 0 ? lines.slice(0, bulletStart).join(" ") : null;
      return (
        <div key={i} className={styles.block}>
          {heading && <h4 className={styles.subHeading}>{heading}</h4>}
          <ul className={styles.bulletList}>
            {lines.slice(bulletStart).map((l, j) => (
              <li key={j}>{linkify(l.replace(/^-\s*/, ""), j)}</li>
            ))}
          </ul>
        </div>
      );
    }

    if (lines.length > 1 && lines[0].length < 50 && !/[.:]$/.test(lines[0])) {
      const [lead, ...restLines] = lines;
      return (
        <p key={i} className={styles.paragraph}>
          <strong className={styles.leadIn}>{lead}</strong>{" "}
          {linkify(restLines.join(" "), i)}
        </p>
      );
    }

    return (
      <p key={i} className={styles.paragraph}>
        {linkify(lines.join(" "), i)}
      </p>
    );
  });
}

/** Renders the "## Heading" / "### Subheading" / "- bullet" markdown subset used in experience.md. */
export function renderExperience(markdown: string) {
  const lines = markdown.split("\n");
  const nodes: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let paraBuffer: string[] = [];
  let key = 0;

  function flushList() {
    if (listBuffer.length === 0) return;
    nodes.push(
      <ul key={`ul-${key++}`} className={styles.bulletList}>
        {listBuffer.map((l, j) => (
          <li key={j}>{linkify(l, j)}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  }

  function flushPara() {
    if (paraBuffer.length === 0) return;
    const joined = paraBuffer.join(" ");
    nodes.push(
      <p key={`p-${key++}`} className={styles.paragraph}>
        {linkify(joined, key)}
      </p>
    );
    paraBuffer = [];
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (line === "") {
      flushPara();
      continue;
    }
    if (line.startsWith("### ")) {
      flushPara();
      flushList();
      nodes.push(<h4 key={`h4-${key++}`} className={styles.subHeading}>{line.slice(4)}</h4>);
    } else if (line.startsWith("## ")) {
      flushPara();
      flushList();
      nodes.push(<h3 key={`h3-${key++}`} className={styles.groupHeading}>{line.slice(3)}</h3>);
    } else if (line.startsWith("# ")) {
      continue; // top-level title, already shown as the section heading
    } else if (line.startsWith("- ")) {
      flushPara();
      listBuffer.push(line.slice(2));
    } else {
      flushList();
      paraBuffer.push(line);
    }
  }
  flushPara();
  flushList();
  return nodes;
}
