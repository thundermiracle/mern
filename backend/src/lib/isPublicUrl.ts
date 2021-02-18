const PUBLIC_URLS = [{ method: "POST", url: "/api/users/login" }];

export default function isPublicUrl(url: string, method: string = "GET"): boolean {
  return (
    PUBLIC_URLS.filter((u) => u.method === method.toUpperCase() && u.url === url.toLowerCase())
      .length > 0
  );
}
