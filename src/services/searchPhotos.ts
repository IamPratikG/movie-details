import { createClient, Photo } from "pexels";

export default async function searchPhotos(
  query: string,
  addPhotos: (photos: Photo[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) {
  setLoading(true);
  setError(null);

  const apiKey = process.env.REACT_APP_PEXEL_API_KEY;
  if (!apiKey) {
    setError("Missing API key");
    setLoading(false);
    return;
  }

  const client = createClient(apiKey);
  const perPage = 80;
  const totalPages = 100;

  const fetchPage = async (page: number) => {
    try {
      const response = await client.photos.search({ query, page, perPage });
      if ("photos" in response) {
        addPhotos(response.photos);
      }
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
    }
  };

  const promises = Array.from({ length: totalPages }, (_, i) =>
    fetchPage(i + 1)
  );

  try {
    await Promise.all(promises);
  } catch (error) {
    setError(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  } finally {
    setLoading(false);
  }
}
