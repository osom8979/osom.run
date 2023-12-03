export function backendI18nImporter(language: string, namespace: string) {
  return import(`./locales/${language}/${namespace}.json`);
}
