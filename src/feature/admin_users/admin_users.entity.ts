import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';


@Entity('admin_users')
export class AdminUsers {
    @ObjectIdColumn()
    id: ObjectID;
    @Column()
    account: string;
    @Column()
    password: string;
    @Column()
    name: string;
    @Column()
    role: string;
}