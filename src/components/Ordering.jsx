import React, { useState, useContext } from 'react';
import { CATS, M, MENU, TW, fmt } from '../data';
import { Ctx } from '../store';
import { Sheet, TableMap } from './ui';

export function Menu({ cart, setCart, hero }) {
  const { S } = useContext(Ctx);
  const [c, setC] = useState('All');
  const [q, setQ] = useState('');
  const [d, setD] = useState(null);
  const [n, setN] = useState(1);
  const [note, setNote] = useState('');

  const outOfStockIds = S.outOfStockIds || [];
  const activeMenu = S.menu && S.menu.length ? S.menu : MENU;

  const list = activeMenu.filter(m => {
    const matchCat = c === 'All' || m.c === c;
    const matchQ = m.n.toLowerCase().includes(q.toLowerCase()) || (m.d || '').toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQ;
  });

  const add = (id, k = 1, itemNote = '') => {
    if (outOfStockIds.includes(id)) return;
    setCart(prev => {
      const existing = prev.find(l => l.id === id && l.note === itemNote);
      if (existing) {
        return prev.map(l => l === existing ? { ...l, q: l.q + k } : l);
      }
      return [...prev, { id, q: k, note: itemNote }];
    });
  };

  return (
    <>
      {hero}
      <div className="search">
        <span>🔍</span>
        <input
          placeholder="Search dishes, drinks, ingredients..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        {q && <button onClick={() => setQ('')} style={{ color: 'var(--mut)', padding: '0 4px' }}>✕</button>}
      </div>

      <div className="cats">
        {CATS.map(x => (
          <button
            key={x}
            className={c === x ? 'on' : ''}
            onClick={() => setC(x)}
          >
            {x}
          </button>
        ))}
      </div>

      <div className="grid">
        {list.map(m => {
          const is86 = outOfStockIds.includes(m.id);
          return (
            <div
              key={m.id}
              className={`card food ${is86 ? 'sold-out' : ''}`}
              onClick={() => {
                setD(m);
                setN(1);
                setNote('');
              }}
            >
              <div className={'plate ' + m.c} style={{ position: 'relative' }}>
                {m.e}
                {is86 && <span className="sold-out-badge">86'D / SOLD OUT</span>}
              </div>

              <b>{m.n}</b>
              <small>{m.t} min prep · ★ {m.r}</small>

              {m.allergens && m.allergens.length > 0 && (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', margin: '2px 0' }}>
                  {m.allergens.map((alg, idx) => (
                    <span key={idx} className="allergen-tag">{alg}</span>
                  ))}
                </div>
              )}

              <div className="row" style={{ marginTop: 'auto', paddingTop: 6 }}>
                <b style={{ color: 'var(--o)' }}>{fmt(m.p)}</b>
                <button
                  type="button"
                  className="plus"
                  disabled={is86}
                  aria-label="Add"
                  onClick={e => {
                    e.stopPropagation();
                    if (!is86) add(m.id);
                  }}
                  style={{ opacity: is86 ? 0.3 : 1 }}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {!list.length && (
        <div className="card" style={{ textAlign: 'center', padding: '24px 12px' }}>
          <p>No items found matching “{q}”</p>
          <small>Try selecting a different category or clear the search.</small>
        </div>
      )}

      {d && (
        <Sheet onClose={() => setD(null)}>
          <div className={'plate ' + d.c} style={{ width: 140, height: 140, fontSize: 80, margin: '0 auto 12px' }}>
            {d.e}
          </div>
          <h3 style={{ textAlign: 'center', marginBottom: 6 }}>{d.n}</h3>
          <p style={{ textAlign: 'center', color: 'var(--mut)', margin: '0 0 10px' }}>{d.d}</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 14 }}>
            <span className="chip" style={{ background: 'var(--card)', border: '1px solid var(--line)', color: 'var(--tx)' }}>★ {d.r} Rating</span>
            <span className="chip" style={{ background: 'var(--card)', border: '1px solid var(--line)', color: 'var(--tx)' }}>⏱️ {d.t} mins</span>
            <span className="chip" style={{ background: 'var(--card)', border: '1px solid var(--line)', color: 'var(--tx)' }}>🔥 Station: {d.station}</span>
          </div>

          {d.allergens && d.allergens.length > 0 && (
            <div style={{ marginBottom: 12, textAlign: 'center' }}>
              <small style={{ color: '#FF6B2C' }}>⚠️ Contains allergens: {d.allergens.join(', ')}</small>
            </div>
          )}

          <div style={{ margin: '10px 0' }}>
            <small style={{ fontWeight: 600 }}>Special kitchen note (optional):</small>
            <input
              className="inp"
              placeholder="e.g. Extra spicy, sauce on the side, no onion"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </div>

          <div className="row" style={{ margin: '14px 0' }}>
            <div className="step">
              <button onClick={() => setN(Math.max(1, n - 1))}>−</button>
              <b>{n}</b>
              <button onClick={() => setN(n + 1)}>+</button>
            </div>
            <b style={{ fontSize: 22, color: 'var(--g)' }}>{fmt(d.p * n)}</b>
          </div>

          <button
            className="btn o"
            disabled={outOfStockIds.includes(d.id)}
            onClick={() => {
              add(d.id, n, note);
              setD(null);
            }}
          >
            {outOfStockIds.includes(d.id) ? 'Sold Out in Kitchen' : `Add ${n} to Cart · ${fmt(d.p * n)}`}
          </button>
        </Sheet>
      )}
    </>
  );
}

export function CartBar({ cart, open }) {
  const n = cart.reduce((a, l) => a + l.q, 0);
  if (!n) return null;
  const total = cart.reduce((a, l) => a + (M[l.id]?.p || 0) * l.q, 0);

  return (
    <div className="cbar">
      <button className="btn o" onClick={open}>
        <span className="row">
          <span>🛒 View Cart · {n} item{n > 1 ? 's' : ''}</span>
          <b>{fmt(total)}</b>
        </span>
      </button>
    </div>
  );
}

export function Checkout({ cart, setCart, mode, via, tb0, close, onPlaced, sess }) {
  const { S, A, wn } = useContext(Ctx);
  const [tb, setTb] = useState(tb0 || '');
  const [wid, setWid] = useState('');
  const [pm, setPm] = useState('momo');
  const [momoProvider, setMomoProvider] = useState('mpesa');
  const [momoPhone, setMomoPhone] = useState(sess?.ph || '0712000111');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce((a, l) => a + (M[l.id]?.p || 0) * l.q, 0);

  const chg = (idx, delta) => {
    setCart(prev => {
      const copy = [...prev];
      copy[idx].q += delta;
      return copy.filter(l => l.q > 0);
    });
  };

  const linkWid = via && via.wid;

  const place = () => {
    setIsSubmitting(true);
    // Routing rules (SRS Section 5.4)
    const assignedW = linkWid || wid || TW[tb] || (mode === 'waiter' ? sess.wid : '') || 'w1';
    const src = mode === 'waiter' ? 'WALKIN_WAITER' : mode === 'cashier' ? 'CASHIER' : linkWid ? 'WAITER_LINK' : via && via.qr ? 'TABLE_QR' : 'CUSTOMER_PORTAL';

    A.place({
      src,
      tb: tb || 'Takeaway',
      wid: mode === 'waiter' ? sess.wid : assignedW,
      it: cart,
      pm: mode === 'customer' ? pm : 'cashier',
      momoDetails: pm === 'momo' ? { provider: momoProvider, phone: momoPhone } : null,
      cust: sess?.id || 'guest_' + Date.now(),
      by: sess?.name || (mode === 'waiter' ? wn(sess.wid) : 'Guest Customer')
    }, sess?.name || 'Customer');

    setTimeout(() => {
      setCart([]);
      setIsSubmitting(false);
      onPlaced();
    }, 300);
  };

  return (
    <Sheet title="Review & Place Order" onClose={close}>
      <div className="card" style={{ marginBottom: 12 }}>
        {cart.map((l, idx) => (
          <div key={idx} className="row" style={{ padding: '8px 0', borderBottom: idx < cart.length - 1 ? '1px solid var(--line)' : 'none' }}>
            <div>
              <b>{M[l.id]?.e} {M[l.id]?.n}</b>
              <br />
              <small>{fmt(M[l.id]?.p)} each</small>
              {l.note && <div style={{ fontSize: 12, color: 'var(--o)' }}>Note: {l.note}</div>}
            </div>
            <div className="step">
              <button type="button" onClick={() => chg(idx, -1)}>−</button>
              <b>{l.q}</b>
              <button type="button" onClick={() => chg(idx, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <TableMap val={tb} set={setTb} />

      {mode !== 'waiter' && !linkWid && (
        <div style={{ margin: '14px 0' }}>
          <p className="sec" style={{ fontSize: 16 }}>Assigned Waiter</p>
          <div className="tags">
            <button className={!wid ? 'on' : ''} onClick={() => setWid('')}>
              Auto Assignment {TW[tb] ? `(Table: ${wn(TW[tb])})` : ''}
            </button>
            {(S.waiters || []).map(w => (
              <button key={w.id} className={wid === w.id ? 'on' : ''} onClick={() => setWid(w.id)}>
                {w.avatar || '🧑‍🍳'} {w.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {linkWid && (
        <div className="card" style={{ margin: '12px 0', background: '#E5F2EE', borderColor: 'var(--g)' }}>
          <small style={{ color: 'var(--g)', fontWeight: 600 }}>ORDER ATTRIBUTION (SRS Section 5.3):</small>
          <div style={{ fontWeight: 600, color: 'var(--g)' }}>
            Served & Credited to {wn(linkWid)} (via waiter personal link)
          </div>
        </div>
      )}

      {mode === 'customer' && (
        <div style={{ margin: '14px 0' }}>
          <p className="sec" style={{ fontSize: 16 }}>Payment Method</p>
          <div className="tags">
            {[['momo', '📱 Mobile Money (Direct push)'], ['cashier', '💵 Settle with Waiter / Cashier']].map(([k, l]) => (
              <button key={k} className={pm === k ? 'on' : ''} onClick={() => setPm(k)}>
                {l}
              </button>
            ))}
          </div>

          {pm === 'momo' && (
            <div className="card" style={{ marginTop: 8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 8 }}>
                {[['mpesa', 'M-Pesa (Voda)'], ['tigo', 'Tigo Pesa'], ['airtel', 'Airtel Money']].map(([p, label]) => (
                  <button
                    key={p}
                    type="button"
                    className={`btn ghost sm ${momoProvider === p ? 'active-site' : ''}`}
                    style={{ fontSize: 11, padding: '6px 2px' }}
                    onClick={() => setMomoProvider(p)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <input
                className="inp"
                placeholder="Mobile Money Phone (e.g. 0712000111)"
                value={momoPhone}
                onChange={e => setMomoPhone(e.target.value)}
              />
              <small style={{ color: 'var(--mut)' }}>A USSD push prompt will be sent upon ordering.</small>
            </div>
          )}
        </div>
      )}

      <div className="row" style={{ margin: '14px 0' }}>
        <div>
          <small style={{ color: 'var(--mut)' }}>Total Amount Due</small>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--g)' }}>{fmt(total)}</div>
        </div>
      </div>

      <button
        className="btn o"
        disabled={!tb || !cart.length || isSubmitting}
        onClick={place}
      >
        {isSubmitting ? 'Sending to Kitchen…' : tb ? `Confirm & Send to Kitchen (${fmt(total)})` : 'Choose a Table First'}
      </button>
    </Sheet>
  );
}
