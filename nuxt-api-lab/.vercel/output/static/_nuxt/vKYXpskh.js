import { _ as a } from './5G8p0d3B.js'
import { _ as r, o as n, c, a as t, b as _, w as d, d as x, C as l } from './DxL2kCLK.js'
const i = {},
  m = { class: 'min-h-screen bg-gray-950 text-gray-100' },
  p = { class: 'border-b border-gray-800' },
  f = { class: 'max-w-7xl mx-auto px-6 py-4' },
  u = { class: 'max-w-7xl mx-auto px-6 py-8' }
function b(o, e) {
  const s = a
  return (
    n(),
    c('div', m, [
      t('header', p, [
        t('div', f, [
          _(
            s,
            { to: '/', class: 'text-xl font-bold hover:text-primary hover:border-b-2 transition' },
            { default: d(() => [...(e[0] || (e[0] = [x(' Nuxt API Lab ', -1)]))]), _: 1 }
          )
        ])
      ]),
      t('main', u, [l(o.$slots, 'default')])
    ])
  )
}
const N = r(i, [['render', b]])
export { N as default }
