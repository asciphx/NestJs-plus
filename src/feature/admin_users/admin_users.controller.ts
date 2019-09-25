import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '../../common/decorators/roles.decorator';
import { Result } from '../../common/interfaces/result.interface';
import { AuthService } from '../../core/auth/auth.service';
import { RolesGuard } from '../../core/guards/roles.guard';
import { AdminUsers } from './admin_users.entity';
import { AdminUsersService } from './admin_users.service';
import { ObjectID } from 'typeorm';

@Controller('admin_user')
export class AdminUsersController {
    constructor(
        @Inject(AuthService) private readonly authService: AuthService,
        @Inject(AdminUsersService) private readonly userService: AdminUsersService
    ) { }
    @Post('login')
    async login(@Body() body: { account: string, password: string }): Promise<Result> {
        await this.userService.login(body.account, body.password);
        const accessToken = await this.authService.createToken({ account: body.account });
        return { code: 200, message: '登录成功', data: accessToken };
    }

    @Post('register')
    async register(@Body() user: AdminUsers): Promise<Result> {
        await this.userService.register(user);
        return { code: 200, message: '注册成功' };
    }

    @Get(':id')
    @Roles('admin')
    async findOne(@Param()  param: { id: ObjectID }): Promise<Result> {
        const data = await this.userService.findOneById(param.id);
        return { code: 200, message: '查询用户成功', data };
    }

    @Delete(':id')
    @Roles('admin')
    @UseGuards(AuthGuard(), RolesGuard)
    async remove(@Param() param: { id: ObjectID }): Promise<Result> {
        await this.userService.remove(param.id);
        return { code: 200, message: '删除用户成功' };
    }

    @Put(':id')
    @Roles('admin')
    @UseGuards(AuthGuard(), RolesGuard)
    async update(@Param() param: { id: ObjectID }, updateInput: AdminUsers): Promise<Result> {
        await this.userService.update(param.id, updateInput);
        return { code: 200, message: '更新用户成功' };
    }


    @Get()
    @Roles('admin')
    @UseGuards(AuthGuard(), RolesGuard)
    async findAll(): Promise<Result> {
        const data = await this.userService.findAll();
        return { code: 200, message: '查询所有用户成功', data };
    }
}