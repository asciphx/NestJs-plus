import { HttpException, Inject, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , ObjectID} from 'typeorm';

import { CryptoUtil } from '../../common/utils/crypto.util';
import { AdminUsers } from './admin_users.entity';
import { AdminUsersController } from './admin_users.controller';

@Injectable()
export class AdminUsersService implements OnModuleInit {
    async onModuleInit() {
        if (await this.findOneByAccount('admin')) return;
        // 初始化系统管理员
        const admin = this.userRepo.create({
            account: 'admin',
            password: this.cryptoUtil.encryptPassword('111111'),
            name: '系统管理员',
            role: 'admin'
        });
        await this.userRepo.save(admin);
    }

    constructor(
        @InjectRepository(AdminUsers) private readonly userRepo: Repository<AdminUsers>,
        @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil
    ) { }

    /**
     * 用户登录
     *
     * @param account 登录账号
     * @param password 登录密码
     */
    async login(account: string, password: string): Promise<void> {
        const user = await this.findOneByAccount(account);
        if (!user) throw new HttpException('登录账号有误', 406);
        if (!this.cryptoUtil.checkPassword(password, user.password)) throw new HttpException('登录密码有误', 406);
    }

    /**
     * 用户注册
     *
     * @param user 用户信息
     */
    async register(user: AdminUsers): Promise<void> {
        const existing = await this.findOneByAccount(user.account);
        if (existing) throw new HttpException('账号已存在', 409);
        user.password = this.cryptoUtil.encryptPassword(user.password);
        await this.userRepo.save(this.userRepo.create(user));
    }

    /**
     * 删除用户
     *
     * @param _id 用户ID
     */
    async remove(_id: ObjectID): Promise<void> {
        const existing = await this.userRepo.findOne(_id);
        new Logger('EasyPost').log(existing);
        if (!existing) throw new HttpException(`删除失败，ID 为 '${_id}' 的用户不存在`, 404);
        await this.userRepo.remove(existing);
    }

    /**
     * 更新用户
     *
     * @param _id 用户ID
     * @param updateInput updateInput
     */
    async update(_id: ObjectID, updateInput: AdminUsers) {
        const existing = await this.userRepo.findOne(_id);
        if (!existing) throw new HttpException(`更新失败，ID 为 '${_id}' 的用户不存在`, 404);
        if (updateInput.account) existing.account = updateInput.account;
        if (updateInput.password) existing.password = this.cryptoUtil.encryptPassword(updateInput.password);
        if (updateInput.name) existing.name = updateInput.name;
        await this.userRepo.save(existing);
    }

    /**
     * 通过登录账号查询用户
     *
     * @param account 登录账号
     */
    async findOneByAccount(account: string): Promise<AdminUsers> {
        return await this.userRepo.findOne({ account });
    }

    /**
     * 查询用户及其帖子的信息
     *
     * @param _id 用户ID
     */
    async findOneById(_id: ObjectID): Promise<AdminUsers> {
        return await this.userRepo.findOne(_id);
    }

    /**
     * 查询所有用户
     */
    async findAll(): Promise<AdminUsers[]> {
        return await this.userRepo.find();
    }
}