import { mount } from 'enzyme'
import React from 'react'

import CodePreviewer from '../src'

jest.mock('copy-to-clipboard', () => () => jest.fn())

jest.useFakeTimers()

function renderFactory(lang: string, code: string) {
  const wrapper = mount(<CodePreviewer title="test" lang={lang} code={code} />)
  // title
  expect(wrapper.find('.or-code-previewer-title').text().includes('test')).toBeTruthy()
  // code content
  const $code = wrapper.find('.or-code-previewer pre code')
  expect($code.hasClass(lang)).toBeTruthy()
  expect($code.text().includes(code)).toBeTruthy()
  // copy btn
  const $copyBtn = wrapper.find('.copy-btn')
  expect($copyBtn.length).toBe(1)
  expect(wrapper.find('.copy-btn-text').length).toBe(1)
  expect(wrapper.find('.copy-btn-text').hasClass('copy-btn-copied')).toBeFalsy()
  $copyBtn.simulate('click')
  expect(wrapper.find('.copy-btn-text').hasClass('copy-btn-copied')).toBeTruthy()
  jest.runAllTimers()
  // expect(wrapper.find('.copy-btn-text').hasClass('copy-btn-copied')).toBeFalsy()
  expect(setTimeout).toHaveBeenCalled()
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000)
}

describe('src/index', () => {
  it('should render properly: jsx', () => {
    const code = `<Component title="hello world" />`
    renderFactory('jsx', code)
  })

  it('should render properly: html', () => {
    renderFactory('html', `
      <html>
        <head>
        <title>123</title>
        </head>
        <body></body>
      </html>
    `)
  })
})
