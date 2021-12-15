import compose from 'koa-compose' // 整合中间件
import json from 'koa-json'
import logger from 'koa-logger' // 输出请求日志
import bodyparser from 'koa-bodyparser' // 解析请求体
import router from '../routes/index'

const composeMiddleware = compose([
    json(),
    logger(),
    bodyparser({
        enableTypes: ['json', 'form', 'text']
    }),
    router.routes()
])

export default composeMiddleware