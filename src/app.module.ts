import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { LoggerMiddleware } from './logger/logger.middleware'
import { TypeOrmModule } from '@nestjs/typeorm'
@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        UsersModule,
        ProductsModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '7482353',
            database: 'postgres',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true
        })
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*')
    }
}
