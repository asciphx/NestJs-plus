import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '../../common/common.module';
import { AuthModule } from '../../core/auth/auth.module';
import { AdminUsersController } from './admin_users.controller';
import { AdminUsers } from './admin_users.entity';
import { AdminUsersService } from './admin_users.service';

@Module({
    imports: [
        // 向用户模块注册 passport，并配置默认策略为 jwt，因为覆盖了默认的策略，所以要在每个使用 @AuthGuard() 的模块导入 PassportModule
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([AdminUsers]),
        forwardRef(() => AuthModule),   // 处理模块间的循环依赖
        CommonModule
    ],
    providers: [AdminUsersService],
    controllers: [AdminUsersController],
    exports: [AdminUsersService]
})
export class AdminUsersModule { }