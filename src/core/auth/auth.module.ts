import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../../feature/users/users.module';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
    imports: [
        JwtModule.register({    // 向 nest 容器注册 jwt 模块，并配置密钥和令牌有效期
            privateKey: 'secretKey',
            signOptions: {
                expiresIn: 3600
            }
        }),
        forwardRef(() => UsersModule)    // 处理模块间的循环依赖
    ],
    providers: [AuthService, AuthStrategy],
    exports: [AuthService]  // 导出 AuthServie 供 UserModule 使用
})
export class AuthModule { }