import { regularExps } from "../../../config";



export class RegisterUserDto {
    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { name, email, password } = object;

        if (!name) return ["missing name", undefined];
        if (!email) return ["missing email", undefined];
        if (!regularExps.email.test(email)) return [' Email is not valid'];
        if (!password) return ['Missing password'];
        if (password.length < 6) return ['password too short '];

        return [undefined, new RegisterUserDto(name, email, password)]
    }
}