export function getInitials(name) {
  return name
    .split(/\s+/)
    .filter((part) => part && !part.endsWith('.'))
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}
