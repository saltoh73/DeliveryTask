import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAppService {
    constructor(private readonly jwtService: JwtService) {}

    async sign(
        payload: Record<string, any>,
        expiresIn: number | string = '30 days',
    ) {
        return this.jwtService.signAsync(payload, {
            issuer: 'deliveryApp',
            expiresIn: expiresIn,
            secret: process.env.JWT_SECRET,
        });
    }

    async signRefreshToken(
        payload: Record<string, any>,
        expiresIn: number | string = '30 days',
    ) {
        return this.jwtService.signAsync(payload, {
            issuer: 'deliveryApp',
            expiresIn: expiresIn,
            secret: process.env.JWT_REFRESH_SECRET,
        });
    }

    async verify(token: string): Promise<Record<string, any>> {
        return this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
        });
    }

    async verifyRefreshToken(token: string): Promise<Record<string, any>> {
        return this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_REFRESH_SECRET,
        });
    }
}
