import { Controller, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
    @MessagePattern({ cmd: 'getUser' })
    getUser() {
        return {
            status: true,
            data: {
                name: 'Fansa',
                age: 19
            }
        }
    }

    @MessagePattern({ cmd: 'SendWithBody' })
    login(@Body() body) {
        return {
            status: true,
            message: 'Login',
            data: body
        }
    }
}
