export enum Env {
    DEVELOPMENT = "development",
    PRODUCTION = "production",
    TEST = "test"
}

export interface Config {
    env?: Env;
    db?: {
        type: "postgres",
        host: string,
        port: number,
        username: string,
        password: string,
        database: string,
        entities: string[],
        synchronize?: boolean,
        migrations?: string[],
        cli?: {
          migrationsDir: string
        }
    };
    redis?: {
        host: string
        port: number
    }
    storage?: {
        bucket: string,
        prefix: string;
    };
    app?: {
        logRequests?: boolean,
        adminEmail?: string[];
        url?: string;
        apiUrl?: string;
    };
    auth?: {
        tokenSecret: string,
        tokenExpiration: number, // seconds
        // resetPasswordTokenSecret: string,
        // resetPasswordTokenExpiration: number,
        longTokenExpiration: number; // seconds
    };
}
