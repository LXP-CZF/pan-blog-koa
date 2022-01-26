import { ParameterizedContext } from 'koa'
import log4j from 'log4js'
const levels = {
  trace: log4j.levels.TRACE,
  debug: log4j.levels.DEBUG,
  info: log4j.levels.INFO,
  warn: log4j.levels.WARN,
  error: log4j.levels.ERROR,
  fatal: log4j.levels.FATAL
}

// log4j配置
log4j.configure({
  //日志格式等设置
  appenders: {
    console: { type: 'console' },
    info: {
      type: 'file',
      filename: 'logs/all-logs.log'
    },
    error: {
      type: 'dateFile',
      filename: 'logs/error/log',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true // 设置文件名称为 filename + pattern
    },
    debug: {
      type: 'dateFile',
      filename: 'logs/debug/log',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true // 设置文件名称为 filename + pattern
    }
  },
  categories: {
    default: {
      appenders: ['debug', 'console'],
      level: 'debug'
    },
    info: {
      appenders: ['info', 'console'],
      level: 'info'
    },
    error: {
      appenders: ['error', 'console'],
      level: 'error'
    }
  }
})

const formatText = (req: ParameterizedContext, content: string) => {
  const start = Date.now()
  const method = req.request.method
  let logText = `[${req.request.ip}][${req.request.url}][${method}][${req.response.status}]\n[${content}]`
  //请求参数
  if (method === 'GET') {
    logText += '请求参数:' + JSON.stringify(req.request.query) + ','
  } else {
    logText += '请求参数: '+ JSON.stringify(req.request.body) + ','
  }
  //服务器响应时间
  const resTime = Date.now() - start
  logText += '服务器响应时间: ' + resTime + 'ms'
  return logText
}

/**
 * 日志输出 level为bug
 * @param { string } content
 * @param { ParameterizedContext } ctx
 */
exports.debug = (ctx: ParameterizedContext, content: string) => {
  let logger = log4j.getLogger('debug')
  logger.level = levels.debug as unknown as string
  const txt = formatText(ctx, content)
  logger.debug(txt)
}

/**
 * 日志输出 level为info
 * @param { string } content
 * @param { ParameterizedContext } ctx
 */
exports.info = (content: string) => {
  let logger = log4j.getLogger('info')
  logger.level = levels.info as unknown as string
  logger.info(content)
}

/**
 * 日志输出 level为error
 * @param { string } content
 * @param { ParameterizedContext } ctx
 */
exports.error = (ctx: ParameterizedContext, content: string) => {
  let logger = log4j.getLogger('error')
  logger.level = levels.error as unknown as string
  logger.error(content)
}
