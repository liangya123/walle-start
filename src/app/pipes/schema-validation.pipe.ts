import { PipeTransform, Injectable } from "@nestjs/common";

import * as _ from "lodash";
import { plainToClass, ClassTransformOptions } from "class-transformer";
import { validate, ValidationError } from "class-validator";

import { ValidationException } from "../exceptions";
import { ArgumentMetadata } from "./metdata.interface";

/**
 * 数据校验 前端与后端交互时, 传入的数据校验 替换全局校验的new ValidationPipe()
 */

@Injectable()
export class SchemaValidationPipe  implements PipeTransform {
    public async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const transformed = plainToClass(metatype, value);
        const errors: ValidationError[] = await validate(transformed);

        if (!!errors.length) {
            throw new ValidationException(this.formatErrorInfo(errors));
        }

        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];

        return !types.find((type) => metatype === type);
    }

    private formatErrorInfo(errors: ValidationError[]): string {
        return _.map(errors, e => {
            return _.keys(e.constraints).map(
                constraint => 
                // `${constraint}: ${e.constraints[constraint]}`
                e.constraints[constraint]
            ).join(", ");
        }).join("; ");
    }
}
