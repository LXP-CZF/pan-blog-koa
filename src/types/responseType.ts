
import { codeEnum } from '../types/codeEnum'
export interface resType<T = any>{
    data: T | null,
    code: codeEnum,
    message: string
}

export type dataPageType<T = any> = {
    data: T | null,
    pageCurrent: number,
    pageSize: number,
    total: number,
}