import { useEffect, useState, type ReactNode, type CSSProperties } from 'react'
import {
  Menu, X, Cpu, ShieldCheck, Mic, FileSpreadsheet, Check, ChevronRight,
  Clock, AlertTriangle, ScanSearch, TrendingUp, ArrowUpRight, Calculator as CalcIcon,
  MessageCircle, MapPin, Phone, Mail, Send, Sparkles
} from 'lucide-react'
import { motion } from 'motion/react'

import type { VariantTheme } from '../theme'
import { VIDEO_SRC, VIDEO_POSTER, WHATSAPP } from '../theme'
import VideoBackground from '../components/VideoBackground'
import Reveal from '../components/Reveal'
import BlurText from '../components/rbits/BlurText'
import ShinyText from '../components/rbits/ShinyText'
import CountUp from '../components/rbits/CountUp'
import ElectricBorder from '../components/rbits/ElectricBorder'
import DarkVeil from '../components/rbits/DarkVeil'

/* ─── Tokens compartidos ───────────────────────────────────── */

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#como-funciona', label: 'Proceso' },
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contacto', label: 'Contacto' }
]

const checkIcons = { Cpu, ShieldCheck, Mic, FileSpreadsheet }

function cardSurface(v: VariantTheme): string {
  if (v.card === 'glass') return 'glass border border-line rounded-[20px]'
  return 'border border-line bg-panel/70 rounded-[16px]'
}

function cardDelay(v: VariantTheme, i: number): number {
  const s = v.motionMs < 200 ? 0 : 1
  return ((i % 3) * (v.motionMs < 200 ? 40 : 110)) + s
}

function durationOf(v: VariantTheme): number {
  return Math.min(0.9, Math.max(0.18, v.motionMs / 1000))
}

/* ─── Backdrop ─────────────────────────────────────────────── */

function Backdrop({ v }: { v: VariantTheme }) {
  const sections = ['hero', 'servicios', 'como-funciona', 'beneficios', 'calculadora', 'faq', 'contacto']
  if (!v.video) {
    return (
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        aria-hidden="true"
        style={{ backgroundImage: `url(${VIDEO_POSTER})` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(8,12,24,0.45)_0%,rgba(8,12,24,0.9)_100%)]" />
      </div>
    )
  }
  return (
    <>
      <VideoBackground src={VIDEO_SRC} poster={VIDEO_POSTER} sections={sections} />
      {v.darkveil && (
        <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
          <DarkVeil hueShift={-8} noiseIntensity={0.04} scanlineIntensity={0.03} speed={0.6} />
        </div>
      )}
      {v.grid && (
        <div className="fixed inset-0 -z-10 pointer-events-none bg-grid opacity-60" aria-hidden="true" />
      )}
      {v.orbs && (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="orb w-[420px] h-[420px] bg-cy/25 -top-20 -left-24" />
          <div className="orb w-[360px] h-[360px] bg-indigo-500/20 top-1/3 right-[-120px] [animation-delay:-5s]" />
          <div className="orb w-[300px] h-[300px] bg-cy/15 bottom-[-80px] left-1/3 [animation-delay:-9s]" />
        </div>
      )}
    </>
  )
}

/* ─── Nav ──────────────────────────────────────────────────── */

function Nav({ v }: { v: VariantTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const style = scrolled
    ? 'backdrop-blur-md border-b border-line bg-abyss/80'
    : v.nav === 'glass'
      ? 'border-b border-transparent'
      : 'border-b border-line/60 bg-abyss/50'

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${style}`}>
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src="/imagenes/logo.webp" alt="APC VisionIA" className="h-9 w-9 object-contain" />
          <span className="font-mono font-bold text-sm tracking-tight text-white">
            APC<span className="text-cy"> VisionIA</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-[13px]">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-slate-400 hover:text-cy transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta px-4 py-2 text-[13px]"
          >
            <MessageCircle className="h-4 w-4" /> Hablar ahora
          </a>
        </div>
        <button
          className="md:hidden text-slate-200 p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-line bg-abyss/95 backdrop-blur-md">
          <nav className="flex flex-col px-6 py-4 gap-3 text-sm">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-slate-300 hover:text-cy" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-cta px-4 py-2.5 mt-1">
              <MessageCircle className="h-4 w-4" /> Hablar ahora
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

/* ─── Section Head ─────────────────────────────────────────── */

function SectionHead({ v, kicker, title, sub }: { v: VariantTheme; kicker: string; title: ReactNode; sub?: string }) {
  const center = v.id === 'cinematic'
  return (
    <div className={`relative ${center ? 'text-center' : ''}`}>
      {v.shiny && center ? (
        <ShinyText
          text={kicker.toUpperCase()}
          speed={2.5}
          color="#38bdf8"
          shineColor="#ffffff"
          className="text-[11px] tracking-[0.28em] font-extrabold"
        />
      ) : v.grid && v.id === 'data' ? (
        <div className="chip text-cy font-mono uppercase tracking-[0.18em]">{kicker}</div>
      ) : (
        <div className="flex items-center gap-2 text-cy text-[11px] font-extrabold tracking-[0.28em] uppercase">
          <span className={`h-px w-8 bg-cy/60 ${center ? 'hidden' : ''}`} />
          {kicker}
        </div>
      )}
      <h2 className={`mt-3 text-3xl md:text-4xl font-extrabold text-white tracking-tight ${center ? 'mx-auto max-w-2xl' : ''}`}>
        {title}
      </h2>
      {sub && <p className={`mt-3 text-slate-400 text-[15px] ${center ? 'mx-auto' : ''} max-w-2xl`}>{sub}</p>}
    </div>
  )
}

/* ─── Hero ─────────────────────────────────────────────────── */

const HERO_CHECKS = [
  'Piloto vivo en tus cámaras actuales',
  'Aforo y mapa de calor en tiempo real',
  'Instalación 48h sin obras'
]

function Hero({ v }: { v: VariantTheme }) {
  const title = 'Conteo de Personas YOLO + Mapa de Calor | Gym y Retail Bogotá'
  const isQuiet = v.id === 'quiet'

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center justify-center px-6 pt-24 pb-16">
      <div className="mx-auto max-w-4xl text-center relative z-10">
        <Reveal y={v.motionPx} duration={durationOf(v)}>
          {v.shiny ? (
            <ShinyText
              text="VISIÓN IA YOLO — PILOTO GRATIS 7 DÍAS"
              speed={2.5}
              color="#38bdf8"
              shineColor="#ffffff"
              spread={140}
              className="chip text-[11px] tracking-[0.24em] font-bold uppercase"
            />
          ) : (
            <div className="chip text-cy uppercase tracking-[0.24em]">
              <Sparkles className="h-3.5 w-3.5" /> Visión IA YOLO — Piloto gratis 7 días
            </div>
          )}
        </Reveal>

        <div className={`mt-6 ${isQuiet ? '' : ''}`}>
          {v.blurTitle ? (
            <h1 aria-label={title} className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
              <BlurText
                text={title}
                delay={60}
                direction="top"
                stepDuration={0.28}
                className=""
              />
            </h1>
          ) : (
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">{title}</h1>
          )}
          <p className="mt-3 text-xl md:text-2xl font-bold txt-grad">Mapas de Calor y Control de Aforo</p>
        </div>

        <Reveal y={v.motionPx} delay={v.motionMs < 200 ? 40 : 160} duration={durationOf(v)}>
          <p className="mt-5 text-slate-300 max-w-2xl mx-auto text-[15px] md:text-base leading-relaxed">
            Sistema en vivo sobre tus cámaras existentes: cuántas personas entran, dónde se quedan y qué zonas son
            muertas. Piloto gratis 7 días, instalación 48h sin obras. Gym y retail en Bogotá.
          </p>
        </Reveal>

        <Reveal y={v.motionPx} delay={v.motionMs < 200 ? 80 : 260} duration={durationOf(v)}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-cta px-6 py-3 text-sm">
              <MessageCircle className="h-4 w-4" /> Hablar ahora
            </a>
            <a href="#servicios" className="px-6 py-3 rounded-[14px] border border-line text-sm font-semibold text-slate-200 hover:border-cy/50 hover:text-white transition-colors">
              Ver servicios
            </a>
          </div>
        </Reveal>

        <Reveal y={v.motionPx} delay={v.motionMs < 200 ? 120 : 360} duration={durationOf(v)}>
          <ul className={`mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 ${isQuiet ? 'text-slate-400' : 'text-slate-300'}`}>
            {HERO_CHECKS.map((c) => (
              <li key={c} className="flex items-center gap-2 text-[13px]">
                <Check className="h-4 w-4 text-cy" /> {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Servicios ────────────────────────────────────────────── */

const SERVICES = [
  {
    icon: ScanSearch,
    tag: 'YOLO en vivo · Gym & Retail',
    title: 'Conteo de Personas YOLO',
    desc: 'Cuántas personas entran, cuánto tiempo se quedan y aforo por franja. Sobre tus cámaras actuales, sin obras.',
    chips: ['YOLOv8', 'Tiempo real'],
    cta: 'Saber más → #servicios'
  },
  {
    icon: TrendingUp,
    tag: 'Zonas muertas · Optimiza layout',
    title: 'Mapas de Calor',
    desc: 'Detecta zonas muertas, máquinas zombie y vitrinas frías. Sube ticket y rotación con datos, no intuición.',
    chips: ['Heatmap', 'Layout'],
    cta: 'Saber más → #servicios'
  },
  {
    icon: Clock,
    tag: 'Control de aforo · Alertas',
    title: 'Control de Aforo',
    desc: 'Aforo en vivo con alertas WhatsApp y dashboard. Cumplimiento y staff óptimo para gyms y tiendas Bogotá.',
    chips: ['Alertas', 'Dashboard'],
    cta: 'Saber más → #servicios'
  },
  {
    icon: FileSpreadsheet,
    tag: 'Módulo secundario',
    title: 'Arqueo de Caja con IA',
    desc: 'Conciliación POS vs efectivo con Mini PC + Excel automático. Disponible como módulo secundario → /arqueo.html',
    chips: ['POS', 'Excel'],
    cta: 'Ver arqueo → /arqueo.html'
  }
]

function ServiceCard({ v, item, i }: { v: VariantTheme; item: (typeof SERVICES)[number]; i: number }) {
  const Icon = item.icon
  const electric = v.card === 'electric' && i === 0
  const inner = (
    <div className={`h-full flex flex-col ${electric ? 'p-8 md:p-10 pb-12' : 'p-7'}`}>
      <div className="flex items-center justify-between">
        <span className={`p-3 rounded-2xl ${electric ? 'bg-cy/10 text-cy' : 'bg-abyss-2 text-cy'} border border-line h-fit`}>
          <Icon className="h-6 w-6" />
        </span>
        <span className="chip font-mono text-[10px] text-slate-400">{item.tag}</span>
      </div>
      <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">{item.desc}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.chips.map((c) => (
          <span key={c} className="chip text-[10px] text-slate-300">{c}</span>
        ))}
      </div>
      <a href="#contacto" className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-cy hover:text-sky-300 transition-colors">
        Saber más <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  )

  const body = electric ? (
    <ElectricBorder color="#22d3ee" borderRadius={16} speed={0.8} className="h-full [--electric-border-radius:16px]">
      {inner}
    </ElectricBorder>
  ) : (
    <div className={`h-full ${cardSurface(v)} ${i % 2 ? '' : ''}`}>{inner}</div>
  )

  return (
    <Reveal key={item.title} y={v.motionPx} scale={v.scale} delay={cardDelay(v, i)} duration={durationOf(v)} className="h-full">
      {body}
    </Reveal>
  )
}

function Services({ v }: { v: VariantTheme }) {
  return (
    <section id="servicios" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          v={v}
          kicker="Servicios"
          title={<>Incluye todo lo que necesitas para un <span className="txt-grad">arqueo automático</span></>}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} v={v} item={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Cómo funciona ────────────────────────────────────────── */

const STEPS = [
  { n: '01', t: 'Entregamos la Mini PC', d: 'Te entregamos una Mini PC ya configurada para que puedas iniciar tu arqueo automático.' },
  { n: '02', t: 'Configuramos Audio y Video', d: 'Ajustamos el servidor de audio y video para que el conteo quede grabado.' },
  { n: '03', t: 'Recibes tu Excel', d: 'El sistema detecta las conciliaciones y entrega un Excel listo para revisar.' }
]

function Workflow({ v }: { v: VariantTheme }) {
  return (
    <section id="como-funciona" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          v={v}
          kicker="Proceso"
          title={<>Cómo funciona en <span className="txt-grad">3 pasos</span></>}
          sub="En menos de 48 horas tienes tu punto listo para conciliar automáticamente."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} y={v.motionPx} scale={v.scale} delay={cardDelay(v, i)} duration={durationOf(v)} className="h-full">
              <div className={`h-full ${cardSurface(v)} p-7 relative overflow-hidden`}>
                {v.id === 'data' && <div className="absolute inset-0 bg-grid opacity-40" />}
                <div className="relative">
                  <span className="font-mono text-cy text-3xl font-bold">{s.n}</span>
                  <h3 className="mt-4 text-lg font-bold text-white">{s.t}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal y={v.motionPx} delay={0} duration={durationOf(v)}>
          <div className={`mt-10 ${cardSurface(v)} px-6 py-5 flex flex-wrap items-center justify-center gap-3 text-[13px]`}>
            <span className="font-bold text-white">Cada plan incluye:</span>
            {['Instalación en Bogotá y Sabana', 'Soporte <30 min', 'Garantía 7 días'].map((t) => (
              <span key={t} className="chip text-slate-200">{t}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Beneficios ───────────────────────────────────────────── */

const BENEFITS = [
  { icon: Clock, value: 90, suffix: '%', label: 'Tiempo de arqueo', desc: 'Deja de destinar 45 minutos a cada cierre de caja.' },
  { icon: AlertTriangle, value: 0, suffix: '', label: 'Errores de caja', desc: 'Detección de diferencias automática entre POS y conteo físico.' },
  { icon: ScanSearch, value: 100, suffix: '%', label: 'Trazabilidad', desc: 'Grabación y transcripción de cada evento del conteo.' },
  { icon: TrendingUp, value: null, suffix: '', label: 'ROI desde el día 1', desc: 'Ahorro de personal y tiempo visible desde la primera conciliación.' }
]

function Benefits({ v }: { v: VariantTheme }) {
  return (
    <section id="beneficios" className={`relative py-20 px-6 ${v.id === 'data' ? '' : ''}`}>
      <div className="mx-auto max-w-6xl">
        <SectionHead
          v={v}
          kicker="Beneficios"
          title={<>Datos que sientan <span className="txt-grad">orden en tu caja</span></>}
          sub="No vendemos equipos. Instalamos orden: tu tiempo vuelve a tu negocio y tus cuadres se vuelven automáticos."
        />
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon
            return (
              <Reveal key={b.label} y={v.motionPx} scale={v.scale} delay={cardDelay(v, i)} duration={durationOf(v)} className="h-full">
                <div className={`h-full ${cardSurface(v)} p-6 flex flex-col ${v.id === 'cinematic' ? 'items-center text-center' : ''}`}>
                  <Icon className="h-5 w-5 text-cy" />
                  <div className={`mt-4 font-mono font-extrabold text-2xl md:text-3xl text-white ${v.countup ? '' : ''}`}>
                    {v.countup && b.value !== null ? (
                      <>
                        <CountUp to={b.value as number} duration={2} separator="." className="tabular-nums" />
                        <span>{b.suffix}</span>
                      </>
                    ) : (
                      <span className="tabular-nums">{b.value !== null ? `${b.value}${b.suffix}` : 'Día 1'}</span>
                    )}
                  </div>
                  <div className="mt-1 text-[13px] font-semibold text-slate-200">{b.label}</div>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Artículos ────────────────────────────────────────────── */

const ARTICLES = [
  { slug: 'arqueo-de-caja-que-es', cat: 'Guía', title: 'Arqueo de Caja: Qué Es, Cómo Se Hace y Cómo Automatizarlo' },
  { slug: 'arqueo-de-caja-excel', cat: 'Guía', title: 'Arqueo de Caja Excel: Guía Completa para Automatizar tu Negocio en 2026' },
  { slug: 'ia-para-excel-arqueo', cat: 'IA', title: 'IA para Excel: Cómo la Inteligencia Artificial Automatiza tu Arqueo de Caja' },
  { slug: 'costo-sistema-pos-colombia', cat: 'POS', title: 'Costo de Sistema POS en Colombia: Guía de Precios 2026' },
  { slug: 'sistema-pos-para-restaurantes', cat: 'POS', title: 'Sistema POS para Restaurantes en Colombia: Guía Completa 2026' },
  { slug: 'arqueo-contable', cat: 'Guía', title: 'Arqueo Contable: Cómo Conciliar Efectivo y Cerrar el Mes en Excel' }
]

function Articles({ v }: { v: VariantTheme }) {
  return (
    <section id="articulos" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          v={v}
          kicker="Aprende más"
          title={<>Artículos y guías de <span className="txt-grad">arqueo inteligente</span></>}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.slug} y={v.motionPx} delay={cardDelay(v, i)} duration={durationOf(v)} className="h-full">
              <a href={`/articulos/${a.slug}.html`} className={`h-full ${cardSurface(v)} p-6 flex flex-col hover:border-cy/40 transition-colors group`}>
                <span className="chip font-mono text-[10px] text-cy w-fit">{a.cat}</span>
                <h3 className="mt-4 text-[15px] font-semibold text-white leading-snug group-hover:text-cy transition-colors">
                  {a.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-400 group-hover:text-cy transition-colors">
                  Leer guía <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ──────────────────────────────────────────────────── */

const FAQS = [
  { q: '¿Qué es el arqueo de caja?', a: 'Es la verificación del efectivo en caja frente a lo registrado en el sistema POS. Con arqueo IA se hace automático, en segundos y sin errores de cálculo.' },
  { q: '¿Cuánto tiempo toma un arqueo manual?', a: 'En promedio 40 minutos o más por cierre. Con el sistema de APC VisionIA la conciliación se genera en segundos y el conteo queda respaldado con audio y video.' },
  { q: '¿Cómo se genera el Excel?', a: 'La mini PC graba el momento del conteo, transcribe el audio, y el reporte de conciliación POS vs conteo físico se entrega automáticamente al final del día, listo para revisar.' },
  { q: '¿Son cámaras de seguridad?', a: 'No vendemos vigilancia. La cámara es una herramienta más del ecosistema: lo que entregamos es orden, datos y eficiencia en tu operación de caja.' },
  { q: '¿Cuánto cuesta implementarlo?', a: 'Cada punto de venta es distinto. Agenda un diagnóstico gratuito y te damos la inversión exacta con la proyección de ahorro de tu negocio.' },
  { q: '¿Qué pasa si hay diferencias entre POS y conteo?', a: 'El sistema marca la diferencia automáticamente y deja la grabación y transcripción como evidencia, para resolverla en minutos y no en días.' }
]

function Faq({ v }: { v: VariantTheme }) {
  return (
    <section id="faq" className="relative py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHead v={v} kicker="Preguntas frecuentes" title={<>Resolvemos tu <span className="txt-grad">inquietud</span></>} />
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} y={v.motionPx} delay={i * (v.motionMs < 200 ? 20 : 60)} duration={durationOf(v)}>
              <details className={`${cardSurface(v)} group`}>
                <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between gap-4 font-semibold text-[15px] text-white">
                  {f.q}
                  <ChevronRight className="h-4 w-4 text-cy transition-transform group-open:rotate-90 shrink-0" />
                </summary>
                <p className="px-6 pb-5 text-sm text-slate-400 leading-relaxed">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Calculadora ──────────────────────────────────────────── */

function Calculator({ v }: { v: VariantTheme }) {
  const [result, setResult] = useState<null | { total: number; ahorroHoras: number; ahorroCosto: number; costoPersonal: number; riesgo: number | null }>(null)
  const [pending, setPending] = useState(false)
  const [msg, setMsg] = useState('')
  const [captured, setCaptured] = useState(false)
  const [inputs, setInputs] = useState({ efectivo_diario: '', empleados: '1', horas_arqueo: '', costo_hora: '8000' })

  const set = (k: keyof typeof inputs) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((s) => ({ ...s, [k]: e.target.value }))

  const calc = () => {
    const efectivo = parseFloat(inputs.efectivo_diario) || 0
    const empleados = parseInt(inputs.empleados) || 1
    const horas = parseFloat(inputs.horas_arqueo) || 0
    const costoHora = parseFloat(inputs.costo_hora) || 8000
    const horasMes = horas * 30
    const ahorroHoras = horasMes * 0.9
    const costoPersonal = horasMes * costoHora * Math.min(empleados, 3)
    const ahorroCosto = costoPersonal * 0.9
    const total = ahorroCosto
    const r = { total, ahorroHoras, ahorroCosto, costoPersonal, riesgo: efectivo > 0 ? efectivo * 0.03 * 30 : null }
    setResult(r)
    setPending(true)
    setMsg('')
    setTimeout(() => {
      setPending(false)
      setMsg(
        `Con ${horas} horas diarias de arqueo manual y ${empleados} empleado(s) en caja, tu sistema actual te cuesta ${Math.round(costoPersonal).toLocaleString('es-CO')} COP/mes en tiempo de personal. ` +
        `Nuestro arqueo inteligente reduce esto a 5 minutos: la mini PC graba audio, transcribe, graba video y genera el Excel automáticamente. ` +
        `Tu ahorro potencial: ${Math.round(total).toLocaleString('es-CO')} COP/mes + ${Math.round(ahorroHoras)} horas de personal liberadas.` +
        (r.riesgo ? ` Con ${efectivo.toLocaleString('es-CO')} COP diarios en efectivo, el 3% de discrepancia representa ${Math.round(r.riesgo).toLocaleString('es-CO')} COP/mes en pérdidas que tu POS no detecta.` : '')
      )
    }, 1500)
  }

  const capture = () => {
    const email = (document.getElementById('captureEmail') as HTMLInputElement | null)?.value.trim() || ''
    if (!email || email.indexOf('@') < 0) {
      document.getElementById('captureEmail')?.focus()
      return
    }
    const form = document.createElement('form')
    form.action = 'https://formsubmit.co/serviciosapcsoporte@gmail.com'
    form.method = 'POST'
    form.style.display = 'none'
    const data: Record<string, string> = {
      _subject: 'APC Arqueo Inteligente — Lead Calculadora',
      email,
      efectivo_diario: inputs.efectivo_diario || 'no especificado',
      empleados: inputs.empleados || 'no especificado',
      horas_arqueo: inputs.horas_arqueo || 'no especificado',
      ahorro_estimado: result ? Math.round(result.total).toLocaleString('es-CO') : 'no calculado',
      fuente: 'calculadora_arqueo_apcvisionai'
    }
    Object.keys(data).forEach((k) => {
      const i = document.createElement('input')
      i.type = 'hidden'
      i.name = k
      i.value = data[k]
      form.appendChild(i)
    })
    document.body.appendChild(form)
    form.submit()
    setCaptured(true)
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl bg-abyss-2 border border-line text-white placeholder-slate-600 focus:border-cy/50 focus:outline-none text-sm'

  return (
    <section id="calculadora" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          v={v}
          kicker="Calculadora"
          title={<>Calcula tu <span className="txt-grad">ahorro mensual</span></>}
          sub="Estima cuánto te cuesta el arqueo manual hoy y cuánto ahorrarías automatizándolo."
        />
        <Reveal y={v.motionPx} duration={durationOf(v)}>
          <div className={`mt-12 ${cardSurface(v)} p-0 overflow-hidden grid lg:grid-cols-2`}>
            <div className="p-7 md:p-9 border-b lg:border-b-0 lg:border-r border-line space-y-4">
              <label className="block"><span className="text-xs text-slate-400 mb-1 block">Efectivo diario promedio (COP)</span>
                <input className={inputCls} id="efectivo_diario" type="number" placeholder="600000" value={inputs.efectivo_diario} onChange={set('efectivo_diario')} />
              </label>
              <label className="block"><span className="text-xs text-slate-400 mb-1 block">Personas que arquean</span>
                <input className={inputCls} id="empleados" type="number" min="1" max="9" value={inputs.empleados} onChange={set('empleados')} />
              </label>
              <label className="block"><span className="text-xs text-slate-400 mb-1 block">Horas de arqueo al día</span>
                <input className={inputCls} id="horas_arqueo" type="number" min="0" step="0.25" placeholder="0.7" value={inputs.horas_arqueo} onChange={set('horas_arqueo')} />
              </label>
              <label className="block"><span className="text-xs text-slate-400 mb-1 block">Costo de la hora del empleado (COP)</span>
                <input className={inputCls} id="costo_hora" type="number" min="0" placeholder="8000" value={inputs.costo_hora} onChange={set('costo_hora')} />
              </label>
              <button onClick={calc} className="btn-cta w-full px-6 py-3.5 text-sm">
                <CalcIcon className="h-4 w-4" /> Calcular ahorro
              </button>
            </div>

            <div className={`p-7 md:p-9 flex flex-col justify-between gap-6 ${result ? '' : 'items-center'} min-h-[280px]`}>
              {result ? (
                <>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Ahorro mensual estimado</div>
                    <div className="mt-2 font-mono font-extrabold text-4xl text-cy tabular-nums">
                      {v.countup ? <CountUp to={result.total} duration={2.2} /> : '$' + Math.round(result.total).toLocaleString('es-CO')}
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className={cardSurface(v) + ' !rounded-xl p-4'}>
                        <div className="text-[11px] text-slate-400">Tiempo liberado</div>
                        <div className="font-mono font-bold text-xl text-white mt-1">{Math.round(result.ahorroHoras)}h <span className="text-xs text-slate-400">/mes</span></div>
                      </div>
                      <div className={cardSurface(v) + ' !rounded-xl p-4'}>
                        <div className="text-[11px] text-slate-400">Costo de personal hoy</div>
                        <div className="font-mono font-bold text-xl text-white mt-1">{Math.round(result.ahorroCosto).toLocaleString('es-CO')}</div>
                      </div>
                    </div>
                  </div>
                  <div className={`${cardSurface(v)} !rounded-2xl p-5 text-sm text-slate-300 leading-relaxed relative min-h-[130px]`}>
                    <span className="chip font-mono text-[10px] text-cy absolute -top-3 left-4">APC Arqueo</span>
                    {pending ? (
                      <div className="flex gap-1.5 items-center h-full pt-4">
                        <span className="w-2 h-2 rounded-full bg-cy/70 animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-cy/60 animate-bounce [animation-delay:120ms]" />
                        <span className="w-2 h-2 rounded-full bg-cy/50 animate-bounce [animation-delay:240ms]" />
                      </div>
                    ) : (
                      <p className="pt-4">{msg}</p>
                    )}
                  </div>
                  {!captured ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input id="captureEmail" type="email" placeholder="tu@correo.com para tu reporte" className={inputCls} />
                      <button onClick={capture} className="btn-cta px-5 py-3 text-sm shrink-0">
                        <Send className="h-4 w-4" /> Recibir análisis
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-cy">Enviado. Te contactaremos pronto con tu análisis de arqueo.</div>
                  )}
                </>
              ) : (
                <div className="text-center text-slate-500 text-sm">
                  Completa los datos y presiona <span className="text-cy font-semibold">Calcular</span> para ver tu ahorro estimado.
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Contacto ─────────────────────────────────────────────── */

function Contact({ v }: { v: VariantTheme }) {
  return (
    <section id="contacto" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          v={v}
          kicker="Contacto"
          title={<>¿Listo para dejar de <span className="txt-grad">arquearte mentalmente</span>?</>}
          sub="Agenda un diagnóstico gratuito y recibe una cotización con la proyección de ahorro de tu punto de venta."
        />
        <div className="mt-12 grid lg:grid-cols-2 gap-5">
          <Reveal y={v.motionPx} duration={durationOf(v)}>
            <div className={`h-full ${cardSurface(v)} p-8 flex flex-col`}>
              <h3 className="text-lg font-bold text-white">Hablemos de tu punto de venta</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Cuéntanos tu caso y te respondemos en menos de 30 minutos en hora hábil.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-slate-300">
                <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-cy shrink-0" /> Región Bogotá — Cra 52c #39b-22</li>
                <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-cy shrink-0" /> +57 333 745 0634</li>
                <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-cy shrink-0" /> serviciosapcsoporte@gmail.com</li>
              </ul>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-cta px-6 py-3.5 text-sm mt-6">
                <MessageCircle className="h-4 w-4" /> Escríbeme tu caso por WhatsApp
              </a>
              <div className="mt-6 rounded-2xl overflow-hidden border border-line">
                <iframe
                  title="Ubicación APC VisionIA"
                  src="https://www.google.com/maps?q=Cra+52c+%2339b-22,+Bogot%C3%A1&output=embed"
                  className="w-full h-44 grayscale contrast-[0.9] opacity-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          <Reveal y={v.motionPx} delay={v.motionMs < 200 ? 40 : 120} duration={durationOf(v)}>
            <div className={`h-full ${cardSurface(v)} p-8`}>
              <h3 className="text-lg font-bold text-white">Envíanos un mensaje</h3>
              <form
                className="mt-5 space-y-4"
                action="https://formsubmit.co/serviciosapcsoporte@gmail.com"
                method="POST"
              >
                <input type="hidden" name="_subject" value="Nuevo contacto APC Arqueo Inteligente" />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_honey" style={{ display: 'none' as CSSProperties['display'] }} />
                <input type="hidden" name="_captcha" value="true" />
                <input type="hidden" name="_next" value="https://apcvisionai.site/" />
                <div><label className="block text-xs text-slate-500 mb-1">Nombre</label>
                  <input type="text" name="nombre" required className="w-full px-4 py-3 rounded-xl bg-abyss-2 border border-line text-white placeholder-slate-600 focus:border-cy/50 focus:outline-none" placeholder="Tu nombre" /></div>
                <div><label className="block text-xs text-slate-500 mb-1">Correo electrónico</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl bg-abyss-2 border border-line text-white placeholder-slate-600 focus:border-cy/50 focus:outline-none" placeholder="tu@correo.com" /></div>
                <div><label className="block text-xs text-slate-500 mb-1">Teléfono / WhatsApp</label>
                  <input type="tel" name="contacto" required className="w-full px-4 py-3 rounded-xl bg-abyss-2 border border-line text-white placeholder-slate-600 focus:border-cy/50 focus:outline-none" placeholder="+57 333 745 0634" /></div>
                <div><label className="block text-xs text-slate-500 mb-1">¿Qué necesitas?</label>
                  <textarea name="mensaje" rows={4} required className="w-full px-4 py-3 rounded-xl bg-abyss-2 border border-line text-white placeholder-slate-600 focus:border-cy/50 focus:outline-none" placeholder="Cuéntanos sobre tu negocio y qué arqueo necesitas automatizar..." /></div>
                <button type="submit" className="btn-cta w-full px-6 py-3.5 text-sm">
                  <Send className="h-4 w-4" /> Enviar mensaje
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ───────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-[#050914]/90 border-t border-line py-12 px-6">
      <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] text-[13px] text-slate-500">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/imagenes/logo.webp" alt="APC VisionIA" className="h-8 w-8 object-contain" />
            <span className="font-mono font-bold text-sm text-white">APC<span className="text-cy"> VisionIA</span></span>
          </div>
          <p className="mt-3 leading-relaxed max-w-sm">
            Arqueo inteligente y visión computacional para negocios en Bogotá. Automatiza tu operación con datos en tiempo real.
          </p>
        </div>
        <div>
          <div className="font-bold text-white">Enlaces</div>
          <nav className="mt-3 flex flex-col gap-2">
            <a href="/" className="hover:text-cy transition-colors">Arqueo Inteligente</a>
            <a href="/cctv-vision-ia.html" className="hover:text-cy transition-colors">Visión IA</a>
            <a href="/sistema-pos-para-negocio.html" className="hover:text-cy transition-colors">Sistema POS</a>
            <a href="/arqueo.html" className="hover:text-cy transition-colors">Arqueo de Caja</a>
          </nav>
        </div>
        <div>
          <div className="font-bold text-white">Contacto</div>
          <div className="mt-3 flex flex-col gap-2">
            <span>+57 333 745 0634</span>
            <span>serviciosapcsoporte@gmail.com</span>
            <span>Bogotá, Colombia — Cra 52c #39b-22</span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl mt-10 pt-6 border-t border-line/60 text-[12px] text-slate-600 flex flex-wrap gap-x-4 gap-y-2 justify-between">
        <span>© {new Date().getFullYear()} Servicios APC. Todos los derechos reservados.</span>
        <span className="font-mono">apcvisionai.site</span>
      </div>
    </footer>
  )
}

/* ─── Landing ──────────────────────────────────────────────── */

export default function ArqueoLanding({ v }: { v: VariantTheme }) {
  return (
    <div className="min-h-screen bg-abyss text-slate-200">
      <Backdrop v={v} />
      <Nav v={v} />
      <main className="relative z-10">
        <Hero v={v} />
        <Services v={v} />
        <Workflow v={v} />
        <Benefits v={v} />
        <Articles v={v} />
        <Calculator v={v} />
        <Faq v={v} />
        <Contact v={v} />
      </main>
      <Footer />
    </div>
  )
}