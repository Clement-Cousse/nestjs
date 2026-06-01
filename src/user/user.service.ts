import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany({
      include: {
        type: true,
      },
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
      include: {
        type: true,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
    });
  }

  remove(id: number): Promise<User> {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  async verifyUser(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.isVerified) {
      return user;
    }

    return this.prismaService.user.update({
      where: { id },
      data: { isVerified: true },
    });
  }
}