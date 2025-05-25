export const calculateAge = (created_at: string) => {
  const secondsAgo = (Date.now() - new Date(created_at).getTime()) / 1000;
  if (secondsAgo < 60) return `${Math.floor(secondsAgo)}s`;
  if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m`;
  if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h`;
  if (secondsAgo < 604800) return `${Math.floor(secondsAgo / 86400)}d`;
  return `${Math.floor(secondsAgo / 604800)}w`;
};
