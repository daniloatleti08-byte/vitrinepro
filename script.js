(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};
  const pixelId = String(config.metaPixelId || "").trim();
  const checkoutUrl = String(config.checkoutUrl || "").trim();

  function installMetaPixel(id) {
    if (!/^\d{5,}$/.test(id) || window.fbq) return;

    /* Meta Pixel base code, carregado somente quando um ID válido foi configurado. */
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    window.fbq("init", id);
    window.fbq("track", "PageView");
    window.fbq("track", "ViewContent", {
      content_name: config.productName || "Kit Vitrine Beauty Pro",
      content_type: "product",
      value: Number(config.productValue || 37),
      currency: config.currency || "BRL"
    });
  }

  function trackPixel(eventName, payload) {
    if (typeof window.fbq === "function") window.fbq("track", eventName, payload || {});
  }

  function buildCheckoutUrl(baseUrl) {
    try {
      const target = new URL(baseUrl, window.location.href);
      const current = new URLSearchParams(window.location.search);
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach((key) => {
        if (current.has(key) && !target.searchParams.has(key)) target.searchParams.set(key, current.get(key));
      });
      return target.toString();
    } catch (_error) {
      return baseUrl;
    }
  }

  function showConfigToast() {
    const toast = document.getElementById("config-toast");
    if (!toast) return;
    toast.classList.add("is-visible");
    window.clearTimeout(showConfigToast.timeout);
    showConfigToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 4300);
  }

  installMetaPixel(pixelId);

  document.querySelectorAll(".checkout-link").forEach((link) => {
    if (checkoutUrl) {
      link.href = buildCheckoutUrl(checkoutUrl);
      link.target = "_self";
    }

    link.addEventListener("click", (event) => {
      const placement = link.dataset.cta || "unknown";
      trackPixel("InitiateCheckout", {
        content_name: config.productName || "Kit Vitrine Beauty Pro",
        content_type: "product",
        value: Number(config.productValue || 37),
        currency: config.currency || "BRL"
      });

      if (typeof window.fbq === "function") window.fbq("trackCustom", "CTA_Click", { placement });

      if (!checkoutUrl) {
        event.preventDefault();
        document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth", block: "center" });
        showConfigToast();
      }
    });
  });

  document.querySelectorAll(".phone").forEach((phone) => {
    const toggle = () => phone.classList.toggle("is-paused");
    phone.addEventListener("click", toggle);
    phone.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });
  });

  const revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px" })
    : null;

  document.querySelectorAll(".reveal").forEach((element) => {
    if (revealObserver) revealObserver.observe(element);
    else element.classList.add("is-visible");
  });

  const mobileBar = document.getElementById("mobile-bar");
  const hero = document.getElementById("inicio");
  if (mobileBar && hero && "IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(([entry]) => mobileBar.classList.toggle("is-visible", !entry.isIntersecting), { threshold: 0.08 });
    heroObserver.observe(hero);
  }

  document.getElementById("current-year").textContent = String(new Date().getFullYear());
})();
