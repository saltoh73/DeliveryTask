import {Body, Controller, Post} from "@nestjs/common";
import {LoginAuthDto} from "../dto/login-auth.dto";
import {AuthService} from "../service/auth.service";

@Controller("/api/v1/auth")
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post("/login")
    async login(@Body() authDto: LoginAuthDto) {
        return this.authService.login(authDto);
    }
}