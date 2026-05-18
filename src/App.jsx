import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase.js'

const P = "#552072"
const OFF = "#EFEFEF"
const W = "#FFFFFF"
const DARK = "#1a0a24"
const GREEN = "#2e7d32"
const RED = "#c62828"
const AMBER = "#f59e0b"

const PAYMENT_METHODS = [
  { key: "dinheiro", label: "DINHEIRO" },
  { key: "debito",   label: "DÉBITO"   },
  { key: "credito",  label: "CRÉDITO"  },
  { key: "pix",      label: "PIX"      },
  { key: "voucher",  label: "VOUCHER"  },
]

const NAV = [
  { key: "painel",      label: "Painel",      icon: "⊞" },
  { key: "caixa",       label: "Caixa",       icon: "◈" },
  { key: "pdv",         label: "PDV",         icon: "▦" },
  { key: "mesas",       label: "Mesas",       icon: "⊡" },
  { key: "historico",   label: "Histórico",   icon: "≡" },
  { key: "faturamento", label: "Faturamento", icon: "◎" },
  { key: "clientes",    label: "Clientes",    icon: "◉" },
  { key: "produtos",    label: "Produtos",    icon: "❖" },
  { key: "estoque",     label: "Estoque",     icon: "◧" },
  { key: "categorias",  label: "Categorias",  icon: "◫" },
]

const fmt = (v) => `R$ ${Number(v || 0).toFixed(2).replace('.', ',')}`
const todayStr = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}
const ptsEarned = (total) => Math.floor(total / 10)

// ─── Shared UI ────────────────────────────────────────────────────────────────

const s = {
  input: { padding: '9px 12px', fontSize: 13, fontFamily: 'inherit', border: `2px solid ${P}`, outline: 'none', background: OFF, color: DARK, width: '100%' },
  label: { fontSize: 9, letterSpacing: 1.5, color: '#888', fontWeight: 700 },
}

function Field({ label, children }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>{label && <span style={s.label}>{label}</span>}{children}</div>
}

function Input({ label, value, onChange, type = 'text', placeholder, autoFocus, style: sx = {} }) {
  return (
    <Field label={label}>
      <input autoFocus={autoFocus} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...s.input, ...sx }} />
    </Field>
  )
}

function Btn({ children, onClick, disabled, variant = 'primary', full, style: sx = {} }) {
  const base = { fontFamily: 'inherit', cursor: disabled ? 'not-allowed' : 'pointer', border: 'none', fontWeight: 700, letterSpacing: 1, width: full ? '100%' : undefined, padding: '13px 20px', fontSize: 12, opacity: disabled ? 0.4 : 1 }
  const variants = { primary: { background: P, color: W }, ghost: { background: 'transparent', color: P, border: `2px solid ${P}` }, danger: { background: RED, color: W }, success: { background: GREEN, color: W }, amber: { background: AMBER, color: W } }
  return <button onClick={!disabled ? onClick : undefined} style={{ ...base, ...variants[variant], ...sx }}>{children}</button>
}

function Card({ children, style: sx = {} }) {
  return <div style={{ background: W, border: `2px solid #e0d0ea`, padding: 18, ...sx }}>{children}</div>
}

function SecTitle({ children }) {
  return <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: P, marginBottom: 14, borderBottom: `2px solid ${P}`, paddingBottom: 7 }}>{children}</div>
}

function Spinner() {
  return <div style={{ padding: 40, textAlign: 'center', color: P, fontSize: 12, letterSpacing: 1 }}>CARREGANDO...</div>
}

// ─── Date filter ──────────────────────────────────────────────────────────────

function useDateFilter() {
  const [preset, setPreset] = useState('hoje')
  const [from, setFrom] = useState(todayStr())
  const [to, setTo] = useState(todayStr())

  function applyPreset(p) {
    setPreset(p)
    const now = new Date()
    const pad = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
    if (p === 'hoje')   { setFrom(pad(now)); setTo(pad(now)) }
    if (p === 'ontem')  { const d = new Date(now); d.setDate(d.getDate()-1); setFrom(pad(d)); setTo(pad(d)) }
    if (p === 'semana') { const d = new Date(now); d.setDate(d.getDate()-6); setFrom(pad(d)); setTo(pad(now)) }
    if (p === 'mes')    { const d = new Date(now); d.setDate(1); setFrom(pad(d)); setTo(pad(now)) }
  }

  return { preset, applyPreset, from, setFrom, to, setTo }
}

function DateFilterBar({ filter }) {
  const { preset, applyPreset, from, setFrom, to, setTo } = filter
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
      {[['hoje','HOJE'],['ontem','ONTEM'],['semana','SEMANA'],['mes','MÊS'],['custom','PERSONALIZADO']].map(([k,l]) => (
        <button key={k} onClick={() => applyPreset(k)} style={{ padding: '8px 14px', fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer', border: `2px solid ${P}`, background: preset === k ? P : 'transparent', color: preset === k ? W : P }}>{l}</button>
      ))}
      {preset === 'custom' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
          <span style={{ fontSize: 10, color: '#888' }}>DE</span>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} style={{ padding: '7px 10px', fontSize: 12, fontFamily: 'inherit', border: `2px solid ${P}`, outline: 'none', background: OFF, color: DARK }} />
          <span style={{ fontSize: 10, color: '#888' }}>ATÉ</span>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} style={{ padding: '7px 10px', fontSize: 12, fontFamily: 'inherit', border: `2px solid ${P}`, outline: 'none', background: OFF, color: DARK }} />
        </div>
      )}
    </div>
  )
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Email ou senha incorretos.')
    else onLogin()
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: OFF, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: W, border: `3px solid ${P}`, padding: '44px 48px', width: 380 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: P, marginBottom: 4 }}>Rodat</div>
        <div style={{ fontSize: 10, color: '#aaa', letterSpacing: 1, marginBottom: 32 }}>DOCES E CAFÉS — SISTEMA DE CAIXA</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="EMAIL" type="email" value={email} onChange={setEmail} placeholder="seu@email.com" autoFocus />
          <Input label="SENHA" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          {error && <div style={{ fontSize: 11, color: RED, fontWeight: 600 }}>{error}</div>}
          <Btn full onClick={handleLogin} disabled={loading || !email || !password}>
            {loading ? 'ENTRANDO...' : 'ENTRAR'}
          </Btn>
        </div>
      </div>
    </div>
  )
}

// ─── Cart hook ────────────────────────────────────────────────────────────────

function useCart() {
  const [cart, setCart] = useState([])
  const add = p => setCart(prev => { const ex = prev.find(i => i.id === p.id); if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty+1 } : i); return [...prev, { ...p, qty: 1 }] })
  const changeQty = (id, d) => setCart(prev => { const item = prev.find(i => i.id === id); if (!item) return prev; if (item.qty+d <= 0) return prev.filter(i => i.id !== id); return prev.map(i => i.id === id ? { ...i, qty: i.qty+d } : i) })
  const clear = () => setCart([])
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)
  return { cart, add, changeQty, clear, total, count }
}

// ─── Product grid ─────────────────────────────────────────────────────────────

function ProductGrid({ products, cart, onAdd }) {
  const [cat, setCat] = useState('todos')
  const [search, setSearch] = useState('')
  const filtered = products.filter(p => p.active && p.qty > 0 && (cat === 'todos' || p.category === cat) && p.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <div style={{ background: W, padding: '10px 14px', borderBottom: `2px solid ${P}`, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar produto..." style={{ flex: 1, minWidth: 120, padding: '8px 12px', fontSize: 11, border: `2px solid ${P}`, outline: 'none', fontFamily: 'inherit', background: OFF, color: DARK }} />
        {['todos','bolos','doces','bebidas'].map(c => <button key={c} onClick={() => setCat(c)} style={{ padding: '8px 12px', fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer', border: `2px solid ${P}`, background: cat === c ? P : 'transparent', color: cat === c ? W : P }}>{c.toUpperCase()}</button>)}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10, alignContent: 'start' }}>
        {filtered.map(product => {
          const inCart = cart.find(i => i.id === product.id)
          const low = product.min_qty > 0 && product.qty <= product.min_qty
          return (
            <button key={product.id} onClick={() => onAdd(product)} style={{ background: inCart ? P : W, border: `2px solid ${low && !inCart ? AMBER : P}`, color: inCart ? W : DARK, padding: '13px 12px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', position: 'relative' }}>
              {inCart && <div style={{ position: 'absolute', top: 0, right: 0, background: W, color: P, fontWeight: 700, fontSize: 10, padding: '2px 6px', borderLeft: `2px solid ${P}`, borderBottom: `2px solid ${P}` }}>×{inCart.qty}</div>}
              {low && !inCart && <div style={{ position: 'absolute', top: 0, left: 0, background: AMBER, color: W, fontSize: 8, fontWeight: 700, padding: '2px 6px' }}>BAIXO</div>}
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6, lineHeight: 1.4, marginTop: low && !inCart ? 10 : 0 }}>{product.name}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: inCart ? '#e0c0f5' : P }}>{fmt(product.price)}</div>
              <div style={{ fontSize: 9, color: inCart ? 'rgba(255,255,255,0.6)' : '#aaa', marginTop: 4 }}>{product.qty} un. restantes</div>
            </button>
          )
        })}
        {filtered.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#bbb', fontSize: 12, padding: 40 }}>Nenhum produto disponível</div>}
      </div>
    </div>
  )
}

function CartPanel({ cart, changeQty, clear, total, count, onCheckout }) {
  const [descontoStr, setDescontoStr] = useState('')
  const desconto = Math.min(parseFloat(descontoStr) || 0, total)
  const totalFinal = Math.max(0, total - desconto)

  return (
    <div style={{ width: 300, background: W, display: 'flex', flexDirection: 'column', borderLeft: `3px solid ${P}` }}>
      <div style={{ padding: '11px 14px', borderBottom: `2px solid ${P}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: 9, letterSpacing: 1, color: P }}>ITENS DA VENDA</span>
        {cart.length > 0 && <button onClick={() => { clear(); setDescontoStr('') }} style={{ fontSize: 9, color: RED, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>LIMPAR</button>}
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {cart.length === 0 && <div style={{ padding: 28, textAlign: 'center', color: '#bbb', fontSize: 11 }}>Nenhum item</div>}
        {cart.map((item, idx) => (
          <div key={item.id} style={{ padding: '10px 12px', borderBottom: `1px solid ${OFF}`, background: idx % 2 === 0 ? W : '#faf8fc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 11, fontWeight: 600, flex: 1, paddingRight: 6, lineHeight: 1.3 }}>{item.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: P }}>{fmt(item.price * item.qty)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 9, color: '#aaa' }}>{fmt(item.price)} cada</span>
              <div style={{ display: 'flex' }}>
                <button onClick={() => changeQty(item.id, -1)} style={{ width: 22, height: 22, background: OFF, border: `1px solid ${P}`, color: P, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>−</button>
                <span style={{ width: 26, textAlign: 'center', fontWeight: 700, fontSize: 11, border: `1px solid ${P}`, borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.qty}</span>
                <button onClick={() => changeQty(item.id, 1)} style={{ width: 22, height: 22, background: P, border: `1px solid ${P}`, color: W, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: `3px solid ${P}`, background: OFF }}>
        <div style={{ padding: '11px 14px' }}>
          {cart.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 8, color: '#888', letterSpacing: 1, marginBottom: 5 }}>DESCONTO (R$)</div>
              <input type="number" value={descontoStr} onChange={e => setDescontoStr(e.target.value)} placeholder="0,00" min="0"
                style={{ width: '100%', padding: '7px 10px', fontSize: 14, fontWeight: 700, border: `2px solid ${desconto > 0 ? '#e67e22' : P}`, outline: 'none', fontFamily: 'inherit', background: W, color: desconto > 0 ? '#e67e22' : DARK, textAlign: 'center' }} />
              {desconto > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 10, color: '#888' }}><span>Subtotal:</span><span style={{ textDecoration: 'line-through' }}>{fmt(total)}</span></div>}
            </div>
          )}
          <div style={{ fontSize: 8, color: '#888', letterSpacing: 1 }}>TOTAL</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: desconto > 0 ? '#e67e22' : P }}>{fmt(totalFinal)}</div>
          <div style={{ fontSize: 9, color: '#999' }}>{count} item{count !== 1 ? 's' : ''}</div>
        </div>
        <button onClick={() => cart.length > 0 && onCheckout(totalFinal, desconto)} style={{ width: '100%', padding: '16px', fontSize: 12, fontWeight: 700, letterSpacing: 2, background: cart.length > 0 ? P : '#ccc', color: W, border: 'none', cursor: cart.length > 0 ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>COBRAR →</button>
      </div>
    </div>
  )
}

function PaymentPanel({ total, desconto = 0, onConfirm, onBack, clients }) {
  const [payment, setPayment] = useState(null)
  const [cash, setCash] = useState('')
  const [phone, setPhone] = useState('')
  const [foundClient, setFoundClient] = useState(null)
  const [usePoints, setUsePoints] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const cashVal = parseFloat(cash) || 0
  const pointDiscount = usePoints && foundClient && foundClient !== 'not_found' ? Math.min(foundClient.points, Math.floor(total)) : 0
  const finalTotal = Math.max(0, total - pointDiscount)
  const change = payment === 'dinheiro' ? Math.max(0, cashVal - finalTotal) : 0
  const canConfirm = payment && (payment !== 'dinheiro' || cashVal >= finalTotal)

  function searchClient() {
    const c = clients.find(c => c.phone === phone.replace(/\D/g, ''))
    setFoundClient(c || 'not_found')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '11px 18px', borderBottom: `2px solid ${P}`, fontSize: 9, fontWeight: 700, letterSpacing: 1, color: P }}>PAGAMENTO</div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#888', marginBottom: 8 }}>FIDELIDADE (OPCIONAL)</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefone" style={{ flex: 1, padding: '8px 11px', fontSize: 11, border: `2px solid #ccc`, outline: 'none', fontFamily: 'inherit', background: OFF }} />
            <button onClick={searchClient} style={{ padding: '8px 12px', background: P, color: W, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 9, fontWeight: 700 }}>BUSCAR</button>
          </div>
          {foundClient && foundClient !== 'not_found' && (
            <div style={{ marginTop: 8, padding: '10px 12px', background: '#f3e8ff', border: `2px solid ${P}` }}>
              <div style={{ fontWeight: 700, fontSize: 12 }}>{foundClient.name}</div>
              <div style={{ fontSize: 10, color: '#666', marginTop: 2 }}>{foundClient.points} pontos · {fmt(foundClient.points)} de desconto</div>
              {foundClient.points > 0 && <button onClick={() => setUsePoints(u => !u)} style={{ marginTop: 8, padding: '5px 10px', fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer', border: `2px solid ${P}`, background: usePoints ? P : 'transparent', color: usePoints ? W : P }}>{usePoints ? '✓ USANDO PONTOS' : 'USAR PONTOS'}</button>}
            </div>
          )}
          {foundClient === 'not_found' && <div style={{ marginTop: 6, fontSize: 10, color: '#999' }}>Cliente não encontrado.</div>}
        </div>
        <div style={{ background: OFF, padding: '12px 14px', borderLeft: `4px solid ${P}` }}>
          {desconto > 0 && <div style={{ fontSize: 10, color: '#e67e22', marginBottom: 2 }}>Desconto aplicado: −{fmt(desconto)}</div>}
          {pointDiscount > 0 && <div style={{ fontSize: 10, color: '#888', marginBottom: 2 }}>Desconto pontos: −{fmt(pointDiscount)}</div>}
          <div style={{ fontSize: 8, color: '#888' }}>TOTAL A COBRAR</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: P }}>{fmt(finalTotal)}</div>
        </div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#888', marginBottom: 8 }}>FORMA DE PAGAMENTO</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {PAYMENT_METHODS.map(m => <button key={m.key} onClick={() => { setPayment(m.key); setCash('') }} style={{ padding: '14px 8px', fontFamily: 'inherit', cursor: 'pointer', fontSize: 11, fontWeight: 700, letterSpacing: 1, border: `2px solid ${P}`, background: payment === m.key ? P : OFF, color: payment === m.key ? W : P }}>{m.label}</button>)}
          </div>
        </div>
        {payment === 'dinheiro' && (
          <div>
            <Input label="VALOR RECEBIDO (R$)" type="number" value={cash} onChange={setCash} placeholder="0,00" autoFocus style={{ fontSize: 24, fontWeight: 700, textAlign: 'center' }} />
            {cashVal >= finalTotal && cashVal > 0 && (
              <div style={{ marginTop: 10, padding: '13px 16px', background: '#e8f5e9', border: `2px solid ${GREEN}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 10, color: GREEN, letterSpacing: 1 }}>TROCO</span>
                <span style={{ fontSize: 26, fontWeight: 700, color: GREEN }}>{fmt(change)}</span>
              </div>
            )}
            {cashVal > 0 && cashVal < finalTotal && <div style={{ marginTop: 8, padding: '10px 12px', background: '#ffebee', border: `2px solid ${RED}`, fontSize: 10, color: RED, fontWeight: 700 }}>FALTA {fmt(finalTotal - cashVal)}</div>}
          </div>
        )}
      </div>
      <div style={{ borderTop: `2px solid ${P}` }}>
        <button onClick={onBack} style={{ width: '100%', padding: '11px', fontSize: 10, fontWeight: 700, letterSpacing: 1, background: 'transparent', color: P, border: 'none', borderBottom: `1px solid ${OFF}`, cursor: 'pointer', fontFamily: 'inherit' }}>← VOLTAR</button>
        <button disabled={!canConfirm} onClick={() => { if (confirming) return; setConfirming(true); onConfirm({ payment, finalTotal, change, foundClient: foundClient !== 'not_found' ? foundClient : null, pointsEarned: ptsEarned(finalTotal), pointsUsed: pointDiscount, usePoints }) }} style={{ width: '100%', padding: '18px', fontSize: 13, fontWeight: 700, letterSpacing: 2, background: canConfirm ? P : '#ccc', color: W, border: 'none', cursor: canConfirm ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>CONFIRMAR PAGAMENTO</button>
      </div>
    </div>
  )
}

function SuccessScreen({ result, onNew }) {
  const label = PAYMENT_METHODS.find(m => m.key === result.payment)?.label
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: OFF }}>
      <div style={{ background: W, border: `3px solid ${P}`, padding: '44px 56px', textAlign: 'center', maxWidth: 400, width: '100%' }}>
        <div style={{ fontSize: 48, color: GREEN, fontWeight: 700, marginBottom: 10 }}>✓</div>
        <div style={{ fontSize: 9, letterSpacing: 2, color: '#888', marginBottom: 6 }}>VENDA CONFIRMADA</div>
        <div style={{ fontSize: 40, fontWeight: 700, color: P, marginBottom: 4 }}>{fmt(result.finalTotal)}</div>
        <div style={{ fontSize: 11, color: '#888', letterSpacing: 1, marginBottom: 20 }}>{label}</div>
        {result.payment === 'dinheiro' && result.change > 0 && (
          <div style={{ padding: '14px 20px', marginBottom: 20, background: '#e8f5e9', border: `2px solid ${GREEN}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, letterSpacing: 1, color: GREEN, fontSize: 11 }}>TROCO</span>
            <span style={{ fontSize: 30, fontWeight: 700, color: GREEN }}>{fmt(result.change)}</span>
          </div>
        )}
        {result.foundClient && (
          <div style={{ padding: '12px 16px', marginBottom: 20, background: '#f3e8ff', border: `2px solid ${P}`, textAlign: 'left' }}>
            <div style={{ fontSize: 11, color: P, fontWeight: 700 }}>{result.foundClient.name}</div>
            {result.usePoints && result.pointsUsed > 0 && <div style={{ fontSize: 10, color: '#666' }}>−{result.pointsUsed} pontos usados</div>}
            <div style={{ fontSize: 10, color: '#666' }}>+{result.pointsEarned} pontos ganhos</div>
          </div>
        )}
        <button onClick={onNew} style={{ width: '100%', padding: '16px', fontSize: 12, fontWeight: 700, letterSpacing: 2, background: P, color: W, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>NOVA VENDA</button>
      </div>
    </div>
  )
}

// ─── Edit Product Modal ───────────────────────────────────────────────────────

function EditProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState({
    name: product.name, price: String(product.price), category: product.category,
    cost_insumos: String(product.cost_insumos || 0), cost_prod: String(product.cost_prod || 0),
    qty: String(product.qty), min_qty: String(product.min_qty),
  })
  const lucro = (parseFloat(form.price)||0) - (parseFloat(form.cost_insumos)||0) - (parseFloat(form.cost_prod)||0)

  async function save() {
    const updated = { ...product, name: form.name, price: parseFloat(form.price)||0, category: form.category, cost_insumos: parseFloat(form.cost_insumos)||0, cost_prod: parseFloat(form.cost_prod)||0, qty: parseInt(form.qty)||0, min_qty: parseInt(form.min_qty)||0 }
    await supabase.from('produtos').update({ name: updated.name, price: updated.price, category: updated.category, cost_insumos: updated.cost_insumos, cost_prod: updated.cost_prod, qty: updated.qty, min_qty: updated.min_qty }).eq('id', product.id)
    onSave(updated)
    onClose()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: W, border: `3px solid ${P}`, padding: 28, width: 480, maxHeight: '90vh', overflowY: 'auto', fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: P }}>Editar Produto</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#aaa' }}>✕</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="NOME" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
          <Field label="CATEGORIA">
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ ...s.input }}>
              <option value="bolos">Bolos</option><option value="doces">Doces</option><option value="bebidas">Bebidas</option>
            </select>
          </Field>
          <div style={{ borderTop: `1px solid ${OFF}`, paddingTop: 14 }}>
            <div style={{ ...s.label, marginBottom: 12 }}>PREÇOS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              <Input label="VENDA (R$)" type="number" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} placeholder="0,00" />
              <Input label="INSUMOS (R$)" type="number" value={form.cost_insumos} onChange={v => setForm(f => ({ ...f, cost_insumos: v }))} placeholder="0,00" />
              <Input label="PRODUÇÃO (R$)" type="number" value={form.cost_prod} onChange={v => setForm(f => ({ ...f, cost_prod: v }))} placeholder="0,00" />
            </div>
            <div style={{ marginTop: 12, padding: '10px 14px', background: lucro >= 0 ? '#e8f5e9' : '#ffebee', border: `2px solid ${lucro >= 0 ? GREEN : RED}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: lucro >= 0 ? GREEN : RED }}>LUCRO POR UNIDADE</span>
              <span style={{ fontSize: 22, fontWeight: 700, color: lucro >= 0 ? GREEN : RED }}>{fmt(lucro)}</span>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${OFF}`, paddingTop: 14 }}>
            <div style={{ ...s.label, marginBottom: 12 }}>ESTOQUE</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Input label="QUANTIDADE ATUAL" type="number" value={form.qty} onChange={v => setForm(f => ({ ...f, qty: v }))} />
              <Input label="QUANTIDADE MÍNIMA" type="number" value={form.min_qty} onChange={v => setForm(f => ({ ...f, min_qty: v }))} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <Btn variant="ghost" onClick={onClose} style={{ flex: 1 }}>CANCELAR</Btn>
            <Btn onClick={save} disabled={!form.name || !form.price} style={{ flex: 1 }}>SALVAR</Btn>
          </div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULES
// ══════════════════════════════════════════════════════════════════════════════

function Painel({ caixaAberto, fundoInicial, sales, stockItems, products, setScreen }) {
  const today = sales.filter(v => v.date === todayStr())
  const totalDia = today.reduce((s, v) => s + v.total, 0)
  const dinheiroDia = today.filter(v => v.payment === 'dinheiro').reduce((s, v) => s + v.total, 0)
  const trocosDia = today.filter(v => v.payment === 'dinheiro').reduce((s, v) => s + (v.change_val || 0), 0)
  const dinheiroEmCaixa = fundoInicial + dinheiroDia - trocosDia
  const lowStock = stockItems.filter(i => i.min_qty > 0 && i.qty <= i.min_qty)
  const lowProducts = products.filter(p => p.active && p.min_qty > 0 && p.qty <= p.min_qty)

  return (
    <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: P }}>Rodat Doces e Cafés</div>
        <div style={{ fontSize: 9, color: '#aaa', letterSpacing: 1, marginTop: 2 }}>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()}</div>
      </div>
      {!caixaAberto && <div onClick={() => setScreen('caixa')} style={{ padding: '12px 18px', background: '#fff8e1', border: `2px solid ${AMBER}`, marginBottom: 16, fontSize: 12, fontWeight: 600, color: '#6d4c00', cursor: 'pointer' }}>⚠ Caixa não foi aberto hoje — clique para abrir</div>}
      {(lowStock.length > 0 || lowProducts.length > 0) && (
        <div style={{ padding: '12px 18px', background: '#ffebee', border: `2px solid ${RED}`, marginBottom: 16 }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: RED, marginBottom: 8 }}>ALERTAS DE ESTOQUE BAIXO</div>
          {lowProducts.map(p => <div key={p.id} style={{ fontSize: 11, color: RED, marginBottom: 3 }}>• {p.name} — {p.qty} un. (mín. {p.min_qty})</div>)}
          {lowStock.map(i => <div key={i.id} style={{ fontSize: 11, color: RED, marginBottom: 3 }}>• {i.name} — {i.qty} {i.unit} (mín. {i.min_qty})</div>)}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[{ label: 'VENDAS HOJE', value: today.length, sub: 'transações' }, { label: 'FATURAMENTO', value: fmt(totalDia), sub: 'todas as formas' }, { label: 'DINHEIRO EM CAIXA', value: fmt(dinheiroEmCaixa), sub: 'estimativa', h: true }, { label: 'FUNDO INICIAL', value: fmt(fundoInicial), sub: 'abertura' }].map(c => (
          <Card key={c.label} style={{ borderLeft: `4px solid ${c.h ? GREEN : P}` }}>
            <div style={{ fontSize: 8, letterSpacing: 1.5, color: '#888', marginBottom: 5 }}>{c.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: c.h ? GREEN : P }}>{c.value}</div>
            <div style={{ fontSize: 10, color: '#aaa', marginTop: 2 }}>{c.sub}</div>
          </Card>
        ))}
      </div>
      <SecTitle>ÚLTIMAS VENDAS</SecTitle>
      {today.length === 0 && <div style={{ fontSize: 12, color: '#bbb' }}>Nenhuma venda registrada ainda.</div>}
      {today.slice(0, 6).map(v => (
        <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${OFF}` }}>
          <span style={{ color: '#888', fontSize: 10, width: 45 }}>{v.time}</span>
          <span style={{ flex: 1, paddingLeft: 12, fontSize: 11 }}>{v.items_count} {v.items_count === 1 ? 'item' : 'itens'}{v.origin === 'mesa' ? ` · Mesa ${v.mesa}` : ' · Balcão'}</span>
          <span style={{ fontWeight: 700, color: P, marginLeft: 12 }}>{fmt(v.total)}</span>
        </div>
      ))}
    </div>
  )
}

function CaixaModule({ caixaAberto, setCaixaAberto, fundoInicial, setFundoInicial, sales, movimentos, reloadMovimentos, reloadCaixa }) {
  const [inputFundo, setInputFundo] = useState('')
  const [sangriaVal, setSangriaVal] = useState('')
  const [suprVal, setSuprVal] = useState('')
  const [obs, setObs] = useState('')
  const [showFechamento, setShowFechamento] = useState(false)
  const [maquinaVals, setMaquinaVals] = useState({ debito: '', credito: '', pix: '', voucher: '', dinheiro: '' })
  const [showRelatorio, setShowRelatorio] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const todaySales = sales.filter(v => v.date === todayStr())
  const totalSangrias = movimentos.filter(m => m.tipo === 'sangria').reduce((s, m) => s + m.valor, 0)
  const totalSuprimentos = movimentos.filter(m => m.tipo === 'suprimento').reduce((s, m) => s + m.valor, 0)
  const dinheiroDia = todaySales.filter(v => v.payment === 'dinheiro').reduce((s, v) => s + v.total, 0)
  const trocosDia = todaySales.filter(v => v.payment === 'dinheiro').reduce((s, v) => s + (v.change_val || 0), 0)
  const dinheiroEmCaixa = fundoInicial + dinheiroDia - trocosDia - totalSangrias + totalSuprimentos
  const byPayment = key => todaySales.filter(v => v.payment === key).reduce((s, v) => s + v.total, 0)
  const totalDia = todaySales.reduce((s, v) => s + v.total, 0)
  const ticketMedio = todaySales.length ? totalDia / todaySales.length : 0

  const itemSummary = {}
  todaySales.forEach(v => v.itens && v.itens.forEach(i => {
    if (!itemSummary[i.produto_id || i.name]) itemSummary[i.produto_id || i.name] = { name: i.name, qty: 0, revenue: 0, costInsumos: 0, costProd: 0 }
    itemSummary[i.produto_id || i.name].qty += i.qty
    itemSummary[i.produto_id || i.name].revenue += i.price * i.qty
    itemSummary[i.produto_id || i.name].costInsumos += (i.cost_insumos || 0) * i.qty
    itemSummary[i.produto_id || i.name].costProd += (i.cost_prod || 0) * i.qty
  }))

  async function abrirCaixa() {
    setLoading(true)
    const fundo = parseFloat(inputFundo) || 0
    await supabase.from('caixa').upsert({ date: todayStr(), fundo_inicial: fundo, aberto: true })
    setFundoInicial(fundo)
    setCaixaAberto(true)
    setLoading(false)
  }

  async function registrarMovimento(tipo, valor, obsText) {
    await supabase.from('movimentos').insert({ tipo, valor, obs: obsText, date: todayStr() })
    reloadMovimentos()
  }

  async function fecharCaixa() {
    await supabase.from('caixa').update({ aberto: false, fechado_at: new Date().toISOString() }).eq('date', todayStr())
    setCaixaAberto(false)
    setShowFechamento(false)
    setShowRelatorio(false)
    reloadCaixa()
  }

  function buildCSV() {
    const lines = ['RELATÓRIO DE FECHAMENTO — RODAT DOCES E CAFÉS', `Data: ${new Date().toLocaleDateString('pt-BR')}`, '']
    lines.push('CAIXA', `Fundo inicial,${fmt(fundoInicial)}`, `Dinheiro em caixa,${fmt(dinheiroEmCaixa)}`, `Sangrias,${fmt(totalSangrias)}`, `Suprimentos,${fmt(totalSuprimentos)}`, `Trocos dados,${fmt(trocosDia)}`, '')
    lines.push('FATURAMENTO', `Total do dia,${fmt(totalDia)}`, `Número de vendas,${todaySales.length}`, `Ticket médio,${fmt(ticketMedio)}`, '')
    lines.push('POR FORMA DE PAGAMENTO')
    PAYMENT_METHODS.forEach(m => lines.push(`${m.label},${fmt(byPayment(m.key))}`))
    lines.push('', 'CONFERÊNCIA COM MÁQUINA')
    PAYMENT_METHODS.forEach(m => { const sys = byPayment(m.key); const mq = parseFloat(maquinaVals[m.key]) || 0; lines.push(`${m.label},Sistema: ${fmt(sys)},Máquina: ${fmt(mq)},Diferença: ${fmt(mq - sys)}`) })
    lines.push('', 'ITENS VENDIDOS', 'Produto,Qtd,Receita,Custo Insumos,Custo Produção,Lucro')
    Object.values(itemSummary).forEach(i => { const lucro = i.revenue - i.costInsumos - i.costProd; lines.push(`${i.name},${i.qty},${fmt(i.revenue)},${fmt(i.costInsumos)},${fmt(i.costProd)},${fmt(lucro)}`) })
    return lines.join('\n')
  }

  function copyCSV() { navigator.clipboard.writeText(buildCSV()).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }

  if (!caixaAberto) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: OFF }}>
      <Card style={{ maxWidth: 380, width: '100%', padding: 32 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: P, marginBottom: 4 }}>Abertura de Caixa</div>
        <p style={{ fontSize: 12, color: '#666', marginBottom: 20 }}>Informe o fundo de troco disponível para iniciar o dia.</p>
        <Input label="FUNDO INICIAL (R$)" type="number" value={inputFundo} onChange={setInputFundo} placeholder="0,00" autoFocus />
        <div style={{ marginTop: 16 }}><Btn full onClick={abrirCaixa} disabled={loading || !inputFundo}>{loading ? 'ABRINDO...' : 'ABRIR CAIXA'}</Btn></div>
      </Card>
    </div>
  )

  if (showFechamento && !showRelatorio) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: P, marginBottom: 4 }}>Fechamento de Caixa</div>
      <p style={{ fontSize: 12, color: '#666', marginBottom: 24 }}>Confira os valores com a maquininha.</p>
      <div style={{ background: W, border: `2px solid #e0d0ea`, marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: P, color: W, padding: '10px 16px', fontSize: 9, fontWeight: 700, letterSpacing: 1, gap: 8 }}>
          <span>FORMA</span><span style={{ textAlign: 'right' }}>SISTEMA</span><span style={{ textAlign: 'right' }}>MÁQUINA</span><span style={{ textAlign: 'right' }}>DIFERENÇA</span>
        </div>
        {PAYMENT_METHODS.map(m => { const sys = byPayment(m.key); const mq = parseFloat(maquinaVals[m.key]) || 0; const diff = mq - sys; const ok = maquinaVals[m.key] === '' || Math.abs(diff) < 0.01; return (
          <div key={m.key} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 16px', borderBottom: `1px solid ${OFF}`, alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600 }}>{m.label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: P, textAlign: 'right' }}>{fmt(sys)}</span>
            <input type="number" value={maquinaVals[m.key]} onChange={e => setMaquinaVals(v => ({ ...v, [m.key]: e.target.value }))} placeholder="—" style={{ padding: '6px 8px', fontSize: 12, fontWeight: 700, border: `2px solid ${P}`, outline: 'none', fontFamily: 'inherit', background: OFF, textAlign: 'right' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: ok ? GREEN : RED, textAlign: 'right' }}>{maquinaVals[m.key] !== '' ? (diff >= 0 ? '+' : '') + fmt(diff) + (ok ? ' ✓' : '') : '—'}</span>
          </div>
        ) })}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Btn variant="ghost" onClick={() => setShowFechamento(false)}>← VOLTAR</Btn>
        <Btn onClick={() => setShowRelatorio(true)}>GERAR RELATÓRIO →</Btn>
      </div>
    </div>
  )

  if (showRelatorio) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: P, marginBottom: 20 }}>Relatório de Fechamento</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: 12, marginBottom: 20 }}>
        {[{ l: 'FUNDO INICIAL', v: fmt(fundoInicial) }, { l: 'DINHEIRO EM CAIXA', v: fmt(dinheiroEmCaixa), h: true }, { l: 'TOTAL FATURADO', v: fmt(totalDia) }, { l: 'TICKET MÉDIO', v: fmt(ticketMedio) }, { l: 'SANGRIAS', v: fmt(totalSangrias) }, { l: 'SUPRIMENTOS', v: fmt(totalSuprimentos) }].map(c => (
          <Card key={c.l} style={{ borderLeft: `4px solid ${c.h ? GREEN : P}` }}><div style={{ fontSize: 8, letterSpacing: 1.5, color: '#888', marginBottom: 4 }}>{c.l}</div><div style={{ fontSize: 20, fontWeight: 700, color: c.h ? GREEN : P }}>{c.v}</div></Card>
        ))}
      </div>
      <SecTitle>CONFERÊNCIA COM MÁQUINA</SecTitle>
      <div style={{ background: W, border: `2px solid #e0d0ea`, marginBottom: 20 }}>
        {PAYMENT_METHODS.map(m => { const sys = byPayment(m.key); const mq = parseFloat(maquinaVals[m.key]) || 0; const diff = mq - sys; const ok = maquinaVals[m.key] === '' || Math.abs(diff) < 0.01; return (
          <div key={m.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 16px', borderBottom: `1px solid ${OFF}`, alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 600, width: 100 }}>{m.label}</span>
            <span style={{ fontSize: 12, color: '#666' }}>Sistema: {fmt(sys)}</span>
            <span style={{ fontSize: 12, color: '#666' }}>Máquina: {maquinaVals[m.key] ? fmt(mq) : '—'}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: ok ? GREEN : RED }}>{maquinaVals[m.key] !== '' ? (diff >= 0 ? '+' : '') + fmt(diff) + (ok ? ' ✓' : '') : '—'}</span>
          </div>
        ) })}
      </div>
      <SecTitle>ITENS VENDIDOS</SecTitle>
      <div style={{ background: W, border: `2px solid #e0d0ea`, marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr 1fr 1fr', background: P, color: W, padding: '9px 14px', fontSize: 8, fontWeight: 700, letterSpacing: 1, gap: 8 }}>
          <span>PRODUTO</span><span style={{ textAlign: 'right' }}>QTD</span><span style={{ textAlign: 'right' }}>RECEITA</span><span style={{ textAlign: 'right' }}>INSUMOS</span><span style={{ textAlign: 'right' }}>PRODUÇÃO</span><span style={{ textAlign: 'right' }}>LUCRO</span>
        </div>
        {Object.values(itemSummary).length === 0 && <div style={{ padding: 16, fontSize: 12, color: '#bbb' }}>Nenhum item vendido.</div>}
        {Object.values(itemSummary).map((i, idx) => { const lucro = i.revenue - i.costInsumos - i.costProd; return (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr 1fr 1fr', padding: '10px 14px', borderBottom: `1px solid ${OFF}`, fontSize: 11, gap: 8 }}>
            <span style={{ fontWeight: 600 }}>{i.name}</span><span style={{ textAlign: 'right' }}>{i.qty}</span>
            <span style={{ textAlign: 'right', color: P, fontWeight: 700 }}>{fmt(i.revenue)}</span>
            <span style={{ textAlign: 'right', color: '#888' }}>{fmt(i.costInsumos)}</span>
            <span style={{ textAlign: 'right', color: '#888' }}>{fmt(i.costProd)}</span>
            <span style={{ textAlign: 'right', color: GREEN, fontWeight: 700 }}>{fmt(lucro)}</span>
          </div>
        ) })}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Btn variant="ghost" onClick={() => setShowRelatorio(false)}>← VOLTAR</Btn>
        <Btn variant="success" onClick={copyCSV}>{copied ? '✓ COPIADO!' : 'COPIAR CSV'}</Btn>
        <Btn variant="amber" onClick={fecharCaixa}>FECHAR CAIXA</Btn>
      </div>
    </div>
  )

  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: 24, overflowY: 'auto', borderRight: `2px solid #e0d0ea` }}>
        <SecTitle>RESUMO DO CAIXA</SecTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: 12, marginBottom: 24 }}>
          {[{ l: 'FUNDO INICIAL', v: fmt(fundoInicial) }, { l: 'ENTRADAS DINHEIRO', v: fmt(dinheiroDia) }, { l: 'TROCOS DADOS', v: `−${fmt(trocosDia)}` }, { l: 'SANGRIAS', v: `−${fmt(totalSangrias)}` }, { l: 'SUPRIMENTOS', v: `+${fmt(totalSuprimentos)}` }, { l: 'DINHEIRO EM CAIXA', v: fmt(dinheiroEmCaixa), h: true }].map(c => (
            <Card key={c.l} style={{ borderLeft: `4px solid ${c.h ? GREEN : P}` }}><div style={{ fontSize: 8, letterSpacing: 1.5, color: '#888', marginBottom: 4 }}>{c.l}</div><div style={{ fontSize: 20, fontWeight: 700, color: c.h ? GREEN : P }}>{c.v}</div></Card>
          ))}
        </div>
        <SecTitle>POR FORMA DE PAGAMENTO</SecTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10 }}>
          {PAYMENT_METHODS.map(m => <Card key={m.key}><div style={{ fontSize: 8, letterSpacing: 1, color: '#888', marginBottom: 4 }}>{m.label}</div><div style={{ fontSize: 16, fontWeight: 700, color: P }}>{fmt(byPayment(m.key))}</div></Card>)}
        </div>
      </div>
      <div style={{ width: 300, padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <SecTitle>SANGRIA</SecTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Input label="VALOR (R$)" type="number" value={sangriaVal} onChange={setSangriaVal} placeholder="0,00" />
            <Input label="OBSERVAÇÃO" value={obs} onChange={setObs} placeholder="Motivo..." />
            <Btn variant="danger" full onClick={() => { registrarMovimento('sangria', parseFloat(sangriaVal)||0, obs); setSangriaVal(''); setObs('') }} disabled={!sangriaVal}>REGISTRAR SANGRIA</Btn>
          </div>
        </div>
        <div>
          <SecTitle>SUPRIMENTO</SecTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Input label="VALOR (R$)" type="number" value={suprVal} onChange={setSuprVal} placeholder="0,00" />
            <Btn variant="success" full onClick={() => { registrarMovimento('suprimento', parseFloat(suprVal)||0, obs); setSuprVal(''); setObs('') }} disabled={!suprVal}>REGISTRAR SUPRIMENTO</Btn>
          </div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Btn variant="amber" full onClick={() => setShowFechamento(true)}>FECHAR CAIXA →</Btn>
        </div>
        <div>
          <SecTitle>MOVIMENTOS</SecTitle>
          {movimentos.length === 0 && <div style={{ fontSize: 11, color: '#bbb' }}>Nenhum movimento.</div>}
          {movimentos.map(m => (
            <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${OFF}`, fontSize: 11 }}>
              <span style={{ color: m.tipo === 'sangria' ? RED : GREEN, fontWeight: 700, fontSize: 9 }}>{m.tipo.toUpperCase()}</span>
              <span style={{ color: '#888', flex: 1, paddingLeft: 8 }}>{m.obs}</span>
              <span style={{ fontWeight: 700 }}>{fmt(m.valor)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PDVModule({ products, setProducts, clients, onSale }) {
  const { cart, add, changeQty, clear, total, count } = useCart()
  const [step, setStep] = useState('pdv')
  const [result, setResult] = useState(null)
  const [totalPagar, setTotalPagar] = useState(0)
  const [descontoPdv, setDescontoPdv] = useState(0)
  function handleCheckout(tf, d) { setTotalPagar(tf); setDescontoPdv(d); setStep('pay') }
  function handleConfirm(res) { onSale({ ...res, items: count, origin: 'pdv', cart }, () => { setResult(res); setStep('success') }) }
  if (step === 'success') return <SuccessScreen result={result} onNew={() => { clear(); setStep('pdv') }} />
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <ProductGrid products={products} cart={cart} onAdd={add} />
      {step === 'pdv'
        ? <CartPanel cart={cart} changeQty={changeQty} clear={clear} total={total} count={count} onCheckout={handleCheckout} />
        : <div style={{ width: 360, background: W, display: 'flex', flexDirection: 'column', borderLeft: `3px solid ${P}` }}><PaymentPanel total={totalPagar} desconto={descontoPdv} onConfirm={handleConfirm} onBack={() => setStep('pdv')} clients={clients} /></div>}
    </div>
  )
}

function MesasModule({ products, clients, onSale, mesas, setMesas, mesaAtiva, setMesaAtiva, mesaStep, setMesaStep, mesasCarts, setMesasCarts }) {
  const [result, setResult] = useState(null)
  const [totalPagarMesa, setTotalPagarMesa] = useState(0)
  const [descontoMesa, setDescontoMesa] = useState(0)

  const cart = mesaAtiva ? (mesasCarts[mesaAtiva] || []) : []
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)

  function addToCart(product) {
    setMesasCarts(prev => {
      const cur = prev[mesaAtiva] || []
      const ex = cur.find(i => i.id === product.id)
      const updated = ex
        ? cur.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...cur, { ...product, qty: 1 }]
      return { ...prev, [mesaAtiva]: updated }
    })
  }

  function changeQty(id, d) {
    setMesasCarts(prev => {
      const cur = prev[mesaAtiva] || []
      const item = cur.find(i => i.id === id)
      if (!item) return prev
      const updated = item.qty + d <= 0
        ? cur.filter(i => i.id !== id)
        : cur.map(i => i.id === id ? { ...i, qty: i.qty + d } : i)
      return { ...prev, [mesaAtiva]: updated }
    })
  }

  function clearCart() {
    setMesasCarts(prev => ({ ...prev, [mesaAtiva]: [] }))
  }

  function abrirMesa(n) {
    if (!mesas[n]) setMesas(m => ({ ...m, [n]: { hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) } }))
    setMesaAtiva(n)
    setMesaStep('pedido')
  }

  function handleConfirm(res) {
    onSale({ ...res, items: count, origin: 'mesa', mesa: mesaAtiva, cart }, () => {
      setMesas(m => { const c = { ...m }; delete c[mesaAtiva]; return c })
      setMesasCarts(prev => { const c = { ...prev }; delete c[mesaAtiva]; return c })
      setResult(res)
      setMesaAtiva(null)
      setMesaStep('success')
    })
  }

  if (mesaStep === 'success') return <SuccessScreen result={result} onNew={() => setMesaStep('mesas')} />

  if (mesaStep === 'mesas') return (
    <div style={{ padding: 24, flex: 1 }}>
      <SecTitle>MESAS</SecTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, maxWidth: 680 }}>
        {[1,2,3,4,5].map(n => {
          const aberta = !!mesas[n]
          const itens = (mesasCarts[n] || []).reduce((s, i) => s + i.qty, 0)
          return (
            <button key={n} onClick={() => abrirMesa(n)} style={{ padding: '28px 12px', border: `3px solid ${aberta ? P : '#ddd'}`, background: aberta ? P : W, color: aberta ? W : '#bbb', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center' }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>MESA</div>
              <div style={{ fontSize: 38, fontWeight: 700 }}>{n}</div>
              <div style={{ fontSize: 9, marginTop: 6, color: aberta ? '#e0c0f5' : '#ccc' }}>
                {aberta ? `${mesas[n].hora} · ${itens} item${itens !== 1 ? 's' : ''}` : 'Livre'}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <ProductGrid products={products} cart={cart} onAdd={addToCart} />
      {mesaStep === 'pedido'
        ? <div style={{ width: 300, background: W, display: 'flex', flexDirection: 'column', borderLeft: `3px solid ${P}` }}>
            <div style={{ padding: '11px 14px', borderBottom: `2px solid ${P}`, fontSize: 9, fontWeight: 700, letterSpacing: 1, color: P }}>MESA {mesaAtiva}</div>
            <CartPanel cart={cart} changeQty={changeQty} clear={clearCart} total={total} count={count} onCheckout={(tf, d) => { setTotalPagarMesa(tf); setDescontoMesa(d); setMesaStep('pay') }} />
            <button onClick={() => { setMesaAtiva(null); setMesaStep('mesas') }} style={{ padding: '11px', fontSize: 10, fontWeight: 700, letterSpacing: 1, background: 'transparent', color: '#888', border: 'none', borderTop: `1px solid ${OFF}`, cursor: 'pointer', fontFamily: 'inherit' }}>← VOLTAR ÀS MESAS</button>
          </div>
        : <div style={{ width: 360, background: W, display: 'flex', flexDirection: 'column', borderLeft: `3px solid ${P}` }}>
            <PaymentPanel total={totalPagarMesa} desconto={descontoMesa} onConfirm={handleConfirm} onBack={() => setMesaStep('pedido')} clients={clients} />
          </div>}
    </div>
  )
}

function Historico({ sales }) {
  const filter = useDateFilter()

  // Normaliza a data da venda — pode vir como '2025-05-16' ou '2025-05-16T...'
  const getDate = (v) => {
    if (!v.date) return ''
    return String(v.date).slice(0, 10)
  }

  const filtered = sales.filter(v => {
    const d = getDate(v)
    return d >= filter.from && d <= filter.to
  })

  const fmtDate = (dateStr) => {
    if (!dateStr) return ''
    const [y, m, d] = String(dateStr).slice(0, 10).split('-')
    return `${d}/${m}/${y}`
  }

  return (
    <div style={{ padding: 24, flex: 1, overflowY: 'auto' }}>
      <DateFilterBar filter={filter} />
      <SecTitle>HISTÓRICO DE VENDAS ({filtered.length})</SecTitle>
      {filtered.length === 0 && <div style={{ fontSize: 12, color: '#bbb' }}>Nenhuma venda no período.</div>}
      {filtered.map(v => (
        <div key={v.id} style={{ background: W, border: `2px solid #e0d0ea`, padding: '14px 18px', marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: P }}>{fmt(v.total)}</div>
              <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>
                {fmtDate(v.date)} · {v.time} · {PAYMENT_METHODS.find(m => m.key === v.payment)?.label} · {v.items_count} {v.items_count === 1 ? 'item' : 'itens'} · {v.origin === 'mesa' ? `Mesa ${v.mesa}` : 'Balcão'}
              </div>
            </div>
          </div>
          {v.itens && v.itens.length > 0 && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${OFF}`, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {v.itens.map((i, idx) => (
                <span key={idx} style={{ fontSize: 10, color: '#666', background: OFF, padding: '2px 8px' }}>
                  {i.name} ×{i.qty} — {fmt(i.price * i.qty)}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function Faturamento({ sales }) {
  const filter = useDateFilter()
  const [sortCol, setSortCol] = useState('revenue')
  const [sortDir, setSortDir] = useState('desc')

  const getDate = (v) => v.date ? String(v.date).slice(0, 10) : ''
  const filtered = sales.filter(v => { const d = getDate(v); return d >= filter.from && d <= filter.to })

  const itemSummary = {}
  filtered.forEach(v => v.itens && v.itens.forEach(i => {
    const k = i.produto_id || i.name
    if (!itemSummary[k]) itemSummary[k] = { name: i.name, qty: 0, revenue: 0, costInsumos: 0, costProd: 0 }
    itemSummary[k].qty += i.qty
    itemSummary[k].revenue += i.price * i.qty
    itemSummary[k].costInsumos += (i.cost_insumos || 0) * i.qty
    itemSummary[k].costProd += (i.cost_prod || 0) * i.qty
  }))

  const items = Object.values(itemSummary).map(i => ({ ...i, lucro: i.revenue - i.costInsumos - i.costProd }))
  const sorted = [...items].sort((a, b) => {
    const av = sortCol === 'name' ? a.name : a[sortCol]
    const bv = sortCol === 'name' ? b.name : b[sortCol]
    if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    return sortDir === 'asc' ? av - bv : bv - av
  })

  const totRevenue = items.reduce((s, i) => s + i.revenue, 0)
  const totInsumos = items.reduce((s, i) => s + i.costInsumos, 0)
  const totProd = items.reduce((s, i) => s + i.costProd, 0)
  const totLucro = totRevenue - totInsumos - totProd

  function toggleSort(col) {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('desc') }
  }

  function SortArrow({ col }) {
    if (sortCol !== col) return <span style={{ opacity: 0.3, marginLeft: 4 }}>↕</span>
    return <span style={{ marginLeft: 4 }}>{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  function ColHeader({ col, label, align = 'right' }) {
    return (
      <span onClick={() => toggleSort(col)} style={{ textAlign: align, cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: align === 'right' ? 'flex-end' : 'flex-start', gap: 2 }}>
        {label}<SortArrow col={col} />
      </span>
    )
  }

  // Gráfico — últimos 7 dias
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  })
  const dayLabels = last7.map(d => { const [,, dd] = d.split('-'); return dd + '/' + d.split('-')[1] })
  const dayRevenue = last7.map(day => sales.filter(v => getDate(v) === day).reduce((s, v) => s + v.total, 0))
  const dayLucro = last7.map(day => {
    const daySales = sales.filter(v => getDate(v) === day)
    return daySales.reduce((s, v) => {
      if (!v.itens) return s
      return s + v.itens.reduce((ss, i) => ss + (i.price - (i.cost_insumos || 0) - (i.cost_prod || 0)) * i.qty, 0)
    }, 0)
  })

  // Horário de pico
  const hourMap = {}
  filtered.forEach(v => {
    const h = v.time ? parseInt(v.time.split(':')[0]) : null
    if (h === null) return
    if (!hourMap[h]) hourMap[h] = { vendas: 0, revenue: 0 }
    hourMap[h].vendas += 1
    hourMap[h].revenue += v.total
  })
  const hours = Object.keys(hourMap).sort((a, b) => parseInt(a) - parseInt(b))
  const hourVendas = hours.map(h => hourMap[h].vendas)
  const maxVendas = Math.max(...hourVendas, 1)
  const rankingHoras = [...hours].sort((a, b) => hourMap[b].vendas - hourMap[a].vendas).slice(0, 5)

  return (
    <div style={{ padding: 24, flex: 1, overflowY: 'auto' }}>
      <DateFilterBar filter={filter} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: 12, marginBottom: 24 }}>
        {[{ l: 'RECEITA TOTAL', v: fmt(totRevenue), h: true }, { l: 'CUSTO INSUMOS', v: fmt(totInsumos) }, { l: 'CUSTO PRODUÇÃO', v: fmt(totProd) }, { l: 'LUCRO TOTAL', v: fmt(totLucro), g: true }].map(c => (
          <Card key={c.l} style={{ borderLeft: `4px solid ${c.h ? P : c.g ? GREEN : '#ddd'}` }}>
            <div style={{ fontSize: 8, letterSpacing: 1.5, color: '#888', marginBottom: 4 }}>{c.l}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: c.h ? P : c.g ? GREEN : DARK }}>{c.v}</div>
          </Card>
        ))}
      </div>

      <SecTitle>POR FORMA DE PAGAMENTO</SecTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, marginBottom: 24 }}>
        {PAYMENT_METHODS.map(m => { const val = filtered.filter(v => v.payment === m.key).reduce((s, v) => s + v.total, 0); return <Card key={m.key}><div style={{ fontSize: 8, letterSpacing: 1, color: '#888', marginBottom: 4 }}>{m.label}</div><div style={{ fontSize: 15, fontWeight: 700, color: P }}>{fmt(val)}</div></Card> })}
      </div>

      <SecTitle>FATURAMENTO — ÚLTIMOS 7 DIAS</SecTitle>
      <div style={{ display: 'flex', gap: 16, marginBottom: 8, fontSize: 11, color: '#888' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, background: P, display: 'inline-block' }}></span>Faturamento</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 2, background: GREEN, display: 'inline-block' }}></span>Lucro</span>
      </div>
      <div id="fat7wrap" style={{ position: 'relative', width: '100%', height: 200, marginBottom: 28 }}>
        <canvas id="chartFat7" role="img" aria-label="Faturamento dos últimos 7 dias"></canvas>
      </div>

      {hours.length > 0 && <>
        <SecTitle>HORÁRIO DE PICO</SecTitle>
        <div style={{ display: 'flex', gap: 16, marginBottom: 8, fontSize: 11, color: '#888' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, background: P, display: 'inline-block' }}></span>Nº de vendas por hora</span>
        </div>
        <div style={{ position: 'relative', width: '100%', height: 160, marginBottom: 16 }}>
          <canvas id="chartPico" role="img" aria-label="Vendas por hora do dia"></canvas>
        </div>
        <div style={{ background: W, border: `2px solid #e0d0ea`, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr 1fr 1fr', background: P, color: W, padding: '8px 14px', fontSize: 8, fontWeight: 700, letterSpacing: 1, gap: 8 }}>
            <span>#</span><span>HORÁRIO</span><span>VENDAS</span><span>FATURAMENTO</span>
          </div>
          {rankingHoras.map((h, i) => (
            <div key={h} style={{ display: 'grid', gridTemplateColumns: '2rem 1fr 1fr 1fr', padding: '10px 14px', borderBottom: `1px solid ${OFF}`, fontSize: 12, gap: 8 }}>
              <span style={{ color: '#aaa', fontWeight: 700 }}>{i+1}</span>
              <span style={{ fontWeight: 600 }}>{h}h</span>
              <span>{hourMap[h].vendas} venda{hourMap[h].vendas !== 1 ? 's' : ''}</span>
              <span style={{ color: P, fontWeight: 700 }}>{fmt(hourMap[h].revenue)}</span>
            </div>
          ))}
        </div>
      </>}

      <SecTitle>DETALHAMENTO POR PRODUTO</SecTitle>
      <div style={{ background: W, border: `2px solid #e0d0ea`, marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr 1fr 1fr', background: P, color: W, padding: '9px 14px', fontSize: 8, fontWeight: 700, letterSpacing: 1, gap: 8 }}>
          <ColHeader col="name" label="PRODUTO" align="left" />
          <ColHeader col="qty" label="QTD" />
          <ColHeader col="revenue" label="RECEITA" />
          <ColHeader col="costInsumos" label="INSUMOS" />
          <ColHeader col="costProd" label="PRODUÇÃO" />
          <ColHeader col="lucro" label="LUCRO" />
        </div>
        {sorted.length === 0 && <div style={{ padding: 16, fontSize: 12, color: '#bbb' }}>Nenhuma venda no período.</div>}
        {sorted.map((i, idx) => (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr 1fr 1fr', padding: '10px 14px', borderBottom: `1px solid ${OFF}`, fontSize: 11, gap: 8 }}>
            <span style={{ fontWeight: 600 }}>{i.name}</span>
            <span style={{ textAlign: 'right' }}>{i.qty}</span>
            <span style={{ textAlign: 'right', color: P, fontWeight: 700 }}>{fmt(i.revenue)}</span>
            <span style={{ textAlign: 'right', color: '#888' }}>{fmt(i.costInsumos)}</span>
            <span style={{ textAlign: 'right', color: '#888' }}>{fmt(i.costProd)}</span>
            <span style={{ textAlign: 'right', color: GREEN, fontWeight: 700 }}>{fmt(i.lucro)}</span>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr 1fr 1fr', padding: '11px 14px', background: OFF, fontSize: 11, gap: 8, fontWeight: 700 }}>
          <span>TOTAL</span><span />
          <span style={{ textAlign: 'right', color: P }}>{fmt(totRevenue)}</span>
          <span style={{ textAlign: 'right', color: '#888' }}>{fmt(totInsumos)}</span>
          <span style={{ textAlign: 'right', color: '#888' }}>{fmt(totProd)}</span>
          <span style={{ textAlign: 'right', color: GREEN }}>{fmt(totLucro)}</span>
        </div>
      </div>

      <ChartsFaturamento dayLabels={dayLabels} dayRevenue={dayRevenue} dayLucro={dayLucro} hours={hours} hourVendas={hourVendas} maxVendas={maxVendas} />
    </div>
  )
}

function ChartsFaturamento({ dayLabels, dayRevenue, dayLucro, hours, hourVendas, maxVendas }) {
  useEffect(() => {
    let c1, c2
    const t = setTimeout(() => {
      const el1 = document.getElementById('chartFat7')
      const el2 = document.getElementById('chartPico')
      if (el1) {
        c1 = new window.ChartJS(el1, {
          type: 'bar',
          data: {
            labels: dayLabels,
            datasets: [
              { label: 'Faturamento', data: dayRevenue, backgroundColor: '#552072', borderRadius: 3, order: 2 },
              { label: 'Lucro', data: dayLucro, type: 'line', borderColor: '#2e7d32', backgroundColor: 'transparent', pointBackgroundColor: '#2e7d32', pointRadius: 3, borderWidth: 2, tension: 0.3, order: 1 }
            ]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { callback: v => 'R$' + v } } } }
        })
      }
      if (el2 && hours.length > 0) {
        c2 = new window.ChartJS(el2, {
          type: 'bar',
          data: {
            labels: hours.map(h => h + 'h'),
            datasets: [{ label: 'Vendas', data: hourVendas, backgroundColor: hourVendas.map(v => v === maxVendas ? '#552072' : 'rgba(85,32,114,0.3)'), borderRadius: 3 }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { stepSize: 1 } } } }
        })
      }
    }, 100)
    return () => { clearTimeout(t); c1?.destroy(); c2?.destroy() }
  }, [dayLabels, dayRevenue, dayLucro, hours, hourVendas, maxVendas])
  return null
}

function Clientes({ clients, reload }) {
  const [form, setForm] = useState({ phone: '', name: '', obs: '' })
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  async function save() {
    if (!form.phone || !form.name) return
    setLoading(true)
    const clean = form.phone.replace(/\D/g, '')
    await supabase.from('clientes').upsert({ phone: clean, name: form.name, obs: form.obs }, { onConflict: 'phone' })
    setForm({ phone: '', name: '', obs: '' })
    reload()
    setLoading(false)
  }

  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search.replace(/\D/g, '')))
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <div style={{ width: 300, padding: 22, borderRight: `2px solid #e0d0ea`, background: W, overflowY: 'auto' }}>
        <SecTitle>CADASTRAR CLIENTE</SecTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Input label="TELEFONE" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} placeholder="(00) 00000-0000" />
          <Input label="NOME" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Nome do cliente" />
          <Field label="OBSERVAÇÕES"><textarea value={form.obs} onChange={e => setForm(f => ({ ...f, obs: e.target.value }))} placeholder="Alergias, preferências..." rows={3} style={{ padding: '9px 12px', fontSize: 12, fontFamily: 'inherit', border: `2px solid ${P}`, outline: 'none', background: OFF, color: DARK, resize: 'none' }} /></Field>
          <Btn full onClick={save} disabled={loading || !form.phone || !form.name}>{loading ? 'SALVANDO...' : 'SALVAR CLIENTE'}</Btn>
        </div>
      </div>
      <div style={{ flex: 1, padding: 22, overflowY: 'auto' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome ou telefone..." style={{ width: '100%', padding: '10px 14px', fontSize: 12, border: `2px solid ${P}`, outline: 'none', fontFamily: 'inherit', background: OFF, marginBottom: 16 }} />
        <SecTitle>CLIENTES ({filtered.length})</SecTitle>
        {filtered.map(c => (
          <Card key={c.id} style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div><div style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</div><div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{c.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}</div>{c.obs && <div style={{ fontSize: 10, color: '#aaa', marginTop: 4, fontStyle: 'italic' }}>{c.obs}</div>}</div>
            <div style={{ textAlign: 'right' }}><div style={{ fontSize: 18, fontWeight: 700, color: P }}>{c.points} pts</div><div style={{ fontSize: 9, color: '#aaa' }}>{c.purchases} compra{c.purchases !== 1 ? 's' : ''}</div></div>
          </Card>
        ))}
        {filtered.length === 0 && <div style={{ fontSize: 12, color: '#bbb' }}>Nenhum cliente encontrado.</div>}
      </div>
    </div>
  )
}

function Produtos({ products, setProducts, categorias }) {
  const [form, setForm] = useState({ name: '', price: '', category: 'bolos', cost_insumos: '', cost_prod: '', qty: '', min_qty: '' })
  const [editProduct, setEditProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const lucro = (parseFloat(form.price)||0) - (parseFloat(form.cost_insumos)||0) - (parseFloat(form.cost_prod)||0)

  async function save() {
    if (!form.name || !form.price) return
    setLoading(true)
    const { data } = await supabase.from('produtos').insert({ name: form.name, price: parseFloat(form.price), category: form.category, cost_insumos: parseFloat(form.cost_insumos)||0, cost_prod: parseFloat(form.cost_prod)||0, qty: parseInt(form.qty)||0, min_qty: parseInt(form.min_qty)||0, active: true }).select().single()
    if (data) setProducts(prev => [...prev, data])
    setForm({ name: '', price: '', category: 'bolos', cost_insumos: '', cost_prod: '', qty: '', min_qty: '' })
    setLoading(false)
  }

  async function toggleActive(p) {
    await supabase.from('produtos').update({ active: !p.active }).eq('id', p.id)
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, active: !x.active } : x))
  }

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      {editProduct && <EditProductModal product={editProduct} onSave={updated => setProducts(prev => prev.map(p => p.id === updated.id ? updated : p))} onClose={() => setEditProduct(null)} />}
      <div style={{ width: 300, padding: 22, borderRight: `2px solid #e0d0ea`, background: W, overflowY: 'auto' }}>
        <SecTitle>NOVO PRODUTO</SecTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <Input label="NOME" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Nome do produto" />
          <Field label="CATEGORIA"><select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ ...s.input }}>{categorias.filter(c => c.tipo === 'produto' || c.tipo === 'ambos').map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select></Field>
          <Input label="PREÇO DE VENDA (R$)" type="number" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} placeholder="0,00" />
          <Input label="CUSTO INSUMOS (R$)" type="number" value={form.cost_insumos} onChange={v => setForm(f => ({ ...f, cost_insumos: v }))} placeholder="0,00" />
          <Input label="CUSTO PRODUÇÃO (R$)" type="number" value={form.cost_prod} onChange={v => setForm(f => ({ ...f, cost_prod: v }))} placeholder="0,00" />
          {(form.price || form.cost_insumos || form.cost_prod) && <div style={{ padding: '10px 12px', background: lucro >= 0 ? '#e8f5e9' : '#ffebee', border: `2px solid ${lucro >= 0 ? GREEN : RED}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: lucro >= 0 ? GREEN : RED }}>LUCRO POR UNIDADE</span><span style={{ fontSize: 20, fontWeight: 700, color: lucro >= 0 ? GREEN : RED }}>{fmt(lucro)}</span></div>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <Input label="ESTOQUE INICIAL" type="number" value={form.qty} onChange={v => setForm(f => ({ ...f, qty: v }))} placeholder="0" />
            <Input label="QTD MÍNIMA" type="number" value={form.min_qty} onChange={v => setForm(f => ({ ...f, min_qty: v }))} placeholder="0" />
          </div>
          <Btn full onClick={save} disabled={loading || !form.name || !form.price}>{loading ? 'SALVANDO...' : 'ADICIONAR PRODUTO'}</Btn>
        </div>
      </div>
      <div style={{ flex: 1, padding: 22, overflowY: 'auto' }}>
        <SecTitle>CARDÁPIO ({products.length} produtos)</SecTitle>
        {['bolos','doces','bebidas'].map(cat => {
          const ps = products.filter(p => p.category === cat)
          if (!ps.length) return null
          return (
            <div key={cat} style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: '#aaa', marginBottom: 10, textTransform: 'uppercase' }}>{cat}</div>
              {ps.map(p => { const lucroP = p.price - (p.cost_insumos||0) - (p.cost_prod||0); const low = p.min_qty > 0 && p.qty <= p.min_qty; return (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: p.active ? W : '#f5f5f5', border: `2px solid ${low ? AMBER : p.active ? '#e0d0ea' : '#ddd'}`, marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: p.active ? DARK : '#bbb' }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: '#aaa', marginTop: 3, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <span>Venda: <strong style={{ color: P }}>{fmt(p.price)}</strong></span>
                      <span>Insumos: {fmt(p.cost_insumos||0)}</span>
                      <span>Prod: {fmt(p.cost_prod||0)}</span>
                      <span>Lucro: <strong style={{ color: GREEN }}>{fmt(lucroP)}</strong></span>
                    </div>
                    <div style={{ fontSize: 10, marginTop: 3 }}>
                      <span style={{ color: low ? RED : '#aaa' }}>Estoque: {p.qty} un. · Mín: {p.min_qty}</span>
                      {low && <span style={{ marginLeft: 8, color: AMBER, fontWeight: 700 }}>⚠ BAIXO</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
                    <button onClick={() => setEditProduct(p)} style={{ padding: '6px 14px', fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer', border: `2px solid ${P}`, background: P, color: W }}>EDITAR</button>
                    <button onClick={() => toggleActive(p)} style={{ padding: '6px 12px', fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer', border: `2px solid ${p.active ? RED : GREEN}`, background: 'transparent', color: p.active ? RED : GREEN }}>{p.active ? 'DESATIVAR' : 'ATIVAR'}</button>
                  </div>
                </div>
              ) })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Estoque({ stockItems, setStockItems, categorias }) {
  const [form, setForm] = useState({ name: '', unit: 'kg', qty: '', min: '' })
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({ qty: '', min: '' })

  async function save() {
    if (!form.name || !form.qty) return
    const { data } = await supabase.from('estoque').insert({ name: form.name, unit: form.unit, qty: parseFloat(form.qty), min_qty: parseFloat(form.min)||0 }).select().single()
    if (data) setStockItems(prev => [...prev, data])
    setForm({ name: '', unit: 'kg', qty: '', min: '' })
  }

  async function saveEdit(id) {
    await supabase.from('estoque').update({ qty: parseFloat(editData.qty)||0, min_qty: parseFloat(editData.min)||0 }).eq('id', id)
    setStockItems(prev => prev.map(i => i.id === id ? { ...i, qty: parseFloat(editData.qty)||0, min_qty: parseFloat(editData.min)||0 } : i))
    setEditId(null)
  }

  const low = stockItems.filter(i => i.min_qty > 0 && i.qty <= i.min_qty)
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <div style={{ width: 280, padding: 22, borderRight: `2px solid #e0d0ea`, background: W, overflowY: 'auto' }}>
        <SecTitle>NOVO INGREDIENTE</SecTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <Input label="NOME" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Ex: Farinha de Trigo" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <Input label="QUANTIDADE" type="number" value={form.qty} onChange={v => setForm(f => ({ ...f, qty: v }))} placeholder="0" />
            <Field label="UNIDADE"><select value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} style={{ ...s.input }}>{['kg','g','un','L','ml','cx'].map(u => <option key={u} value={u}>{u}</option>)}</select></Field>
          </div>
          <Input label="QTD MÍNIMA (alerta)" type="number" value={form.min} onChange={v => setForm(f => ({ ...f, min: v }))} placeholder="0" />
          <Btn full onClick={save} disabled={!form.name || !form.qty}>ADICIONAR</Btn>
        </div>
      </div>
      <div style={{ flex: 1, padding: 22, overflowY: 'auto' }}>
        {low.length > 0 && <div style={{ padding: '12px 16px', background: '#ffebee', border: `2px solid ${RED}`, marginBottom: 18 }}><div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: RED, marginBottom: 6 }}>⚠ ESTOQUE BAIXO</div>{low.map(i => <div key={i.id} style={{ fontSize: 11, color: RED }}>• {i.name}: {i.qty} {i.unit} (mín. {i.min_qty})</div>)}</div>}
        <SecTitle>INGREDIENTES ({stockItems.length})</SecTitle>
        {stockItems.map(item => { const isLow = item.min_qty > 0 && item.qty <= item.min_qty; return (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 16px', background: W, border: `2px solid ${isLow ? RED : '#e0d0ea'}`, marginBottom: 8 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</div>
              {editId === item.id
                ? <div style={{ display: 'flex', gap: 8, marginTop: 6, alignItems: 'center' }}>
                    <input type="number" value={editData.qty} onChange={e => setEditData(d => ({ ...d, qty: e.target.value }))} style={{ width: 70, padding: '5px 8px', fontSize: 13, fontWeight: 700, border: `2px solid ${P}`, outline: 'none', fontFamily: 'inherit', background: OFF, textAlign: 'center' }} autoFocus />
                    <span style={{ fontSize: 11, color: '#888' }}>{item.unit} · Mín:</span>
                    <input type="number" value={editData.min} onChange={e => setEditData(d => ({ ...d, min: e.target.value }))} style={{ width: 60, padding: '5px 8px', fontSize: 13, fontWeight: 700, border: `2px solid ${P}`, outline: 'none', fontFamily: 'inherit', background: OFF, textAlign: 'center' }} />
                    <button onClick={() => saveEdit(item.id)} style={{ padding: '5px 12px', background: GREEN, color: W, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 10, fontWeight: 700 }}>OK</button>
                    <button onClick={() => setEditId(null)} style={{ padding: '5px 10px', background: 'transparent', color: '#888', border: `1px solid #ccc`, cursor: 'pointer', fontFamily: 'inherit', fontSize: 10 }}>✕</button>
                  </div>
                : <div style={{ fontSize: 10, color: '#aaa', marginTop: 3 }}>Mín: {item.min_qty} {item.unit}</div>}
            </div>
            {editId !== item.id && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ textAlign: 'right' }}><div style={{ fontSize: 22, fontWeight: 700, color: isLow ? RED : P }}>{item.qty}</div><div style={{ fontSize: 10, color: '#aaa' }}>{item.unit}</div></div>
                <button onClick={() => { setEditId(item.id); setEditData({ qty: String(item.qty), min: String(item.min_qty) }) }} style={{ padding: '6px 12px', background: 'transparent', color: P, border: `2px solid ${P}`, cursor: 'pointer', fontFamily: 'inherit', fontSize: 9, fontWeight: 700, letterSpacing: 1 }}>EDITAR</button>
              </div>
            )}
          </div>
        ) })}
      </div>
    </div>
  )
}


// ─── CATEGORIAS ───────────────────────────────────────────────────────────────

function Categorias({ categorias, setCategorias }) {
  const [form, setForm] = useState({ name: '', tipo: 'produto' })
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({ name: '', tipo: 'produto' })
  const [loading, setLoading] = useState(false)

  async function save() {
    if (!form.name) return
    setLoading(true)
    const { data } = await supabase.from('categorias').insert({ name: form.name.trim(), tipo: form.tipo }).select().single()
    if (data) setCategorias(prev => [...prev, data].sort((a,b) => a.name.localeCompare(b.name)))
    setForm({ name: '', tipo: 'produto' })
    setLoading(false)
  }

  async function saveEdit(id) {
    await supabase.from('categorias').update({ name: editData.name.trim(), tipo: editData.tipo }).eq('id', id)
    setCategorias(prev => prev.map(c => c.id === id ? { ...c, name: editData.name.toLowerCase().trim(), tipo: editData.tipo } : c))
    setEditId(null)
  }

  async function remove(id) {
    await supabase.from('categorias').delete().eq('id', id)
    setCategorias(prev => prev.filter(c => c.id !== id))
  }

  const TIPO_LABEL = { produto: 'Produto', estoque: 'Estoque', ambos: 'Ambos' }
  const TIPO_COLOR = { produto: P, estoque: GREEN, ambos: AMBER }

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <div style={{ width: 300, padding: 22, borderRight: `2px solid #e0d0ea`, background: W, overflowY: 'auto' }}>
        <SecTitle>NOVA CATEGORIA</SecTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Input label="NOME" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Ex: salgados" />
          <Field label="TIPO">
            <select value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))} style={{ ...s.input }}>
              <option value="produto">Produto (cardápio)</option>
              <option value="estoque">Estoque (ingredientes)</option>
              <option value="ambos">Ambos</option>
            </select>
          </Field>
          <Btn full onClick={save} disabled={loading || !form.name}>{loading ? 'SALVANDO...' : 'ADICIONAR CATEGORIA'}</Btn>
        </div>
      </div>
      <div style={{ flex: 1, padding: 22, overflowY: 'auto' }}>
        <SecTitle>CATEGORIAS ({categorias.length})</SecTitle>
        {categorias.length === 0 && <div style={{ fontSize: 12, color: '#bbb' }}>Nenhuma categoria cadastrada.</div>}
        {categorias.map(cat => (
          <div key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 16px', background: W, border: `2px solid #e0d0ea`, marginBottom: 8 }}>
            {editId === cat.id ? (
              <div style={{ display: 'flex', gap: 8, flex: 1, alignItems: 'center' }}>
                <input value={editData.name} onChange={e => setEditData(d => ({ ...d, name: e.target.value }))} style={{ flex: 1, padding: '6px 10px', fontSize: 13, fontWeight: 600, border: `2px solid ${P}`, outline: 'none', fontFamily: 'inherit', background: OFF }} autoFocus />
                <select value={editData.tipo} onChange={e => setEditData(d => ({ ...d, tipo: e.target.value }))} style={{ padding: '6px 10px', fontSize: 11, fontFamily: 'inherit', border: `2px solid ${P}`, outline: 'none', background: OFF }}>
                  <option value="produto">Produto</option>
                  <option value="estoque">Estoque</option>
                  <option value="ambos">Ambos</option>
                </select>
                <button onClick={() => saveEdit(cat.id)} style={{ padding: '6px 12px', background: GREEN, color: W, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 10, fontWeight: 700 }}>OK</button>
                <button onClick={() => setEditId(null)} style={{ padding: '6px 10px', background: 'transparent', color: '#888', border: `1px solid #ccc`, cursor: 'pointer', fontFamily: 'inherit', fontSize: 10 }}>✕</button>
              </div>
            ) : (
              <>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{cat.name}</div>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: TIPO_COLOR[cat.tipo], background: TIPO_COLOR[cat.tipo] + '18', padding: '2px 8px', marginTop: 4, display: 'inline-block' }}>{TIPO_LABEL[cat.tipo].toUpperCase()}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => { setEditId(cat.id); setEditData({ name: cat.name, tipo: cat.tipo }) }} style={{ padding: '6px 14px', fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer', border: `2px solid ${P}`, background: P, color: W }}>EDITAR</button>
                  <button onClick={() => remove(cat.id)} style={{ padding: '6px 12px', fontSize: 9, fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit', cursor: 'pointer', border: `2px solid ${RED}`, background: 'transparent', color: RED }}>EXCLUIR</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════════════════════════════

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [screen, setScreen] = useState('painel')
  const [mesas, setMesas] = useState({})
  const [mesaAtiva, setMesaAtiva] = useState(null)
  const [mesaStep, setMesaStep] = useState('mesas')
  const [mesasCarts, setMesasCarts] = useState({})

  const [products, setProducts] = useState([])
  const [clients, setClients] = useState([])
  const [sales, setSales] = useState([])
  const [stockItems, setStockItems] = useState([])
  const [movimentos, setMovimentos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [caixaAberto, setCaixaAberto] = useState(false)
  const [fundoInicial, setFundoInicial] = useState(0)

  useEffect(() => {
    if (!window.ChartJS) {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js'
      script.onload = () => { window.ChartJS = window.Chart }
      document.head.appendChild(script)
    } else {
      window.ChartJS = window.Chart
    }
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setLoading(false) })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  const loadAll = useCallback(async () => {
    const [p, c, v, e, m, cx, cat] = await Promise.all([
      supabase.from('produtos').select('*').order('category').order('name'),
      supabase.from('clientes').select('*').order('name'),
      supabase.from('vendas').select('*, itens:venda_itens(*)').order('created_at', { ascending: false }),
      supabase.from('estoque').select('*').order('name'),
      supabase.from('movimentos').select('*').eq('date', todayStr()).order('created_at'),
      supabase.from('caixa').select('*').eq('date', todayStr()).maybeSingle(),
      supabase.from('categorias').select('*').order('name'),
    ])
    if (p.data) setProducts(p.data)
    if (c.data) setClients(c.data)
    if (v.data) setSales(v.data)
    if (e.data) setStockItems(e.data)
    if (m.data) setMovimentos(m.data)
    if (cx.data) { setCaixaAberto(cx.data.aberto); setFundoInicial(cx.data.fundo_inicial) } else { setCaixaAberto(false); setFundoInicial(0) }
    if (cat.data) setCategorias(cat.data)
  }, [])

  useEffect(() => { if (session) loadAll() }, [session, loadAll])

  async function handleSale(data, onSuccess) {
    const { data: venda } = await supabase.from('vendas').insert({
      date: todayStr(),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      total: data.finalTotal,
      payment: data.payment,
      change_val: data.change || 0,
      items_count: data.items,
      origin: data.origin,
      mesa: data.mesa || null,
      client_id: data.foundClient?.id || null,
      points_earned: data.pointsEarned || 0,
      points_used: data.pointsUsed || 0,
    }).select().single()

    if (venda && data.cart) {
      await supabase.from('venda_itens').insert(data.cart.map(i => ({ venda_id: venda.id, produto_id: i.id, name: i.name, price: i.price, qty: i.qty, cost_insumos: i.cost_insumos || 0, cost_prod: i.cost_prod || 0 })))
      // Decrease product stock
      for (const item of data.cart) {
        await supabase.from('produtos').update({ qty: Math.max(0, (products.find(p => p.id === item.id)?.qty || 0) - item.qty) }).eq('id', item.id)
      }
    }

    if (data.foundClient) {
      await supabase.from('clientes').update({
        points: Math.max(0, data.foundClient.points + (data.pointsEarned || 0) - (data.usePoints ? data.pointsUsed || 0 : 0)),
        purchases: data.foundClient.purchases + 1,
      }).eq('id', data.foundClient.id)
    }

    await loadAll()
    onSuccess()
  }

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", color: P, fontSize: 12, letterSpacing: 1 }}>CARREGANDO...</div>
  if (!session) return <Login onLogin={() => {}} />

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: OFF, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: P, color: W, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', height: 50, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, letterSpacing: 1 }}>Rodat</span>
          <span style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ fontSize: 9, opacity: 0.6, letterSpacing: 1 }}>DOCES E CAFÉS</span>
        </div>
        <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
          <span style={{ fontSize: 10, opacity: 0.65 }}>{new Date().toLocaleDateString('pt-BR')}</span>
          <span style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ fontSize: 10, opacity: 0.65 }}>{caixaAberto ? '🟢 CAIXA ABERTO' : '🔴 CAIXA FECHADO'}</span>
          <span style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.3)' }} />
          <button onClick={() => supabase.auth.signOut()} style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, letterSpacing: 1 }}>SAIR</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: 130, background: DARK, display: 'flex', flexDirection: 'column', paddingTop: 12, flexShrink: 0 }}>
          {NAV.map(n => (
            <button key={n.key} onClick={() => setScreen(n.key)} style={{ padding: '12px 14px', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left', fontSize: 9, fontWeight: 700, letterSpacing: 1, border: 'none', background: screen === n.key ? P : 'transparent', color: screen === n.key ? W : 'rgba(255,255,255,0.4)', borderLeft: `3px solid ${screen === n.key ? W : 'transparent'}`, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14 }}>{n.icon}</span>{n.label.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {screen === 'painel'      && <Painel caixaAberto={caixaAberto} fundoInicial={fundoInicial} sales={sales} stockItems={stockItems} products={products} setScreen={setScreen} />}
          {screen === 'caixa'       && <CaixaModule caixaAberto={caixaAberto} setCaixaAberto={setCaixaAberto} fundoInicial={fundoInicial} setFundoInicial={setFundoInicial} sales={sales} movimentos={movimentos} reloadMovimentos={() => supabase.from('movimentos').select('*').eq('date', todayStr()).order('created_at').then(r => r.data && setMovimentos(r.data))} reloadCaixa={() => supabase.from('caixa').select('*').eq('date', todayStr()).single().then(r => r.data && (setCaixaAberto(r.data.aberto), setFundoInicial(r.data.fundo_inicial)))} />}
          {screen === 'pdv'         && <PDVModule products={products} setProducts={setProducts} clients={clients} onSale={handleSale} />}
          {screen === 'mesas'       && <MesasModule products={products} clients={clients} onSale={handleSale} mesas={mesas} setMesas={setMesas} mesaAtiva={mesaAtiva} setMesaAtiva={setMesaAtiva} mesaStep={mesaStep} setMesaStep={setMesaStep} mesasCarts={mesasCarts} setMesasCarts={setMesasCarts} />}
          {screen === 'historico'   && <Historico sales={sales} />}
          {screen === 'faturamento' && <Faturamento sales={sales} />}
          {screen === 'clientes'    && <Clientes clients={clients} reload={() => supabase.from('clientes').select('*').order('name').then(r => r.data && setClients(r.data))} />}
          {screen === 'produtos'    && <Produtos products={products} setProducts={setProducts} categorias={categorias} />}
          {screen === 'estoque'     && <Estoque stockItems={stockItems} setStockItems={setStockItems} categorias={categorias} />}
          {screen === 'categorias'  && <Categorias categorias={categorias} setCategorias={setCategorias} />}
        </div>
      </div>
    </div>
  )
}
