import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { LoggerMiddleware } from './logger/logger.middleware'
import { TypeOrmModule } from '@nestjs/typeorm'
import Users from './entities/user.entity'
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '7482353',
            database: 'postgres',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true
        }),
        TypeOrmModule.forFeature([Users]),
        UsersModule,
        ProductsModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*')
    }
}
