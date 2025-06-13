import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/user.model";
import { UserService } from "src/users/user.service";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UserService,
    ) {}

    async login(user: User) {
        const payload = { username: user.name, sub: user.id };
        const token = await this.jwtService.signAsync(payload);
        return {
            access_token: token,
        };
    }

    async register(data: { name: string; avatar?: string; googleId: string }) {
        return await this.usersService.create({
            name: data.name,
            avatar: data.avatar,
            googleId: data.googleId,
        });
    }
}
