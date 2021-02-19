import PUBLIC_URLS from "../config/public_url.json";

export default function isPublicUrl(url: string, method: string = "GET"): boolean {
  return (
    PUBLIC_URLS.filter((u) => u.method === method.toUpperCase() && u.url === url.toLowerCase())
      .length > 0
  );
}
