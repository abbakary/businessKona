import React, { useState, useContext, useEffect } from 'react';
import { M, MENU, ST, fmt, fmtTime } from '../data';
import { Ctx } from '../store';
import { Hd, Pill, Sheet, Tabs, TopBar } from '../components/ui';

export function KDS({ sess, out, setSess, setV }) {
  const { S, A, wn } = useContext(Ctx);
  const [tab, setTab] = useState('tickets');
  const [station, setStation] = useState('all');
  const [wasteModal, setWasteModal] = useState(false);
  const [selectedStockId, setSelectedStockId] = useState('stk_chicken');
  const [wasteQty, setWasteQty] = useState('1');
  const [wasteReason, setWasteReason] = useState('Overcooked on grill');
  const [haccpLog, setHaccpLog] = useState({ fridge: '3.1', freezer: '-18.2', pass: '68.5' });
  const [haccpSaved, setHaccpSaved] = useState(false);

  // Active kitchen orders
  const activeOrders = (S.orders || []).filter(o => ['placed', 'accepted', 'preparing', 'ready'].includes(o.st));

  // Station filtering
  const filterByStation = order => {
    if (station === 'all') return true;
    return (order.it || []).some(line => {
      const item = M[line.id];
      if (station === 'grill') return item?.station === 'grill';
      if (station === 'fry') return item?.station === 'fry' || item?.station === 'sides';
      if (station === 'bar') return item?.station === 'bar';
      if (station === 'dessert') return item?.station === 'dessert';
      return true;
    });
  };

  const visibleOrders = activeOrders.filter(filterByStation);

  // Calculate prep requirements from active orders
  const prepCounts = {};
  activeOrders.forEach(o => {
    (o.it || []).forEach(line => {
      prepCounts[line.id] = (prepCounts[line.id] || 0) + line.q;
    });
  });

  const getUrgency = orderTime => {
    const elapsedMinutes = Math.round((Date.now() - orderTime) / 60000);
    if (elapsedMinutes > 18) return { label: `${elapsedMinutes}m overdue`, color: '#FF3B30', bg: '#FFE5E5' };
    if (elapsedMinutes > 10) return { label: `${elapsedMinutes}m in prep`, color: '#FF9500', bg: '#FFF4E5' };
    return { label: `${elapsedMinutes}m new`, color: '#34C759', bg: '#EBF9EE' };
  };

  const handleBump = (orderId, currentSt) => {
    if (currentSt === 'placed') A.st(orderId, 'accepted', sess?.name || 'Chef');
    else if (currentSt === 'accepted') A.st(orderId, 'preparing', sess?.name || 'Chef');
    else if (currentSt === 'preparing') A.st(orderId, 'ready', sess?.name || 'Chef');
    else if (currentSt === 'ready') A.st(orderId, 'served', sess?.name || 'Pass Expo');
  };

  const handleLogWaste = () => {
    const stockItem = (S.stock || []).find(s => s.id === selectedStockId);
    if (!stockItem) return;
    const qty = +wasteQty || 1;
    const cost = Math.round(qty * stockItem.unitCost);

    A.logWaste({
      stockId: stockItem.id,
      name: stockItem.name,
      qty,
      uom: stockItem.uom,
      cost,
      reason: wasteReason
    }, sess?.name || 'Chef Baraka');

    setWasteModal(false);
  };

  return (
    <div className="app wide">
      <TopBar sess={sess} setSess={setSess} setV={setV} currentView="chef" />

      <Hd
        s={`KDS Kitchen Display · ${sess?.name || 'Head Chef'}`}
        t="Kitchen Operations"
        r={
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn sm ghost" onClick={() => setWasteModal(true)}>
              🗑️ Log Waste
            </button>
            <button className="btn sm ghost" onClick={out}>
              Exit
            </button>
          </div>
        }
      />

      <div className="seg" style={{ overflowX: 'auto', marginBottom: 14 }}>
        {[
          ['tickets', `Live Tickets (${activeOrders.length})`],
          ['86', `86-List (${(S.outOfStockIds || []).length} sold out)`],
          ['prep', 'Prep Requirements'],
          ['haccp', 'HACCP & Temp Logs']
        ].map(([k, l]) => (
          <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'tickets' && (
        <>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14, overflowX: 'auto' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--mut)', whiteSpace: 'nowrap' }}>Station:</span>
            {[
              ['all', 'All Stations'],
              ['grill', '🥩 Charcoal Grill'],
              ['fry', '🍟 Fryer & Sides'],
              ['bar', '🍹 Bar & Drinks'],
              ['dessert', '🍰 Pastry & Desserts']
            ].map(([stId, stName]) => (
              <button
                key={stId}
                className={`btn sm ghost ${station === stId ? 'active-site' : ''}`}
                style={{ whiteSpace: 'nowrap', fontSize: 13, padding: '6px 12px' }}
                onClick={() => setStation(stId)}
              >
                {stName}
              </button>
            ))}
          </div>

          {!visibleOrders.length && (
            <div className="card" style={{ textAlign: 'center', padding: '40px 16px' }}>
              <div style={{ fontSize: 44, marginBottom: 8 }}>👨🏾‍🍳</div>
              <h3>Kitchen Pass All Clear!</h3>
              <p style={{ color: 'var(--mut)' }}>No pending orders on this station. New tickets from POS, table QR, or waiter links appear here in real time.</p>
            </div>
          )}

          <div className="cg" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 14 }}>
            {visibleOrders.map(o => {
              const urgency = getUrgency(o.t);
              return (
                <div
                  key={o.id}
                  className="card"
                  style={{
                    borderTop: `6px solid ${urgency.color}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div className="row">
                      <b style={{ fontSize: 18 }}>{o.no} · Table {o.tb}</b>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: urgency.color,
                          background: urgency.bg,
                          padding: '3px 8px',
                          borderRadius: 6
                        }}
                      >
                        ⏱️ {urgency.label}
                      </span>
                    </div>

                    <div style={{ fontSize: 12, color: 'var(--mut)', margin: '4px 0 10px' }}>
                      Server: <b>{wn(o.wid)}</b> · Source: {o.src.replace('_', ' ').toLowerCase()} · Placed {fmtTime(o.t)}
                    </div>

                    <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '8px 0' }}>
                      {(o.it || []).map((line, idx) => (
                        <div key={idx} style={{ margin: '6px 0', fontSize: 15 }}>
                          <span style={{ fontWeight: 700, marginRight: 8, fontSize: 16 }}>{line.q}×</span>
                          <b>{M[line.id]?.n || `Item #${line.id}`}</b>
                          {line.note && (
                            <div style={{ color: '#FF6B2C', fontSize: 12, marginLeft: 24, fontStyle: 'italic' }}>
                              ⚠️ Note: {line.note}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
                    {o.st === 'placed' && (
                      <button
                        className="btn sm"
                        style={{ flex: 1, background: '#007AFF' }}
                        onClick={() => handleBump(o.id, o.st)}
                      >
                        ✓ Accept Ticket
                      </button>
                    )}
                    {o.st === 'accepted' && (
                      <button
                        className="btn sm o"
                        style={{ flex: 1 }}
                        onClick={() => handleBump(o.id, o.st)}
                      >
                        🔥 Fire / Start Cooking
                      </button>
                    )}
                    {o.st === 'preparing' && (
                      <button
                        className="btn sm"
                        style={{ flex: 1, background: '#34C759' }}
                        onClick={() => handleBump(o.id, o.st)}
                      >
                        🔔 Mark Ready at Pass
                      </button>
                    )}
                    {o.st === 'ready' && (
                      <button
                        className="btn sm ghost"
                        style={{ flex: 1, color: 'var(--g)', borderColor: 'var(--g)' }}
                        onClick={() => handleBump(o.id, o.st)}
                      >
                        🍽️ Bump / Served
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === '86' && (
        <div>
          <div className="card" style={{ marginBottom: 14 }}>
            <b>Out of Stock (86-ing) Management</b>
            <p style={{ fontSize: 13, color: 'var(--mut)', margin: '4px 0 0' }}>
              Items marked as 86 are immediately disabled across Waiter handhelds, Cashier POS, and the Customer Web Portal so diners cannot order depleted items.
            </p>
          </div>

          <div className="cg" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
            {MENU.map(m => {
              const is86 = (S.outOfStockIds || []).includes(m.id);
              return (
                <div
                  key={m.id}
                  className="card row"
                  style={{
                    background: is86 ? '#FFF0F0' : 'var(--card)',
                    borderColor: is86 ? '#FF3B30' : 'var(--line)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 28 }}>{m.e}</span>
                    <div>
                      <b>{m.n}</b>
                      <div style={{ fontSize: 12, color: 'var(--mut)' }}>{m.c} · {fmt(m.p)}</div>
                    </div>
                  </div>

                  <button
                    className={`btn sm ${is86 ? 'o' : 'ghost'}`}
                    style={{ fontSize: 12, padding: '6px 10px', minWidth: 90 }}
                    onClick={() => A.toggle86(m.id, sess?.name || 'Chef')}
                  >
                    {is86 ? 'Mark In Stock' : '86 Item'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'prep' && (
        <div>
          <div className="card" style={{ marginBottom: 14 }}>
            <b>Computed Kitchen Prep Requirements (SRS KDS-05)</b>
            <p style={{ fontSize: 13, color: 'var(--mut)', margin: '4px 0 0' }}>
              Calculated dynamically from live active orders currently in the kitchen queue:
            </p>
          </div>

          <div className="tiles">
            {Object.keys(prepCounts).map(id => {
              const item = M[id];
              return (
                <div key={id} className="card">
                  <small>{item?.c || 'Menu'}</small>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '4px 0' }}>
                    <b style={{ fontSize: 18 }}>{item?.n}</b>
                    <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--o)' }}>
                      {prepCounts[id]} portions
                    </span>
                  </div>
                  <small style={{ color: 'var(--mut)' }}>Station: {item?.station || 'Grill'}</small>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'haccp' && (
        <div style={{ maxWidth: 640 }}>
          <div className="card">
            <b>HACCP Food Safety & Cold Chain Log (SRS QSC-02)</b>
            <p style={{ fontSize: 13, color: 'var(--mut)', margin: '4px 0 14px' }}>
              Mandatory temperature verification for cold storage and hot holding units:
            </p>

            <div className="fld" style={{ margin: '10px 0' }}>
              <span>Walk-in Meat/Poultry Cooler (Target: 0°C to 4°C)</span>
              <input
                className="inp"
                value={haccpLog.fridge}
                onChange={e => setHaccpLog({ ...haccpLog, fridge: e.target.value })}
                style={{ width: 100 }}
              />
            </div>

            <div className="fld" style={{ margin: '10px 0' }}>
              <span>Deep Freeze Meat Locker (Target: &lt; -18°C)</span>
              <input
                className="inp"
                value={haccpLog.freezer}
                onChange={e => setHaccpLog({ ...haccpLog, freezer: e.target.value })}
                style={{ width: 100 }}
              />
            </div>

            <div className="fld" style={{ margin: '10px 0' }}>
              <span>Cooked Pass Hot Holding (Target: &gt; 63°C)</span>
              <input
                className="inp"
                value={haccpLog.pass}
                onChange={e => setHaccpLog({ ...haccpLog, pass: e.target.value })}
                style={{ width: 100 }}
              />
            </div>

            <button
              className="btn"
              style={{ marginTop: 14 }}
              onClick={() => {
                setHaccpSaved(true);
                setTimeout(() => setHaccpSaved(false), 2000);
              }}
            >
              {haccpSaved ? '✓ Temperature Log Recorded & Signed' : 'Sign & Submit HACCP Log'}
            </button>
          </div>
        </div>
      )}

      {wasteModal && (
        <Sheet title="Log Food Waste / Spoilage (INV-08)" onClose={() => setWasteModal(false)}>
          <div className="card">
            <small style={{ fontWeight: 600 }}>Select Stock Ingredient:</small>
            <select
              className="inp"
              value={selectedStockId}
              onChange={e => setSelectedStockId(e.target.value)}
            >
              {(S.stock || []).map(stk => (
                <option key={stk.id} value={stk.id}>
                  {stk.name} ({stk.cat}) · Cost: {fmt(stk.unitCost)}/{stk.uom}
                </option>
              ))}
            </select>

            <small style={{ fontWeight: 600 }}>Quantity Wasted:</small>
            <input
              className="inp"
              type="number"
              step="0.5"
              value={wasteQty}
              onChange={e => setWasteQty(e.target.value)}
            />

            <small style={{ fontWeight: 600 }}>Reason Code:</small>
            <select
              className="inp"
              value={wasteReason}
              onChange={e => setWasteReason(e.target.value)}
            >
              <option value="Overcooked / Prep error">Overcooked / Prep error</option>
              <option value="Dropped / Contaminated">Dropped / Contaminated</option>
              <option value="Expired / Past shelf life">Expired / Past shelf life</option>
              <option value="Customer returned item">Customer returned item</option>
              <option value="Trim loss">Excess trim loss</option>
            </select>

            <button className="btn o" style={{ marginTop: 14 }} onClick={handleLogWaste}>
              Record Waste Entry
            </button>
          </div>
        </Sheet>
      )}

      <Tabs
        cur={tab}
        set={setTab}
        tabs={[
          ['tickets', 'KDS Tickets', '🍳', activeOrders.length],
          ['86', '86-List', '🚫', (S.outOfStockIds || []).length],
          ['prep', 'Prep Lists', '📋', 0],
          ['haccp', 'HACCP Log', '🌡️', 0]
        ]}
      />
    </div>
  );
}
