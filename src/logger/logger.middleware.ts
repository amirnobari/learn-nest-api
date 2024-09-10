import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP')
    use(req: Request, res: Response, next: () => void) {
        const { ip, method, baseUrl } = req
        const userAgent = req.get('user-agent') || ''
        const startAt = process.hrtime()

        res.on('finish', () => {
            const { statusCode } = res
            const contentLength = res.get('content-length')
            const diff = process.hrtime(startAt)
            const responseTime = diff[0] * 1e3 + diff[1] * 1e-6
            this.logger.log(
                `${method} ${baseUrl} ${statusCode} ${contentLength} - ${responseTime.toFixed(3)}ms - ${userAgent} - ${ip}`
            )
        })

        next()
    }
}
