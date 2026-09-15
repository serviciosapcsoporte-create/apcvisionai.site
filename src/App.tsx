import { useState } from 'react'
import { VARIANTS } from './theme'
import ArqueoLanding from './pages/ArqueoLanding'
import PrototypePicker from './components/PrototypePicker'

export default function App() {
  const [variant, setVariant] = useState(() => {
    const q = new URLSearchParams(window.location.search).get('v')
    const n = q ? parseInt(q, 10) : NaN
    return Number.isFinite(n) && n >= 1 && n <= VARIANTS.length ? n - 1 : 0
  })
  const [nonce, setNonce] = useState(0)

  return (
    <>
      <ArqueoLanding key={`${variant}-${nonce}`} v={VARIANTS[variant]} />
      <PrototypePicker
        current={variant}
        onSelect={setVariant}
        onReplay={() => setNonce((n) => n + 1)}
      />
    </>
  )
}