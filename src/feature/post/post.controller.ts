import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { Roles } from '../../common/decorators/roles.decorator';
import { Result } from '../../common/interfaces/result.interface';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Post as PostEntity } from './post.entity';
import { PostService } from './post.service';
import { ObjectID } from 'typeorm';

@Controller('post')
export class PostController {
    constructor(
        @Inject(PostService) private readonly postService: PostService
    ) { }

    @Post()
    @UseGuards(AuthGuard())
    async createPost(@Req() req: Request, @Body() createInput: PostEntity): Promise<Result> {
        createInput.user = req.user;
        await this.postService.create(createInput);
        return { code: 200, message: '创建帖子成功' };
    }

    @Delete(':id')
    @Roles('admin')
    @UseGuards(AuthGuard(), RolesGuard)
    async remove(@Param() param: { id: ObjectID }): Promise<Result> {
        await this.postService.remove(param.id);
        return { code: 200, message: '删除帖子成功' };
    }

    @Put(':id')
    @Roles('admin')
    @UseGuards(AuthGuard(), RolesGuard)
    async update(@Param() param: { id: ObjectID }, @Body() updateInput: PostEntity): Promise<Result> {
        await this.postService.update(param.id, updateInput);
        return { code: 200, message: '更新帖子成功' };
    }

    @Get()
    @UseGuards(AuthGuard())
    async findAll(@Req() req: Request): Promise<Result> {
        const data = await this.postService.findAll(req.user.id);
        return { code: 200, message: '查询所有帖子成功', data };
    }

    @Get(':id')
    async findOne(@Param() param: { id: ObjectID }): Promise<Result> {
        const data = await this.postService.findOneById(param.id);
        return { code: 200, message: '查询帖子成功', data };
    }
}