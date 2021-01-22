import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MS_USER',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001
        }
      }
    ])
  ],
  controllers: [UserController]
})
export class UserModule {}
