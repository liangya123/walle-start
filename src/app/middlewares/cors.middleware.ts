import { NestMiddleware, Injectable, Inject } from "@nestjs/common";
import { Request, Response } from 'express';

/**
 * 响应中间件
 * 响应头处理 目前程序中没有使用
 */

@Injectable()
export class CorsMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        console.log('CorsMiddleware...');
         // Allow Origins
        res.header("Access-Control-Allow-Origin", "*");
        // Allow Methods
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
        // Allow Headers
        res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization");
        // Handle preflight, it must return 200
        if (req.method === "OPTIONS") {
            // Stop the middleware chain
            return res.status(200).end();
        }

        // Next middleware 
        next();
      }
}



/**
 * 响应头对比
  * 	
    connection: keep-alive  
    content-length: 0  
    date: Wed, 27 Nov 2019 12:31:09 GMT  
    x-powered-by: Express 
  * 
  * 
    access-control-allow-headers: Origin, Accept, Content-Type, Authorization  
    access-control-allow-methods: GET, POST, PATCH, PUT, DELETE, OPTIONS  
    access-control-allow-origin: *  
    connection: keep-alive  
    content-length: 0  
    date: Wed, 27 Nov 2019 12:32:19 GMT  
    x-powered-by: Express 


  * 
    用了的get
   access-control-allow-headers: Origin, Accept, Content-Type, Authorization  
   access-control-allow-methods: GET, POST, PATCH, PUT, DELETE, OPTIONS  
   access-control-allow-origin: *  
   content-length: 167  
   content-type: application/json; charset=utf-8  
   date: Wed, 27 Nov 2019 12:34:19 GMT  
   etag: W/"a7-7W/WsPAVKMulPE/eB/yfLoA7Deg"  
   x-powered-by: Express 

  *
  *
  * 
  * 没用的post和put以及get
    connection: keep-alive  
    content-length: 55  
    content-type: application/json; charset=utf-8  
    date: Wed, 27 Nov 2019 12:36:53 GMT  
    etag: W/"37-NIcO5U+PR3zCVFh+KYkWrUoCy0A"  
    x-powered-by: Express 
  * 
  * 
  * 
  */