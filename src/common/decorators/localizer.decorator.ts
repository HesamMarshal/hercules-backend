export function localizeField(
  entity: any,
  field: string,
  lang: string,
): string {
  const localized = entity[`${field}_${lang}`];
  return localized || entity[`${field}_en`] || '';
}
