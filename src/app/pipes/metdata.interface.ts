import { ArgumentMetadata as IArgumentMetadata, Type } from "@nestjs/common";

export class ArgumentMetadata implements IArgumentMetadata {
  readonly type: 'body' | 'query' | 'param' | 'custom';
  readonly metatype?: Type<any>;
  readonly data?: string;
}