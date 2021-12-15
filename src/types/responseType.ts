export interface resType<T = any>{
    data: T | null,
    code: number,
    message: string
}

export type dataPageType<T = any> = {
    data: T | null,
    pageCurrent: number,
    pageSize: number,
    total: number,
}