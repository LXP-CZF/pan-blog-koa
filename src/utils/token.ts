import { ParameterizedContext } from "koa"

const jwt = require('jsonwebtoken')
import { tokenFailure } from '../utils/httpStatus'
import { codeEnum } from '../types/codeEnum'
export const secret = 'koa_token' //密匙

export const createToken = (userInfo: any) => {
  const  token =  jwt.sign(userInfo, secret, {
    expiresIn:  60 * 60
    })
  return token
}

export const verifyToken = (token: string) => {
    let info: any = ''
    jwt.verify(token, secret, (_err: any, _data: any) => {
        console.log(_err) //签名通过返回null,签名不通过返回err(JsonWebTokenError: invalid signature)
        console.log(_data) // 通过返回解密数据,失败返回unfinished
        if (_err) {
            switch (_err.name) {
                case 'JsonWebTokenError':
                    info.message = '无效的token'
                    break;
                case 'TokenExpiredError':
                    info.message = 'token过期'
                default:
                    break;
            }
        }
    })
    return info
}

// 当收到请求app.use先截获这个请求并进行token解析，verifyToken返回token解析的结果，
// 返回{tokenOut:true}说明token过期。
export const verifyTokenByUrl = (ctx: ParameterizedContext, next: { (): Promise<any>; (): any }) => {
  const {path, method} = ctx;
  const token = ctx.headers.authorize as string
  console.log(token, 12)
  const pathUnless = [
    '/',
    '/users/login',
    // {
    //   url:'/articles',
    //   methods:['GET']
    // },
    // {
    //   url:/^\/articles\/.*/,
    //   urlReg:true,//url是正则
    //   methods:['GET']},
  ]  //白名单,除了这里写的地址，其他的URL都需要验证token

  //验证请求的地址和方法是否在白名单里
  let credentialsRequired = true;
  pathUnless.forEach((item)=>{
      if(item === path){
        credentialsRequired = false;
      }
    //   if(item.url && item.methods){
    //     //判断url是否正则形式，如果是判断请求的地址是否符合正则
    //     let regPass = item.urlReg && ((new RegExp(item.url)).test(path));
    //     if( ( item.url === path || regPass ) 
    //         && 
    //         item.methods.indexOf(method) > -1
    //     ){
    //       credentialsRequired = false;
    //     }
    //   }
  })
  if(!credentialsRequired){
        //不需要进行验证
        return next();
    } else {
        const data = verifyToken(token)
        if (!data) {
            return next();
        } else {
            ctx.status = codeEnum.TOKEN_FAILURE
            ctx.body = tokenFailure(ctx, data.message)
        }
    }
}