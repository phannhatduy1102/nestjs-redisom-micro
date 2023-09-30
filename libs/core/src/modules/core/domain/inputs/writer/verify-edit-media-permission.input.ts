import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class VerifyEditMediaPermissionInput {
  @IsArray()
  @IsUUID(4, { each: true })
  @IsNotEmpty()
  mediaIds: string[];

  @IsUUID(4)
  @IsNotEmpty()
  writerId: string;
}

export class GatewayVerifyEditMediaPermissionInput {}
