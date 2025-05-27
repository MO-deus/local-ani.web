export function ISODateFormatToReadableFormat(datestring?: string): string {
  if (!datestring) return "Ongoing";

  const date = new Date(datestring);
  return new Intl.DateTimeFormat("en-Us", { dateStyle: "long" }).format(date);
}
