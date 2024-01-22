import resourcesToBackend from 'i18next-resources-to-backend';

function backendI18nImporter(language: string, namespace: string) {
  return import(`@/app/locales/${language}/${namespace}.json`);
}

export const backendJsonModule = resourcesToBackend(backendI18nImporter);
export default backendJsonModule;
