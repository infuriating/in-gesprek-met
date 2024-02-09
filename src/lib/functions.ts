export const getTimeAgo = (date: number) => {
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = now - time;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} dagen geleden aangemaakt`;
  if (hours > 0) return `${hours} uur geleden aangemaakt`;
  if (minutes > 0) return `${minutes} minuten geleden aangemaakt`;

  return "minder dan een minuut geleden aangemaakt";
};
