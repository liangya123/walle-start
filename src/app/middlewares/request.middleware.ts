import * as moment from "moment";
import { LoggerDiToken, LoggerService } from "../logger";
import { NestMiddleware, Injectable,  Inject } from "@nestjs/common";

/**
 * 
 * 请求中间件 -- 用于请求记录打印
 * 
 * moment -- JavaScript 日期处理类库
 * 
 * 
 * 中间件函数可以访问请求和响应对象
 * 
 * 获取请求的①时间②路由③请求方式, 并通过logger打印在后台
 * 
 * 例如: [2019-11-27 12:10:10.390 +0000] INFO  (26989 on Eleven): 2019-11-27 20:10:10 [Request]:
        Url: /cats
        Method: GET
 * 
 */
@Injectable()
export class RequestMiddleware implements NestMiddleware {
    public constructor(@Inject(LoggerDiToken.LOGGER) private readonly logger: LoggerService) {
    }

    use(req, res: Response, next: Function) {
        // 时间 路由 请求方式
        const body = `${moment().format("YYYY-MM-DD HH:mm:ss")} [Request]:
        Url: ${req.originalUrl}
        Method: ${req.method}`;
        
        this.logger.log(body);
        next();
    }
}
