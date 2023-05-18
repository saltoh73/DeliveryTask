import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtAppService} from "../shared/auth/JwtAppService";

@Injectable()
export class DriverMustBeAuthorizedGuard implements CanActivate {
    constructor(private appAuthService: JwtAppService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authToken = request.headers['authorization'];
        if (!authToken) {
            throw new UnauthorizedException("driver unauthorized");
        }
        request.driver = await this.appAuthService.verify(
            authToken.replace(/Bearer /gi, ''),
        );
        return true;
    }
}
