(() => {
  const P = window.PROPERTY;
  const $ = (s) => document.querySelector(s);
  const money = (n) => "$" + Number(n).toLocaleString("en-US");
  const tel = (p) => "tel:+1" + String(p).replace(/\D/g, "");
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const bedLabel = (p) => (p.beds === 0 ? "Studio" : `${p.beds} Bed`) + (p.office ? " + Office" : "");
  const M = P.manager;
  const hasApplyUrl = !!P.applyUrl;

  function setImg(el, src, label) {
    const fail = () => { el.classList.add("ph"); if (!el.classList.contains("hero__bg") && !el.querySelector("*")) el.textContent = label || ""; else if (!el.classList.contains("hero__bg")) el.dataset.label = label; };
    if (!src) return fail();
    const i = new Image();
    i.onload = () => { el.style.backgroundImage = `url("${src}")`; el.classList.remove("ph"); };
    i.onerror = fail;
    i.src = src;
  }

  /* ---------- basics ---------- */
  document.querySelector('meta[name="description"]').content = P.seoDescription;
    $("#qPhone").href = tel(P.phone);
  if (P.email) $("#qEmail").href = "mailto:" + P.email; else $("#qEmail").remove();
  $("#heroCity").textContent = P.address.street + " · " + P.city;
  $("#heroHead").textContent = P.hero.headline;
  $("#heroSub").textContent = P.hero.sub;
  setImg($(".hero__bg"), P.hero.image);

  /* every "Apply Now" link → TenantCloud when the link is set */
  if (hasApplyUrl) document.querySelectorAll("[data-apply-link]").forEach((a) => { a.href = P.applyUrl; a.target = "_blank"; a.rel = "noopener"; });

  /* ---------- vibe + features ---------- */
  $("#vibeHead").textContent = P.vibe.headline;
  $("#vibeBody").textContent = P.vibe.body;
  setImg($("#vibeImg"), P.vibe.image, "Photo: model unit interior");

  const icons = {
    layout: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 12h10M13 3v18"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    car: '<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM7 19v2M17 19v2"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/>',
    access: '<circle cx="12" cy="4" r="1.6"/><path d="M12 7v6h5l2 6M12 10h5M9.5 11.5a5 5 0 1 0 6 6.5"/>',
    pin: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>'
  };
  $("#featHead").textContent = P.features.headline;
  $("#featGrid").innerHTML = P.features.items.map((f) => `
    <div class="feat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${icons[f.icon] || ""}</svg>
    <h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></div>`).join("");

  const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>';
  $("#included").innerHTML = (P.inEveryResidence || []).map((x) => `<li>${check}<span>${esc(x)}</span></li>`).join("");

  /* ---------- pets ---------- */
  const PT = P.pets;
  $("#petHead").textContent = PT.headline;
  $("#petBody").textContent = PT.body;
  $("#petTerms").innerHTML = PT.terms.map((t) => `<div><dt>${esc(t.label)}</dt><dd>${esc(t.value)}</dd></div>`).join("");
  $("#petNote").innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/></svg><span><strong>${esc(PT.note)}</strong>${PT.noteSub ? `<br>${esc(PT.noteSub)}` : ""}</span>`;

  /* ---------- pricing teaser ---------- */
  const T = P.pricingTeaser;
  $("#teaseHead").textContent = T.headline;
  $("#teaseBody").textContent = T.body;
  $("#teaseLines").innerHTML = T.lines.map((l) => `<li><span>${esc(l.label)}</span><strong>${esc(l.price)}</strong></li>`).join("");
  $("#teasePerks").textContent = `${P.parking.included} free parking space included · Pet friendly (no exotic pets) · ${P.utilitiesNote.split(";")[0]}`;
  $("#flagTag").textContent = `${T.flagship.label} · ${money(T.flagship.price)}/mo`;
  setImg($("#flagImg"), T.flagship.image, "Photo: flagship $1,895 unit");
  if (P.listingsUrl) Object.assign($("#teaseBtn"), { href: P.listingsUrl, target: "_blank", rel: "noopener" });

  /* ---------- floor plans ---------- */
  const plans = P.floorPlans;
  const beds = [...new Set(plans.map((p) => p.beds))].sort((a, b) => a - b);
  $("#fBeds").innerHTML += beds.map((b) => `<option value="${b}">${b} Bedroom</option>`).join("");
  [2000, 2500, 3000].forEach((v) => ($("#fPrice").innerHTML += `<option value="${v}">Up to ${money(v)}</option>`));
  $("#pricingNote").textContent = P.pricingNote;
  if (P.totalUnits) $("#plansLead").textContent = `${P.totalUnits} completely remodeled residences now leasing · 1-bedrooms from ${money(Math.min(...plans.filter((p) => p.beds === 1).map((p) => p.price)))} · 2-bedrooms from ${money(Math.min(...plans.filter((p) => p.beds === 2).map((p) => p.price)))}`;

  const badge = (p) => p.featured ? "Featured" : p.units == null ? "Now leasing" : p.units > 1 ? `${p.units} available` : p.units === 1 ? "Only 1 left" : "Waitlist";
  const facts = (p) => [p.sqft && `${p.sqft.toLocaleString()} sq ft`, `${p.baths} Bath`, p.available && (/^now$/i.test(p.available) ? "Available now" : `Available ${p.available}`)].filter(Boolean);

  function renderPlans() {
    const fb = $("#fBeds").value, fp = $("#fPrice").value, sort = $("#fSort").value;
    const list = plans
      .filter((p) => (fb === "any" || p.beds == fb) && (fp === "any" || p.price <= +fp))
      .sort((a, b) => (sort === "price" ? a.price - b.price : b.beds - a.beds || a.price - b.price));
    $("#planCount").textContent = `${list.length} of ${plans.length} floor plans`;
    $("#planGrid").innerHTML = list.length ? list.map((p, i) => `
      <article class="plan${p.featured ? " plan--featured" : ""}">
        <div class="plan__img" data-plan="${i}"></div>
        <div class="plan__body">
          <div class="plan__top"><span class="plan__name">${esc(p.id)}</span><span class="plan__badge">${badge(p)}</span></div>
          <p class="plan__meta">${esc(bedLabel(p))} · ${esc(p.blurb)}</p>
          <p class="plan__price"><small>Monthly rent</small>${p.priceFrom ? "From " : ""}${money(p.price)}</p>
          <div class="plan__facts">${facts(p).map((f) => `<span>${esc(f)}</span>`).join("")}</div>
          <p class="plan__incl">Granite/marble counters · Stainless appliances · Gas stove · Dishwasher · Washer/dryer</p>
          <div class="plan__actions">
            <button class="btn btn--line" data-details="${esc(p.id)}">Details</button>
            <button class="btn btn--gold" data-apply="${esc(p.id)}">Apply</button>
          </div>
        </div>
      </article>`).join("") : `<p class="empty">No floor plans match those filters. Try widening your search.</p>`;
    list.forEach((p, i) => setImg(document.querySelector(`[data-plan="${i}"]`), p.image, `${p.id} photo / floor plan`));
  }
  ["#fBeds", "#fPrice", "#fSort"].forEach((s) => $(s).addEventListener("change", renderPlans));
  renderPlans();

  const modal = $("#planModal");
  function openPlan(id) {
    const p = plans.find((x) => x.id === id);
    $("#modalBody").innerHTML = `
      <div class="modal__img" id="mImg"></div>
      <div class="modal__info">
        <h3 id="mTitle">${esc(p.id)}</h3>
        <p class="plan__meta">${esc(bedLabel(p))} · ${facts(p).map(esc).join(" · ")}</p>
        <p>${esc(p.blurb)}</p>
        ${P.inEveryResidence ? `<p class="incl-head">Included</p><ul class="rooms rooms--incl">${P.inEveryResidence.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}
        ${p.rooms ? `<p class="incl-head">Layout</p><ul class="rooms">${p.rooms.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}
        <p class="plan__price"><small>Monthly rent</small>${p.priceFrom ? "From " : ""}${money(p.price)}</p>
        <ul class="costs">
          <li><span>Parking</span><span>${P.parking.included} space free · extra ${money(P.parking.extraPrice)}/mo (as available)</span></li>
          <li><span>Pets</span><span>1 pet under 14 lbs · $50/mo + $300 one-time fee · <strong class="no-exotic">No exotic pets or birds</strong></span></li>
          <li><span>Utilities</span><span>Not included · costs vary</span></li>
        </ul>
        <button class="btn btn--gold" data-apply="${esc(p.id)}">Apply for ${esc(p.id)}</button>
      </div>`;
    setImg($("#mImg"), p.image, `${p.id} floor plan`);
    modal.showModal();
  }
  modal.querySelector(".modal__x").onclick = () => modal.close();
  modal.addEventListener("click", (e) => e.target === modal && modal.close());

  document.addEventListener("click", (e) => {
    const d = e.target.closest("[data-details]"), a = e.target.closest("[data-apply]");
    if (d) openPlan(d.dataset.details);
    if (a) {
      if (modal.open) modal.close();
      if (hasApplyUrl) return window.open(P.applyUrl, "_blank", "noopener");
      $("#aPlan").value = a.dataset.apply; $("#apply").scrollIntoView(); $("#aName").focus({ preventScroll: true });
    }
  });

  /* ---------- gallery + video ---------- */
  if (P.videoTour) $("#videoWrap").innerHTML = `<video controls preload="none" playsinline poster="${esc(P.videoTour.poster)}" src="${esc(P.videoTour.src)}" aria-label="Video tour of 337 East Blackwell"></video>`;
  const cats = ["All", ...new Set(P.gallery.map((g) => g.category))];
  let curCat = "All", showAll = false, current = [];
  $("#galTabs").innerHTML = cats.map((c, i) => `<button role="tab" aria-selected="${i === 0}" data-cat="${esc(c)}">${esc(c)} <span>${c === "All" ? P.gallery.length : P.gallery.filter((g) => g.category === c).length}</span></button>`).join("");
  function renderGal() {
    current = P.gallery.filter((g) => curCat === "All" || g.category === curCat);
    const shown = showAll ? current : current.slice(0, 12);
    $("#galGrid").innerHTML = shown.map((g, i) => `
      <button class="gal-item" data-lb="${i}" aria-label="Open photo ${i + 1}">
        <img src="${esc(g.thumb)}" alt="${esc(g.category)} photo${g.staged ? " (virtually staged)" : ""}" loading="lazy" width="640" height="427">
        ${g.staged ? '<span class="staged">Virtually staged</span>' : ""}
      </button>`).join("");
    const more = $("#galMore");
    more.hidden = current.length <= 12;
    more.textContent = showAll ? "Show fewer photos" : `View all ${current.length} photos`;
  }
  $("#galTabs").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    $("#galTabs").querySelectorAll("button").forEach((x) => x.setAttribute("aria-selected", x === b));
    curCat = b.dataset.cat; showAll = false; renderGal();
  });
  $("#galMore").onclick = () => { showAll = !showAll; renderGal(); if (!showAll) $("#gallery").scrollIntoView(); };
  renderGal();

  const lb = $("#lightbox"); let lbi = 0;
  const lbShow = (i) => {
    lbi = (i + current.length) % current.length; const g = current[lbi];
    $("#lbImg").src = g.src; $("#lbImg").alt = g.category + " photo";
    $("#lbCap").textContent = `${g.category}${g.staged ? " · Virtually staged" : ""} · ${lbi + 1} / ${current.length}`;
  };
  $("#galGrid").addEventListener("click", (e) => { const b = e.target.closest("[data-lb]"); if (b) { lbShow(+b.dataset.lb); lb.showModal(); } });
  lb.querySelector(".lb__x").onclick = () => lb.close();
  lb.querySelector(".lb__prev").onclick = () => lbShow(lbi - 1);
  lb.querySelector(".lb__next").onclick = () => lbShow(lbi + 1);
  lb.addEventListener("click", (e) => e.target === lb && lb.close());
  lb.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") lbShow(lbi - 1); if (e.key === "ArrowRight") lbShow(lbi + 1); });

  /* ---------- location ---------- */
  const addr = `${P.address.street}, ${P.address.cityStateZip}`;
  $("#locAddr").textContent = addr;
  $("#dirBtn").href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}`;
  $("#map").innerHTML = `<iframe title="Map of ${esc(addr)}" loading="lazy" src="https://maps.google.com/maps?q=${P.map.lat},${P.map.lng}&z=15&output=embed"></iframe>`;

  /* ---------- application ---------- */
  $("#appInitials").textContent = M.name.split(" ").map((w) => w[0]).join("");
  $("#appName").textContent = M.name;
  $("#appTitle").textContent = M.title;
  if (M.email) { $("#appEmail").textContent = M.email; $("#appEmail").href = "mailto:" + M.email; } else $("#appEmail").remove();
  $("#appPhone").textContent = M.phone; $("#appPhone").href = tel(M.phone);

  if (hasApplyUrl) {
    $("#applyLead").textContent = "Complete your application securely online through TenantCloud. Questions? Reach out to Elvin directly.";
    $("#applyForm").innerHTML = `<p class="apply__portal">Our secure online application takes just a few minutes and handles your application fee and screening.</p>
      <a class="btn btn--gold btn--full" href="${esc(P.applyUrl)}" target="_blank" rel="noopener">Start Your Application</a>`;
  } else {
    $("#applyLead").textContent = `Tell us which residence you're interested in — your request goes straight to ${M.name}.`;
    $("#aPlan").innerHTML = `<option value="">Select a floor plan</option>` +
      plans.map((p) => `<option value="${esc(p.id)}">${esc(p.id)} — ${p.priceFrom ? "from " : ""}${money(p.price)}/mo</option>`).join("");
    $("#applyBtn").textContent = `Send to ${M.name}`;
    $("#applyForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = $("#formMsg"), v = (id) => $(id).value.trim();
      const missing = [["#aPlan", "floor plan"], ["#aName", "name"], ["#aEmail", "email"]].filter(([id]) => !v(id)).map(([, n]) => n);
      if (missing.length) { msg.className = "form-msg err"; msg.textContent = "Please add your " + missing.join(", ") + "."; return; }
      if (!$("#aEmail").checkValidity()) { msg.className = "form-msg err"; msg.textContent = "Please enter a valid email address."; return; }
      const body = `Hi ${M.name},\n\nI'd like to apply for the ${v("#aPlan")} at ${P.address.street}.\n\nName: ${v("#aName")}\nEmail: ${v("#aEmail")}\nPhone: ${v("#aPhone")}\nDesired move-in: ${v("#aDate")}\n\n${v("#aMsg")}`;
      if (M.email) {
        location.href = `mailto:${M.email}?subject=${encodeURIComponent(`Rental Application — ${P.address.street} — ${v("#aPlan")}`)}&body=${encodeURIComponent(body)}`;
        msg.className = "form-msg ok"; msg.textContent = `Your email app should open with your request to ${M.name}.`;
      } else {
        location.href = `sms:+1${M.phone.replace(/\D/g, "")}?&body=${encodeURIComponent(body)}`;
        msg.className = "form-msg ok"; msg.innerHTML = `Your messages app should open with your request. Or call ${esc(M.name)} at <a href="${tel(M.phone)}">${esc(M.phone)}</a>.`;
      }
    });
  }

  /* ---------- brand logos (everywhere Elvin's name appears) ---------- */
  const parts = [];
  if (M.logo) parts.push(`<img class="brand-logo" src="${esc(M.logo)}" alt="${esc(M.logoAlt)}">`);
  parts.push(M.partnerLogo
    ? `<img class="brand-logo" src="${esc(M.partnerLogo)}" alt="${esc(M.partnerName)} logo">`
    : `<span class="brand-slot" aria-hidden="true">${esc(M.partnerName)} logo</span>`);
  const logoHTML = parts.join('<span class="brand-div" aria-hidden="true"></span>');
  document.querySelectorAll("[data-brand-logos]").forEach((el) => (el.innerHTML = logoHTML));

  $("#applyAccess").innerHTML = `<strong>Need an accessible home?</strong> ${esc(P.accessibility)}`;
  $("#fKnow").innerHTML = [
    `Pet friendly · 1 pet under 14 lbs · <strong>no exotic pets or birds</strong> (<a href="#pets">details</a>)`,
    `1 free parking space · extra ${money(P.parking.extraPrice)}/mo as available`,
    `Utilities not included`,
    `Wheelchair accessible`
  ].map((x) => `<li>${x}</li>`).join("");

  /* ---------- footer ---------- */
  $("#fAddr").innerHTML = `${esc(P.address.street)}<br>${esc(P.address.cityStateZip)}`;
  $("#fMgr").innerHTML = `<strong>${esc(M.name)}</strong><br>${esc(M.title)}`;
  $("#fPhone").textContent = P.phone; $("#fPhone").href = tel(P.phone);
  if (P.email) { $("#fEmail").textContent = P.email; $("#fEmail").href = "mailto:" + P.email; } else { $("#fEmail").previousElementSibling?.remove(); $("#fEmail").remove(); }
  if (P.residentPortalUrl) $("#fPortal").innerHTML = `<a href="${esc(P.residentPortalUrl)}" target="_blank" rel="noopener">Resident Login</a>`;
  else { $("#fPortal").previousElementSibling.remove(); $("#fPortal").remove(); }
  $("#fCopy").textContent = `© ${new Date().getFullYear()} ${P.name}`;

  /* logo swap: 337 mark at the top → Alfa logo (links to contact) after the hero */
  const nav = $(".nav"), logos = document.querySelectorAll("[data-logo]");
  const setScrolled = (on) => {
    nav.classList.toggle("nav--scrolled", on);
    logos.forEach((l) => {
      l.href = on ? "#contact" : "#top";
      l.setAttribute("aria-label", on ? "Alfa Luxury Living — contact us" : "337 East Blackwell — home");
    });
  };
  new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), { rootMargin: "-76px 0px 0px 0px", threshold: 0.15 }).observe($(".hero"));

  const tog = $(".nav__toggle"), links = $(".nav__links");
  tog.onclick = () => { const o = links.classList.toggle("open"); tog.setAttribute("aria-expanded", o); };
  links.addEventListener("click", (e) => e.target.closest("a") && links.classList.remove("open"));
})();
