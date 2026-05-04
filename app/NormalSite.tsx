import { aboutInfo, skills, projects, contactInfo } from '@/app/data';

export function NormalSite() {
  return (
    <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{aboutInfo.name}</h1>
          <p className="text-2xl text-indigo-600 mb-6">{aboutInfo.title}</p>
          <p className="text-lg text-gray-700 leading-relaxed">{aboutInfo.bio}</p>
          <p className="text-gray-600 mt-4">📍 {aboutInfo.location}</p>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((item, i) => (
                    <li key={i} className="text-gray-700 flex items-center">
                      <span className="text-indigo-500 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Projects</h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 underline"
                    >
                      View Project
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-3">
              <li className="text-gray-700">
                <strong>Email:</strong>{' '}
                <a href={`mailto:${contactInfo.email}`} className="text-indigo-600 hover:underline">
                  {contactInfo.email}
                </a>
              </li>
              <li className="text-gray-700">
                <strong>GitHub:</strong>{' '}
                <a
                  href={`https://${contactInfo.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {contactInfo.github}
                </a>
              </li>
              <li className="text-gray-700">
                <strong>LinkedIn:</strong>{' '}
                <a
                  href={`https://${contactInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {contactInfo.linkedin}
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}