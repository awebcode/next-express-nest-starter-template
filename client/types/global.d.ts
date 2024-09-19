namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_API_URL: string;
    BACKEND_URL: string;

    NODE_ENV: "development" | "production";

    DATABASE_URL: string;

    NEXTAUTH_URL: string;

    AUTH_SECRET: string;

    REFRESH_TOKEN_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
  }
}
