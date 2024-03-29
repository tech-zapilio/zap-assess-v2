type ENV = "dev" | "prod" | "local";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function config(_env?: ENV): string {
  const urls = [
    {
      env: "dev",
      url: "https://dev.api.zapilio.com/",
    },
    {
      env: "prod",
      url: "https://api.zapilio.com/",
    },
    {
      env: "local",
      url: "http://localhost:8080/",
    },
    {
      env: "ngrok",
      url: "https://1e09-14-141-145-82.ngrok-free.app/",
    },
    //
  ];
  const url = urls.find((url) => url.env === "dev")?.url || "";
  return url;
}
