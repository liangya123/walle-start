import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';
export const grpcServerOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:8888',
    package: 'start',
    protoPath: join(__dirname, 'user.proto')
  },
};
