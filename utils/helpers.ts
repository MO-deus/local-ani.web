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
