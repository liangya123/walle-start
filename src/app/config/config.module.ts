import { Module, NestModule, MiddlewareConsumer, Global } from "@nestjs/common";

import { configProviders } from "./config.providers";


/**
 *  Application configuration module. 
 *  Provides application-shared env-based configuration module.
 *  Checkout `env` directory for env-based configs. Loaded dynamically during application bootstrap.
 *  Uses {@link CipherModule} to decrypt secrets.
 */
@Global()
@Module({
    imports: [],
    providers: [...configProviders],
    exports: [...configProviders],
})
export class ConfigModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {

    }
}
