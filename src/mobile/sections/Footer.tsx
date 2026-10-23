import { FOOTER, FOOTER_COLUMNS, SOCIALS } from '../../data.ts'

export function Footer() {
  return (
    <footer className="m-footer">
      <div className="m-wrap">
        <img className="m-footer__sign" src={FOOTER.signature} alt="Roberto Bazán" width={347} height={73} loading="lazy" />
        <div className="m-footer__cols">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="m-footer__heading">{col.title}</p>
              <ul className="m-footer__links">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href={FOOTER.columnHref[col.title]}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="m-footer__bottom">
          <ul className="m-footer__socials">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noreferrer" aria-label={`${s.name}: ${s.label}`}>
                  <img src={s.icon} alt="" width={24} height={24} />
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="m-footer__qr">
            <img src={FOOTER.qr} alt="Código QR de contacto" width={110} height={110} loading="lazy" />
          </div>
        </div>
      </div>
    </footer>
  )
}
