const jwt = require('jsonwebtoken') // 用于签发、解析 token
const { TOKEN_ENCODE_STR, URL_YES_PASS } = require('../config')
import { ParameterizedContext } from 'koa'
import User from '../../db/usersModel'
import { codeEnum } from '../../types/codeEnum'
import { tokenFailure } from '../httpStatus'

// 生成登录 token
export const create_token = (str: any) => {
  const token = jwt.sign({ str }, TOKEN_ENCODE_STR, {
    expiresIn: 60 * 60
  })
  return token
}
/*
    验证登录 token 是否正确  => 写成中间件
    get 请求与设置的请求不拦截验证，其余均需登录
  */
export const check_token = async (
  ctx: ParameterizedContext,
  next: () => any
) => {
  console.log(ctx.url, ctx.get('Authorization'), '88')
  let url = ctx.url
  // console.log('ctx.url:::', ctx.url);
  if (!URL_YES_PASS.includes(url)) {
    let token = ctx.get('Authorization')
    if (token === '') {
      ctx.status = codeEnum.SUCCESS
      ctx.body = tokenFailure(ctx, '请先登录')
      return
    }
    try {
      // 验证token是否过期
      let { str = '' } = await jwt.verify(token, TOKEN_ENCODE_STR)
      // 验证token与账号是否匹配
      let res = await User.find({ username: str, token })
      if (res.length === 0) {
        ctx.status = codeEnum.SUCCESS
        ctx.body = tokenFailure(ctx, '登录过期，请重新登录')
        return
      }
      // 保存用户的_id
      ctx._id = res[0]._id
    } catch (e) {
      ctx.status = codeEnum.SUCCESS
      ctx.body = tokenFailure(ctx, '登录已过期请重新登录')
      return
    }
  }
  await next()
}
