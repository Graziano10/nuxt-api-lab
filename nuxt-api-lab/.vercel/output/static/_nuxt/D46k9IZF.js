import { u as m } from './CnCcucTy.js'
import {
  g as y,
  c as r,
  a as t,
  m as a,
  t as c,
  p as v,
  r as x,
  q as f,
  o as d
} from './DxL2kCLK.js'
function w(e) {
  const {
    data: l,
    pending: n,
    error: i
  } = m(
    `agro-weather-${e.polygonId}-${e.start}-${e.end}`,
    async () =>
      (
        await $fetch('/api/agro/weather', {
          params: { polygon_id: e.polygonId, start: e.start, end: e.end }
        })
      ).data,
    { immediate: !!e.polygonId }
  )
  return { data: l, pending: n, error: i }
}
const b = { class: 'p-8 space-y-6' },
  k = { key: 0, class: 'text-gray-500' },
  D = { key: 1, class: 'text-red-600' },
  I = { key: 2 },
  A = { class: 'grid grid-cols-1 md:grid-cols-3 gap-4' },
  $ = { class: 'p-4 bg-white shadow rounded' },
  B = { class: 'text-2xl font-semibold' },
  C = { class: 'p-4 bg-white shadow rounded' },
  E = { class: 'text-2xl font-semibold' },
  N = { class: 'mt-6 bg-gray-100 p-4 rounded text-xs overflow-auto' },
  L = y({
    __name: 'agriculture',
    setup(e) {
      const l = x('YOUR_POLYGON_ID_HERE'),
        n = Math.floor(Date.now() / 1e3),
        i = n - 10080 * 60,
        { data: o, pending: g, error: u } = w({ polygonId: l.value, start: i, end: n }),
        p = f(() =>
          !o.value || o.value.length === 0
            ? null
            : (o.value.reduce((s, h) => s + h.temp.average, 0) / o.value.length).toFixed(1)
        )
      return (_, s) => (
        d(),
        r('div', b, [
          s[2] ||
            (s[2] = t('h1', { class: 'text-3xl font-bold' }, ' 🌱 Agriculture Dashboard ', -1)),
          a(g)
            ? (d(), r('div', k, ' Loading agro weather data... '))
            : a(u)
              ? (d(), r('div', D, ' Failed to load data '))
              : a(o)
                ? (d(),
                  r('div', I, [
                    t('div', A, [
                      t('div', $, [
                        s[0] ||
                          (s[0] = t(
                            'p',
                            { class: 'text-sm text-gray-500' },
                            'Avg temperature',
                            -1
                          )),
                        t('p', B, c(p.value) + ' °C ', 1)
                      ]),
                      t('div', C, [
                        s[1] || (s[1] = t('p', { class: 'text-sm text-gray-500' }, 'Days', -1)),
                        t('p', E, c(a(o).length), 1)
                      ])
                    ]),
                    t(
                      'pre',
                      N,
                      '' +
                        c(a(o)) +
                        `
      `,
                      1
                    )
                  ]))
                : v('', !0)
        ])
      )
    }
  })
export { L as default }
