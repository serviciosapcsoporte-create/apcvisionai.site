import { useEffect, useState, type ReactNode, type CSSProperties } from 'react'
import {
  Menu, X, Cpu, ShieldCheck, Users, ScanSearch, TrendingUp, ArrowUpRight, Calculator as CalcIcon,
  MessageCircle, MapPin, Phone, Mail, Send, Sparkles, Check, Clock, AlertTriangle, Flame, BarChart3
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
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contacto', label: 'Contacto' }
]

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
<img
          src="/assets/img/logo-apcvisionia.webp"
          alt="Logo APC VisionIA - Sistema de conteo de personas con IA para gimnasios y retail Bogotá"
          className="h-9 w-9 object-contain"
          width="96"
          height="96" />
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
            <MessageCircle className="h-4 w-4" /> Quiero mi demo gratis
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
              <MessageCircle className="h-4 w-4" /> Quiero mi demo gratis
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
  'Demo en vivo sin costo con nuestra cámara',
  'PC en comodato · sin comprar hardware',
  'Instalación 48h sin obras sobre tus cámaras',
]

function Hero({ v }: { v: VariantTheme }) {
  const title = 'Tu gym o tienda pierde gente cada día'
  const isQuiet = v.id === 'quiet'

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center justify-center px-6 pt-24 pb-16">
      <div className="mx-auto max-w-4xl text-center relative z-10">
        <Reveal y={v.motionPx} duration={durationOf(v)}>
          {v.shiny ? (
            <ShinyText
              text="CONTEO DE PERSONAS YOLO — DEMO EN VIVO SIN COSTO"
              speed={2.5}
              color="#38bdf8"
              shineColor="#ffffff"
              spread={140}
              className="chip text-[11px] tracking-[0.24em] font-bold uppercase"
            />
          ) : (
            <div className="chip text-cy uppercase tracking-[0.24em]">
              <Sparkles className="h-3.5 w-3.5" /> Conteo de personas YOLO — Demo en vivo sin costo
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
          <p className="mt-3 text-normal text-xl md:text-2xl font-bold txt-grad">Sin sensores dedicados. Sin obras. Demo en vivo gratis en 48h.</p>
        </div>

        <img
          src="/assets/img/yolo-conteo-camara.webp"
          alt="Sistema YOLO contando personas en vivo en gimnasio de Bogotá — conteo en tiempo real, mapa de calor y aforo"
          className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl border border-slate-800 my-8"
          loading="eager"
          fetchpriority="high"
          width="1600"
          height="900" />

        <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto">
          <img
            src="/assets/img/zonas-calor.webp"
            alt="Mapa de calor con zonas muertas detectadas en tienda -- distribucion de flujo por area y producto reubicacion"
            className="w-full rounded-xl border border-line object-cover aspect-[4/3]"
            loading="lazy"
            width="800"
            height="600" />
          <img
            src="/imagenes/flujo-personas.webp"
            alt="Flujo de personas por franja horaria en gym"
            className="w-full rounded-xl border border-line object-cover aspect-[4/3]"
            loading="lazy"
          />
          <img
            src="/imagenes/panel-analitico.webp"
            alt="Panel analítico con ocupación y aforo en vivo"
            className="w-full rounded-xl border border-line object-cover aspect-[4/3]"
            loading="lazy"
          />
        </div>

        <Reveal y={v.motionPx} delay={v.motionMs < 200 ? 80 : 200} duration={durationOf(v)}>
          <p className="mt-5 text-normal text-slate-300 max-w-2xl mx-auto text-[15px] md:text-base leading-relaxed">
            Tu gym o tienda pierde gente cada dia y no sabes cuantas. Las zonas muertas se acumulan. El personal se coordina a ojo. Sin sensores dedicados. Sin obras. Sin interrupcion. Demo en vivo gratis con tu camara. PC en comodato. Mensualidad unica por sistema + PC + mantenimiento.
          </p>
        </Reveal>

        <Reveal y={v.motionPx} delay={v.motionMs < 200 ? 80 : 260} duration={durationOf(v)}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-cta px-6 py-3 text-sm">
              <MessageCircle className="h-4 w-4" /> Quiero mi demo gratis
            </a>
            <a href="#como-funciona" className="px-6 py-3 rounded-[14px] border border-line text-sm font-semibold text-slate-200 hover:border-cy/50 hover:text-white transition-colors">
              Cómo instalamos
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
    icon: Users,
    iconSrc: '/imagenes/icon_yolo_cutout.png',
    tag: 'SISTEMA DE CONTEO · YOLOv8',
    title: 'Conteo de Personas',
    desc: 'Cuenta cuantas personas entran y salen, por franja horaria y zona. Usa tus camaras actuales — sin torniquetes, sin sensores. Sabes exactamente cuanta gente pasa y cuando.',
    chips: ['YOLOv8', '98% precisión', 'Tiempo real'],
  },
  {
    icon: Flame,
    iconSrc: '/imagenes/icon_heatmap_cutout.png',
    tag: 'MAPA DE CALOR · ZONAS',
    title: 'Mapa de Calor y Zonas Muertas',
    desc: 'Ve en un mapa donde convergen las personas y donde nadie pasa. Detecta las zonas muertas de tu local y reubica productos, personal y ofertas donde si hay flujo.',
    chips: ['Heatmap', 'Zonas muertas', 'Layout'],
  },
  {
    icon: BarChart3,
    iconSrc: '/imagenes/icon_bell_cutout.png',
    tag: 'CONTROL AFORO · ALERTAS',
    title: 'Control de Aforo en Vivo',
    desc: 'Alertas automaticas cuando el aforo supera el limite. Evita la saturacion, cumple la normativa y decide cuantos empleados necesitas segun la ocupacion real.',
    chips: ['Aforo vivo', 'Alertas', 'Dashboard'],
  },
]

function ServiceCard({ v, item, i }: { v: VariantTheme; item: (typeof SERVICES)[number]; i: number }) {
  const Icon = item.icon
  const electric = v.card === 'electric' && i === 0
  const inner = (
    <div className={`h-full flex flex-col ${electric ? 'p-8 md:p-10 pb-12' : 'p-7 flex-1 justify-between'}`}>
      <div className="flex items-center justify-between">
        <span className={`p-3 rounded-2xl ${electric ? 'bg-cy/10 text-cy' : 'bg-abyss-2 text-cy'} border border-line h-fit flex items-center justify-center`}>
          {item.iconSrc ? <img src={item.iconSrc} alt={item.title} className="h-6 w-6 object-contain" loading="lazy" /> : <Icon className="h-6 w-6" />}
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
        Quiero mi demo gratis <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  )

  const body = electric ? (
    <ElectricBorder color="#D4FF32" borderRadius={16} speed={0.8} className="h-full [--electric-border-radius:16px]">
      {inner}
    </ElectricBorder>
  ) : (
    <div className={`h-full ${cardSurface(v)}`}>{inner}</div>
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
          title={<>Todo el <span className="txt-grad">conteo de personas</span> para tu negocio — sin sensores dedicados</>}
          sub="Instalamos el sistema sobre tus cámaras existentes. La competencia vende sensores V-Count por $1.000 USD. Nosotros usamos lo que ya tienes + una PC en comodato. Demo en vivo gratis sin compromiso."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} v={v} item={s} i={i} />
          ))}
        </div>
        <Reveal y={v.motionPx} delay={0} duration={durationOf(v)}>
          <div className={`mt-8 ${cardSurface(v)} px-6 py-4 flex flex-wrap items-center justify-center gap-3 text-[13px]`}>
            <span className="font-bold text-white">Qué incluido en una sola mensualidad:</span>
            {['PC en comodato', 'Sistema YOLO + dashboard', 'Administración y mantenimiento', 'Soporte <30 min'].map((t) => (
              <span key={t} className="chip text-slate-200">{t}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Dashboard en Vivo ───────────────────────────────────── */

function Dashboard({ v }: { v: VariantTheme }) {
  return (
    <section id="dashboard" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          v={v}
          kicker="Dashboard"
          title={<>Tu negocio en <span className="txt-grad">un solo panel</span></>}
          sub="Ocupacion por franja, alertas de aforo, mapa de calor y Excel automatico — desde un solo lugar, en tiempo real."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <div className={`${cardSurface(v)} p-6`}>
            <img src="/imagenes/icon_minipc_cutout.png" alt="Mini PC en comodato corriendo YOLO local" className="h-10 w-10 object-contain mb-4" loading="lazy" />
            <h3 className="text-lg font-bold text-white">Monitoreo en vivo</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">Ve cuantas personas hay, donde estan y en que zonas se concentran — desde cualquier dispositivo.</p>
          </div>
          <div className={`${cardSurface(v)} p-6`}>
            <img src="/imagenes/icon_bell_cutout.png" alt="Alertas automaticas de aforo" className="h-10 w-10 object-contain mb-4" loading="lazy" />
            <h3 className="text-lg font-bold text-white">Alertas automaticas</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">Notificaciones cuando el aforo supera el limite. Cumplimiento normativo sin vigilar la pantalla.</p>
          </div>
          <div className={`${cardSurface(v)} p-6`}>
            <img src="/imagenes/icon_pos_cutout.png" alt="Reportes automaticos y Excel semanal" className="h-10 w-10 object-contain mb-4" loading="lazy" />
            <h3 className="text-lg font-bold text-white">Reportes automaticos</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">Excel semanal con ocupacion, flujo y zonas muertas. Sin configuracion manual.</p>
          </div>
        </div>
        <Reveal y={v.motionPx} delay={0} duration={durationOf(v)}>
          <div className="mt-8 rounded-2xl overflow-hidden border border-line shadow-2xl">
            <img src="/imagenes/Analitic.webp" alt="Dashboard de analitica en vivo con conteo y mapa de calor" className="w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <img src="/imagenes/espera-clientes.webp" alt="Fila de espera detectada por el sistema" className="w-full rounded-xl border border-line object-cover aspect-[16/9]" loading="lazy" />
          <img src="/imagenes/alertas-fila.webp" alt="Alerta de fila y saturacion en vivo" className="w-full rounded-xl border border-line object-cover aspect-[16/9]" loading="lazy" />
        </div>
      </div>
    </section>
  )
}

/* ─── Cómo funciona ────────────────────────────────────────── */

const STEPS = [
  { n: '01', t: 'Demo en vivo sin costo con nuestra cámara', d: 'Llevamos nuestra cámara a tu negocio y te mostramos el conteo de personas + mapa de calor + control de aforo en vivo sobre tu espacio real. Ves datos antes de decidir.' },
  { n: '02', t: 'Instalamos el sistema en 48h (PC en comodato)', d: 'Conectamos una PC en comodato a tu red local y a tus cámaras vía RTSP. Corre YOLOv8 local (sin sensores dedicados), cuenta personas por zona y genera mapa de calor. Sin obras, sin perforaciones.' },
  { n: '03', t: 'Dashboard en vivo + Excel automático + mantenimiento', d: 'Recibes dashboard con ocupacion por franja, alertas de aforo y reportes automaticos. La mensualidad cubre sistema + PC + administracion y mantenimiento. Nos encargamos de todo. Soporte <30 min.' }
]

function Workflow({ v }: { v: VariantTheme }) {
  return (
    <section id="como-funciona" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          v={v}
          kicker="Cómo funciona"
          title={<>Instalamos el <span className="txt-grad">sistema YOLO</span> en 48h — sin obras</>}
          sub="No vendemos hardware. Te prestamos la PC en comodato. La mensualidad incluye sistema + PC + administración y mantenimiento. Instalación en 48h sin obras."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} y={v.motionPx} scale={v.scale} delay={cardDelay(v, i)} duration={durationOf(v)} className="h-full">
              <div className={`h-full flex flex-col ${cardSurface(v)} p-7 relative overflow-hidden`}>
                {v.id === 'data' && <div className="absolute inset-0 bg-grid opacity-40" />}
                <div className="relative flex flex-col h-full">
                  <span className="font-mono text-cy text-3xl font-bold">{s.n}</span>
                  <h3 className="mt-4 text-lg font-bold text-white flex-1">{s.t}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal y={v.motionPx} delay={0} duration={durationOf(v)}>
          <div className={`mt-10 ${cardSurface(v)} px-6 py-5 flex flex-wrap items-center justify-center gap-3 text-[13px]`}>
            <span className="font-bold text-white">Para qué sirve:</span>
            <span className="text-slate-300">Saber cuántas personas entran, dónde se quedan, qué zonas son muertas y cuándo tu gym/tienda se satura — para mover layout, staffing y horarios con datos, no a ojo.</span>
          </div>
        </Reveal>
        <Reveal y={v.motionPx} delay={0} duration={durationOf(v)}>
          <div className={`mt-4 ${cardSurface(v)} px-6 py-5 flex flex-wrap items-center justify-center gap-3 text-[13px]`}>
            <span className="font-bold text-white">Cómo lo hace:</span>
            <span className="text-slate-300">YOLOv8 sobre tus cámaras (RTSP) → cuenta personas por zona → genera mapa de calor + aforo en vivo → dashboard + Excel. PC local en comodato, 98% precisión.</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Beneficios ───────────────────────────────────────────── */

const BENEFITS = [
  { icon: Users, value: 98, suffix: '%', label: 'Precisión conteo', desc: 'Cuenta personas vs tu contador manual de puerta. Valida aforo real por zona.' },
  { icon: Flame, value: 30, suffix: '%', label: 'Zonas muertas detectadas', desc: 'Espacio que hoy pagas y no convierte. Reubícalo donde sí hay flujo.' },
  { icon: Clock, value: 24, suffix: '/7', label: 'Aforo en vivo', desc: 'Dashboard + alertas cuando una zona supera 95% capacidad.' },
  { icon: TrendingUp, value: null, suffix: '', label: 'ROI desde semana 1', desc: 'Demo en vivo sin costo: prueba el sistema 7 dias y decide.' }
]

function Benefits({ v }: { v: VariantTheme }) {
  return (
    <section id="beneficios" className={`relative py-20 px-6 ${v.id === 'data' ? '' : ''}`}>
      <div className="mx-auto max-w-6xl">
        <SectionHead
          v={v}
          kicker="Beneficios"
          title={<>Datos que convierten tu <span className="txt-grad">conteo en ventas</span></>}
          sub="No vendemos cámaras ni sensores. Convertimos las que ya tienes en un sistema de conteo de personas, mapa de calor y control de aforo para gyms y retail en Bogotá. Demo en vivo sin costo."
        />
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon
            return (
              <Reveal key={b.label} y={v.motionPx} scale={v.scale} delay={cardDelay(v, i)} duration={durationOf(v)} className="h-full flex-1">
                <div className={`h-full flex flex-col ${v.id === 'cinematic' ? 'items-center text-center' : 'p-6'}`}>
                  <Icon className="h-5 w-5 text-cy mx-auto my-4" />
                  <div className={`mt-4 font-mono font-extrabold text-2xl md:text-3xl text-white mx-auto ${v.id === 'cinematic' ? 'w-full' : 'max-w-80'}`}>
                    {v.countup && b.value !== null ? (
                      <>
                        <CountUp to={b.value as number} duration={2} separator="." className="tabular-nums" />
                        <span>{b.suffix}</span>
                      </>
                    ) : (
                      <span className="tabular-nums">{b.value !== null ? `${b.value}${b.suffix}` : 'Día 7'}</span>
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
  { slug: 'conteo-aforo-gym-yolo', cat: 'Conteo', title: 'Conteo y Aforo de Gimnasio con Cámaras IA: Guía 2026', href: '/conteo-aforo-gym-yolo.html' },
  { slug: 'zonas-muertas-gym', cat: 'Heatmap', title: 'Zonas Muertas y Máquinas Zombie: Mapa de Calor para Gym', href: '/zonas-muertas-maquinas-zombie-gym.html' },
  { slug: 'cctv-vision-ia', cat: 'Sistema', title: 'Sistema de Conteo de Personas con Cámaras: Qué Es y Cómo Instalarlo', href: '/cctv-vision-ia.html' },
  { slug: '5-formas-analisis-flujo', cat: 'Guía', title: '5 Formas en que el Análisis de Flujo y Zonas de Calor Mejora tu Tienda', href: '/articulos/5-formas-analisis-flujo.html' },
  { slug: 'como-implementar-analisis-flujo', cat: 'Guía', title: 'Cómo Implementar Análisis de Flujo con YOLO en tu Negocio', href: '/articulos/como-implementar-analisis-flujo.html' },
  { slug: 'sistema-pos-para-restaurantes', cat: 'POS', title: 'Sistema POS + Conteo de Personas: Cierra el Círculo con Datos', href: '/articulos/sistema-pos-para-restaurantes.html' }
]

function Articles({ v }: { v: VariantTheme }) {
  return (
    <section id="articulos" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          v={v}
          kicker="Aprende más"
          title={<>Guías de <span className="txt-grad">conteo de personas</span> y mapa de calor</>}
          sub="Articulos que posicionan donde V-Count paga caro por Google. Contenido que atrae gente que necesita un sistema de conteo y la convierte en demo en vivo."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.slug} y={v.motionPx} delay={cardDelay(v, i)} duration={durationOf(v)} className="h-full">
              <a href={a.href} className={`h-full ${cardSurface(v)} p-6 flex flex-col hover:border-cy/40 transition-colors group`}>
                <span className="chip font-mono text-[10px] text-cy w-fit">{a.cat}</span>
                <h3 className="mt-4 text-[15px] font-semibold text-white leading-snug group-hover:text-cy transition-colors">
                  {a.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-400 group-hover:text-cy transition-colors">
                  Leer guía <ArrowUpRight className="h-3.5 w-3.5" />
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
  { q: '¿Qué es el conteo de personas con YOLO y para qué sirve?', a: 'Es un sistema que cuenta cuántas personas entran a tu gym/tienda por hora, día y zona usando tus cámaras + YOLOv8. Sirve para saber aforo real, detectar zonas muertas, mover layout y staffing, y cumplir aforo sin comprar sensores de $1.000 USD como V-Count.' },
  { q: '¿Necesito comprar cámaras o sensores nuevos?', a: 'No. Usamos tus cámaras existentes vía RTSP/DVR. La PC que corre el sistema te la prestamos en comodato. La mensualidad cubre sistema + PC + administración y mantenimiento. Sin obras.' },
  { q: '¿Cómo es la demo en vivo sin costo?', a: 'Llevamos nuestra propia cámara a tu local y te mostramos el conteo + mapa de calor + aforo en vivo sobre tu espacio real. Ves los datos antes de decidir. Si te sirve, instalamos en 48h.' },
  { q: '¿Qué incluye la mensualidad?', a: 'Sistema YOLO + dashboard en vivo + Excel automático semanal + la PC en comodato + administración y mantenimiento del sistema. Hardware no lo compras, lo usas mientras estés suscrito.' },
  { q: '¿Cuánto tarda la instalación y qué precisión tiene?', a: 'Demo en vivo el mismo día de la visita. Instalación completa en 48h. Precisión 98% en conteo de personas verificado vs conteo manual. Reporte por franja horaria desde el día 1.' },
  { q: '¿Funciona si mi gym/tienda no está en Bogotá?', a: 'Demo presencial en Bogotá y Sabana. Otras ciudades con soporte remoto guiado. Escríbenos tu caso por WhatsApp y te decimos viabilidad.' }
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
                  <ArrowUpRight className="h-4 w-4 text-cy transition-transform group-open:rotate-45 shrink-0" />
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
  const [result, setResult] = useState<null | { ahorro: number; personasMes: number; horasPico: number; ticket: number }>(null)
  const [pending, setPending] = useState(false)
  const [msg, setMsg] = useState('')
  const [captured, setCaptured] = useState(false)
  const [inputs, setInputs] = useState({ personas_dia: '80', ticket_promedio: '15000', horas_pico: '3', empleados: '2' })

  const set = (k: keyof typeof inputs) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((s) => ({ ...s, [k]: e.target.value }))

  const calc = () => {
    const personas = parseFloat(inputs.personas_dia) || 0
    const ticket = parseFloat(inputs.ticket_promedio) || 0
    const horasPico = parseFloat(inputs.horas_pico) || 0
    const empleados = parseInt(inputs.empleados) || 1
    const personasMes = personas * 30
    // estimacion: 15% de personas no convierten por zonas muertas / saturacion
    const mejora = personasMes * 0.15 * ticket * 0.3 // 30% de la mejora capturable
    const ahorroStaff = horasPico * 30 * 12000 * empleados * 0.2 // 20% optimizacion staff
    const total = mejora + ahorroStaff
    const r = { ahorro: total, personasMes, horasPico, ticket }
    setResult(r)
    setPending(true)
    setMsg('')
    setTimeout(() => {
      setPending(false)
      setMsg(
        `Con ${personas} personas/día y ticket $${ticket.toLocaleString('es-CO')}, mueves ~${personasMes.toLocaleString('es-CO')} personas/mes. Si el 15% no convierte por zonas muertas o saturación en tus ${horasPico}h pico, el mapa de calor te deja recuperar parte. Ahorro estimado por layout + staff: $${Math.round(total).toLocaleString('es-CO')} COP/mes (sin comprar sensores, PC en comodato).`
      )
    }, 1200)
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
      _subject: 'APC VisionIA — Lead Calculadora Conteo Personas',
      email,
      personas_dia: inputs.personas_dia || 'no especificado',
      ticket_promedio: inputs.ticket_promedio || 'no especificado',
      horas_pico: inputs.horas_pico || 'no especificado',
      empleados: inputs.empleados || 'no especificado',
      ahorro_estimado: result ? Math.round(result.ahorro).toLocaleString('es-CO') : 'no calculado',
      fuente: 'calculadora_conteo_apcvisionai'
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
          title={<>Calcula tu <span className="txt-grad">ahorro con conteo</span></>}
           sub="Cada zona muerta y cada minuto de saturación cuesta dinero. Estima cuánto pierdes hoy y cuánto recuperarías con el sistema."
        />
        <Reveal y={v.motionPx} duration={durationOf(v)}>
          <div className={`mt-12 ${cardSurface(v)} p-0 overflow-hidden grid lg:grid-cols-2`}>
            <div className="p-7 md:p-9 border-b lg:border-b-0 lg:border-r border-line space-y-4">
              <label className="block"><span className="text-xs text-slate-400 mb-1 block">Personas por día (promedio)</span>
                <input className={inputCls} type="number" placeholder="80" value={inputs.personas_dia} onChange={set('personas_dia')} />
              </label>
              <label className="block"><span className="text-xs text-slate-400 mb-1 block">Ticket promedio (COP)</span>
                <input className={inputCls} type="number" placeholder="15000" value={inputs.ticket_promedio} onChange={set('ticket_promedio')} />
              </label>
              <label className="block"><span className="text-xs text-slate-400 mb-1 block">Horas pico al día</span>
                <input className={inputCls} type="number" min="0" step="0.5" placeholder="3" value={inputs.horas_pico} onChange={set('horas_pico')} />
              </label>
              <label className="block"><span className="text-xs text-slate-400 mb-1 block">Empleados en piso en pico</span>
                <input className={inputCls} type="number" min="1" max="10" value={inputs.empleados} onChange={set('empleados')} />
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
                      {v.countup ? <CountUp to={result.ahorro} duration={2.2} /> : '$' + Math.round(result.ahorro).toLocaleString('es-CO')}
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className={cardSurface(v) + ' !rounded-xl p-4'}>
                        <div className="text-[11px] text-slate-400">Personas / mes</div>
                        <div className="font-mono font-bold text-xl text-white mt-1">{Math.round(result.personasMes).toLocaleString('es-CO')}</div>
                      </div>
                      <div className={cardSurface(v) + ' !rounded-xl p-4'}>
                        <div className="text-[11px] text-slate-400">Horas pico / mes</div>
                        <div className="font-mono font-bold text-xl text-white mt-1">{Math.round(result.horasPico * 30)}h</div>
                      </div>
                    </div>
                  </div>
                  <div className={`${cardSurface(v)} !rounded-2xl p-5 text-sm text-slate-300 leading-relaxed relative min-h-[130px]`}>
                    <span className="chip font-mono text-[10px] text-cy absolute -top-3 left-4">APC VisionIA</span>
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
                    <div className="text-sm text-cy">Enviado. Te contactaremos con tu análisis de conteo.</div>
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
          title={<>¿Cuántas personas entran a tu <span className="txt-grad">gym o tienda</span> hoy?</>}
          sub="Agenda la demo en vivo sin costo: llevamos nuestra cámara, ves el conteo + mapa de calor en tu espacio, y decides. Sin piloto de 7 días."
        />
        <div className="mt-12 grid lg:grid-cols-2 gap-5">
          <Reveal y={v.motionPx} duration={durationOf(v)}>
            <div className={`h-full ${cardSurface(v)} p-8 flex flex-col`}>
              <h3 className="text-lg font-bold text-white">Demo en vivo en tu local</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Llevamos la muestra con nuestra cámara. Ves el sistema YOLO contando personas en tu gym/tienda en vivo, sin costo. Respuesta en 24h.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-3"><Cpu className="h-4 w-4 text-cy shrink-0" /> PC en comodato — no compras hardware</li>
                <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-cy shrink-0" /> Mensualidad: sistema + PC + administración</li>
                <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-cy shrink-0" /> Bogotá y Sabana — presencial 48h</li>
                <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-cy shrink-0" /> +57 333 745 0634</li>
                <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-cy shrink-0" /> serviciosapcsoporte@gmail.com</li>
              </ul>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-cta px-6 py-3.5 text-sm mt-6">
                <MessageCircle className="h-4 w-4" /> Quiero mi demo gratis
              </a>
              <div className="mt-6 rounded-2xl overflow-hidden border border-line">
                <iframe
                  title="Ubicación APC VisionIA"
                  src="https://www.google.com/maps?q=Cra+52c+%2339b-22,+Bogot%C3%A1&output=embed"
                  className="w-full h-44 grayscale contrast-[0.9] opacity-80"
loading="lazy"
            width="800"
            height="600"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          <Reveal y={v.motionPx} delay={v.motionMs < 200 ? 40 : 120} duration={durationOf(v)}>
            <div className={`h-full ${cardSurface(v)} p-8`}>
              <h3 className="text-lg font-bold text-white">Cuéntanos tu caso</h3>
              <p className="text-xs text-slate-500 mt-1">Te calificamos para la demo en vivo (cámaras, tipo negocio, aforo). Sin spam.</p>
              <form
                className="mt-5 space-y-4"
                action="https://formsubmit.co/serviciosapcsoporte@gmail.com"
                method="POST"
              >
                <input type="hidden" name="_subject" value="APC VisionIA — Demo en vivo conteo de personas" />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_honey" style={{ display: 'none' as CSSProperties['display'] }} />
                <input type="hidden" name="_captcha" value="true" />
                <input type="hidden" name="_next" value="https://apcvisionai.site/" />
                <div><label className="block text-xs text-slate-500 mb-1">Nombre</label>
                  <input type="text" name="nombre" required className="w-full px-4 py-3 rounded-xl bg-abyss-2 border border-line text-white placeholder-slate-600 focus:border-cy/50 focus:outline-none" placeholder="Tu nombre" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs text-slate-500 mb-1">WhatsApp</label>
                    <input type="tel" name="contacto" required className="w-full px-4 py-3 rounded-xl bg-abyss-2 border border-line text-white placeholder-slate-600 focus:border-cy/50 focus:outline-none" placeholder="+57 3XX XXX XXXX" /></div>
                  <div><label className="block text-xs text-slate-500 mb-1">Correo</label>
                    <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl bg-abyss-2 border border-line text-white placeholder-slate-600 focus:border-cy/50 focus:outline-none" placeholder="tu@correo.com" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs text-slate-500 mb-1">Tipo de negocio</label>
                    <select name="tipo_negocio" required className="w-full px-4 py-3 rounded-xl bg-abyss-2 border border-line text-white focus:border-cy/50 focus:outline-none">
                      <option value="">Selecciona</option>
                      <option value="gimnasio">Gimnasio / Box / Studio</option>
                      <option value="tienda_retail">Tienda retail</option>
                      <option value="supermercado">Supermercado</option>
                      <option value="restaurante">Restaurante / Bar</option>
                      <option value="otro">Otro</option>
                    </select></div>
                  <div><label className="block text-xs text-slate-500 mb-1">¿Cuántas cámaras tienes?</label>
                    <select name="num_camaras" required className="w-full px-4 py-3 rounded-xl bg-abyss-2 border border-line text-white focus:border-cy/50 focus:outline-none">
                      <option value="">Selecciona</option>
                      <option value="0">0 — no tengo</option>
                      <option value="1-2">1-2</option>
                      <option value="3-5">3-5</option>
                      <option value="6+">6+</option>
                    </select></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs text-slate-500 mb-1">Zonas a cubrir</label>
                    <input type="text" name="zonas" className="w-full px-4 py-3 rounded-xl bg-abyss-2 border border-line text-white placeholder-slate-600 focus:border-cy/50 focus:outline-none" placeholder="Ej: peso libre, cardio, entrada" /></div>
                  <div><label className="block text-xs text-slate-500 mb-1">Aforo aprox / día</label>
                    <input type="number" name="aforo_dia" min="0" className="w-full px-4 py-3 rounded-xl bg-abyss-2 border border-line text-white placeholder-slate-600 focus:border-cy/50 focus:outline-none" placeholder="Ej: 120" /></div>
                </div>
                <div><label className="block text-xs text-slate-500 mb-1">Cuéntanos tu caso</label>
                  <textarea name="mensaje" rows={3} required className="w-full px-4 py-3 rounded-xl bg-abyss-2 border border-line text-white placeholder-slate-600 focus:border-cy/50 focus:outline-none" placeholder="Qué quieres medir: conteo, mapa de calor, aforo, zonas muertas... ¿Qué cámaras/DVR tienes?" /></div>
                <button type="submit" className="btn-cta w-full px-6 py-3.5 text-sm">
                  <Send className="h-4 w-4" /> Solicitar demo en vivo sin costo
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
            Sistema de conteo de personas con YOLO, mapa de calor y control de aforo para gyms y retail en Bogotá. Demo en vivo sin costo. PC en comodato + sistema + mantenimiento.
          </p>
        </div>
        <div>
          <div className="font-bold text-white">Enlaces</div>
          <nav className="mt-3 flex flex-col gap-2">
            <a href="/" className="hover:text-cy transition-colors">Conteo de Personas</a>
            <a href="/conteo-aforo-gym-yolo.html" className="hover:text-cy transition-colors">Aforo Gym YOLO</a>
            <a href="/zonas-muertas-maquinas-zombie-gym.html" className="hover:text-cy transition-colors">Zonas Muertas Gym</a>
            <a href="/cctv-vision-ia.html" className="hover:text-cy transition-colors">Visión IA</a>
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
        <span className="font-mono">apcvisionai.site — conteo de personas · mapa de calor · control de aforo</span>
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
        <Dashboard v={v} />
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
