import { IsEmail, IsInt, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  firstname!: string;

  @IsString()
  lastname!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string

  @IsString()
  phone!: string;

  @IsString()
  structureName!: string;

  @IsString()
  postalCode!: string;

  @IsString()
  siret!: string;

  @IsInt()
  typeId!: number;
}