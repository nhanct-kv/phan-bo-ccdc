import { useState } from 'react'

const DATA = [
  { id: 1, name: 'Bộ bát sứ cao cấp', qty: 100, code: 'MH-202603-0045', date: '25/03/2026', type: 'Công cụ dụng cụ', total: '240.000.000', branch: 'Chi nhánh 1' },
  { id: 2, name: 'Máy pha café La Marzocco', qty: 10, code: 'MH-202603-0045', date: '25/03/2026', type: 'Công cụ dụng cụ', total: '240.000.000', branch: 'Chi nhánh 1' },
  { id: 3, name: 'Máy in HP LaserJet Pro M404n', qty: 100, code: 'MH-202603-0045', date: '25/03/2026', type: 'Công cụ dụng cụ', total: '240.000.000', branch: 'Chi nhánh 1' },
  { id: 4, name: 'Điện thoại bàn Panasonic KX-TS500', qty: 100, code: 'MH-202603-0045', date: '25/03/2026', type: 'Công cụ dụng cụ', total: '240.000.000', branch: 'Chi nhánh 1' },
]

const TABS = [
  { label: 'Chưa ghi nhận', count: 6 },
  { label: 'Dùng một kỳ', count: 6 },
  { label: 'Phân bổ nhiều kỳ', count: 6 },
]

const NAV_COLOR = '#0070f4'
const SELL_BTN_COLOR = '#7abaff'
const TABLE_HEADER_BG = '#e6f1fe'

const CHEVRON_DOWN_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23677484' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7" cy="7" r="5" />
      <path d="M11 11l3.5 3.5" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="5.5" r="1" fill="currentColor" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" />
      <path d="M1.5 6h13M5 1v3M11 1v3" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 4h11M6.5 4V2.5h3V4M4 4l.6 9a1 1 0 0 0 1 .9h4.8a1 1 0 0 0 1-.9L12 4M6.5 7v4M9.5 7v4" />
    </svg>
  )
}

function ModalOverlay({ children, onClose, width = 520 }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ width }} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

function ItemCard({ item }) {
  return (
    <div className="info-card">
      <div className="info-card-left">
        <div className="info-card-name">{item.name}</div>
        <div className="info-card-meta">
          <span>{item.type}</span><span className="dot-sep">·</span><span>{item.qty} bộ</span>
        </div>
        <div className="info-card-meta">Ngày mua: 07/03/2026 15:41<span className="dot-sep">·</span>{item.code}</div>
      </div>
      <div className="info-card-right">
        <div className="info-card-price">45.000.000</div>
      </div>
    </div>
  )
}

function ChooseMethodModal({ item, phanboOption, setPhanboOption, onClose, onContinue }) {
  return (
    <ModalOverlay onClose={onClose} width={640}>
      <button className="modal-close" onClick={onClose}>✕</button>
      <div className="modal-title" style={{ lineHeight: '1.75' }}>Phân bổ chi phí công cụ dụng cụ</div>
      <div className="modal-body">
        <p style={{ lineHeight: '0.6' }}>
          Chọn cách thiết lập phân bổ chi phí cho <strong>100 bộ</strong> {item?.name}:
        </p>
        <div className="radio-group" style={{ marginTop: 16 }}>
          <div className={`radio-item${phanboOption === 0 ? ' selected' : ''}`} onClick={() => setPhanboOption(0)}>
            <div className="radio-circle" />
            <div>
              <div className="radio-label">Áp dụng một thiết lập phân bổ cho 100 bộ</div>
            </div>
          </div>
          <div className={`radio-item${phanboOption === 1 ? ' selected' : ''}`} onClick={() => setPhanboOption(1)}>
            <div className="radio-circle" />
            <div style={{ lineHeight: '1.2' }}>
              <div className="radio-label" style={{ whiteSpace: 'nowrap' }}>
                Chia thành các nhóm với số lượng và thiết lập phân bổ riêng
              </div>
              <div className="radio-desc">Sử dụng khi CCDC được sử dụng ở nhiều địa điểm hoặc mục đích khác nhau.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-outline" onClick={onClose}>Hủy bỏ</button>
        <button className="btn btn-primary" onClick={onContinue}>Tiếp tục</button>
      </div>
    </ModalOverlay>
  )
}

function RecordCostModal({ item, ghinhanNgay, setGhinhanNgay, ghinhanThang, setGhinhanThang, onClose }) {
  const months = parseInt(ghinhanThang) || 0

  return (
    <ModalOverlay onClose={onClose}>
      <button className="modal-close" onClick={onClose}>✕</button>
      <div className="modal-title">Ghi nhận chi phí</div>
      <div className="modal-body">
        <ItemCard item={item} />

        <div className="form-field">
          <div className="form-label">Địa điểm sử dụng</div>
          <select className="form-select">
            <option>Chi nhánh Hà Nội</option>
            <option>Chi nhánh HCM</option>
          </select>
        </div>

        <div className="form-field">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <div className="form-label">Ngày bắt đầu phân bổ</div>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Chọn ngày"
                  value={ghinhanNgay}
                  onChange={(e) => setGhinhanNgay(e.target.value)}
                  style={{ width: '100%', height: 40, border: '1px solid #e8eaed', borderRadius: 12, padding: '0 36px 0 12px', fontSize: 14, fontFamily: 'Inter,sans-serif', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                />
                <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#85909d', pointerEvents: 'none', display: 'flex' }}>
                  <CalendarIcon />
                </span>
              </div>
            </div>
            <div>
              <div className="form-label">Thời gian phân bổ (theo tháng)</div>
              <input
                type="text"
                placeholder="VD: 12"
                value={ghinhanThang}
                onChange={(e) => setGhinhanThang(e.target.value)}
                style={{ width: '100%', height: 40, border: '1px solid #e8eaed', borderRadius: 12, padding: '0 12px', fontSize: 14, fontFamily: 'Inter,sans-serif', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </div>

        {months === 1 && (
          <div className="info-banner">
            <InfoIcon />
            <span>
              Toàn bộ chi phí <strong>45,000,000</strong> sẽ được ghi nhận là chi phí tháng <strong>1/2026</strong> trong Sổ doanh thu, chi phí (S2c-HKD).
            </span>
          </div>
        )}
        {months > 1 && (
          <div className="info-banner">
            <InfoIcon />
            <span>
              Chi phí <strong>45,000,000đ</strong> sẽ được chia đều và tự động ghi nhận vào Sổ doanh thu, chi phí (S2c-HKD) trong <strong>{months} tháng</strong> - từ 1/2026 đến 1/2027, mỗi tháng ghi nhận <strong>{Math.round(45000000 / months).toLocaleString('en-US')}đ</strong>.
            </span>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button className="btn btn-outline" onClick={onClose}>Hủy bỏ</button>
        <button className="btn btn-primary" onClick={onClose}>Lưu</button>
      </div>
    </ModalOverlay>
  )
}

function GroupRecordModal({ item, nhomPhanBo, addNhom, updateNhom, removeNhom, onClose }) {
  const sumAllocated = nhomPhanBo.reduce((s, n) => s + (parseInt(n.soLuong) || 0), 0)
  const remaining = Math.max(0, 100 - sumAllocated)

  return (
    <ModalOverlay onClose={onClose} width={780}>
      <button className="modal-close" onClick={onClose}>✕</button>
      <div className="modal-title">Ghi nhận chi phí</div>
      <div className="modal-body">
        <ItemCard item={item} />

        <div className="table-card" style={{ marginBottom: 12 }}>
          <table>
            <thead style={{ background: '#e6f1fe' }}>
              <tr>
                <th style={{ width: 50 }}>Nhóm</th>
                <th>Địa điểm sử dụng</th>
                <th style={{ width: 120 }}>Số lượng CCDC</th>
                <th>Ngày bắt đầu</th>
                <th style={{ width: 110 }}>Thời gian phân bổ</th>
                <th style={{ textAlign: 'right', width: 100 }}>Giá trị phân bổ/tháng</th>
                <th style={{ width: 36 }}></th>
              </tr>
            </thead>
            <tbody>
              {nhomPhanBo.map((nhom, idx) => {
                const sl = parseInt(nhom.soLuong) || 0
                const months = parseInt(nhom.thoiGian) || 0
                const monthly = months > 0 ? Math.round(sl * 450000 / months) : 0

                return (
                  <tr key={nhom.id}>
                    <td style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600, color: '#15171a' }}>{idx + 1}</td>
                    <td style={{ padding: '8px 10px' }}>
                      <select
                        value={nhom.diaDiem}
                        onChange={(e) => updateNhom(idx, 'diaDiem', e.target.value)}
                        style={{ width: '100%', height: 32, border: '1px solid #e8eaed', borderRadius: 8, padding: '0 24px 0 8px', fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none', background: `#fff url("${CHEVRON_DOWN_SVG}") no-repeat right 8px center`, appearance: 'none' }}
                      >
                        <option>Chi nhánh Hà Nội</option>
                        <option>Chi nhánh HCM</option>
                      </select>
                    </td>
                    <td style={{ padding: '8px 10px' }}>
                      <div style={{ position: 'relative' }}>
                        <input
                          value={nhom.soLuong}
                          onChange={(e) => updateNhom(idx, 'soLuong', e.target.value)}
                          style={{ width: '100%', height: 32, border: '1px solid #e8eaed', borderRadius: 8, padding: '0 55px 0 8px', fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }}
                        />
                        <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#85909d' }}>/ 100</span>
                      </div>
                    </td>
                    <td style={{ padding: '8px 10px' }}>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          placeholder="Chọn ngày"
                          value={nhom.ngay}
                          onChange={(e) => updateNhom(idx, 'ngay', e.target.value)}
                          style={{ width: '100%', height: 32, border: '1px solid #e8eaed', borderRadius: 8, padding: '0 28px 0 8px', fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }}
                        />
                        <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#85909d', pointerEvents: 'none', display: 'flex' }}>
                          <CalendarIcon />
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '8px 10px' }}>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          placeholder="VD: 12"
                          value={nhom.thoiGian}
                          onChange={(e) => updateNhom(idx, 'thoiGian', e.target.value)}
                          style={{ width: '100%', height: 32, border: '1px solid #e8eaed', borderRadius: 8, padding: '0 40px 0 8px', fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }}
                        />
                        <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#85909d' }}>tháng</span>
                      </div>
                    </td>
                    <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>
                      {monthly > 0 ? monthly.toLocaleString('vi-VN') : '—'}
                    </td>
                    <td style={{ padding: '8px 4px', textAlign: 'center' }}>
                      {nhomPhanBo.length > 1 && (
                        <button
                          onClick={() => removeNhom(idx)}
                          style={{ background: 'none', border: 'none', color: '#85909d', cursor: 'pointer', padding: 4, display: 'inline-flex', alignItems: 'center' }}
                          title="Xóa"
                        >
                          <TrashIcon />
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {sumAllocated > 100 && (
          <div style={{ background: '#fff4f4', border: '1px solid #fbcfcf', borderRadius: 8, padding: '12px 14px', fontSize: 14, lineHeight: '20px', color: '#a8071a', marginBottom: 12 }}>
            Tổng số lượng CCDC không được vượt quá <strong>100 bộ</strong> (Hiện tại: <strong>{sumAllocated} bộ</strong>)
          </div>
        )}
        {remaining > 0 && sumAllocated > 0 && sumAllocated <= 100 && (
          <div style={{ background: '#f2f8fe', border: '1px solid #cce2fd', borderRadius: 8, padding: '12px 14px', fontSize: 14, lineHeight: '20px', color: '#15171a', marginBottom: 12 }}>
            Còn <strong>{remaining} bộ</strong> {item?.name} chưa được ghi nhận chi phí. Bạn có thể xem và ghi nhận sau tại danh sách CCDC chưa ghi nhận.
          </div>
        )}

        <div style={{ marginTop: 4 }}>
          <span style={{ color: '#0070f4', fontWeight: 600, fontSize: 14, cursor: 'pointer' }} onClick={addNhom}>
            + Thêm nhóm phân bổ
          </span>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-outline" onClick={onClose}>Hủy bỏ</button>
        <button className="btn btn-primary" onClick={onClose}>Lưu</button>
      </div>
    </ModalOverlay>
  )
}

function MultiAllocModal({ item, opt2Forms, addOpt2Form, updateOpt2, removeOpt2Form, opt2Collapsed, setOpt2Collapsed, onClose, onSave, restrictNew = false }) {
  const TOTAL_QTY = item.qty
  const TOTAL_AMOUNT = 45000000
  const unitPrice = TOTAL_AMOUNT / TOTAL_QTY
  const sumAllocated = opt2Forms.reduce((s, f) => s + (parseInt(f.soLuong) || 0), 0)
  const remaining = Math.max(0, TOTAL_QTY - sumAllocated)
  const toggleCollapse = (id) => setOpt2Collapsed((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <ModalOverlay onClose={onClose} width={560}>
      <button className="modal-close" onClick={onClose}>✕</button>
      <div className="modal-title">Ghi nhận chi phí</div>
      <div className="modal-body">
        <div className="info-card">
          <div className="info-card-left">
            <div className="info-card-name">{item.name}</div>
            <div className="info-card-meta">
              <span>{item.type}</span><span className="dot-sep">·</span><span>SL: {TOTAL_QTY} bộ</span>
            </div>
            <div className="info-card-meta">Ngày mua: 07/03/2026 15:41<span className="dot-sep">·</span>{item.code}</div>
          </div>
          <div className="info-card-right">
            <div className="info-card-price">{TOTAL_AMOUNT.toLocaleString('vi-VN')}</div>
          </div>
        </div>

        {opt2Forms.map((f, idx) => {
          const sl = parseInt(f.soLuong) || 0
          const months = parseInt(f.thoiGian) || 0
          const cost = sl * unitPrice
          const monthly = months > 0 ? Math.round(cost / months) : 0
          const formComplete = sl > 0 && months > 0 && f.ngay && f.diaDiem
          const isCollapsed = !!opt2Collapsed[f.id]
          const summaryParts = [sl > 0 && `${sl} bộ`, f.diaDiem, f.thoiGian && `${f.thoiGian} tháng`].filter(Boolean)

          return (
            <div key={f.id} style={{ background: '#fff', border: '1px solid #e8eaed', borderRadius: 10, marginBottom: 12, overflow: 'hidden' }}>
              {opt2Forms.length > 1 && (
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: isCollapsed ? 'none' : '1px solid #eef0f2', background: '#fafbfc', cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => toggleCollapse(f.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 150ms', transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="#525d6a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0070f4' }}>
                      Nhóm phân bổ {idx + 1}
                    </span>
                    {isCollapsed && summaryParts.length > 0 && (
                      <span style={{ fontSize: 12, color: '#85909d', marginLeft: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        — {summaryParts.join(' · ')}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeOpt2Form(idx) }}
                    style={{ background: 'none', border: 'none', color: '#85909d', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', borderRadius: 6 }}
                    title="Xóa"
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f7f8f9'; e.currentTarget.style.color = '#d92d20' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#85909d' }}
                  >
                    <TrashIcon />
                  </button>
                </div>
              )}
              {!isCollapsed && (
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <div className="form-label">Địa điểm sử dụng</div>
                      <select className="form-select" value={f.diaDiem} onChange={(e) => updateOpt2(idx, 'diaDiem', e.target.value)}>
                        <option>Chi nhánh Hà Nội</option>
                        <option>Chi nhánh HCM</option>
                      </select>
                    </div>
                    <div>
                      <div className="form-label">Số lượng CCDC phân bổ</div>
                      <div style={{ position: 'relative' }}>
                        <input
                          value={f.soLuong}
                          onChange={(e) => updateOpt2(idx, 'soLuong', e.target.value)}
                          style={{ width: '100%', height: 40, border: '1px solid #e8eaed', borderRadius: 12, padding: '0 70px 0 12px', fontSize: 14, fontFamily: 'Inter,sans-serif', outline: 'none', background: '#fff' }}
                        />
                        <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: '#85909d' }}>/ {TOTAL_QTY} bộ</span>
                      </div>
                    </div>
                    <div>
                      <div className="form-label">Ngày bắt đầu phân bổ</div>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          placeholder="Chọn ngày"
                          value={f.ngay}
                          onChange={(e) => updateOpt2(idx, 'ngay', e.target.value)}
                          style={{ width: '100%', height: 40, border: '1px solid #e8eaed', borderRadius: 12, padding: '0 36px 0 12px', fontSize: 14, fontFamily: 'Inter,sans-serif', outline: 'none', background: '#fff' }}
                        />
                        <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#85909d', pointerEvents: 'none', display: 'flex' }}>
                          <CalendarIcon />
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="form-label">Thời gian phân bổ (theo tháng)</div>
                      <input
                        type="text"
                        placeholder="VD: 12"
                        value={f.thoiGian}
                        onChange={(e) => updateOpt2(idx, 'thoiGian', e.target.value)}
                        style={{ width: '100%', height: 40, border: '1px solid #e8eaed', borderRadius: 12, padding: '0 12px', fontSize: 14, fontFamily: 'Inter,sans-serif', outline: 'none', background: '#fff' }}
                      />
                    </div>
                  </div>
                  {formComplete && (
                    <div style={{ marginTop: 10, fontSize: 13, color: '#525d6a', lineHeight: '18px' }}>
                      Chi phí <strong>{cost.toLocaleString('vi-VN')}</strong> của <strong>{sl} bộ</strong> sẽ được tự động ghi nhận vào sổ kế toán, mỗi tháng ghi nhận <strong>{monthly.toLocaleString('vi-VN')}</strong>.
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {remaining > 0 && sumAllocated > 0 && (
          <div style={{ background: '#f2f8fe', border: '1px solid #cce2fd', borderRadius: 8, padding: '12px 14px', fontSize: 14, lineHeight: '20px', color: '#15171a', marginBottom: 12 }}>
            Còn <strong>{remaining} bộ</strong> {item.name} chưa được ghi nhận chi phí. {restrictNew ? 'Bạn có thể phân bổ sau.' : 'Bạn có thể xem và ghi nhận sau tại danh sách CCDC chưa ghi nhận.'}
          </div>
        )}
        {sumAllocated > TOTAL_QTY && (
          <div style={{ background: '#fff4f4', border: '1px solid #fbcfcf', borderRadius: 8, padding: '12px 14px', fontSize: 14, lineHeight: '20px', color: '#a8071a', marginBottom: 12 }}>
            Tổng số lượng CCDC không được vượt quá <strong>{TOTAL_QTY} bộ</strong> (Hiện tại: <strong>{sumAllocated} bộ</strong>)
          </div>
        )}
        {restrictNew ? (
          !(remaining > 0) && !(opt2Forms.length === 1 && sumAllocated >= TOTAL_QTY) && (
            <div>
              <span style={{ color: '#0070f4', fontWeight: 600, fontSize: 14, cursor: 'pointer' }} onClick={addOpt2Form}>
                + Thêm phân bổ
              </span>
            </div>
          )
        ) : (
          <div>
            <span style={{ color: '#0070f4', fontWeight: 600, fontSize: 14, cursor: 'pointer' }} onClick={addOpt2Form}>
              + Thêm phân bổ
            </span>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button className="btn btn-outline" onClick={onClose}>Hủy bỏ</button>
        <button className="btn btn-primary" onClick={onSave || onClose}>Lưu</button>
      </div>
    </ModalOverlay>
  )
}

function Opt3Modal({ item, onClose, onSave, fixedMode }) {
  const TOTAL_QTY = item.qty
  const TOTAL_AMOUNT = 45000000
  const unitPrice = TOTAL_AMOUNT / TOTAL_QTY

  const [mode, setMode] = useState(fixedMode || 'single')
  const [forms, setForms] = useState([{ id: 1, soLuong: String(TOTAL_QTY), diaDiem: 'Chi nhánh Hà Nội', ngay: '', thoiGian: '' }])
  const [collapsed, setCollapsed] = useState({})
  const [nhomForms, setNhomForms] = useState([{ id: 1, soLuong: String(TOTAL_QTY), diaDiem: 'Chi nhánh Hà Nội', ngay: '', thoiGian: '' }])

  const sumSingle = forms.reduce((s, f) => s + (parseInt(f.soLuong) || 0), 0)
  const remainingSingle = Math.max(0, TOTAL_QTY - sumSingle)
  const sumNhom = nhomForms.reduce((s, n) => s + (parseInt(n.soLuong) || 0), 0)
  const remainingNhom = Math.max(0, TOTAL_QTY - sumNhom)

  const toggleCollapse = (id) => setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
  const updateForm = (idx, field, val) => setForms((prev) => prev.map((f, i) => i === idx ? { ...f, [field]: val } : f))
  const addForm = () => setForms((prev) => {
    const sum = prev.reduce((s, f) => s + (parseInt(f.soLuong) || 0), 0)
    return [...prev, { id: Date.now(), soLuong: String(Math.max(0, TOTAL_QTY - sum)), diaDiem: 'Chi nhánh Hà Nội', ngay: '', thoiGian: '' }]
  })
  const removeForm = (idx) => setForms((prev) => prev.filter((_, i) => i !== idx))

  const updateNhom = (idx, field, val) => setNhomForms((prev) => prev.map((n, i) => i === idx ? { ...n, [field]: val } : n))
  const addNhom = () => setNhomForms((prev) => [...prev, { id: Date.now(), soLuong: '', diaDiem: 'Chi nhánh Hà Nội', ngay: '', thoiGian: '' }])
  const removeNhom = (idx) => setNhomForms((prev) => prev.filter((_, i) => i !== idx))

  const handleSave = () => onSave(mode === 'single' ? forms : nhomForms)

  return (
    <ModalOverlay onClose={onClose} width={mode === 'multi' ? 780 : 560}>
      <button className="modal-close" onClick={onClose}>✕</button>
      <div className="modal-title">Ghi nhận chi phí</div>
      <div className="modal-body">
        <div className="info-card">
          <div className="info-card-left">
            <div className="info-card-name">{item.name}</div>
            <div className="info-card-meta"><span>{item.type}</span><span className="dot-sep">·</span><span>SL: {TOTAL_QTY} bộ</span></div>
            <div className="info-card-meta">Ngày mua: 07/03/2026 15:41<span className="dot-sep">·</span>{item.code}</div>
          </div>
          <div className="info-card-right">
            <div className="info-card-price">{TOTAL_AMOUNT.toLocaleString('vi-VN')}</div>
          </div>
        </div>

        {!fixedMode && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16, fontSize: 14, color: '#15171a' }}>
            <span style={{ fontWeight: 500 }}>Ghi nhận chi phí cho:</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input type="radio" name="opt3-mode" checked={mode === 'single'} onChange={() => setMode('single')} style={{ cursor: 'pointer' }} />
              Một địa điểm kinh doanh
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input type="radio" name="opt3-mode" checked={mode === 'multi'} onChange={() => setMode('multi')} style={{ cursor: 'pointer' }} />
              Nhiều địa điểm kinh doanh
            </label>
          </div>
        )}

        {mode === 'single' && (
          <>
            {forms.map((f, idx) => {
              const sl = parseInt(f.soLuong) || 0
              const months = parseInt(f.thoiGian) || 0
              const cost = sl * unitPrice
              const monthly = months > 0 ? Math.round(cost / months) : 0
              const formComplete = sl > 0 && months > 0 && f.ngay && f.diaDiem
              const isCollapsed = !!collapsed[f.id]
              const summaryParts = [sl > 0 && `${sl} bộ`, f.diaDiem, f.thoiGian && `${f.thoiGian} tháng`].filter(Boolean)

              return (
                <div key={f.id} style={{ background: '#fff', border: '1px solid #e8eaed', borderRadius: 10, marginBottom: 12, overflow: 'hidden' }}>
                  {forms.length > 1 && (
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: isCollapsed ? 'none' : '1px solid #eef0f2', background: '#fafbfc', cursor: 'pointer', userSelect: 'none' }}
                      onClick={() => toggleCollapse(f.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 150ms', transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                          <path d="M3 4.5L6 7.5L9 4.5" stroke="#525d6a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0070f4' }}>Nhóm phân bổ {idx + 1}</span>
                        {isCollapsed && summaryParts.length > 0 && (
                          <span style={{ fontSize: 12, color: '#85909d', marginLeft: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            — {summaryParts.join(' · ')}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeForm(idx) }}
                        style={{ background: 'none', border: 'none', color: '#85909d', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', borderRadius: 6 }}
                        title="Xóa"
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#f7f8f9'; e.currentTarget.style.color = '#d92d20' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#85909d' }}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  )}
                  {!isCollapsed && (
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {!fixedMode && (
                          <div>
                            <div className="form-label">Địa điểm sử dụng</div>
                            <select className="form-select" value={f.diaDiem} onChange={(e) => updateForm(idx, 'diaDiem', e.target.value)}>
                              <option>Chi nhánh Hà Nội</option>
                              <option>Chi nhánh HCM</option>
                            </select>
                          </div>
                        )}
                        <div style={{ gridColumn: fixedMode ? '1 / -1' : 'auto' }}>
                          <div className="form-label">Số lượng công cụ dụng cụ phân bổ</div>
                          <div style={{ position: 'relative' }}>
                            <input
                              value={f.soLuong}
                              onChange={(e) => updateForm(idx, 'soLuong', e.target.value)}
                              style={{ width: '100%', height: 40, border: '1px solid #e8eaed', borderRadius: 12, padding: '0 70px 0 12px', fontSize: 14, fontFamily: 'Inter,sans-serif', outline: 'none', background: '#fff' }}
                            />
                            <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: '#85909d' }}>/ {TOTAL_QTY} bộ</span>
                          </div>
                        </div>
                        <div>
                          <div className="form-label">Ngày bắt đầu phân bổ</div>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="text" placeholder="Chọn ngày" value={f.ngay}
                              onChange={(e) => updateForm(idx, 'ngay', e.target.value)}
                              style={{ width: '100%', height: 40, border: '1px solid #e8eaed', borderRadius: 12, padding: '0 36px 0 12px', fontSize: 14, fontFamily: 'Inter,sans-serif', outline: 'none', background: '#fff' }}
                            />
                            <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#85909d', pointerEvents: 'none', display: 'flex' }}>
                              <CalendarIcon />
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="form-label">Thời gian phân bổ (theo tháng)</div>
                          <input
                            type="text" placeholder="VD: 12" value={f.thoiGian}
                            onChange={(e) => updateForm(idx, 'thoiGian', e.target.value)}
                            style={{ width: '100%', height: 40, border: '1px solid #e8eaed', borderRadius: 12, padding: '0 12px', fontSize: 14, fontFamily: 'Inter,sans-serif', outline: 'none', background: '#fff' }}
                          />
                        </div>
                      </div>
                      {!fixedMode && formComplete && (
                        <div style={{ marginTop: 10, fontSize: 13, color: '#525d6a', lineHeight: '18px' }}>
                          Chi phí <strong>{cost.toLocaleString('vi-VN')}</strong> của <strong>{sl} bộ</strong> sẽ được tự động ghi nhận vào sổ kế toán, mỗi tháng ghi nhận <strong>{monthly.toLocaleString('vi-VN')}</strong>.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}

            {!fixedMode && remainingSingle > 0 && sumSingle > 0 && (
              <div style={{ background: '#f2f8fe', border: '1px solid #cce2fd', borderRadius: 8, padding: '12px 14px', fontSize: 14, lineHeight: '20px', color: '#15171a', marginBottom: 12 }}>
                Còn <strong>{remainingSingle} bộ</strong> {item.name} chưa được ghi nhận chi phí. Bạn có thể xem và ghi nhận sau tại danh sách CCDC chưa ghi nhận.
              </div>
            )}
            {fixedMode && forms.some(f => (parseInt(f.soLuong) || 0) > 0 && (parseInt(f.thoiGian) || 0) > 0 && f.ngay) && (
              <div style={{ background: '#f2f8fe', border: '1px solid #cce2fd', borderRadius: 8, padding: '12px 14px', fontSize: 14, lineHeight: '22px', color: '#15171a', marginBottom: 12 }}>
                {forms.map((f, i) => {
                  const sl = parseInt(f.soLuong) || 0
                  const months = parseInt(f.thoiGian) || 0
                  if (!(sl > 0 && months > 0 && f.ngay)) return null
                  const cost = sl * unitPrice
                  const monthly = months > 0 ? Math.round(cost / months) : 0
                  const ngayParts = (f.ngay || '').split('/')
                  const monthYear = ngayParts.length === 3 ? `${parseInt(ngayParts[1])}/${ngayParts[2]}` : ''
                  return (
                    <div key={i}>
                      {months === 1
                        ? <>Chi phí <strong>{cost.toLocaleString('vi-VN')}</strong> của <strong>{sl} bộ</strong> sẽ được ghi nhận là chi phí tháng <strong>{monthYear}</strong> trong sổ kế toán.</>
                        : <>Chi phí <strong>{cost.toLocaleString('vi-VN')}</strong> của <strong>{sl} bộ</strong> sẽ được tự động ghi nhận vào sổ kế toán, mỗi tháng ghi nhận <strong>{monthly.toLocaleString('vi-VN')}</strong>.</>
                      }
                    </div>
                  )
                })}
              </div>
            )}
            {sumSingle > TOTAL_QTY && (
              <div style={{ background: '#fff4f4', border: '1px solid #fbcfcf', borderRadius: 8, padding: '12px 14px', fontSize: 14, lineHeight: '20px', color: '#a8071a', marginBottom: 12 }}>
                Tổng số lượng Công cụ dụng cụ không được vượt quá <strong>{TOTAL_QTY} bộ</strong> (Hiện tại: <strong>{sumSingle} bộ</strong>)
              </div>
            )}
            {!(remainingSingle > 0) && !(forms.length === 1 && sumSingle >= TOTAL_QTY) && (
              <div>
                <span style={{ color: '#0070f4', fontWeight: 600, fontSize: 14, cursor: 'pointer' }} onClick={addForm}>
                  + Thêm phân bổ
                </span>
              </div>
            )}
          </>
        )}

        {mode === 'multi' && (
          <>
            <div className="table-card" style={{ marginBottom: 12 }}>
              <table>
                <thead style={{ background: '#e6f1fe' }}>
                  <tr>
                    <th style={{ minWidth: 180 }}>Địa điểm sử dụng</th>
                    <th style={{ width: 120 }}>Số lượng Công cụ dụng cụ</th>
                    <th>Ngày bắt đầu</th>
                    <th style={{ width: 110 }}>Thời gian phân bổ</th>
                    <th style={{ textAlign: 'right', width: 76 }}>Giá trị phân bổ/ tháng</th>
                    <th style={{ width: 36 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {nhomForms.map((nhom, idx) => {
                    const sl = parseInt(nhom.soLuong) || 0
                    const months = parseInt(nhom.thoiGian) || 0
                    const monthly = months > 0 ? Math.round(sl * unitPrice / months) : 0

                    return (
                      <tr key={nhom.id}>
                        <td style={{ padding: '8px 10px' }}>
                          <select
                            value={nhom.diaDiem}
                            onChange={(e) => updateNhom(idx, 'diaDiem', e.target.value)}
                            style={{ width: '100%', height: 32, border: '1px solid #e8eaed', borderRadius: 8, padding: '0 24px 0 8px', fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none', background: `#fff url("${CHEVRON_DOWN_SVG}") no-repeat right 8px center`, appearance: 'none' }}
                          >
                            <option>Chi nhánh Hà Nội</option>
                            <option>Chi nhánh HCM</option>
                          </select>
                        </td>
                        <td style={{ padding: '8px 10px' }}>
                          <div style={{ position: 'relative' }}>
                            <input
                              value={nhom.soLuong}
                              onChange={(e) => updateNhom(idx, 'soLuong', e.target.value)}
                              style={{ width: '100%', height: 32, border: '1px solid #e8eaed', borderRadius: 8, padding: '0 55px 0 8px', fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }}
                            />
                            <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#85909d' }}>/ {TOTAL_QTY}</span>
                          </div>
                        </td>
                        <td style={{ padding: '8px 10px' }}>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="text" placeholder="Chọn ngày" value={nhom.ngay}
                              onChange={(e) => updateNhom(idx, 'ngay', e.target.value)}
                              style={{ width: '100%', height: 32, border: '1px solid #e8eaed', borderRadius: 8, padding: '0 28px 0 8px', fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }}
                            />
                            <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#85909d', pointerEvents: 'none', display: 'flex' }}>
                              <CalendarIcon />
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '8px 10px' }}>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="text" placeholder="VD: 12" value={nhom.thoiGian}
                              onChange={(e) => updateNhom(idx, 'thoiGian', e.target.value)}
                              style={{ width: '100%', height: 32, border: '1px solid #e8eaed', borderRadius: 8, padding: '0 40px 0 8px', fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }}
                            />
                            <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#85909d' }}>tháng</span>
                          </div>
                        </td>
                        <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>
                          {monthly > 0 ? monthly.toLocaleString('vi-VN') : '—'}
                        </td>
                        <td style={{ padding: '8px 4px', textAlign: 'center' }}>
                          {nhomForms.length > 1 && (
                            <button
                              onClick={() => removeNhom(idx)}
                              style={{ background: 'none', border: 'none', color: '#85909d', cursor: 'pointer', padding: 4, display: 'inline-flex', alignItems: 'center' }}
                              title="Xóa"
                            >
                              <TrashIcon />
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {sumNhom > TOTAL_QTY && (
              <div style={{ background: '#fff4f4', border: '1px solid #fbcfcf', borderRadius: 8, padding: '12px 14px', fontSize: 14, lineHeight: '20px', color: '#a8071a', marginBottom: 12 }}>
                Tổng số lượng Công cụ dụng cụ không được vượt quá <strong>{TOTAL_QTY} bộ</strong> (Hiện tại: <strong>{sumNhom} bộ</strong>)
              </div>
            )}
            {!fixedMode && remainingNhom > 0 && sumNhom > 0 && sumNhom <= TOTAL_QTY && (
              <div style={{ background: '#f2f8fe', border: '1px solid #cce2fd', borderRadius: 8, padding: '12px 14px', fontSize: 14, lineHeight: '20px', color: '#15171a', marginBottom: 12 }}>
                Còn <strong>{remainingNhom} bộ</strong> {item.name} chưa được ghi nhận chi phí. Bạn có thể xem và ghi nhận sau tại danh sách CCDC chưa ghi nhận.
              </div>
            )}
            <div style={{ marginTop: 4 }}>
              <span style={{ color: '#0070f4', fontWeight: 600, fontSize: 14, cursor: 'pointer' }} onClick={addNhom}>
                + Thêm địa điểm cần phân bổ
              </span>
            </div>
            {fixedMode && (() => {
              const completeRows = nhomForms.filter(n => (parseInt(n.soLuong) || 0) > 0 && (parseInt(n.thoiGian) || 0) > 0 && n.ngay)
              const hasComplete = completeRows.length > 0
              const hasRemaining = remainingNhom > 0 && sumNhom > 0 && sumNhom <= TOTAL_QTY
              if (!hasComplete && !hasRemaining) return null
              const totalQty = completeRows.reduce((s, n) => s + (parseInt(n.soLuong) || 0), 0)
              const totalCost = totalQty * unitPrice
              const totalMonthly = completeRows.reduce((s, n) => {
                const sl = parseInt(n.soLuong) || 0
                const months = parseInt(n.thoiGian) || 0
                return s + (months > 0 ? Math.round(sl * unitPrice / months) : 0)
              }, 0)
              const locCount = completeRows.length
              const allMonths1 = completeRows.every(n => (parseInt(n.thoiGian) || 0) === 1)
              const firstNgayParts = completeRows.length > 0 ? (completeRows[0].ngay || '').split('/') : []
              const monthYear = firstNgayParts.length === 3 ? `${parseInt(firstNgayParts[1])}/${firstNgayParts[2]}` : ''
              return (
                <div style={{ background: '#f2f8fe', border: '1px solid #cce2fd', borderRadius: 8, padding: '12px 14px', fontSize: 14, lineHeight: '22px', color: '#15171a', marginTop: 12 }}>
                  {hasRemaining && (
                    <div style={{ marginBottom: hasComplete ? 6 : 0 }}>
                      Còn <strong>{remainingNhom} bộ</strong> {item.name} chưa được ghi nhận chi phí.
                    </div>
                  )}
                  {hasComplete && (
                    <div>
                      {locCount > 1
                        ? <>Chi phí <strong>{totalCost.toLocaleString('vi-VN')}</strong> của <strong>{totalQty} bộ</strong> sẽ được tự động ghi nhận vào sổ kế toán tại <strong>{locCount}</strong> địa điểm theo phân bổ đã thiết lập.</>
                        : allMonths1
                          ? <>Chi phí <strong>{totalCost.toLocaleString('vi-VN')}</strong> của <strong>{totalQty} bộ</strong> sẽ được ghi nhận là chi phí tháng <strong>{monthYear}</strong> trong sổ kế toán tại <strong>{locCount}</strong> địa điểm kinh doanh.</>
                          : <>Chi phí <strong>{totalCost.toLocaleString('vi-VN')}</strong> của <strong>{totalQty} bộ</strong> sẽ được tự động ghi nhận vào sổ kế toán, mỗi tháng ghi nhận <strong>{totalMonthly.toLocaleString('vi-VN')}</strong> tại <strong>{locCount}</strong> địa điểm kinh doanh.</>
                      }
                    </div>
                  )}
                </div>
              )
            })()}
          </>
        )}
      </div>
      <div className="modal-footer">
        <button className="btn btn-outline" onClick={onClose}>Hủy bỏ</button>
        <button className="btn btn-primary" onClick={handleSave}>Lưu</button>
      </div>
    </ModalOverlay>
  )
}

export default function App() {
  const [items, setItems] = useState(DATA)
  const [activePage, setActivePage] = useState('hkt1')
  const [nhapCollapsed, setNhapCollapsed] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const [modal, setModal] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [phanboOption, setPhanboOption] = useState(0)
  const [ghinhanNgay, setGhinhanNgay] = useState('')
  const [ghinhanThang, setGhinhanThang] = useState('')
  const [nhomPhanBo, setNhomPhanBo] = useState([{ id: 1, soLuong: '100', diaDiem: 'Chi nhánh Hà Nội', ngay: '', thoiGian: '' }])
  const [opt2Forms, setOpt2Forms] = useState([{ id: 1, soLuong: '', diaDiem: 'Chi nhánh Hà Nội', ngay: '', thoiGian: '' }])
  const [opt2Collapsed, setOpt2Collapsed] = useState({})
  const [opt25Forms, setOpt25Forms] = useState([{ id: 1, soLuong: '', diaDiem: 'Chi nhánh Hà Nội', ngay: '', thoiGian: '' }])
  const [opt25Collapsed, setOpt25Collapsed] = useState({})

  const closeModal = () => setModal(null)

  const openPhanBo = (item) => {
    setSelectedItem(item)
    if (activePage === 'opt2') {
      setOpt2Forms([{ id: 1, soLuong: String(item.qty), diaDiem: 'Chi nhánh Hà Nội', ngay: '', thoiGian: '' }])
      setModal('opt2')
      return
    }
    if (activePage === 'opt25') {
      setOpt25Forms([{ id: 1, soLuong: String(item.qty), diaDiem: 'Chi nhánh Hà Nội', ngay: '', thoiGian: '' }])
      setOpt25Collapsed({})
      setModal('opt25')
      return
    }
    if (activePage === 'opt3') {
      setModal('opt3')
      return
    }
    if (activePage === 'hkt1') {
      setModal('hkt1')
      return
    }
    if (activePage === 'hktN') {
      setModal('hktN')
      return
    }
    setPhanboOption(0)
    setModal('phanbo')
  }

  const handleOpt25Save = () => {
    const sumAllocated = opt25Forms.reduce((s, f) => s + (parseInt(f.soLuong) || 0), 0)
    if (sumAllocated > 0 && selectedItem) {
      setItems((prev) => prev.map((it) =>
        it.id === selectedItem.id ? { ...it, qty: Math.max(0, it.qty - sumAllocated) } : it
      ))
    }
    closeModal()
  }

  const handleOpt3Save = (allocForms) => {
    const sumAllocated = allocForms.reduce((s, f) => s + (parseInt(f.soLuong) || 0), 0)
    if (sumAllocated > 0 && selectedItem) {
      setItems((prev) => prev.map((it) =>
        it.id === selectedItem.id ? { ...it, qty: Math.max(0, it.qty - sumAllocated) } : it
      ))
    }
    closeModal()
  }

  const handleTiepTuc = () => {
    if (phanboOption === 0) {
      setGhinhanNgay('')
      setGhinhanThang('')
      setModal('ghinhan')
    } else {
      setNhomPhanBo([{ id: 1, soLuong: '100', diaDiem: 'Chi nhánh Hà Nội', ngay: '', thoiGian: '' }])
      setModal('ghinhan-nhom')
    }
  }

  const addNhom = () => setNhomPhanBo((prev) => [...prev, { id: Date.now(), soLuong: '', diaDiem: 'Chi nhánh Hà Nội', ngay: '', thoiGian: '' }])
  const updateNhom = (idx, field, val) => setNhomPhanBo((prev) => prev.map((n, i) => i === idx ? { ...n, [field]: val } : n))
  const removeNhom = (idx) => setNhomPhanBo((prev) => prev.filter((_, i) => i !== idx))

  const updateOpt2 = (idx, field, val) => setOpt2Forms((prev) => prev.map((n, i) => i === idx ? { ...n, [field]: val } : n))
  const addOpt2Form = () => setOpt2Forms((prev) => {
    const sum = prev.reduce((s, f) => s + (parseInt(f.soLuong) || 0), 0)
    const remaining = Math.max(0, 100 - sum)
    return [...prev, { id: Date.now(), soLuong: String(remaining), diaDiem: 'Chi nhánh Hà Nội', ngay: '', thoiGian: '' }]
  })
  const removeOpt2Form = (idx) => setOpt2Forms((prev) => prev.filter((_, i) => i !== idx))

  const updateOpt25 = (idx, field, val) => setOpt25Forms((prev) => prev.map((n, i) => i === idx ? { ...n, [field]: val } : n))
  const addOpt25Form = () => setOpt25Forms((prev) => {
    const sum = prev.reduce((s, f) => s + (parseInt(f.soLuong) || 0), 0)
    const remaining = Math.max(0, 100 - sum)
    return [...prev, { id: Date.now(), soLuong: String(remaining), diaDiem: 'Chi nhánh Hà Nội', ngay: '', thoiGian: '' }]
  })
  const removeOpt25Form = (idx) => setOpt25Forms((prev) => prev.filter((_, i) => i !== idx))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div className="top-bar">
        <img src="/assets/KiotViet-Logo-Horizontal.svg" alt="KiotViet" />
        <a href="#">Giao hàng</a>
        <a href="#">Hoá đơn điện tử</a>
        <a href="#">Chủ đề</a>
        <a href="#">Hỗ trợ</a>
      </div>

      <div className="main-nav" style={{ background: NAV_COLOR }}>
        <a href="#">Tổng quan</a>
        <a href="#">Hàng hóa</a>
        <a href="#">Giao dịch</a>
        <a href="#">Đối tác</a>
        <a href="#">Nhân viên</a>
        <a href="#">Số quỹ</a>
        <a href="#">Báo cáo</a>
        <a href="#">Phân tích</a>
        <a href="#">Bán online</a>
        <a href="#" className="active">Thuế &amp; Kế toán</a>
        <div className="nav-right">
          <button className="btn-sell" style={{ background: SELL_BTN_COLOR }}>▶ Bán hàng</button>
        </div>
      </div>

      <div className="page-layout">
        <aside className="sidebar">
          <div style={{ padding: '8px 16px 12px', fontSize: 13, color: '#525d6a' }}>
            <div style={{ fontWeight: 600, color: '#15171a' }}>Tạp hóa bà Toàn</div>
            <div style={{ fontSize: 12, color: '#85909d' }}>012345678911</div>
          </div>

          <div className="sidebar-group-label">Thuế &amp; Kế toán</div>
          <a className="sidebar-item" href="#" onClick={(e) => e.preventDefault()}>
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="2" width="14" height="14" rx="2" /><path d="M6 6h6M6 9h6M6 12h4" /></svg>
            Tổng quan
          </a>
          <a className="sidebar-item" href="#" onClick={(e) => e.preventDefault()}>
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="2" width="12" height="14" rx="1.5" /><path d="M6 6h6M6 9h6M6 12h3" /></svg>
            Tờ khai thuế
          </a>
          <a className="sidebar-item" href="#" onClick={(e) => e.preventDefault()}>
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 3h12v12H3z" /><path d="M3 7h12M7 7v8" /></svg>
            Sổ kế toán
          </a>

          <div className="sidebar-group-label">Giao dịch</div>
          <a className="sidebar-item" href="#" onClick={(e) => e.preventDefault()}>
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 5h14v10H2z" /><path d="M5 5V3h8v2" /></svg>
            Bán hàng
          </a>
          <a className="sidebar-item" href="#" onClick={(e) => e.preventDefault()}>
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 4h12l-1 10H4z" /><path d="M7 8v3M11 8v3" /></svg>
            Mua hàng
          </a>
          <a className="sidebar-item" href="#" onClick={(e) => e.preventDefault()}>
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M9 2v14M2 9h14" /><circle cx="9" cy="9" r="7" /></svg>
            Thu - Chi
          </a>

          <div className="sidebar-group-label">Hạch toán</div>
          <a
            className={`sidebar-item${activePage === 'hkt1' ? ' active' : ''}`}
            href="#"
            onClick={(e) => { e.preventDefault(); setActivePage('hkt1') }}
          >
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="3" width="14" height="12" rx="2" /><path d="M2 7h14M6 7v8M12 7v8" /></svg>
            CCDC &amp; Dịch vụ (HKD 1 ĐDKD)
          </a>
          <a
            className={`sidebar-item${activePage === 'hktN' ? ' active' : ''}`}
            href="#"
            onClick={(e) => { e.preventDefault(); setActivePage('hktN') }}
          >
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="3" width="14" height="12" rx="2" /><path d="M2 7h14M6 7v8M12 7v8" /></svg>
            CCDC &amp; Dịch vụ (HKD nhiều ĐDKD)
          </a>

          <div
            className="sidebar-group-label"
            onClick={() => setNhapCollapsed(v => !v)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 12 }}
          >
            Nháp
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transition: 'transform 150ms', transform: nhapCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}>
              <path d="M1 1l4 4 4-4" stroke="#85909d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {!nhapCollapsed && (
            <>
              <a
                className={`sidebar-item${activePage === 'opt1' ? ' active' : ''}`}
                href="#"
                onClick={(e) => { e.preventDefault(); setActivePage('opt1') }}
              >
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="3" width="14" height="12" rx="2" /><path d="M2 7h14M6 7v8M12 7v8" /></svg>
                Công cụ dụng cụ
              </a>
              <a
                className={`sidebar-item${activePage === 'opt2' ? ' active' : ''}`}
                href="#"
                onClick={(e) => { e.preventDefault(); setActivePage('opt2') }}
              >
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="3" width="14" height="12" rx="2" /><path d="M2 7h14M6 7v8M12 7v8" /></svg>
                Công cụ dụng cụ (option 2)
              </a>
              <a
                className={`sidebar-item${activePage === 'opt3' ? ' active' : ''}`}
                href="#"
                onClick={(e) => { e.preventDefault(); setActivePage('opt3') }}
              >
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="3" width="14" height="12" rx="2" /><path d="M2 7h14M6 7v8M12 7v8" /></svg>
                Công cụ dụng cụ (option 3)
              </a>
              <a
                className={`sidebar-item${activePage === 'opt25' ? ' active' : ''}`}
                href="#"
                onClick={(e) => { e.preventDefault(); setActivePage('opt25') }}
              >
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="3" width="14" height="12" rx="2" /><path d="M2 7h14M6 7v8M12 7v8" /></svg>
                Công cụ dụng cụ (option 4)
              </a>
            </>
          )}
        </aside>

        <div className="main-content">
          <div className="action-bar">
            <h1 className="page-title">Công cụ dụng cụ &amp; Dịch vụ</h1>
            <div className="search-box">
              <SearchIcon />
              <input placeholder="Theo mã hoặc tên chi phí" />
            </div>
            <div className="filter-bar">
              <select className="filter-select"><option>Tất cả địa điểm</option></select>
              <select className="filter-select"><option>Thời gian</option></select>
              <select className="filter-select"><option>Tháng này</option></select>
              <select className="filter-select"><option>Tất cả chi phí</option></select>
            </div>
          </div>

          <div className="tabs-bar">
            {TABS.map((t, i) => (
              <div
                key={i}
                className={`tab${activeTab === i ? ' active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {t.label}<span className="count">{t.count}</span>
              </div>
            ))}
          </div>

          <div className="table-wrap">
            <div className="table-card">
              <table>
                <thead style={{ background: TABLE_HEADER_BG }}>
                  <tr>
                    <th>Tên hàng</th>
                    {(activePage === 'hkt1' || activePage === 'hktN') && <th>Số lượng</th>}
                    <th>Mã phiếu</th>
                    <th>Ngày mua</th>
                    <th>Phân loại</th>
                    <th style={{ textAlign: 'right' }}>Tổng giá trị</th>
                    <th>ĐDKD</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div>{item.name}</div>
                        {activePage !== 'hkt1' && activePage !== 'hktN' && (
                          <div style={{ fontSize: 12, color: '#85909d', marginTop: 2 }}>SL: {item.qty}</div>
                        )}
                      </td>
                      {(activePage === 'hkt1' || activePage === 'hktN') && <td>{item.qty}</td>}
                      <td>{item.code}</td>
                      <td>{item.date}</td>
                      <td>{item.type}</td>
                      <td className="text-right text-money">{item.total}</td>
                      <td>{item.branch}</td>
                      <td>
                        <span className="link-action" onClick={() => openPhanBo(item)}>Ghi nhận chi phí</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {modal === 'phanbo' && selectedItem && (
        <ChooseMethodModal
          item={selectedItem}
          phanboOption={phanboOption}
          setPhanboOption={setPhanboOption}
          onClose={closeModal}
          onContinue={handleTiepTuc}
        />
      )}

      {modal === 'ghinhan' && selectedItem && (
        <RecordCostModal
          item={selectedItem}
          ghinhanNgay={ghinhanNgay}
          setGhinhanNgay={setGhinhanNgay}
          ghinhanThang={ghinhanThang}
          setGhinhanThang={setGhinhanThang}
          onClose={closeModal}
        />
      )}

      {modal === 'ghinhan-nhom' && selectedItem && (
        <GroupRecordModal
          item={selectedItem}
          nhomPhanBo={nhomPhanBo}
          addNhom={addNhom}
          updateNhom={updateNhom}
          removeNhom={removeNhom}
          onClose={closeModal}
        />
      )}

      {modal === 'opt2' && selectedItem && (
        <MultiAllocModal
          item={selectedItem}
          opt2Forms={opt2Forms}
          addOpt2Form={addOpt2Form}
          updateOpt2={updateOpt2}
          removeOpt2Form={removeOpt2Form}
          opt2Collapsed={opt2Collapsed}
          setOpt2Collapsed={setOpt2Collapsed}
          onClose={closeModal}
        />
      )}

      {modal === 'opt25' && selectedItem && (
        <MultiAllocModal
          item={selectedItem}
          opt2Forms={opt25Forms}
          addOpt2Form={addOpt25Form}
          updateOpt2={updateOpt25}
          removeOpt2Form={removeOpt25Form}
          opt2Collapsed={opt25Collapsed}
          setOpt2Collapsed={setOpt25Collapsed}
          onClose={closeModal}
          onSave={handleOpt25Save}
          restrictNew
        />
      )}

      {modal === 'opt3' && selectedItem && (
        <Opt3Modal
          item={selectedItem}
          onClose={closeModal}
          onSave={handleOpt3Save}
        />
      )}

      {modal === 'hkt1' && selectedItem && (
        <Opt3Modal
          item={selectedItem}
          onClose={closeModal}
          onSave={handleOpt3Save}
          fixedMode="single"
        />
      )}

      {modal === 'hktN' && selectedItem && (
        <Opt3Modal
          item={selectedItem}
          onClose={closeModal}
          onSave={handleOpt3Save}
          fixedMode="multi"
        />
      )}
    </div>
  )
}
