export type VariantName = 'quiet' | 'data' | 'cinematic'

export interface VariantTheme {
  id: VariantName
  label: string
  axis: string
  /// Estética de tarjetas: sólido (bordes) vs glass vs electric
  card: 'solid' | 'glass' | 'electric'
  /// Radio de tarjetas/secciones
  radius: number
  /// Duración de las entradas (ms)
  motionMs: number
  /// Distancia de las entradas (px)
  motionPx: number
  /// ¿Usa video de fondo en el hero?
  video: boolean
  /// ¿Debemos renderizar la capa de visión IA (DarkVeil) sobre el video?
  darkveil: boolean
  /// Glow/órbitas suaves en el hero (radiales cyan)
  orbs: boolean
  /// Fondo de rejilla técnica (líneas) en secciones
  grid: boolean
  /// Kicker con efecto brillo (ShinyText)
  shiny: boolean
  /// Título del hero animado palabra a palabra (BlurText)
  blurTitle: boolean
  /// Métricas con contador animado (CountUp)
  countup: boolean
  /// Tarjetas con entrada escalada vs deslizada
  scale: boolean
  /// Estilo del nav
  nav: 'solid' | 'glass'
}

export const VARIANTS: VariantTheme[] = [
  {
    id: 'quiet',
    label: 'Quiet',
    axis: 'Minimal · bordes + claridad',
    card: 'solid',
    radius: 16,
    motionMs: 150,
    motionPx: 10,
    video: false,
    darkveil: false,
    orbs: false,
    grid: false,
    shiny: false,
    blurTitle: false,
    countup: false,
    scale: false,
    nav: 'solid'
  },
  {
    id: 'data',
    label: 'Data',
    axis: 'Rejilla · métricas + precisión',
    card: 'electric',
    radius: 14,
    motionMs: 320,
    motionPx: 16,
    video: true,
    darkveil: false,
    orbs: false,
    grid: true,
    shiny: false,
    blurTitle: false,
    countup: true,
    scale: false,
    nav: 'solid'
  },
  {
    id: 'cinematic',
    label: 'Cinematic',
    axis: 'Immersivo · video + glow',
    card: 'glass',
    radius: 20,
    motionMs: 700,
    motionPx: 24,
    video: true,
    darkveil: true,
    orbs: true,
    grid: false,
    shiny: true,
    blurTitle: true,
    countup: true,
    scale: true,
    nav: 'glass'
  }
]

export const VIDEO_SRC = '/videos/Servicios%20APC-opt.mp4'
export const VIDEO_POSTER = '/imagenes/Hero%20Image.webp'
export const WHATSAPP =
  'https://wa.me/573337450634?text=' +
  encodeURIComponent('Hola Alejandro, quiero un diagnóstico gratuito de arqueo de caja con IA para mi negocio.')