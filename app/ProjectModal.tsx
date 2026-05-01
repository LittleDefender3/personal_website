import type { Project } from "./projectData";

type Props = {
  open: boolean;
  project: Project | null;
  onClose: () => void;

  // Optional: pass a computed source URL for the portfolio project
  // so you can keep env var logic in the page.
  portfolioSourceUrl?: string | null;
};

export function ProjectModal({ open, project, onClose, portfolioSourceUrl }: Props) {
  if (!open || !project) return null;

  const sourceLink =
    project.id === "portfolio" && portfolioSourceUrl
      ? [{ label: "View Source", href: portfolioSourceUrl }]
      : project.links ?? [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      onClick={onClose} // click backdrop closes
      className="overlay"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h3 className="modalTitle">{project.title}</h3>
          <button className="closeButton" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <p className="modalSubtitle">{project.shortDescription}</p>

{project.tags?.length ? (
  <div className="tagRow">
    {project.tags.map((t) => (
      <span key={t.label} className={`tag tag_${t.variant}`}>
        {t.label}
      </span>
    ))}
  </div>
) : null}

        {project.longDescription ? (
          <div className="modalSection">
            <h4 className="sectionTitle">Details</h4>
            <p className="bodyText">{project.longDescription}</p>
          </div>
        ) : null}

        {project.demoEmbedUrl ? (
          <div className="modalSection">
            <h4 className="sectionTitle">Demo</h4>
            <div className="videoFrame">
              <iframe
                src={project.demoEmbedUrl}
                title={`${project.title} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : null}

        {project.demoVideoUrl ? (
          <div className="modalSection">
            <h4 className="sectionTitle">Demo</h4>
            <video className="video" controls>
              <source src={project.demoVideoUrl} />
            </video>
          </div>
        ) : null}

        {sourceLink.length ? (
          <div className="modalSection">
            <h4 className="sectionTitle">Links</h4>
            <div className="linkRow">
              {sourceLink.map((l) => (
                <a key={l.href} className="link" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} →
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}