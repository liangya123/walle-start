import { Request, Response } from 'express';
import { NestMiddleware, Injectable } from "@nestjs/common";

// import { JwtWrapperService } from "../../global";

/**
 * 做路由拦截处理 目前程序中用不到
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    // public constructor(private readonly jwtWrapperService: JwtWrapperService) {
    // }

    use(req: Request | any, res: Response, next: Function) {   
        // 登录不用验证
        if (req.originalUrl == '/api/user/signin'
            || req.url == '/api/user/signin' || 
            req.originalUrl == '/api/org' || req.url == '/api/org' || // 注册新组织
            req.originalUrl == '/api/user/send' || req.url == '/api/user/send' ||
            req.originalUrl == '/api/user/code' || req.url == '/api/user/code' ||
            req.originalUrl == '/api/user/phone/signin' || req.url == '/api/user/phone/signin'
        ) {            
            return next()
        }

        try {
            const token = req.headers.authorization
            // let user = this.jwtWrapperService.verify(token)
            // req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ "msg": error.message })
        }
      }
}