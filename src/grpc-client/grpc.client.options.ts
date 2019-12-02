import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '127.0.0.1:3002',
    package: 'demo',
    protoPath: join(__dirname, '/proto/cats.proto'),
  },
};



// export const grpcUserClientOptions: ClientOptions = {
//   transport: Transport.GRPC,
//   options: {
//     url: '127.0.0.1:3002',
//     package: 'user',
//     protoPath: join(__dirname, '/proto/user.proto'),
//   },
// };