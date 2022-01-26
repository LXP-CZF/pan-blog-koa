import Koa, { ParameterizedContext } from 'Koa'
import composeMiddleware from './src/middleware/index'
import { notFound } from './src/utils/httpStatus'
import { verifyTokenByUrl } from './src/utils/token'
const log4j = require('./src/utils/log4js/log4js')
    
const app = new Koa({proxy: true})

// app.use(async (ctx: ParameterizedContext, next) => {
//     verifyTokenByUrl(ctx, next)
// })
app.use(composeMiddleware) // 引用中间件
app.use(async (ctx: ParameterizedContext, next) => {
    log4j.info(`get: ${ JSON.stringify(ctx.request.query) }`)         // 监听get请求
    log4j.info(`params: ${ JSON.stringify(ctx.request.body) }`)       // 监听post请求
    const start = Date.now()
    await next()
    const ms = Date.now()- start
    ctx.set('X-Response-Time', `${ms}ms`)
})

// error-handling 错误处理
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
    ctx.type = 'json'
      ctx.body = {
         message : err.message
      }
});
// logger
app.use(async (ctx, next) => {
    try {
        await next();
        if(!ctx.body) {
            ctx.status = 404
            ctx.body = notFound(ctx)
        }
        verifyTokenByUrl(ctx, next)
    } catch (error) {
        ctx.status = 500
        ctx.body = "server error"
    }
})


app.listen(3009)
console.log('开启了')