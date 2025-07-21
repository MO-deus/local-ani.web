import { animeSources } from "@/constants/animeSources";

/**
 * Removes duplicates from an array based on a derived key
 *
 * @param items - Array of items
 * @param getKey - Function to derive a unique key from each item
 * @returns Filtered array with unique items based on the key
 */
export function removeDuplicates<T>(items: T[], getKey: (item: T) => any): T[] {
  const seen = new Set();
  return items.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function handleSearchQuery(
  query: string,
  filters: Record<string, any> = {}
) {
  if (!query) return null;

  try {
    const baseURL = animeSources.search.url;

    const params: Record<string, any> = {
      q: query,
      // limit: 10,
      sfw: false,
      order_by: "popularity",
      // sort: "desc",
      ...filters,
    };

    const searchQueryString = new URLSearchParams(params).toString();
    const searchURL = `${baseURL}?${searchQueryString}`;

    console.log(searchURL);

    const searchQueryResponse = await fetch(searchURL);
    if (!searchQueryResponse.ok)
      throw new Error(
        `API Error : Constructed URL : ${searchURL} \n API response : ${searchQueryResponse.status}`
      );

    const searchQueryData = await searchQueryResponse.json();
    console.log(searchQueryData);

    return searchQueryData;
  } catch (err) {
    console.error("Anime search failed : ", err);
    return null;
  }
}
