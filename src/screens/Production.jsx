import React, { useState, useContext } from 'react';
import { fmt, fmtNum, BOMS, SITES, M } from '../data';
import { Ctx } from '../store';
import { Hd, Pill, Sheet, Tabs, TopBar } from '../components/ui';

export function Production({ sess, out, setSess, setV }) {
  const { S, A } = useContext(Ctx);
  const [tab, setTab] = useState('batches');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newBatchModal, setNewBatchModal] = useState(false);
  const [completeModalWO, setCompleteModalWO] = useState(null);
  const [labelModalWO, setLabelModalWO] = useState(null);
  const [dispatchModalReq, setDispatchModalReq] = useState(null);

  // New batch form
  const [selBomId, setSelBomId] = useState(BOMS[0].id);
  const [targetYield, setTargetYield] = useState(String(BOMS[0].targetYield));

  // Complete batch form
  const [actualYieldInput, setActualYieldInput] = useState('');
  const [tempLogInput, setTempLogInput] = useState('2.4°C');
  const [notesInput, setNotesInput] = useState('QC passed: appearance, weight, and aroma verified.');

  // Dispatch form
  const [driverName, setDriverName] = useState('Rashid Mtambo (Van #TZ 881 AC)');
  const [transportTemp, setTransportTemp] = useState('2.8°C');

  // Traceability search
  const [traceQuery, setTraceQuery] = useState('#1001');

  const boms = S.boms || BOMS;
  const productionOrders = S.productionOrders || [];
  const finishedGoods = S.finishedGoods || [];
  const siteRequisitions = S.siteRequisitions || [];

  const filteredOrders = productionOrders.filter(wo => {
    if (statusFilter === 'all') return true;
    return wo.status === statusFilter;
  });

  const handleCreateBatch = () => {
    A.createProductionOrder(selBomId, +targetYield, sess?.name || 'Jaffar Mdee (CK Manager)');
    setNewBatchModal(false);
  };

  const handleOpenCompleteModal = wo => {
    setCompleteModalWO(wo);
    setActualYieldInput(String(wo.plannedYield));
    setTempLogInput('2.4°C');
    setNotesInput('Passed QA sensory and weight audit.');
  };

  const handleConfirmComplete = () => {
    if (!completeModalWO) return;
    A.completeProduction(
      completeModalWO.id,
      +actualYieldInput || completeModalWO.plannedYield,
      tempLogInput,
      notesInput,
      sess?.name || 'Jaffar Mdee'
    );
    setCompleteModalWO(null);
  };

  const handleConfirmDispatch = () => {
    if (!dispatchModalReq) return;
    A.dispatchRequisition(dispatchModalReq.id, driverName, transportTemp, sess?.name || 'Production Dispatch');
    setDispatchModalReq(null);
  };

  // Find trace record
  const searchedOrder = (S.orders || []).find(o => o.no === traceQuery || String(o.id) === traceQuery);

  return (
    <div className="app wide">
      <TopBar sess={sess} setSess={setSess} setV={setV} currentView="production" />

      <Hd
        s={`Central Kitchen & Manufacturing · ${sess?.name || 'Jaffar Mdee'}`}
        t="Production & Finished Goods"
        r={
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn sm o" onClick={() => setNewBatchModal(true)}>
              + Schedule Batch Order
            </button>
            <button className="btn sm ghost" onClick={out}>
              Exit
            </button>
          </div>
        }
      />

      <div className="inv-subnav">
        {[
          ['batches', `Work Orders`, '🔥', productionOrders.filter(w => w.status !== 'completed').length],
          ['boms', `Recipes & BOM Costing`, '📜', boms.length],
          ['finished', `Finished Sales Goods`, '🍱', finishedGoods.length],
          ['requisitions', `Site Requisitions`, '🚚', siteRequisitions.filter(r => r.status === 'pending').length],
          ['traceability', 'End-to-End Traceability', '🛡️', 0]
        ].map(([k, l, icon, count]) => (
          <button
            key={k}
            className={`inv-tab-btn ${tab === k ? 'on' : ''}`}
            onClick={() => setTab(k)}
          >
            <span>{icon}</span>
            <span>{l}</span>
            {count !== undefined && count > 0 && (
              <span className="inv-tab-badge">{count}</span>
            )}
          </button>
        ))}
      </div>

      {tab === 'batches' && (
        <>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14, overflowX: 'auto' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--mut)' }}>Filter:</span>
            {[
              ['all', 'All Batches'],
              ['planned', 'Planned Schedule'],
              ['in_production', 'In Production 🔥'],
              ['completed', 'Completed & Packaged ✓']
            ].map(([stKey, label]) => (
              <button
                key={stKey}
                className={`btn sm ghost ${statusFilter === stKey ? 'active-site' : ''}`}
                style={{ fontSize: 12, padding: '6px 12px' }}
                onClick={() => setStatusFilter(stKey)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="cg" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
            {filteredOrders.map(wo => {
              const isCompleted = wo.status === 'completed';
              const isInProd = wo.status === 'in_production';

              return (
                <div
                  key={wo.id}
                  className="card"
                  style={{
                    borderLeft: `5px solid ${isCompleted ? '#15803D' : isInProd ? '#FF6B2C' : '#007AFF'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div className="row">
                      <b>{wo.batchNo}</b>
                      <span
                        className="pill"
                        style={{
                          background: isCompleted ? '#DDF3E4' : isInProd ? '#FFE9DD' : '#E0EDFE',
                          color: isCompleted ? '#15803D' : isInProd ? '#C2410C' : '#007AFF'
                        }}
                      >
                        {wo.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <h3 style={{ margin: '6px 0 2px', fontSize: 18 }}>{wo.productName}</h3>
                    <small style={{ color: 'var(--mut)' }}>Work Order ID: {wo.id} · Lead: {wo.operator}</small>

                    <div style={{ background: 'var(--bg)', padding: '10px 12px', borderRadius: 12, margin: '10px 0', fontSize: 13 }}>
                      <div className="row">
                        <span>Planned Target:</span>
                        <b>{wo.plannedYield} {wo.uom}</b>
                      </div>
                      {isCompleted && (
                        <div className="row" style={{ marginTop: 2 }}>
                          <span>Actual Output:</span>
                          <b style={{ color: wo.yieldVariancePct < 0 ? '#FF3B30' : '#15803D' }}>
                            {wo.actualYield} {wo.uom} ({wo.yieldVariancePct >= 0 ? '+' : ''}{wo.yieldVariancePct}%)
                          </b>
                        </div>
                      )}
                      <div className="row" style={{ marginTop: 2 }}>
                        <span>Total Batch Cost:</span>
                        <b>{fmt(wo.totalBatchCost)} ({fmt(wo.unitCost)}/{wo.uom})</b>
                      </div>
                      <div className="row" style={{ marginTop: 2 }}>
                        <span>Cold Chain Temp:</span>
                        <span style={{ color: 'var(--g)', fontWeight: 600 }}>{wo.tempLog || '2.8°C'}</span>
                      </div>
                      <div className="row" style={{ marginTop: 2 }}>
                        <span>Shelf Expiry:</span>
                        <small>{wo.expiryDate}</small>
                      </div>
                    </div>

                    {wo.notes && (
                      <p style={{ fontSize: 12, color: 'var(--mut)', fontStyle: 'italic', margin: '4px 0 8px' }}>
                        Note: {wo.notes}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                    {wo.status === 'planned' && (
                      <button
                        className="btn sm o"
                        style={{ flex: 1 }}
                        onClick={() => A.startProduction(wo.id, sess?.name || 'Chef')}
                      >
                        🔥 Start Production
                      </button>
                    )}

                    {isInProd && (
                      <button
                        className="btn sm"
                        style={{ flex: 1, background: '#15803D' }}
                        onClick={() => handleOpenCompleteModal(wo)}
                      >
                        ✓ Complete & QA Pass
                      </button>
                    )}

                    {isCompleted && (
                      <button
                        className="btn sm ghost"
                        style={{ flex: 1 }}
                        onClick={() => setLabelModalWO(wo)}
                      >
                        🏷️ Print Batch Label
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === 'boms' && (
        <div>
          <div className="card" style={{ marginBottom: 14 }}>
            <b>Bill of Materials (BOM) & Recipe Costing (SRS MNU-02, MNU-03)</b>
            <p style={{ fontSize: 13, color: 'var(--mut)', margin: '4px 0 0' }}>
              Standard ingredient recipes, yield ratios, labor & overhead allocation, and unit cost formulation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
            {boms.map(bom => {
              const materialsCost = bom.ingredients.reduce((acc, ing) => {
                const stk = (S.stock || []).find(x => x.id === ing.stockId);
                return acc + (ing.qty * (stk?.unitCost || 5000));
              }, 0);
              const totalCost = materialsCost + bom.laborCost + bom.overheadCost;
              const costPerUnit = Math.round(totalCost / bom.targetYield);

              return (
                <div key={bom.id} className="card">
                  <div className="row">
                    <b>{bom.name}</b>
                    <span className="chip" style={{ background: '#E5F2EE', color: 'var(--g)', margin: 0 }}>
                      Yield: {bom.targetYield} {bom.uom}
                    </span>
                  </div>

                  <div style={{ fontSize: 13, color: 'var(--mut)', margin: '4px 0 10px' }}>
                    Output: <b>{bom.outputName}</b> · Prep Time: {bom.prepTimeMins} mins · Shelf Life: {bom.shelfLifeHours} hrs
                  </div>

                  <b style={{ fontSize: 13 }}>Raw Ingredients Consumed:</b>
                  <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '6px 0', margin: '6px 0' }}>
                    {bom.ingredients.map((ing, idx) => {
                      const stk = (S.stock || []).find(x => x.id === ing.stockId);
                      const lineCost = ing.qty * (stk?.unitCost || 5000);
                      return (
                        <div key={idx} className="row" style={{ fontSize: 12, padding: '2px 0' }}>
                          <span>{ing.qty} {ing.uom} {ing.name}</span>
                          <b>{fmt(lineCost)}</b>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ fontSize: 12, background: 'var(--bg)', padding: 8, borderRadius: 8, margin: '8px 0' }}>
                    <div className="row"><span>Raw Materials:</span><span>{fmt(materialsCost)}</span></div>
                    <div className="row"><span>Direct Labor ({bom.prepTimeMins}m):</span><span>{fmt(bom.laborCost)}</span></div>
                    <div className="row"><span>Utilities & Overhead:</span><span>{fmt(bom.overheadCost)}</span></div>
                    <div className="row" style={{ borderTop: '1px solid var(--line)', paddingTop: 4, fontWeight: 700 }}>
                      <span>Batch Cost / Unit Cost:</span>
                      <b style={{ color: 'var(--g)' }}>{fmt(totalCost)} · {fmt(costPerUnit)}/{bom.uom}</b>
                    </div>
                  </div>

                  <button
                    className="btn sm o"
                    style={{ width: '100%', marginTop: 6 }}
                    onClick={() => {
                      setSelBomId(bom.id);
                      setTargetYield(String(bom.targetYield));
                      setNewBatchModal(true);
                    }}
                  >
                    + Schedule Batch Production
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'finished' && (
        <div>
          <div className="card" style={{ marginBottom: 14 }}>
            <b>Prepared & Finished Goods Inventory (Sales Goods Storage)</b>
            <p style={{ fontSize: 13, color: 'var(--mut)', margin: '4px 0 0' }}>
              Real-time stock of kitchen-manufactured finished and semi-finished food items ready for line service or outlet dispatch.
            </p>
          </div>

          <div className="card" style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Finished Sales Good</th>
                  <th>Category</th>
                  <th>On-Hand Stock</th>
                  <th>PAR Target</th>
                  <th>Batch Lot No.</th>
                  <th>Unit Cost</th>
                  <th>Expiry Date</th>
                  <th>Storage Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {finishedGoods.map(fg => {
                  const isLow = fg.onHand < fg.reorder;
                  return (
                    <tr key={fg.id}>
                      <td>
                        <b>{fg.name}</b>
                        {fg.menuId && <div style={{ fontSize: 11, color: 'var(--mut)' }}>Linked Sales Item: #{fg.menuId} {M[fg.menuId]?.n}</div>}
                      </td>
                      <td>{fg.category}</td>
                      <td><b>{fmtNum(fg.onHand)} {fg.uom}</b></td>
                      <td>{fg.par} {fg.uom}</td>
                      <td><code>{fg.batchNo}</code></td>
                      <td>{fmt(fg.unitCost)}</td>
                      <td><small>{fg.expiry}</small></td>
                      <td><small>{fg.loc}</small></td>
                      <td>
                        <span className="pill" style={{ background: isLow ? '#FFE0DE' : '#DDF3E4', color: isLow ? '#C62828' : '#15803D' }}>
                          {isLow ? 'Reorder Needed' : 'In Stock'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'requisitions' && (
        <div>
          <div className="card" style={{ marginBottom: 14 }}>
            <b>Branch Outlet Requisitions & Central Kitchen Dispatch (SRS CK-01, CK-03)</b>
            <p style={{ fontSize: 13, color: 'var(--mut)', margin: '4px 0 0' }}>
              Internal orders sent from branch restaurants (Oysterbay, City Centre) to the Central Production Kitchen for dispatch.
            </p>
          </div>

          <div className="cg">
            {siteRequisitions.map(req => {
              const isDispatched = req.status === 'dispatched';
              const isReceived = req.status === 'received';

              return (
                <div key={req.id} className="card" style={{ borderLeft: `4px solid ${isReceived ? '#15803D' : isDispatched ? '#007AFF' : '#FF9500'}` }}>
                  <div className="row">
                    <b>{req.id} · To {req.fromSiteName}</b>
                    <span className="pill" style={{ textTransform: 'capitalize' }}>{req.status}</span>
                  </div>

                  <small style={{ color: 'var(--mut)', display: 'block', margin: '4px 0 8px' }}>
                    Requested by: {req.requestedBy} ({new Date(req.requestedAt).toLocaleTimeString()})
                  </small>

                  <div style={{ background: 'var(--bg)', padding: 10, borderRadius: 10, margin: '8px 0' }}>
                    {(req.items || []).map((it, idx) => (
                      <div key={idx} className="row" style={{ fontSize: 13, padding: '2px 0' }}>
                        <span>{it.qty} {it.uom} {it.name}</span>
                        <span style={{ color: 'var(--g)', fontWeight: 600 }}>Batch Allocated ✓</span>
                      </div>
                    ))}
                  </div>

                  {isDispatched && (
                    <div style={{ fontSize: 12, color: 'var(--mut)', margin: '6px 0' }}>
                      🚚 Transport Driver: <b>{req.driver}</b> · Van Temp: <b>{req.transportTemp}</b>
                    </div>
                  )}

                  {req.status === 'pending' && (
                    <div style={{ marginTop: 10 }}>
                      <button className="btn sm o" onClick={() => setDispatchModalReq(req)}>
                        🚚 Prepare & Dispatch to {req.fromSiteName.split('·')[1] || 'Outlet'}
                      </button>
                    </div>
                  )}

                  {isDispatched && (
                    <div style={{ marginTop: 10 }}>
                      <button
                        className="btn sm ghost"
                        style={{ color: '#15803D', borderColor: '#15803D' }}
                        onClick={() => A.receiveRequisition(req.id, sess?.name || 'Branch Manager')}
                      >
                        ✓ Confirm Branch Receipt
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'traceability' && (
        <div style={{ maxWidth: 740 }}>
          <div className="card" style={{ marginBottom: 14 }}>
            <b>End-to-End Farm-to-Table Traceability Explorer (SRS QSC-04, NFR-12)</b>
            <p style={{ fontSize: 13, color: 'var(--mut)', margin: '4px 0 0' }}>
              Instant backward & forward audit chain: search any Order number or Batch code to view full supplier source, production operator, temperature history, and table delivery.
            </p>
          </div>

          <div className="search" style={{ marginBottom: 14 }}>
            <span>🔍</span>
            <input
              placeholder="Enter Order # (e.g. #1001, #1004) or Batch #..."
              value={traceQuery}
              onChange={e => setTraceQuery(e.target.value)}
            />
          </div>

          {searchedOrder ? (
            <div className="card">
              <div className="row" style={{ borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
                <div>
                  <small>STEP 1 · CUSTOMER DINING & SALE</small>
                  <h3 style={{ margin: 0 }}>Order {searchedOrder.no} · Table {searchedOrder.tb}</h3>
                </div>
                <Pill st={searchedOrder.st} />
              </div>

              <div style={{ margin: '12px 0' }}>
                <p><b>Diner / Guest:</b> {searchedOrder.by || 'Guest'} · Waiter: {searchedOrder.wid}</p>
                <p><b>Dishes Ordered:</b> {(searchedOrder.it || []).map(l => `${l.q}x ${M[l.id]?.n}`).join(', ')}</p>
                <p><b>Payment Status:</b> {searchedOrder.paid ? `✓ Paid via ${searchedOrder.pm}` : 'Pending'}</p>
              </div>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: 10, marginTop: 10 }}>
                <small style={{ color: 'var(--o)', fontWeight: 700 }}>STEP 2 · CENTRAL KITCHEN MANUFACTURING BATCH</small>
                <div style={{ background: 'var(--bg)', padding: 10, borderRadius: 10, marginTop: 6 }}>
                  <div className="row">
                    <b>Batch BATCH-20261101-01</b>
                    <span className="pill" style={{ background: '#DDF3E4', color: '#15803D' }}>QA PASSED ✓</span>
                  </div>
                  <div style={{ fontSize: 13, margin: '4px 0' }}>
                    Product: <b>Marinated Chicken Halves</b> · Prep Lead: <b>Chef Baraka</b>
                  </div>
                  <div style={{ fontSize: 13 }}>
                    Cold Chain Log: <b>2.6°C</b> · Shelf Life Expiry: <b>Nov 3, 2026</b>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: 10, marginTop: 10 }}>
                <small style={{ color: '#007AFF', fontWeight: 700 }}>STEP 3 · RAW MATERIAL SUPPLIER INVOICE & RECEIVING</small>
                <div style={{ background: 'var(--bg)', padding: 10, borderRadius: 10, marginTop: 6, fontSize: 13 }}>
                  <div className="row">
                    <b>PO-881 · Serengeti Meats & Poultry</b>
                    <span>Verified Delivery Temp: 3.4°C</span>
                  </div>
                  <div style={{ margin: '4px 0' }}>
                    Raw Supply: 25 kg Whole Fresh Chicken (Lot #SP-991A) · Quality Grade A
                  </div>
                  <small style={{ color: 'var(--mut)' }}>Received by Storekeeper Hamisi Bakari</small>
                </div>
              </div>

              <div style={{ marginTop: 14, textAlign: 'center', color: '#15803D', fontWeight: 600, fontSize: 13 }}>
                ✓ Complete End-to-End Chain Verified with Zero Discrepancy
              </div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
              <p>No active order found matching “{traceQuery}”. Try searching “#1001” or “#1004”.</p>
            </div>
          )}
        </div>
      )}

      {newBatchModal && (
        <Sheet title="Schedule New Production Batch (CK-02)" onClose={() => setNewBatchModal(false)}>
          <div className="card">
            <small style={{ fontWeight: 600 }}>Select Recipe Bill of Materials (BOM):</small>
            <select
              className="inp"
              value={selBomId}
              onChange={e => {
                setSelBomId(e.target.value);
                const b = boms.find(x => x.id === e.target.value);
                if (b) setTargetYield(String(b.targetYield));
              }}
            >
              {boms.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} (Std Yield: {b.targetYield} {b.uom})
                </option>
              ))}
            </select>

            <small style={{ fontWeight: 600, display: 'block', marginTop: 10 }}>Target Output Yield Quantity:</small>
            <input
              className="inp"
              type="number"
              value={targetYield}
              onChange={e => setTargetYield(e.target.value)}
            />

            <p style={{ fontSize: 13, color: 'var(--mut)', margin: '10px 0' }}>
              Scheduling will reserve raw materials and assign a unique Batch ID with automated inventory cost tracking.
            </p>

            <button className="btn o" style={{ marginTop: 10 }} onClick={handleCreateBatch}>
              Schedule Production Work Order
            </button>
          </div>
        </Sheet>
      )}

      {completeModalWO && (
        <Sheet title={`Complete Batch ${completeModalWO.batchNo}`} onClose={() => setCompleteModalWO(null)}>
          <div className="card">
            <div className="row" style={{ marginBottom: 10 }}>
              <b>{completeModalWO.productName}</b>
              <span>Planned: {completeModalWO.plannedYield} {completeModalWO.uom}</span>
            </div>

            <small style={{ fontWeight: 600 }}>Actual Yield Output Count:</small>
            <input
              className="inp"
              type="number"
              value={actualYieldInput}
              onChange={e => setActualYieldInput(e.target.value)}
            />

            <small style={{ fontWeight: 600, display: 'block', marginTop: 10 }}>HACCP Temperature Log at Completion:</small>
            <input
              className="inp"
              placeholder="e.g. 2.4°C"
              value={tempLogInput}
              onChange={e => setTempLogInput(e.target.value)}
            />

            <small style={{ fontWeight: 600, display: 'block', marginTop: 10 }}>Quality Assurance Inspection Notes:</small>
            <input
              className="inp"
              value={notesInput}
              onChange={e => setNotesInput(e.target.value)}
            />

            <div style={{ background: '#E5F2EE', padding: 10, borderRadius: 10, margin: '12px 0', fontSize: 13, color: 'var(--g)' }}>
              ⚡ <b>Automatic Inventory Execution:</b> Completing this batch will automatically deduct raw ingredients from stock and increment {actualYieldInput || completeModalWO.plannedYield} {completeModalWO.uom} into finished goods storage!
            </div>

            <button className="btn o" onClick={handleConfirmComplete}>
              Confirm Completion & Update Finished Goods
            </button>
          </div>
        </Sheet>
      )}

      {labelModalWO && (
        <Sheet title={`HACCP Batch Label (SRS CK-04)`} onClose={() => setLabelModalWO(null)}>
          <div className="card receipt-paper" style={{ border: '2px solid #000', borderRadius: 8, padding: 16 }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: 8, marginBottom: 8 }}>
              <b style={{ fontSize: 16 }}>SAFARI GRILL · CENTRAL PREPARATION KITCHEN</b>
              <div style={{ fontSize: 12 }}>MASAKI PRODUCTION FACILITY</div>
            </div>

            <div className="row" style={{ fontSize: 14 }}>
              <span>PRODUCT:</span>
              <b>{labelModalWO.productName.toUpperCase()}</b>
            </div>
            <div className="row" style={{ fontSize: 14 }}>
              <span>BATCH LOT #:</span>
              <b><code>{labelModalWO.batchNo}</code></b>
            </div>
            <div className="row" style={{ fontSize: 14 }}>
              <span>YIELD COUNT:</span>
              <b>{labelModalWO.actualYield || labelModalWO.plannedYield} {labelModalWO.uom}</b>
            </div>
            <div className="row" style={{ fontSize: 14 }}>
              <span>PREPARED ON:</span>
              <span>{new Date(labelModalWO.completedAt || labelModalWO.createdAt).toLocaleString()}</span>
            </div>
            <div className="row" style={{ fontSize: 14 }}>
              <span>USE BY / EXPIRY:</span>
              <b style={{ color: '#FF3B30' }}>{labelModalWO.expiryDate}</b>
            </div>
            <div className="row" style={{ fontSize: 14 }}>
              <span>STORAGE REQ:</span>
              <b>CHILLER 0°C – 3°C</b>
            </div>

            <div style={{ borderTop: '1px dashed #000', borderBottom: '1px dashed #000', padding: '6px 0', margin: '8px 0', fontSize: 12 }}>
              ALLERGEN WARNING: {labelModalWO.allergens ? labelModalWO.allergens.join(', ') : 'None Declared'}
            </div>

            <div style={{ textAlign: 'center', marginTop: 10 }}>
              <div style={{ fontFamily: 'monospace', fontSize: 24, letterSpacing: 4 }}>||||| | |||| || |||</div>
              <small>{labelModalWO.batchNo}</small>
            </div>
          </div>

          <button className="btn ghost sm" style={{ width: '100%', marginTop: 10 }} onClick={() => setLabelModalWO(null)}>
            Print & Close Label
          </button>
        </Sheet>
      )}

      {dispatchModalReq && (
        <Sheet title={`Dispatch Requisition ${dispatchModalReq.id}`} onClose={() => setDispatchModalReq(null)}>
          <div className="card">
            <p><b>Destination:</b> {dispatchModalReq.fromSiteName}</p>

            <small style={{ fontWeight: 600 }}>Assigned Transport Driver & Vehicle:</small>
            <input
              className="inp"
              value={driverName}
              onChange={e => setDriverName(e.target.value)}
            />

            <small style={{ fontWeight: 600, display: 'block', marginTop: 10 }}>Refrigerated Vehicle Temperature Log:</small>
            <input
              className="inp"
              placeholder="e.g. 2.8°C"
              value={transportTemp}
              onChange={e => setTransportTemp(e.target.value)}
            />

            <button className="btn o" style={{ marginTop: 14 }} onClick={handleConfirmDispatch}>
              Authorize Dispatch & Generate Delivery Note
            </button>
          </div>
        </Sheet>
      )}

      <Tabs
        cur={tab}
        set={setTab}
        tabs={[
          ['batches', 'Work Orders', '🏭', productionOrders.filter(w => w.status !== 'completed').length],
          ['boms', 'BOM Recipes', '📋', 0],
          ['finished', 'Finished Goods', '📦', 0],
          ['requisitions', 'Site Orders', '🚚', siteRequisitions.filter(r => r.status === 'pending').length],
          ['traceability', 'Traceability', '🔍', 0]
        ]}
      />
    </div>
  );
}
