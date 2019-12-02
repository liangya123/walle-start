import { LoggerService as NestLoggerService, Injectable } from "@nestjs/common";
import * as pino from "pino";
// const Sentry = require('@sentry/node');
//pino是快速的JSON记录器,它具有等效于Bunyan的CLI程序,可以解耦传输,并且具有合理的默认配置

/**
 * 日志记录器
 */
@Injectable()
export class LoggerService implements NestLoggerService {
    private logger: pino.BaseLogger;

    constructor(
        options: { name?: string; level?: string; prettyPrint?: boolean | object, prettifier?: any },
    ) {
        this.logger = pino(options);
    }
    public log(message: any) {
        this.logger.info(message);
    }
    
    public error(message: any) {
        this.logger.error(message);
        
    }

    public warn(message: any) {
        this.logger.warn(message);
    }

    // 发送sentry
    public captureException(error: Error){
        console.log('=====captureException---发送sentry----')
        this.logger.error(error);
        // Sentry.captureException(error);
    }

    // 发送sentry
    public captureMessage(message:string){
        console.log('captureMessage---发送sentry----')
        this.logger.info(message);
        // Sentry.captureMessage(message)
    }
}
