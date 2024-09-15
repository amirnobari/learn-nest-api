// products.module.ts
import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { UsersModule } from '../users/users.module' // اصلاح مسیر در صورت نیاز

@Module({
    imports: [UsersModule], // وارد کردن UsersModule برای دسترسی به UsersService
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}
