import { resType } from '../types/responseType'
import { codeEnum } from '../types/codeEnum'


const success = <T = any>(
  data: T | null = null,
  message: string = '请求成功',
  code: number = codeEnum.SUCCESS
): resType<T> => {
  return {
    data,
    code,
    message
  }
}

const serverError = <T = any>(
  message: string = '请求失败',
  data: T | null = null,
  code: number = codeEnum.SERVER_ERROR
): resType<T> => {
  return {
    data,
    code,
    message
  }
}

const notFound = <T = any>(
  message: string = '资源不存在',
  data: T | null = null,
  code: number = codeEnum.NOT_FOUND
): resType<T> => {
  return {
    data,
    code,
    message
  }
}

const badRequest = <T = any>(
  message: string = '参数错误',
  data: T | null = null,
  code: number = codeEnum.BAD_REQUEST
): resType<T> => {
  return {
    data,
    code,
    message
  }
}

export { success, serverError, notFound, badRequest }
