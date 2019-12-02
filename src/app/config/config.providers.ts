
import { Env } from "./config.interfaces";
import { ConfigDiToken } from "./config.di";
import  devConfig from "./env/config.development";
import  proConfig from "./env/config.production";
import testConfig from "./env/config.test";

const env = process.env.NODE_ENV;

export const configProvider = {
    provide: ConfigDiToken.CONFIG,
    useValue: env===Env.PRODUCTION ? proConfig : (env===Env.TEST ? testConfig : devConfig)
};

export const configProviders = [
    configProvider,
];
