import Koa, { ParameterizedContext } from 'Koa'
import composeMiddleware from './src/middleware/index'
import { notFound } from './src/utils/httpStatus'
const app = new Koa({proxy: true})

app.use(composeMiddleware) // 引用中间件

app.use(async (ctx: ParameterizedContext, next) => {
    await next()
    const rt = ctx.response.get('X-Response-Time')
    console.log(`${ctx.method} ${ctx.url}-${rt}`)
})

app.use(async (ctx: ParameterizedContext, next) => {
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
app.use(async(ctx, next) => {
    try {
        await next();
        if(!ctx.body) {
            ctx.status = 404
            ctx.body = notFound()
        }
    } catch(e) {
        ctx.status = 500
        ctx.body = "server error"
    }
})


app.listen(3000)
console.log('开启了')