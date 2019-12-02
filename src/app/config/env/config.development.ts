import { Config, Env } from "../config.interfaces";

// 本地开发、调试使用
const config: Config = {
    env: Env.DEVELOPMENT,
    db: {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "root",
        password: "123456",
        database: "nest",
        entities: ["src/**/*.entity{.ts,.js}"],
        synchronize: true,
    },
    redis: {
        host: "localhost",
        port: 6379
    },
    storage: {
        bucket: "",
        prefix: "",
    },
    app: {
        logRequests: true,
        url: "localhost:10001",
        apiUrl: "http://pms.duobang.test",
    },
    auth: {
        tokenExpiration: 60 * 60 * 24 * 10, // 10 day
        tokenSecret: "DuoBangSecretKey",
        longTokenExpiration: 60 * 60 * 24 * 30 , //  30 day
    },
};


export default config;
