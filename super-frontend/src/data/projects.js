export const PROJECTS = [
  { slug: 'project-1', title: 'Project 1' },
  { slug: 'project-2', title: 'Project 2' },
]

export function projectTitleForSlug(slug) {
  return PROJECTS.find((p) => p.slug === slug)?.title
}
