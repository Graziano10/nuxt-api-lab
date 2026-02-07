import {
  e as H,
  F as V,
  G as q,
  H as I,
  i as U,
  E as S,
  I as W,
  q as w,
  J as j,
  K as z,
  r as G,
  L as M,
  M as x,
  N as J,
  m as N,
  O as A,
  y as Q,
  P as T
} from './DxL2kCLK.js'
const X = { trailing: !0 }
function Y(a, e = 25, i = {}) {
  if (((i = { ...X, ...i }), !Number.isFinite(e)))
    throw new TypeError('Expected `wait` to be a finite number')
  let o,
    n,
    D = [],
    r,
    t
  const h = (f, v) => (
      (r = Z(a, f, v)),
      r.finally(() => {
        if (((r = null), i.trailing && t && !n)) {
          const m = h(f, t)
          return ((t = null), m)
        }
      }),
      r
    ),
    b = function (...f) {
      return (
        i.trailing && (t = f),
        r ||
          new Promise(v => {
            const m = !n && i.leading
            ;(clearTimeout(n),
              (n = setTimeout(() => {
                n = null
                const c = i.leading ? o : h(this, f)
                t = null
                for (const d of D) d(c)
                D = []
              }, e)),
              m ? ((o = h(this, f)), v(o)) : D.push(v))
          })
      )
    },
    s = f => {
      f && (clearTimeout(f), (n = null))
    }
  return (
    (b.isPending = () => !!n),
    (b.cancel = () => {
      ;(s(n), (D = []), (t = null))
    }),
    (b.flush = () => {
      if ((s(n), !t || r)) return
      const f = t
      return ((t = null), h(this, f))
    }),
    b
  )
}
async function Z(a, e, i) {
  return await a.apply(e, i)
}
const $ = Symbol.for('nuxt:client-only')
function na(...a) {
  const e = typeof a[a.length - 1] == 'string' ? a.pop() : void 0
  K(a[0], a[1]) && a.unshift(e)
  let [i, o, n = {}] = a,
    D = !1
  const r = w(() => Q(i))
  if (typeof r.value != 'string') throw new TypeError('[nuxt] [useAsyncData] key must be a string.')
  if (typeof o != 'function')
    throw new TypeError('[nuxt] [useAsyncData] handler must be a function.')
  const t = H()
  ;((n.server ??= !0),
    (n.default ??= aa),
    (n.getCachedData ??= B),
    (n.lazy ??= !1),
    (n.immediate ??= !0),
    (n.deep ??= V.deep),
    (n.dedupe ??= 'cancel'),
    n._functionName,
    t._asyncData[r.value])
  function h() {
    const c = { cause: 'initial', dedupe: n.dedupe }
    return (
      t._asyncData[r.value]?._init ||
        ((c.cachedData = n.getCachedData(r.value, t, { cause: 'initial' })),
        (t._asyncData[r.value] = F(t, r.value, o, n, c.cachedData))),
      () => t._asyncData[r.value].execute(c)
    )
  }
  const b = h(),
    s = t._asyncData[r.value]
  s._deps++
  const f = n.server !== !1 && t.payload.serverRendered
  {
    let c = function (u) {
      const l = t._asyncData[u]
      l?._deps && (l._deps--, l._deps === 0 && l?._off())
    }
    const d = j()
    if ((d && f && n.immediate && !d.sp && (d.sp = []), d && !d._nuxtOnBeforeMountCbs)) {
      d._nuxtOnBeforeMountCbs = []
      const u = d._nuxtOnBeforeMountCbs
      ;(q(() => {
        ;(u.forEach(l => {
          l()
        }),
          u.splice(0, u.length))
      }),
        I(() => u.splice(0, u.length)))
    }
    const C = d && (d._nuxtClientOnly || U($, !1))
    f && t.isHydrating && (s.error.value || s.data.value !== void 0)
      ? (s.status.value = s.error.value ? 'error' : 'success')
      : d && ((!C && t.payload.serverRendered && t.isHydrating) || n.lazy) && n.immediate
        ? d._nuxtOnBeforeMountCbs.push(b)
        : n.immediate && s.status.value !== 'success' && b()
    const _ = z(),
      y = S(
        r,
        (u, l) => {
          if ((u || l) && u !== l) {
            D = !0
            const O = t._asyncData[l]?.data.value !== void 0,
              L = t._asyncDataPromises[l] !== void 0,
              p = { cause: 'initial', dedupe: n.dedupe }
            if (!t._asyncData[u]?._init) {
              let E
              ;(l && O
                ? (E = t._asyncData[l].data.value)
                : ((E = n.getCachedData(u, t, { cause: 'initial' })), (p.cachedData = E)),
                (t._asyncData[u] = F(t, u, o, n, E)))
            }
            ;(t._asyncData[u]._deps++,
              l && c(l),
              (n.immediate || O || L) && t._asyncData[u].execute(p),
              T(() => {
                D = !1
              }))
          }
        },
        { flush: 'sync' }
      ),
      g = n.watch
        ? S(n.watch, () => {
            D ||
              (t._asyncData[r.value]?._execute.isPending() &&
                T(() => {
                  t._asyncData[r.value]?._execute.flush()
                }),
              t._asyncData[r.value]?._execute({ cause: 'watch', dedupe: n.dedupe }))
          })
        : () => {}
    _ &&
      W(() => {
        ;(y(), g(), c(r.value))
      })
  }
  const v = {
      data: P(() => t._asyncData[r.value]?.data),
      pending: P(() => t._asyncData[r.value]?.pending),
      status: P(() => t._asyncData[r.value]?.status),
      error: P(() => t._asyncData[r.value]?.error),
      refresh: (...c) =>
        t._asyncData[r.value]?._init ? t._asyncData[r.value].execute(...c) : h()(),
      execute: (...c) => v.refresh(...c),
      clear: () => {
        const c = t._asyncData[r.value]
        if (c?._abortController)
          try {
            c._abortController.abort(new DOMException('AsyncData aborted by user.', 'AbortError'))
          } finally {
            c._abortController = void 0
          }
        R(t, r.value)
      }
    },
    m = Promise.resolve(t._asyncDataPromises[r.value]).then(() => v)
  return (Object.assign(m, v), m)
}
function P(a) {
  return w({
    get() {
      return a()?.value
    },
    set(e) {
      const i = a()
      i && (i.value = e)
    }
  })
}
function K(a, e) {
  return !(
    typeof a == 'string' ||
    (typeof a == 'object' && a !== null) ||
    (typeof a == 'function' && typeof e == 'function')
  )
}
function R(a, e) {
  ;(e in a.payload.data && (a.payload.data[e] = void 0),
    e in a.payload._errors && (a.payload._errors[e] = void 0),
    a._asyncData[e] &&
      ((a._asyncData[e].data.value = N(a._asyncData[e]._default())),
      (a._asyncData[e].error.value = void 0),
      (a._asyncData[e].status.value = 'idle')),
    e in a._asyncDataPromises && (a._asyncDataPromises[e] = void 0))
}
function k(a, e) {
  const i = {}
  for (const o of e) i[o] = a[o]
  return i
}
function F(a, e, i, o, n) {
  a.payload._errors[e] ??= void 0
  const D = o.getCachedData !== B,
    r = i,
    t = o.deep ? G : M,
    h = n !== void 0,
    b = a.hook('app:data:refresh', async f => {
      ;(!f || f.includes(e)) && (await s.execute({ cause: 'refresh:hook' }))
    }),
    s = {
      data: t(h ? n : o.default()),
      pending: w(() => s.status.value === 'pending'),
      error: A(a.payload._errors, e),
      status: M('idle'),
      execute: (...f) => {
        const [v, m = void 0] = f,
          c = v && m === void 0 && typeof v == 'object' ? v : {}
        if (a._asyncDataPromises[e] && (c.dedupe ?? o.dedupe) === 'defer')
          return a._asyncDataPromises[e]
        {
          const _ =
            'cachedData' in c
              ? c.cachedData
              : o.getCachedData(e, a, { cause: c.cause ?? 'refresh:manual' })
          if (_ !== void 0)
            return (
              (a.payload.data[e] = s.data.value = _),
              (s.error.value = void 0),
              (s.status.value = 'success'),
              Promise.resolve(_)
            )
        }
        ;(s._abortController &&
          s._abortController.abort(
            new DOMException('AsyncData request cancelled by deduplication', 'AbortError')
          ),
          (s._abortController = new AbortController()),
          (s.status.value = 'pending'))
        const d = new AbortController(),
          C = new Promise((_, y) => {
            try {
              const g = c.timeout ?? o.timeout,
                u = ea([s._abortController?.signal, c?.signal], d.signal, g)
              if (u.aborted) {
                const l = u.reason
                y(l instanceof Error ? l : new DOMException(String(l ?? 'Aborted'), 'AbortError'))
                return
              }
              return (
                u.addEventListener(
                  'abort',
                  () => {
                    const l = u.reason
                    y(
                      l instanceof Error
                        ? l
                        : new DOMException(String(l ?? 'Aborted'), 'AbortError')
                    )
                  },
                  { once: !0, signal: d.signal }
                ),
                Promise.resolve(r(a, { signal: u })).then(_, y)
              )
            } catch (g) {
              y(g)
            }
          })
            .then(async _ => {
              let y = _
              ;(o.transform && (y = await o.transform(_)),
                o.pick && (y = k(y, o.pick)),
                (a.payload.data[e] = y),
                (s.data.value = y),
                (s.error.value = void 0),
                (s.status.value = 'success'))
            })
            .catch(_ => {
              if (
                (a._asyncDataPromises[e] && a._asyncDataPromises[e] !== C) ||
                s._abortController?.signal.aborted
              )
                return a._asyncDataPromises[e]
              if (typeof DOMException < 'u' && _ instanceof DOMException && _.name === 'AbortError')
                return ((s.status.value = 'idle'), a._asyncDataPromises[e])
              ;((s.error.value = J(_)), (s.data.value = N(o.default())), (s.status.value = 'error'))
            })
            .finally(() => {
              ;(d.abort(), delete a._asyncDataPromises[e])
            })
        return ((a._asyncDataPromises[e] = C), a._asyncDataPromises[e])
      },
      _execute: Y((...f) => s.execute(...f), 0, { leading: !0 }),
      _default: o.default,
      _deps: 0,
      _init: !0,
      _hash: void 0,
      _off: () => {
        ;(b(),
          a._asyncData[e]?._init && (a._asyncData[e]._init = !1),
          D ||
            x(() => {
              a._asyncData[e]?._init || (R(a, e), (s.execute = () => Promise.resolve()))
            }))
      }
    }
  return s
}
const aa = () => {},
  B = (a, e, i) => {
    if (e.isHydrating) return e.payload.data[a]
    if (i.cause !== 'refresh:manual' && i.cause !== 'refresh:hook') return e.static.data[a]
  }
function ea(a, e, i) {
  const o = a.filter(r => !!r)
  if (typeof i == 'number' && i >= 0) {
    const r = AbortSignal.timeout?.(i)
    r && o.push(r)
  }
  if (AbortSignal.any) return AbortSignal.any(o)
  const n = new AbortController()
  for (const r of o)
    if (r.aborted) {
      const t = r.reason ?? new DOMException('Aborted', 'AbortError')
      try {
        n.abort(t)
      } catch {
        n.abort()
      }
      return n.signal
    }
  const D = () => {
    const t = o.find(h => h.aborted)?.reason ?? new DOMException('Aborted', 'AbortError')
    try {
      n.abort(t)
    } catch {
      n.abort()
    }
  }
  for (const r of o) r.addEventListener?.('abort', D, { once: !0, signal: e })
  return n.signal
}
export { na as u }
