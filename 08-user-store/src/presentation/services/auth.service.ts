import { bcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { EmailService } from "./email.service";


export class AuthService {
    constructor(
        private readonly emailService: EmailService,
    ) { }

    public async registerUser(registerUserDto: RegisterUserDto) {
        const existsUser = await UserModel.findOne({ email: registerUserDto.email });

        if (existsUser) throw CustomError.badRequest('Email already exists');

        try {
            const user = new UserModel(registerUserDto);

            // encriptar contraseña
            user.password = bcryptAdapter.hash(registerUserDto.password);

            // email de confirmación
            await this.sendEmailValidationLink(user.email)

            await user.save();

            const { password, ...userEntity } = UserEntity.fromObject(user);

            const token = await JwtAdapter.generateToken({ id: user.id })
            if (!token) throw CustomError.internalServer('Error generating token')

            return { userEntity, token: token }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    public async loginUser(loginUserDto: LoginUserDto) {
        // findone
        const user = await UserModel.findOne({ email: loginUserDto.email });
        if (!user) throw CustomError.badRequest('User not exists')

        const hasMatch = bcryptAdapter.compare(loginUserDto.password, user.password)
        if (!hasMatch) throw CustomError.badRequest('User or password incorrect')

        const { password, ...userEntity } = UserEntity.fromObject(user);

        const token = await JwtAdapter.generateToken({ id: user.id })
        if (!token) throw CustomError.internalServer('Error generating token')

        return { user: userEntity, token: token }


    }

    private sendEmailValidationLink = async (email: string) => {
        const token = await JwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internalServer('Error generating token');

        const link = `${process.env.WEBSERVICE_URL}/auth/validate-email/${token}`;

        const html = `
            <h1>Validate your email</h1>
            <p>Click on the link to validate your email</p>
            <a href="${link}">Validate email</a>
        `

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        }

        const isSent = await this.emailService.sendEmail(options);

        if (!isSent) throw CustomError.internalServer('Error sending email validation link');

        return true;
    }

    public validateEmail = async (token: string) => {

        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const { email } = payload as { email: string }
        if (!email) throw CustomError.internalServer('Email not found in token');

        const user = await UserModel.findOne({ email });
        if (!user) throw CustomError.internalServer('User not exists');

        user.emailValidated = true;
        await user.save();

        return true;
    }


}