export async function parseSessionId(sessionPath) {
  const parts = sessionPath.split('/');
  return parts[parts.length - 1];
}
