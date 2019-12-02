import { Module, Global } from "@nestjs/common"
import { RedisClientService } from "./index"

@Global()
@Module({
    imports:[],
    providers:[RedisClientService],
    exports:[RedisClientService]
})
export class RedisClientModule{}