import React, { useState, useContext } from 'react';
import { fmt, tot, calcNet, calcTax } from '../data';
import { Ctx } from '../store';
import { Hd, Install, OC, Receipt, Sheet, TableMap, Tabs, TopBar, Pill } from '../components/ui';
import { CartBar, Checkout, Menu } from '../components/Ordering';

export function Cashier({ sess, out, setSess, setV }) {
  const { S, A, wn } = useContext(Ctx);
  const [tab, setTab] = useState('queue');
  const [ft, setFt] = useState('');
  const [cx, setCx] = useState(null);
  const [z, setZ] = useState(false);
  const [fl, setFl] = useState(String(S.openingFloat || 200000));
  const [cnt, setCnt] = useState(S.countedCash || '');
  const [ho, setHo] = useState({});
  const [cart, setCart] = useState([]);
  const [co, setCo] = useState(false);
  const [rc, setRc] = useState(null);
  const [discountOrder, setDiscountOrder] = useState(null);
  const [discountType, setDiscountType] = useState('10');
  const [discountReason, setDiscountReason] = useState('Manager Goodwill');

  const kit = (S.orders || []).filter(o => ['placed', 'accepted', 'preparing', 'ready'].includes(o.st));
  const bill = (S.orders || []).filter(o => o.st === 'billreq');
  const wait = (S.orders || []).filter(o => !o.paid && o.st === 'served');
  const done = (S.orders || []).filter(o => o.st === 'paid');
  const paid = (S.orders || []).filter(o => o.paid || o.st === 'closed');

  const by = m => paid.filter(o => o.pm === m).reduce((a, o) => a + tot(o), 0);
  const out_ = (S.orders || []).filter(o => !o.paid && o.st !== 'cancelled').reduce((a, o) => a + tot(o), 0);

  const handleApplyDiscount = () => {
    if (!discountOrder) return;
    const pct = +discountType || 10;
    // We can record a discount log on order
    const order = discountOrder;
    order.discountPct = pct;
    order.discountReason = discountReason;
    setDiscountOrder(null);
  };

  const PayActions = ({ o }) => (
    <>
      {!o.paid && (
        <>
          <select
            className="btn ghost sm"
            value={o.wid || ''}
            onChange={e => A.assign(o.id, e.target.value, sess?.name || 'Cashier')}
            aria-label="Waiter"
            style={{ fontSize: 13, padding: '6px 8px' }}
          >
            {(S.waiters || []).map(w => (
              <option key={w.id} value={w.id}>
                {w.name.split(' ')[0]}
              </option>
            ))}
          </select>

          <button
            className="btn sm"
            onClick={() => A.pay(o.id, 'cash', 'CSH' + Math.random().toString(36).slice(2, 6).toUpperCase(), sess?.name || 'Cashier')}
          >
            💵 Cash Received
          </button>

          <button
            className="btn o sm"
            onClick={() => A.pay(o.id, 'momo', 'MP' + Math.random().toString(36).slice(2, 6).toUpperCase(), sess?.name || 'Cashier')}
          >
            📱 Momo Verified
          </button>
        </>
      )}

      {o.st === 'paid' && (
        <>
          <button className="btn ghost sm" onClick={() => setRc(o)}>
            Receipt
          </button>
          <button className="btn sm" onClick={() => A.st(o.id, 'closed', sess?.name || 'Cashier')}>
            Close Bill
          </button>
        </>
      )}
    </>
  );

  const Sec = ({ t, l, k, urgent }) => (
    <div style={{ marginBottom: 16 }}>
      <div className="row" style={{ marginBottom: 6 }}>
        <p className="sec" style={{ margin: 0, color: urgent ? '#C2410C' : 'inherit' }}>
          {urgent ? '🔥 ' : ''}{t} <small>({l.length})</small>
        </p>
      </div>

      {!l.length && <small style={{ color: 'var(--mut)', display: 'block', margin: '4px 0 10px' }}>No active bills in this category.</small>}

      <div className="cg">
        {l.map(o => (
          <OC key={o.id} o={o}>
            {k ? (
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn ghost sm" style={{ color: '#FF3B30' }} onClick={() => setCx(o)}>
                  Void / Cancel
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {!o.paid && (
                  <button className="btn ghost sm" onClick={() => setDiscountOrder(o)}>
                    % Discount
                  </button>
                )}
                <PayActions o={o} />
              </div>
            )}
          </OC>
        ))}
      </div>
    </div>
  );

  return (
    <div className="app wide">
      <TopBar sess={sess} setSess={setSess} setV={setV} currentView="cashier" />

      {tab === 'queue' && (
        <>
          <Hd
            s={`Cashier Reception Desk · ${sess?.name || 'Zawadi Ally'}`}
            t="Front of House Bill Queue"
            r={
              <button className="btn sm o" onClick={() => setTab('new')}>
                + New Desk Order
              </button>
            }
          />

          <div className="dash">
            <div>
              <Sec urgent t="Customer & Waiter Bill Requests" l={bill} />
              <Sec t="Served Tables (Awaiting Settlement)" l={wait} />
              <Sec t="Paid Bills (Ready to Close & Archive)" l={done} />
              <Sec k t="Orders in Cooking / Prep" l={kit} />
            </div>

            <div className="fl">
              <TableMap big val={ft} set={t => setFt(t === ft ? '' : t)} />
              {ft && (
                <div style={{ marginTop: 12 }}>
                  <Sec
                    t={`Orders for Table ${ft}`}
                    l={(S.orders || []).filter(o => o.tb === ft && !['closed', 'cancelled'].includes(o.st))}
                  />
                  <button className="btn sm" style={{ width: '100%' }} onClick={() => setTab('new')}>
                    + Place New Order for Table {ft}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {tab === 'new' && (
        <div>
          <Hd s="Walk-in / Reception Counter" t="New Desk Order" />
          <Menu cart={cart} setCart={setCart} />
          <CartBar cart={cart} open={() => setCo(true)} />
        </div>
      )}

      {tab === 'floor' && (
        <div>
          <Hd s="Interactive Floor & Table Status" t="Dining Floor View" />
          <TableMap big val={ft} set={t => setFt(t === ft ? '' : t)} />

          {ft && (
            <div style={{ marginTop: 16 }}>
              <Sec
                t={`Active Orders at Table ${ft}`}
                l={(S.orders || []).filter(o => o.tb === ft && !['closed', 'cancelled'].includes(o.st))}
              />
              <button className="btn sm" style={{ width: '100%', maxWidth: 300 }} onClick={() => setTab('new')}>
                + Place New Order for Table {ft}
              </button>
            </div>
          )}

          <div className="card" style={{ marginTop: 16 }}>
            <b>Dining Table Guidelines:</b>
            <p style={{ fontSize: 13, color: 'var(--mut)', margin: '4px 0 0' }}>
              Orange tables denote an active open check. Tap any table to filter active tickets, add items, or initiate billing.
            </p>
          </div>
        </div>
      )}

      {tab === 'cash' && (
        <>
          <Hd
            s="Daily Reconciliation & Float"
            t="Cash Desk Settlement"
            r={
              <button className="btn sm o" onClick={() => setZ(true)}>
                Generate Z-Report
              </button>
            }
          />

          <div className="tiles">
            {[
              ['Cash in Drawer', by('cash'), '#15803D'],
              ['Mobile Money (M-Pesa/Tigo)', by('momo'), '#007AFF'],
              ['Total Net Sales', by('cash') + by('momo'), '#0E5A47'],
              ['Unsettled Bills', out_, '#FF6B2C']
            ].map(([l, v, c]) => (
              <div className="card" key={l}>
                <small>{l}</small>
                <b style={{ color: c, fontSize: 22 }}>{fmt(v)}</b>
              </div>
            ))}
          </div>

          <p className="sec" style={{ marginTop: 18 }}>Cash Drawer Balance</p>
          <div className="card">
            <div className="fld">
              <span>Opening Cash Float (Morning)</span>
              <input
                className="inp"
                inputMode="numeric"
                value={fl}
                onChange={e => {
                  setFl(e.target.value);
                  A.updateFloat(+e.target.value, cnt);
                }}
              />
            </div>

            <div className="fld">
              <span>Blind Cash Count (Counted in Drawer)</span>
              <input
                className="inp"
                inputMode="numeric"
                placeholder="Counted cash"
                value={cnt}
                onChange={e => {
                  setCnt(e.target.value);
                  A.updateFloat(+fl, e.target.value);
                }}
              />
            </div>

            <div className="row" style={{ marginTop: 8 }}>
              <span>Expected Cash (Float + Cash Sales)</span>
              <b style={{ fontSize: 18 }}>{fmt((+fl || 0) + by('cash'))}</b>
            </div>

            {cnt !== '' && (
              <div className="row" style={{ marginTop: 6, borderTop: '1px solid var(--line)', paddingTop: 6 }}>
                <span>Over / Short Discrepancy</span>
                <b style={{ color: (+cnt) - ((+fl || 0) + by('cash')) < 0 ? '#FF3B30' : '#15803D', fontSize: 18 }}>
                  {fmt((+cnt) - ((+fl || 0) + by('cash')))}
                </b>
              </div>
            )}
          </div>

          <p className="sec" style={{ marginTop: 18 }}>Waiter Cash Hand-over (SRS Section 5.7, REC-06)</p>
          <div className="card" style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Waiter</th>
                  <th>Orders</th>
                  <th>Total Sales</th>
                  <th>Expected Cash</th>
                  <th>Cash Handed Over</th>
                  <th>Difference</th>
                  <th>Commission Accrued</th>
                </tr>
              </thead>
              <tbody>
                {(S.waiters || []).map(w => {
                  const os = (S.orders || []).filter(o => o.wid === w.id);
                  const commission = (S.ledger || []).filter(l => l.wid === w.id && l.st !== 'reversed').reduce((a, l) => a + l.amt, 0);
                  const expectedCash = os
                    .filter(o => o.pm === 'cash' && (o.paid || o.st === 'closed'))
                    .reduce((a, o) => a + tot(o), 0);
                  const difference = (+ho[w.id] || 0) - expectedCash;
                  const hasHanded = ho[w.id] !== undefined && ho[w.id] !== '';

                  return (
                    <tr key={w.id}>
                      <td><b>{w.name}</b></td>
                      <td>{os.length}</td>
                      <td>{fmt(os.filter(o => o.paid || o.st === 'closed').reduce((a, o) => a + tot(o), 0))}</td>
                      <td><b>{fmt(expectedCash)}</b></td>
                      <td>
                        <input
                          className="inp"
                          style={{ width: 110, margin: 0, padding: 6 }}
                          inputMode="numeric"
                          placeholder="0"
                          value={ho[w.id] || ''}
                          onChange={e => setHo({ ...ho, [w.id]: e.target.value })}
                        />
                      </td>
                      <td style={{ color: hasHanded && difference < 0 ? '#FF3B30' : 'inherit', fontWeight: 600 }}>
                        {hasHanded ? fmt(difference) : '–'}
                      </td>
                      <td style={{ color: '#15803D', fontWeight: 600 }}>{fmt(commission)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            <button className="btn o sm" onClick={() => setZ(true)}>
              Close Shift & Print Z-Report
            </button>
            <Install cls="btn ghost sm" />
            <button className="btn ghost sm" onClick={A.reset}>
              Reset Demo Store Data
            </button>
            <button className="btn ghost sm" onClick={out}>
              Sign Out
            </button>
          </div>
        </>
      )}

      {cx && (
        <Sheet title={`Cancel Order ${cx.no}`} onClose={() => setCx(null)}>
          <div className="card">
            <small style={{ color: '#FF3B30', fontWeight: 600 }}>CANCELLATION & AUDIT LOG (SRS Business Rule 3):</small>
            <p style={{ margin: '6px 0 12px' }}>Pick an audit reason code for cancellation:</p>
            <div style={{ display: 'grid', gap: 8 }}>
              {['Customer changed mind', 'Kitchen out of stock', 'Wrong table entered', 'Duplicate ticket', 'Manager void'].map(r => (
                <button
                  key={r}
                  className="btn ghost"
                  onClick={() => {
                    A.cancel(cx.id, r, sess?.name || 'Cashier');
                    setCx(null);
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </Sheet>
      )}

      {discountOrder && (
        <Sheet title={`Apply Discount to ${discountOrder.no}`} onClose={() => setDiscountOrder(null)}>
          <div className="card">
            <div className="row" style={{ marginBottom: 10 }}>
              <span>Order Total:</span>
              <b>{fmt(tot(discountOrder))}</b>
            </div>

            <small style={{ fontWeight: 600 }}>Discount Percentage:</small>
            <div className="seg">
              {['5', '10', '15', '20', '50'].map(p => (
                <button key={p} className={discountType === p ? 'on' : ''} onClick={() => setDiscountType(p)}>
                  {p}%
                </button>
              ))}
            </div>

            <small style={{ fontWeight: 600, display: 'block', marginTop: 10 }}>Reason Code / Authorization:</small>
            <select className="inp" value={discountReason} onChange={e => setDiscountReason(e.target.value)}>
              <option value="Manager Goodwill">Manager Goodwill / VIP Guest</option>
              <option value="Staff Dining">Staff Dining (20%)</option>
              <option value="Kitchen Delay Apology">Kitchen Delay Apology</option>
              <option value="Promotional Happy Hour">Promotional Happy Hour</option>
            </select>

            <button className="btn o" style={{ marginTop: 14 }} onClick={handleApplyDiscount}>
              Apply {discountType}% Discount
            </button>
          </div>
        </Sheet>
      )}

      {z && (
        <Sheet title="Day End Shift Z-Report (SRS Section 6.3)" onClose={() => setZ(false)}>
          <div className="card receipt-paper" style={{ fontFamily: 'monospace', fontSize: 13 }}>
            <div style={{ textAlign: 'center', marginBottom: 10 }}>
              <b>SAFARI GRILL & LOUNGE</b>
              <br />
              <small>Z-REPORT · SHIFT CLOSING SUMMARY</small>
              <br />
              <small>Masaki Outlet · Machine POS-01</small>
            </div>

            <div style={{ borderTop: '1px dashed var(--line)', borderBottom: '1px dashed var(--line)', padding: '6px 0', margin: '6px 0' }}>
              <div className="row"><span>Date: {new Date().toLocaleDateString()}</span><span>Time: {new Date().toLocaleTimeString()}</span></div>
              <div className="row"><span>Cashier: {sess?.name || 'Zawadi Ally'}</span><span>Status: BALANCED</span></div>
            </div>

            {[
              ['Paid Orders Settled', paid.length],
              ['Gross Cash Sales', fmt(by('cash'))],
              ['Mobile Money (M-Pesa/Tigo)', fmt(by('momo'))],
              ['Total Net Revenue', fmt(by('cash') + by('momo'))],
              ['VAT Tax (18% Collected)', fmt(calcTax(by('cash') + by('momo')))],
              ['Cancelled / Voided Orders', (S.orders || []).filter(o => o.st === 'cancelled').length],
              ['Open / Outstanding Bills', (S.orders || []).filter(o => !o.paid && o.st !== 'cancelled').length],
              ['Opening Cash Float', fmt(+fl || 0)],
              ['Counted Drawer Cash', fmt(+cnt || 0)],
              ['Waiter Commission Accrued', fmt((S.ledger || []).reduce((a, l) => a + l.amt, 0))]
            ].map(([k, v]) => (
              <div key={k} className="row" style={{ padding: '4px 0' }}>
                <span>{k}:</span>
                <b>{v}</b>
              </div>
            ))}

            <div style={{ borderTop: '1px dashed var(--line)', paddingTop: 10, marginTop: 10, textAlign: 'center', color: 'var(--mut)' }}>
              *** END OF Z-REPORT · BUSINESS DAY LOCKED ***
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button className="btn o sm" style={{ flex: 1 }} onClick={() => { A.setShift('closed', sess?.name || 'Cashier'); setZ(false); }}>
              Lock Day & Transmit to HQ
            </button>
            <button className="btn ghost sm" onClick={() => setZ(false)}>
              Close
            </button>
          </div>
        </Sheet>
      )}

      {co && (
        <Checkout
          cart={cart}
          setCart={setCart}
          mode="cashier"
          tb0={ft}
          sess={sess}
          close={() => setCo(false)}
          onPlaced={() => {
            setCo(false);
            setTab('queue');
          }}
        />
      )}

      {rc && <Receipt o={rc} close={() => setRc(null)} />}

      <Tabs
        cur={tab}
        set={setTab}
        tabs={[
          ['queue', 'Bill Queue', '🧾', bill.length],
          ['new', 'Desk Order', '➕', 0],
          ['floor', 'Floor Plan', '🪑', 0],
          ['cash', 'Cash Drawer', '💵', 0]
        ]}
      />
    </div>
  );
}
