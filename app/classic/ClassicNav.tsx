"use client";

interface NavItem {
  href: string;
  label: string;
}

interface ClassicNavProps {
  items: NavItem[];
  className: string;
}

const SCROLL_GAP = 16;

export default function ClassicNav({ items, className }: ClassicNavProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const id = href.replace(/^#/, "");
    const target = document.getElementById(id);
    const container = document.querySelector<HTMLElement>("[data-classic-scroll]");
    const header = document.querySelector<HTMLElement>("[data-classic-hero]");
    if (!target || !container) return; // fall back to the browser's native jump

    e.preventDefault();
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const targetTop =
      target.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop;
    container.scrollTo({ top: targetTop - headerHeight - SCROLL_GAP, behavior: "smooth" });
    history.pushState(null, "", href);
  }

  return (
    <nav className={className} aria-label="Section navigation">
      {items.map((n) => (
        <a key={n.href} href={n.href} onClick={(e) => handleClick(e, n.href)}>
          {n.label}
        </a>
      ))}
    </nav>
  );
}
