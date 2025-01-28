export const getLocalResults = async (query: string) => {
  if (!query) return [];
  return [
    { id: 1, title: `Result 1 for "${query}"` },
    { id: 2, title: `Result 2 for "${query}"` },
    { id: 3, title: `Result 3 for "${query}"` },
    { id: 4, title: `Result 4 for "${query}"` },
    { id: 5, title: `Result 5 for "${query}"` },
    { id: 6, title: `Result 6 for "${query}"` },
    { id: 7, title: `Result 7 for "${query}"` },
    { id: 8, title: `Result 8 for "${query}"` },
    { id: 9, title: `Result 9 for "${query}"` },
    { id: 10, title: `Result 10 for "${query}"` },
  ];
};
