export function getInitials(username: string): string {
  if (!username || typeof username !== 'string') return '';
  return username.slice(0, 2).toUpperCase();
}
