import {
  g as c,
  o as a,
  c as s,
  s as g,
  C as n,
  a as y,
  d as f,
  q as p,
  t as b,
  p as m
} from './DxL2kCLK.js'
const x = ['type', 'disabled', 'aria-disabled', 'aria-busy'],
  B = { key: 0 },
  h = { key: 1, class: 'flex items-center gap-2' },
  v =
    'inline-flex items-center justify-center gap-2 font-medium rounded-app transition focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed',
  _ = c({
    __name: 'BaseButton',
    props: {
      variant: { default: 'primary' },
      size: { default: 'md' },
      loading: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
      type: { default: 'button' }
    },
    setup(e) {
      const t = e,
        o = p(() => t.disabled || t.loading),
        i = {
          primary: 'bg-primary text-white hover:bg-primary-hover',
          secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
          danger: 'bg-danger text-white hover:bg-red-700'
        },
        r = { sm: 'px-3 py-2 text-sm', md: 'px-4 py-3 text-base', lg: 'px-5 py-3 text-lg' },
        u = p(() => [v, i[t.variant], r[t.size]].join(' '))
      return (l, d) => (
        a(),
        s(
          'button',
          {
            type: t.type,
            class: g(u.value),
            disabled: o.value,
            'aria-disabled': o.value,
            'aria-busy': t.loading
          },
          [
            n(l.$slots, 'icon-left'),
            t.loading
              ? (a(),
                s('span', h, [
                  d[1] ||
                    (d[1] = y(
                      'span',
                      {
                        class:
                          'h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white'
                      },
                      null,
                      -1
                    )),
                  n(l.$slots, 'loading', {}, () => [d[0] || (d[0] = f('Loading', -1))])
                ]))
              : (a(), s('span', B, [n(l.$slots, 'default')])),
            n(l.$slots, 'icon-right')
          ],
          10,
          x
        )
      )
    }
  }),
  I = Object.assign(_, { __name: 'UiBaseButton' }),
  $ = c({
    __name: 'BaseAlert',
    props: { type: { default: 'info' } },
    setup(e) {
      const t = {
        info: 'bg-blue-50 text-blue-700 border-blue-200',
        error: 'bg-red-50 text-red-700 border-red-200'
      }
      return (o, i) => (
        a(),
        s(
          'div',
          { role: 'alert', class: g(['rounded-app border p-3 text-sm', t[e.type]]) },
          [n(o.$slots, 'default')],
          2
        )
      )
    }
  }),
  A = Object.assign($, { __name: 'UiBaseAlert' }),
  w = { class: 'space-y-1' },
  V = { key: 0, class: 'text-sm font-medium text-text-secondary' },
  k = ['value', 'placeholder', 'disabled'],
  j = { key: 1, class: 'text-sm text-danger' },
  z = c({
    __name: 'BaseInput',
    props: { modelValue: {}, label: {}, placeholder: {}, error: {}, disabled: { type: Boolean } },
    emits: ['update:modelValue'],
    setup(e, { emit: t }) {
      const o = t
      return (i, r) => (
        a(),
        s('div', w, [
          e.label ? (a(), s('label', V, b(e.label), 1)) : m('', !0),
          y(
            'input',
            {
              value: e.modelValue,
              placeholder: e.placeholder,
              disabled: e.disabled,
              class:
                'w-full rounded-app border px-4 py-3 text-base bg-surface focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100 disabled:cursor-not-allowed text-text-secondary',
              onInput: r[0] || (r[0] = u => o('update:modelValue', u.target.value))
            },
            null,
            40,
            k
          ),
          e.error ? (a(), s('p', j, b(e.error), 1)) : m('', !0)
        ])
      )
    }
  }),
  N = Object.assign(z, { __name: 'UiBaseInput' })
export { N as B, I as a, A as b }
