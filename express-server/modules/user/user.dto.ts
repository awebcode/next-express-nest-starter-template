import { PartialType, PickType } from "@nestjs/mapped-types";
import { Role, type User } from "@prisma/client";
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
  IsNotEmpty,
} from "class-validator";

// Create a utility type to extract only required fields from User
type RequiredUserFields = Pick<User, 'email' | 'password' | 'name' | 'image' | 'providerId' | 'role'>;

// Define the UserBaseDTO with required fields
export class UserBaseDTO implements Omit<RequiredUserFields, "resetToken" | "resetTokenExpiry"> {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsString()
  image!: string;

  @IsOptional()
  @IsString()
  providerId!: string;

  @IsOptional()
  @IsEnum(Role)
  role!: Role;
  
}

export class RegisterDTO extends PickType(UserBaseDTO, [
  "email",
  "name",
  "password",
] as const) {}

export class LoginDTO extends PickType(UserBaseDTO, ["email", "password"] as const) {}
export class UpdateUserDto extends PartialType(UserBaseDTO) {}
