import { regularExps } from "../../../config";

export class LoginUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) { }

    static login(object: { [key: string]: any }): [string?, LoginUserDto?] {
        const { email, password } = object;
        if (!email) return ["missing email", undefined];
        if (!regularExps.email.test(email)) return [' Email is not valid'];
        if (!password) return ['Missing password'];
        return [undefined, new LoginUserDto(email, password)]
    }
}