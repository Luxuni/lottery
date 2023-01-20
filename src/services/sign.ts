import { AxiosPromise } from 'axios'
import request from './request'
type signParamsType = {
  account: string
  password: string
  email: string
  sex: boolean
  birthday: Date
}

type signType = {
  code: number
  token: string
}

export const sign = (params: signParamsType): AxiosPromise<signType> => {
  return request({
    url: 'int/user/register',
    method: 'post',
    data: params,
  })
}
