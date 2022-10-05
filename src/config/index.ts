import dotenv from "dotenv";
dotenv.config();


const env = process.env.NODE_ENV || "development"

/**
 * Config values common across envs, also default values for development env
 */
const commonConfig = {
  appName: process.env.APP_NAME || "inspections-module-api-service",
  port: process.env.PORT || 5000,
  env,
  allowOrigin: process.env.ALLOW_ORIGIN || "*",
};

/**
 * Env-specific config values
 */
const envConfig = ({
  "production": {}
})[env];

const config = { ...commonConfig, ...(envConfig || {}) }


export default config;
