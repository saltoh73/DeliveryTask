import {BadRequestException, Body, Injectable} from "@nestjs/common";
import {JwtAppService} from "../../../core/http/shared/auth/JwtAppService";
import {LoginAuthDto} from "../dto/login-auth.dto";

@Injectable()
export class AuthService {


    constructor(private readonly jwtAuthService: JwtAppService) {
    }


    async login(@Body() authDto: LoginAuthDto) {
        if (authDto.email != "kareem@gmail.com" || authDto.password != "kareem") {
            throw new BadRequestException("user not found");
        }
        const tokenPayload = {
            id: 1,
            name: "kareem",
            email: authDto.email,
            password: authDto.password,
        }
        const token = await this.jwtAuthService.sign(tokenPayload);
        return {...tokenPayload, token}
    }

}