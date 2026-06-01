import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Admin, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { throws } from 'assert';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) { }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }

    async register(registerDto: RegisterDto): Promise<User> {
        return this.prisma.user.create({
            data: {
                ...registerDto,
                password: await this.hashPassword(registerDto.password),
                isVerified: false
            },
        });
    }


    async generateToken(user: User | Admin, role: string): Promise<{ access_token: string }> {
        const payload = { sub: user.id, email: user.email, role: role };
        return {
            access_token: await this.jwt.signAsync(payload),
        };
    }

    async checkPassword(user: User | Admin, pass, role) {
        const isValid = await bcrypt.compare(pass, user.password);

        if (!isValid) {
            throw new UnauthorizedException();
        }
        return this.generateToken(user, role)
    }


    async loginUser(email: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.prisma.user.findUnique({ where: { email } })
        if (!user) throw new UnauthorizedException()
        return this.checkPassword(user, pass, 'user')
    }

    
    async loginAdmin(email: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.prisma.admin.findUnique({ where: { email } })
        if (!user) throw new UnauthorizedException()
        return this.checkPassword(user, pass, 'admin')
    }

}