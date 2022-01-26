import { ParameterizedContext } from 'koa'
import Router from 'koa-router'
import User, { userType } from '../db/usersModel'
import { success, serverError, badRequest } from '../utils/httpStatus'
import { codeEnum } from '../types/codeEnum'
import { pageParamType } from '../types/pageParam'
import { dataPageType } from '../types/responseType'
import { createToken } from '../utils/token'

const router = new Router()

router.prefix('/users')

router.post('/login', async (ctx: ParameterizedContext) => {
  const postParam: userType = ctx.request.body //获取post提交的数据
  await User.find(postParam).then(res => {
    if (res.length === 0) {   // 数据库中没有匹配到用户
      ctx.status = codeEnum.SERVER_ERROR
      ctx.body = serverError(ctx, '用户名或密码错误')
    } else {
      const token = createToken(postParam)
      let res = { ...postParam }
      res.token = token
      ctx.status = codeEnum.SUCCESS
      ctx.body = success(ctx, res)
    }
  })
})

/**
 * @username 用户名
 * @alias 别名
 * @email 邮箱
 * @password 密码
 * @gender 性别 // 0-保密，1-男，2-女
 */
router.post('/createUser', async (ctx: ParameterizedContext) => {
  const postParam: userType = ctx.request.body //获取post提交的数据
  const result = await User.findOne({ username: postParam.username })
  if (result) {
    ctx.status = codeEnum.SERVER_ERROR
    ctx.body = serverError(ctx, '该用户已存在')
    // ctx.body = JSON.stringify(ctx)
    return
  }
  await User.create(postParam)
    .then((res) => {
      ctx.status = codeEnum.SUCCESS
      ctx.body = success(ctx, res)
    })
    .catch((err) => {
      if (err.name == 'ValidationError') {
        ctx.status = codeEnum.BAD_REQUEST
        ctx.body = badRequest(err.message)
      } else {
        ctx.status = codeEnum.SERVER_ERROR
        ctx.body = serverError(ctx,err)
      }
    })
})

router.post('/updateUser', async (ctx: ParameterizedContext) => {
  const param: userType = ctx.request.body
  await User.findOneAndUpdate(
    { _id: param._id }, // 查询条件
    param, // 更新内容
    { new: true } // 返回更新的数据
  )
    .then((res) => {
      ctx.status = codeEnum.SUCCESS
      ctx.body = success(ctx, res)
    })
    .catch((err) => {
      if (err.name == 'ValidationError') {
        ctx.status = codeEnum.BAD_REQUEST
        ctx.body = badRequest(err.message)
      } else {
        ctx.status = codeEnum.SERVER_ERROR
        ctx.body = serverError(ctx,err)
      }
    })
})

router.get('/deleteUser/:id', async (ctx: ParameterizedContext) => {
  await User.deleteOne({ _id: ctx.params.id })
    .then((res) => {
      ctx.status = codeEnum.SUCCESS
      ctx.body = success(ctx, res)
    })
    .catch((err) => {
      ctx.status = codeEnum.SERVER_ERROR
      ctx.body = serverError(ctx,err)
    })
})

router.post('/pageFindUser', async (ctx: ParameterizedContext) => {
  const param: pageParamType = ctx.request.body
  const { pageCurrent, pageSize } = param.page
  const allData = await User.find()
  await User.find(param.condition)
    .skip((pageCurrent - 1) * pageSize)
    .limit(pageSize)
    .sort({ updatedAt: -1 })
    .exec()
    .then((res) => {
      const data: dataPageType = {
        data: res,
        pageCurrent: pageCurrent,
        pageSize: pageSize,
        total: allData.length
      }
      ctx.status = codeEnum.SUCCESS
      ctx.body = success(ctx, data)
    })
    .catch((err) => {
      ctx.status = codeEnum.SERVER_ERROR
      ctx.body = serverError(ctx, err)
    })
})
export default router
