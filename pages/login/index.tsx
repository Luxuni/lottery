import { Toast } from 'antd-mobile'
import Link from 'next/link'
import { ReactElement } from 'react'
import { useImmer } from 'use-immer'
import { useHandleObjectData } from '../../src/app/hooks'
import MyInput from '../../src/components/MyInput'
import LoginLayout from '../../src/layout/login-layout'
import { NextPageWithLayout } from '../_app'

const LoginPage: NextPageWithLayout = () => {
  const [data, setData] = useImmer({
    account: '',
    password: '',
  })

  const handleData = useHandleObjectData<typeof data>(setData)

  return (
    <div className="card w-96 glass animated fadeInUp">
      <figure>
        <h1 className="h-28 text-3xl font-black flex items-center">欢迎登陆</h1>
      </figure>
      <div className="card-body h-72 pt-0">
        <div className="form-control h-full justify-around">
          <MyInput
            rules={[{ required: data.account !== '', message: '请输入账号！' }]}
            labelName="账号"
            placeholder="请输入账号"
            onChange={(e) => {
              handleData('account', e.target.value)
            }}
          />
          <MyInput
            rules={[{ required: data.password !== '', message: '请输入密码' }]}
            labelName="密码"
            placeholder="请输入密码"
            onChange={(e) => {
              handleData('password', e.target.value)
            }}
          />
          <div className="flex items-center justify-between">
            <div>
              还没有账号？<Link href={'/sign'}>立即注册</Link>
            </div>
            <button
              className="btn btn-active btn-secondary w-24 text-theme-text"
              onClick={() => {
                let key: keyof typeof data
                for (key in data) {
                  if (data[key] === '') return Toast.show({ content: '请填写账号和密码！' })
                }
                console.log(data)
              }}>
              登陆
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>
}

export default LoginPage
