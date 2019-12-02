import { Module, Global } from "@nestjs/common";

import { loggerProviders } from "./logger.provider";

@Global()
@Module({
    imports: [],
    providers: [...loggerProviders],
    exports: [...loggerProviders],
})
export class LoggerModule { }
