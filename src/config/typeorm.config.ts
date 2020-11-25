import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'taskmanagement',
    entities: [User],
    autoLoadEntities: true,
    synchronize: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}