import { Column, Entity, OneToMany, ObjectID, ObjectIdColumn } from 'typeorm';

import { Post } from '../post/post.entity';

@Entity('user')
export class User {
    @ObjectIdColumn() id: ObjectID;
    @Column()account: string;
    @Column()password: string;
    @Column()name: string;
    @OneToMany(type => Post, post => post.user)posts: Post[];
    @Column()role: string;
}