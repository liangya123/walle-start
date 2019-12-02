import { BadRequestException } from "@nestjs/common";


// 验证异常
export class ValidationException extends BadRequestException {
    public constructor(
        public readonly message: string,
    ) {
        super(message || `Validation Error`);
    }
}
