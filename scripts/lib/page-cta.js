/**
 * Shared final CTA for all internal pages.
 * Solid navy — no homepage/hero photography.
 */

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {object} opts
 * @param {string} [opts.title]
 * @param {string} [opts.text]
 * @param {string} [opts.eyebrow]
 * @param {string} [opts.rel]
 * @param {string} [opts.primaryLabel]
 * @param {string} [opts.secondaryLabel]
 * @param {string} [opts.variant] dg-ts | dg-ab | dg-gal | dg-page
 */
function renderPageCta({
  title = "Ready to Plan Your Journey?",
  text = "Share your dates, guests, and goals — our partner desk will prepare a tailored proposal.",
  eyebrow = "Next Step",
  rel = "",
  primaryLabel = "Request A Proposal",
  secondaryLabel = "Contact Us",
  primaryHref = "proposal/",
  secondaryHref = "contact/",
  variant = "dg-ts",
} = {}) {
  const wrap =
    variant === "dg-ab"
      ? "dg-ab__wrap"
      : variant === "dg-gal"
        ? "dg-gal__wrap"
        : variant === "dg-page"
          ? "dg-ia-wrap"
          : "dg-ts__wrap";
  const reveal =
    variant === "dg-ab"
      ? "dg-ab-reveal"
      : variant === "dg-gal"
        ? "dg-gal-reveal"
        : "dg-ts-reveal";
  const eyebrowClass =
    variant === "dg-ab"
      ? "dg-ab__eyebrow"
      : variant === "dg-gal"
        ? "dg-gal__eyebrow"
        : "dg-ts__eyebrow";
  const btnPrimary =
    variant === "dg-ab"
      ? "dg-ab-btn dg-ab-btn--gold"
      : variant === "dg-gal"
        ? "dg-gal-btn dg-gal-btn--gold"
        : "dg-ts-btn dg-ts-btn--gold";
  const btnGhost =
    variant === "dg-ab"
      ? "dg-ab-btn dg-ab-btn--ghost"
      : variant === "dg-gal"
        ? "dg-gal-btn dg-gal-btn--ghost"
        : "dg-ts-btn dg-ts-btn--ghost";

  const sectionClass =
    variant === "dg-ab"
      ? "dg-ab-cta"
      : variant === "dg-gal"
        ? "dg-gal-cta"
        : variant === "dg-page"
          ? "dg-page-cta"
          : "dg-ts-cta";

  return `<section class="${sectionClass}" id="cta">
  <div class="${wrap}">
    <div class="${sectionClass}__panel ${reveal}">
      <div class="${sectionClass}__inner">
        <div>
          <p class="${eyebrowClass}">${esc(eyebrow)}</p>
          <h2>${esc(title)}</h2>
          <p>${esc(text)}</p>
        </div>
        <div class="${sectionClass}__actions">
          <a class="${btnPrimary}" href="${rel}${primaryHref}">${esc(primaryLabel)}</a>
          <a class="${btnGhost}" href="${rel}${secondaryHref}">${esc(secondaryLabel)}</a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

module.exports = { renderPageCta };
