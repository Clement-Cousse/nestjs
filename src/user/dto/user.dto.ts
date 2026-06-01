import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  firstname!: string;

  @Expose()
  lastname!: string;

  @Expose()
  email!: string;

  @Expose()
  phone!: string;

  @Expose()
  structureName!: string;

  @Expose()
  postalCode!: string;

  @Expose()
  siret!: string;

  @Expose()
  typeId!: number;
}