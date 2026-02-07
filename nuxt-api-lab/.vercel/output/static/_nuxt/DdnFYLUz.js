const __vite__mapDeps = (i, m = __vite__mapDeps, d = m.f || (m.f = ['./leaflet.9UJSYqx2.css'])) =>
  i.map(i => d[i])
import {
  g as x,
  j as E,
  k as w,
  o as L,
  c as S,
  l as T,
  a as u,
  b as s,
  m as z,
  w as c,
  d as v,
  n as C,
  t as I,
  p as A,
  r as f,
  q as O
} from './DxL2kCLK.js'
import { B as g, a as _, b as j } from './PMYqsZVC.js'
const q = { class: 'grid grid-cols-1 md:grid-cols-4 gap-2' },
  D = { class: 'relative' },
  P = {
    class: 'absolute top-4 right-4 z-[1000] flex gap-2 rounded-card bg-surface p-2 shadow-card'
  },
  R = x({
    __name: 'MapView.client',
    setup(h) {
      const o = f(''),
        t = f(''),
        i = f(''),
        n = f(null)
      let a,
        d,
        p,
        y = null,
        m
      const M = O(() => !!(o.value.trim() || (t.value.trim() && i.value.trim())))
      E(async () => {
        ;((m = await w(() => import('./CjPBq9Bq.js').then(l => l.l), [], import.meta.url)),
          await w(() => Promise.resolve({}), __vite__mapDeps([0]), import.meta.url),
          (a = m.map('map').setView([45.4642, 9.19], 6)),
          (d = m.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          })),
          (p = m.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            { attribution: 'Tiles © Esri' }
          )),
          d.addTo(a))
      })
      async function N() {
        if (((n.value = null), o.value.trim()))
          try {
            const e = (
              await $fetch('https://nominatim.openstreetmap.org/search', {
                params: { q: o.value, format: 'json', limit: 1 },
                headers: { 'Accept-Language': 'it' }
              })
            )[0]
            if (!e) {
              n.value = 'Nessun risultato trovato'
              return
            }
            const r = Number(e.lat),
              b = Number(e.lon)
            ;((t.value = String(r)), (i.value = String(b)), V(r, b))
            return
          } catch {
            n.value = 'Errore nella ricerca della località'
            return
          }
        if (t.value && i.value) {
          V(Number(t.value), Number(i.value))
          return
        }
        n.value = 'Inserisci una città o coordinate'
      }
      function V(l, e) {
        ;(a.setView([l, e], 12, { animate: !0 }),
          y ? y.setLatLng([l, e]) : (y = m.marker([l, e]).addTo(a)))
      }
      function B() {
        ;(a.hasLayer(p) && a.removeLayer(p), d.addTo(a))
      }
      function k() {
        ;(a.hasLayer(d) && a.removeLayer(d), p.addTo(a))
      }
      return (l, e) => (
        L(),
        S(
          'form',
          { class: 'space-y-4', onSubmit: T(N, ['prevent']) },
          [
            u('div', q, [
              s(
                g,
                {
                  modelValue: o.value,
                  'onUpdate:modelValue': e[0] || (e[0] = r => (o.value = r)),
                  placeholder: 'Città o indirizzo'
                },
                null,
                8,
                ['modelValue']
              ),
              s(
                g,
                {
                  modelValue: t.value,
                  'onUpdate:modelValue': e[1] || (e[1] = r => (t.value = r)),
                  placeholder: 'Latitudine',
                  type: 'number'
                },
                null,
                8,
                ['modelValue']
              ),
              s(
                g,
                {
                  modelValue: i.value,
                  'onUpdate:modelValue': e[2] || (e[2] = r => (i.value = r)),
                  placeholder: 'Longitudine',
                  type: 'number'
                },
                null,
                8,
                ['modelValue']
              ),
              s(
                _,
                { type: 'submit', variant: 'primary', size: 'sm', disabled: !z(M) },
                { default: c(() => [...(e[3] || (e[3] = [v(' Cerca ', -1)]))]), _: 1 },
                8,
                ['disabled']
              )
            ]),
            u('div', D, [
              e[6] ||
                (e[6] = u(
                  'div',
                  { id: 'map', class: 'h-[500px] w-full rounded-card shadow-card' },
                  null,
                  -1
                )),
              u('div', P, [
                s(
                  _,
                  { size: 'sm', variant: 'secondary', onClick: B },
                  { default: c(() => [...(e[4] || (e[4] = [v(' Mappa ', -1)]))]), _: 1 }
                ),
                s(
                  _,
                  { size: 'sm', variant: 'secondary', onClick: k },
                  { default: c(() => [...(e[5] || (e[5] = [v(' Satellite ', -1)]))]), _: 1 }
                )
              ])
            ]),
            n.value
              ? (L(),
                C(j, { key: 0, type: 'error' }, { default: c(() => [v(I(n.value), 1)]), _: 1 }))
              : A('', !0)
          ],
          32
        )
      )
    }
  }),
  U = Object.assign(R, { __name: 'MapView' }),
  $ = { class: 'p-6 space-y-4' },
  F = x({
    __name: 'maps',
    setup(h) {
      return (o, t) => (
        L(),
        S('div', $, [
          t[0] || (t[0] = u('h1', { class: 'text-3xl font-bold' }, 'Mappe interattive', -1)),
          t[1] ||
            (t[1] = u(
              'p',
              { class: 'text-gray-600 max-w-2xl' },
              ' In questa pagina integriamo una mappa stile Google Earth usando OpenStreetMap, Leaflet e tiles satellitari ESRI. ',
              -1
            )),
          s(U)
        ])
      )
    }
  })
export { F as default }
