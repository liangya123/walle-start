import { Config, Env } from "../config.interfaces";

// 在产品使用：域名pms.duobanginfo.com
const config: Config = {
    env: Env.PRODUCTION,
    db: {
        type:  "postgres",
        host: process.env.POSTGRES_HOST || "localhost",
        port: parseInt(process.env.POSTGRES_PORT) || 5432,
        username: process.env.POSTGRES_USER || "root",
        password: process.env.POSTGRES_PASSWORD || "123456",
        database: process.env.POSTGRES_DATABASE || "nest",
        entities:  ["src/**/*.entity{.ts,.js}"],
        synchronize: true,
    },
    redis: {
        host: process.env.REDIS_HOST || "core-redis-pms",
        port: parseInt(process.env.REDIS_PORT) || 6379
    },
    storage: {
        bucket: "",
        prefix: "",
    },
    app: {
        logRequests: true,
        url: "localhost:10001",
        apiUrl: process.env.PMS_API_URL || "http://pms.duobanginfo.com",
    },
    auth: {
        tokenExpiration: 60 * 60 * 24 * 10, // 10 day
        tokenSecret: "DuoBangSecretKey",
        longTokenExpiration: 60 * 60 * 24 * 30 , //  30 day
    },
};


export default config;
