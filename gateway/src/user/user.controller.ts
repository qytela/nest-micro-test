import { Controller, Inject, Get, Post, Body, RequestTimeoutException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TimeoutError, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Controller('user')
export class UserController {
    constructor(
        @Inject('MS_USER') private MS_USER: ClientProxy
    ) {}

    @Get()
    async getUser() {
        const result = await this.MS_USER.send({ cmd: 'getUser' }, {})
            .pipe(
                timeout(5000),
                catchError(error => {
                    if (error instanceof TimeoutError) {
                        return throwError(new RequestTimeoutException())
                    }
                    return throwError(error)
                })
            )
            .toPromise()
        return result
    }

    @Post('data')
    async login(@Body() body) {
        const result = await this.MS_USER.send({ cmd: 'SendWithBody' }, body)
            .pipe(
                timeout(5000),
                catchError(error => {
                    if (error instanceof TimeoutError) {
                        return throwError(new RequestTimeoutException())
                    }
                    return throwError(error)
                })
            )
            .toPromise()
        return result
    }
}
