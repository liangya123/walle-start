import { Config, Env } from "../config.interfaces";

// 在线测试机器上使用：域名pms.duodainfo.cn
const config: Config = {
    env: Env.TEST,
    db: {
        type: "postgres",
        host: process.env.PMS_POSTGRES_HOST     || "core-postgres-starter",
        port: +process.env.PMS_POSTGRES_PORT    || 5432,
        database: process.env.PMS_POSTGRES_DB   || "pms-starter",
        username: process.env.PMS_POSTGRES_USER || "root",
        password: process.env.PMS_POSTGRES_PWD  || "123456",
        entities: ["src/**/*.entity{.ts,.js}"],
        migrations: ["src/biz/database/migrations/*.ts"],
        cli: {
          migrationsDir: "src/biz/database/migrations"
        }
    },
    redis: {
        host: process.env.PMS_REDIS_HOST || "core-redis-pms",
        port: +process.env.PMS_REDIS_PORT || 6379
    },
    storage: {
        bucket: "",
        prefix: "",
    },
    app: {
        logRequests: true,
        url: "localhost:10001",
        apiUrl: process.env.PMS_API_URL || "http://pms.duodainfo.cn",
    },
    auth: {
        tokenExpiration: 60 * 60 * 24 * 10, // 10 day
        tokenSecret: "DuoBangSecretKey",
        longTokenExpiration: 60 * 60 * 24 * 30 , //  30 day
    },
};


export default config;
