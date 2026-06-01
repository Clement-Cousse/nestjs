import { Expose } from "class-transformer";

export class AuthUser {
  @Expose()
  sub!: number;

  @Expose()
  email!: string;

  @Expose()
  role!: 'USER' | 'Admin';
}