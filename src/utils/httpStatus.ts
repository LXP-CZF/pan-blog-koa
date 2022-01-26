import { resType } from '../types/responseType'
import { codeEnum } from '../types/codeEnum'
import { ParameterizedContext } from 'koa'
const log4j = require('../utils/log4js/log4js')


const success = <T = any>(
  ctx: ParameterizedContext,
  data: T | null = null,
  message: string = '请求成功',
  code: codeEnum = codeEnum.SUCCESS
): resType<T> => {
  log4j.debug(ctx, message)
  return {
    data,
    code,
    message
  }
}

const serverError = <T = any>(
  ctx: ParameterizedContext,
  message: string = '请求失败',
  data: T | null = null,
  code: codeEnum = codeEnum.SERVER_ERROR
): resType<T> => {
  log4j.debug(ctx, message)
  return {
    data,
    code,
    message
  }
}

const notFound = <T = any>(
  ctx: ParameterizedContext,
  message: string = '资源不存在',
  data: T | null = null,
  code: codeEnum = codeEnum.NOT_FOUND
): resType<T> => {
  log4j.debug(ctx, message)
  return {
    data,
    code,
    message
  }
}

const badRequest = <T = any>(
  ctx: ParameterizedContext,
  message: string = '参数错误',
  data: T | null = null,
  code: codeEnum = codeEnum.BAD_REQUEST
): resType<T> => {
  log4j.debug(ctx, message)
  return {
    data,
    code,
    message
  }
}

const tokenFailure = <T = any>(
  ctx: ParameterizedContext,
  message: string = 'token失效',
  data: T | null = null,
  code: codeEnum = codeEnum.TOKEN_FAILURE
): resType<T> => {
  log4j.debug(ctx, message)
  return {
    data,
    code,
    message
  }
}

export { success, serverError, notFound, badRequest, tokenFailure }
