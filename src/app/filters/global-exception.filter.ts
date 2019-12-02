import { ExceptionFilter, Catch, InternalServerErrorException, ArgumentsHost, HttpException } from "@nestjs/common";

import { LoggerService } from "../logger";

/**
 * 异常过滤器
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    public constructor(private readonly logger: LoggerService) { 

    }

    public catch(error: Error, host: ArgumentsHost) {
        // console.log('--------GlobalExceptionFilter-----------')
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request =  ctx.getRequest()

        // 后台打印出具体位置错误
        this.logger.error(error);

        if (error instanceof HttpException) {
            this.handleHttpException(error as HttpException, request, response);
        } else {
            this.handleUncaughtError(error, response);
        }
    }

    // 处理HTTP异常
    private handleHttpException(exception: HttpException, request, response) {
        const status = exception.getStatus();
        const message = exception.message.message || exception.message || "Something went wrong";
        const path = request.url


        // this.logger.error(exception.getResponse()); // logging in cloudwatch-friendly way

        if (process.env.NODE_ENV !== "production") {
            // console.error(exception); // pino prettifier ignores error stack trace
            /**
             * { statusCode: 400, error: 'Bad Request', message: '我是错的' }
             */
        }

        response
            .status(status)
            .json({ message });
    }

    // 行为未被捕获的错误
    private handleUncaughtError(error: Error, response) {
        this.logger.error(`Unhandled exception occurred`);

        if (process.env.NODE_ENV !== "production") {
            console.error(error); // pino prettifier ignores error stack trace
        } else {
            // logging in cloudwatch-friendly way: wrapping with 500 Exception ot properly log server fault
            // and trigger cloudwatch alarm
            this.logger.error((new InternalServerErrorException(error.message)).getResponse());
            /**
             *  statusCode: 500
                error: "Internal Server Error"
                message: "Unexpected token i in JSON at position 0"
             */
        }

        response
            .status(500)
            .json({
                message: "Something went wrong",
            });
    }
}



/**
 * 
 * {
    "path": "/cats/a",
    "status": 400,
    "message": "我是错的"
  }
 * 
 * 
 * 
 * 
 * 
 */
 