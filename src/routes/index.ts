import Router from "koa-router"
import { ParameterizedContext } from 'koa'
import users from './users'

const router = new Router()

router.get('/', async (ctx: ParameterizedContext, next) => {
    await next()
    ctx.body = "hello, 大可爱！"
})
router.use(users.routes(), users.allowedMethods())

export default router