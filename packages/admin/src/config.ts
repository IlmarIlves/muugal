export const config = {
    useSsl: window.location.protocol === "https:",
    host: window.location.hostname,
    port: window.location.port.length > 0 ? parseInt(window.location.port, 10) : 80,
    clientVersion: process.env.REACT_APP_VERSION ?? "n/a",
    grahpqlPath: process.env.REACT_APP_GRAPHQL_PATH ?? "/api/graphql",
    credentials: process.env.REACT_APP_CREDENTIALS ?? "same-origin",
    mainSiteUrl: process.env.REACT_APP_MAIN_SITE_URL ?? "http://localhost:3001",
    debug: process.env.REACT_APP_DEBUG ? process.env.REACT_APP_DEBUG === "true" : process.env.NODE_ENV === "development",
    stripePublicKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY ?? "",
    itemsPerPage: process.env.REACT_APP_ITEMS_PER_PAGE ? parseInt(process.env.REACT_APP_ITEMS_PER_PAGE, 10) : 30,
  };
  
  export type Config = typeof config;
  