import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRpository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRpository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
