
export const formatDate = (dateString, options) => {
  const defaultOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const mergedOptions = { ...defaultOptions, ...options };
  
  if (!dateString) return 'N/A';

  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  // If no specific options are given, use relative time for recent dates
  if (Object.keys(options || {}).length === 0) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
  }
  
  return date.toLocaleDateString(undefined, mergedOptions);
};
