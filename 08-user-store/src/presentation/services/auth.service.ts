import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";


export class AuthService {
    constructor() { }

    public async registerUser(registerUserDto: RegisterUserDto) {
        const existsUser = await UserModel.findOne({ email: registerUserDto.email });

        if (existsUser) throw CustomError.badRequest('Email already exists');

        try {
            const user = new UserModel(registerUserDto);

            // encriptar contraseña
            user.password = bcryptAdapter.hash(registerUserDto.password);

            // jwt 

            // email de confirmación

            await user.save();

            const { password, ...userEntity } = UserEntity.fromObject(user);
            return { userEntity, token: 'ABC' }
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

        return { user: userEntity, token:  }


    }

}