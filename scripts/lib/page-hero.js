/**
 * Standard Page Hero — reusable component for all internal pages.
 * Homepage hero is never rendered through this module.
 *
 * @typedef {{ label: string, href?: string }} Crumb
 * @typedef {{ label: string, href: string }} HeroButton
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
 * @param {string} opts.title
 * @param {string} [opts.subtitle]
 * @param {Crumb[]} [opts.breadcrumb]
 * @param {HeroButton|null} [opts.primaryButton]
 * @param {HeroButton|null} [opts.secondaryButton]
 * @param {'beige'|'white'|'navy'} [opts.theme]
 * @param {string} [opts.rel] path prefix e.g. "../"
 */
function renderPageHero({
  title,
  subtitle = "",
  breadcrumb = [],
  primaryButton = { label: "Request A Proposal", href: "proposal/" },
  secondaryButton = { label: "Contact Us", href: "contact/" },
  theme = "beige",
  rel = "",
} = {}) {
  const themeClass =
    theme === "navy"
      ? "dg-page-hero--navy"
      : theme === "white"
        ? "dg-page-hero--white"
        : "dg-page-hero--beige";

  const crumbs =
    Array.isArray(breadcrumb) && breadcrumb.length
      ? breadcrumb
          .map((c, i) => {
            const last = i === breadcrumb.length - 1;
            if (last || !c.href) {
              return `<span>${esc(c.label)}</span>`;
            }
            return `<a href="${rel}${c.href}">${esc(c.label)}</a>`;
          })
          .join('<span aria-hidden="true">/</span>')
      : "";

  const crumbNav = crumbs
    ? `<nav class="dg-page-hero__crumb" aria-label="Breadcrumb">${crumbs}</nav>`
    : "";

  const sub = subtitle
    ? `<p class="dg-page-hero__sub">${esc(subtitle)}</p>`
    : "";

  const buttons = [];
  if (primaryButton && primaryButton.label) {
    buttons.push(
      `<a class="dg-page-hero__btn dg-page-hero__btn--primary" href="${rel}${primaryButton.href || "proposal/"}">${esc(primaryButton.label)}</a>`
    );
  }
  if (secondaryButton && secondaryButton.label) {
    buttons.push(
      `<a class="dg-page-hero__btn dg-page-hero__btn--secondary" href="${rel}${secondaryButton.href || "contact/"}">${esc(secondaryButton.label)}</a>`
    );
  }
  const actions = buttons.length
    ? `<div class="dg-page-hero__actions">${buttons.join("\n")}</div>`
    : "";

  return `<section class="dg-page-hero ${themeClass}" aria-label="${esc(title)}">
  <div class="dg-page-hero__inner">
    ${crumbNav}
    <h1>${esc(title)}</h1>
    ${sub}
    ${actions}
  </div>
</section>`;
}

/** Convenience: Home › Section › Page */
function crumbs(relParts) {
  return relParts;
}

module.exports = {
  renderPageHero,
  crumbs,
};
