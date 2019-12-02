import { ApiModelProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateCatsDto {
  @ApiModelProperty()
  @IsNotEmpty({message: '名字不能为空'})
  name: string

  @ApiModelProperty()
  @IsNotEmpty({message: '年龄不能为空'})
  @IsNumber({maxDecimalPlaces: 0}, {message: '年龄必须为整数', })
  age: number

  @ApiModelProperty()
  description: string
}

export class UpdateCatsDto {
  @ApiModelProperty()
  name: string

  @ApiModelProperty()
  @IsNumber({maxDecimalPlaces: 0}, {message: '年龄必须为整数', })
  age: number

  @ApiModelProperty()
  description: string
}