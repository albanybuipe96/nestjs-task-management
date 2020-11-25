import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import * as config from 'config'

const dbConfig = config.get('db')

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [User],
    autoLoadEntities: true,
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}