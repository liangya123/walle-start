import { Injectable } from "@nestjs/common";
import { ClientGrpc, Client } from "@nestjs/microservices";
import { grpcClientOptions } from "./grpc.client.options";

@Injectable()
export class ClentServe {

  @Client(grpcClientOptions) public readonly client: ClientGrpc; 
  // @Client(grpcUserClientOptions) public readonly userClient: ClientGrpc; 

}
 