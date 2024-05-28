import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { ModuleRef } from "@nestjs/core";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    private authService: AuthService;
    
    constructor(
        private readonly jwtService: JwtService, 
        private readonly moduleRef: ModuleRef
    ) {}

    async use(req: any, res: any, next: () => void) {
        if (!this.authService) {
            this.authService = this.moduleRef.get(AuthService, { strict: false });
        }
        
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header not found!');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.authService.findUserById(decoded.id);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }
            req.user = user;
            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}