export interface I18nParams {
  lng: string;
}

export interface I18nRouterProps {
  params: I18nParams;
  searchParams: URLSearchParams;
}

export default I18nRouterProps;
