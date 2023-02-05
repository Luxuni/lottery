import { DatePicker, Toast } from 'antd-mobile'
import moment from 'moment'
import Link from 'next/link'
import { ReactElement, startTransition, useState } from 'react'
import { useImmer } from 'use-immer'
import { useHandleObjectData } from '../../src/app/hooks'
import MyInput from '../../src/components/MyInput'
import LoginLayout from '../../src/layout/login-layout'
import { NextPageWithLayout } from '../_app'

const SignPage: NextPageWithLayout = () => {
  const now = new Date()

  const [data, setData] = useImmer({
    account: '',
    password: '',
    email: '',
    sex: true,
    birthday: now,
  })

  const [pa, setPa] = useState('')

  const handleData = useHandleObjectData(setData)

  const [visible, setVisible] = useState(false)

  return (
    <div className="card w-96 glass animated fadeInUp">
      <figure>
        <h1 className="h-28 text-3xl font-black flex items-center">欢迎加入</h1>
      </figure>
      <div className="card-body h-[40rem] pt-0">
        <div className="form-control h-full justify-around">
          <MyInput
            rules={[{ required: data.account !== '', message: '请输入账号！' }]}
            labelName="账号"
            placeholder="请输入账号"
            onChange={(e) => {
              startTransition(() => {
                handleData('account', e.target.value)
              })
            }}
          />
          <MyInput
            rules={[
              { required: data.password === pa, message: '两次输入密码不一致！' },
              { required: data.password !== '', message: '请输入密码' },
            ]}
            labelName="密码"
            placeholder="请输入密码"
            onChange={(e) => {
              startTransition(() => {
                handleData('password', e.target.value)
              })
            }}
          />
          <MyInput
            rules={[
              { required: data.password === pa, message: '两次输入密码不一致！' },
              { required: data.password !== '', message: '请输入密码' },
            ]}
            labelName="确认密码"
            placeholder="请确认密码"
            onChange={(e) => {
              startTransition(() => {
                setPa(e.target.value)
              })
            }}
          />
          <MyInput
            rules={[{ required: data.email !== '', message: '请输入邮箱！' }]}
            labelName="邮箱"
            placeholder="请输入邮箱"
            onChange={(e) => {
              startTransition(() => {
                handleData('email', e.target.value)
              })
            }}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <span>男</span>
              <input
                type="checkbox"
                className="toggle toggle-secondary mr-2 ml-2"
                onClick={() => {
                  startTransition(() => {
                    handleData('sex', !data.sex)
                  })
                }}
              />
              <span>女</span>
            </div>
            <div>
              <button
                className="btn btn-sm btn-active btn-secondary mr-2 "
                onClick={() => {
                  startTransition(() => {
                    setVisible(true)
                  })
                }}>
                生日
              </button>
              <DatePicker
                visible={visible}
                onClose={() => {
                  setVisible(false)
                }}
                defaultValue={data.birthday}
                max={data.birthday}
                onConfirm={(val) => {
                  startTransition(() => {
                    handleData('birthday', val)
                  })
                }}>
                {(value) => moment(value).format('YYYY-MM-DD')}
              </DatePicker>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              已有账号？<Link href={'/login'}>立即登陆</Link>
            </div>
            <button
              className="text-white btn btn-active btn-secondary w-24 text-theme-text"
              onClick={async () => {
                let key: keyof typeof data
                for (key in data) {
                  if (data[key] === '') return Toast.show({ content: '请填写完整信息！' })
                }
                console.log(data)
              }}>
              注册
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

SignPage.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>
}

export default SignPage
