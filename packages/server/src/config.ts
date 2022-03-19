import { join } from "path";
import { util } from "config";
import normalizeType from "normalize-type";

export interface Config {
  clientBaseUrl: string;
  applicationName: string;
  packageName: string;
  server: ServerConfig;
  graphql: GraphqlConfig;
  session: SessionConfig;
  database: DatabaseConfig;
  logger: LoggerConfig;
  admin: AdminConfig;
  slack: SlackConfig;
  email: EmailConfig;
  stripe: StripeConfig;
}

export interface ServerConfig {
  host: string;
  port: number;
  ssl: boolean;
  cert: string;
  key: string;
  corsOriginWhitelist: string[];
}

export interface GraphqlConfig {
  playground: boolean;
  introspection: boolean;
  debug: boolean;
  simulatedLatency: number;
}

export interface SessionConfig {
  secret: string;
  maxAge: number;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  maxQueryExecutionTime: number;
  sync: boolean;
}

export interface LoggerConfig {
  useConsoleLogger: boolean;
  useFileLogger: boolean;
  useSlackLogger: boolean;
  includeSource: boolean;
  consoleLogLevel: "trace" | "debug" | "info" | "warn" | "error" | "fatal";
  slackLogLevel: "trace" | "debug" | "info" | "warn" | "error" | "fatal";
  path: string;
}

export interface AdminConfig {
  enabled: boolean;
}

export interface SlackConfig {
  token: string;
  channel: string;
  name: string;
  iconUrl: string;
}

export interface EmailConfig {
  enabled: boolean;
  apiKey: string;
  fromEmail: string;
  fromName: string;
  inboundEmailDomain: string;
  webhookKey: string;
  webhookCallbackUrl: string;
}


export interface StripeConfig {
  webhookSecretKey: string;
  privateKey: string;
  successUrl: string;
  cancelUrl: string;
}

// always load from config directory relative to given file
export const config = normalizeType(util.loadFileConfigs(join(__dirname, "..", "config"))) as Config;
