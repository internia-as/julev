interface Props {
  query: string;
}

export default async function SearchResult(props: Props) {
  const results = await fetchSearchResults(props.query);

  return (
    <div>
      {results.length > 0 ? (
        results.map((result) => <div key={result.id}>{result.title}</div>)
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

async function fetchSearchResults(query: string) {
  console.log(query);
  if (!query) return [];

  return [
    { id: 1, title: `Result 1 for "${query}"` },
    { id: 2, title: `Result 2 for "${query}"` },
  ];
}
