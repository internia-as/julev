// Checks an HTTP Basic Authorization header against STATS_USER / STATS_PASSWORD.
// Denies everything when the credentials are not configured.
export function isAuthorized(
  header: string | null | undefined,
  user = process.env.STATS_USER,
  password = process.env.STATS_PASSWORD
): boolean {
  if (!user || !password || !header?.startsWith("Basic ")) return false;

  try {
    const decoded = atob(header.slice("Basic ".length));
    const separator = decoded.indexOf(":");
    if (separator === -1) return false;
    return (
      decoded.slice(0, separator) === user &&
      decoded.slice(separator + 1) === password
    );
  } catch {
    return false;
  }
}
