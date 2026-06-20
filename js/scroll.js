(function () {
  "use strict";

  var SCRUB = 3.2;
  var lenis = null;

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initScroll() {
    if (prefersReduced || typeof gsap === "undefined") {
      document.documentElement.classList.add("motion-reduced");
      revealAll();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 150,
    });

    initLenis();
    if (typeof window.initHeaderRollScroll === "function") {
      window.initHeaderRollScroll();
    }
    initSectionVisuals();
    initHeader();
    initHeroEntrance();
    initScrollReveals();
    initBusinessShowcase();
    initNewsGrid();
    initParallaxOrbs();
    initLogoShine();

    ScrollTrigger.refresh();
  }

  function initLenis() {
    if (typeof Lenis === "undefined") return;

    lenis = new Lenis({
      duration: 1.35,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    lenis.on("scroll", function (e) {
      ScrollTrigger.update();
      if (typeof window.onLenisHeaderRoll === "function") {
        window.onLenisHeaderRoll(e);
      }
      if (typeof window.onLenisLogoShine === "function") {
        window.onLenisLogoShine(e);
      }
    });

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop: function (value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect: function () {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });

    ScrollTrigger.addEventListener("refresh", function () {
      lenis.resize();
    });

    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  function revealAll() {
    gsap.set("[data-animate-item]", { opacity: 1, y: 0, scale: 1, clearProps: "transform" });
    gsap.set(".scroll-bg__orb", { opacity: 1 });
    gsap.set(".section-header__title", {
      opacity: 1,
      y: 0,
      "--title-underline-scale": 1,
      clearProps: "transform",
    });
    gsap.set(".section-visual__photo, .section-visual__geo", {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      clearProps: "transform",
    });
  }

  function scrubTrigger(trigger, end, scrubValue) {
    return {
      trigger: trigger,
      start: "top bottom",
      end: end || "bottom top",
      scrub: scrubValue != null ? scrubValue : SCRUB,
      invalidateOnRefresh: true,
    };
  }

  function initSectionVisuals() {
    initHeroVisual();
    initAboutVisual();
    initBusinessesVisual();
    initNewsVisual();
  }

  function initHeroVisual() {
    var section = document.getElementById("hero");
    if (!section) return;

    var photo = section.querySelector(".section-visual__photo");
    var geoA = section.querySelector(".section-visual__geo--a");
    var geoB = section.querySelector(".section-visual__geo--b");
    var frame = section.querySelector(".section-visual__frame");

    if (photo) {
      gsap.fromTo(
        photo,
        { scale: 1.12, yPercent: 6, opacity: 0.3, force3D: true },
        {
          scale: 1.02,
          yPercent: -12,
          opacity: 0.5,
          ease: "none",
          force3D: true,
          scrollTrigger: scrubTrigger(section, "bottom top", SCRUB),
        }
      );
    }

    if (geoA) {
      gsap.fromTo(
        geoA,
        { x: -20, y: 30, rotate: -4, scale: 0.95, force3D: true },
        {
          x: 35,
          y: -50,
          rotate: 6,
          scale: 1.04,
          ease: "none",
          force3D: true,
          scrollTrigger: scrubTrigger(section, "bottom top", SCRUB + 0.6),
        }
      );
    }

    if (geoB) {
      gsap.fromTo(
        geoB,
        { x: 15, y: -15, rotate: 3, opacity: 0.2, force3D: true },
        {
          x: -25,
          y: 40,
          rotate: -5,
          opacity: 0.35,
          ease: "none",
          force3D: true,
          scrollTrigger: scrubTrigger(section, "bottom top", SCRUB - 0.4),
        }
      );
    }

    if (frame) {
      gsap.to(frame, {
        yPercent: 8,
        ease: "none",
        force3D: true,
        scrollTrigger: scrubTrigger(section, "bottom top", SCRUB + 1),
      });
    }
  }

  function initAboutVisual() {
    var section = document.getElementById("about");
    if (!section) return;

    var photo = section.querySelector(".section-visual__photo");
    var geo = section.querySelector(".section-visual__geo--a");
    var st = scrubTrigger(section, "bottom top", SCRUB);

    if (photo) {
      gsap.fromTo(
        photo,
        { xPercent: -8, scale: 1.08, opacity: 0.18, force3D: true },
        {
          xPercent: 10,
          scale: 1,
          opacity: 0.38,
          ease: "none",
          force3D: true,
          scrollTrigger: st,
        }
      );
    }

    if (geo) {
      gsap.fromTo(
        geo,
        { xPercent: 6, yPercent: 4, scale: 0.94, rotate: 0, force3D: true },
        {
          xPercent: -5,
          yPercent: -8,
          scale: 1.06,
          rotate: 4,
          ease: "none",
          force3D: true,
          scrollTrigger: scrubTrigger(section, "bottom top", SCRUB + 0.5),
        }
      );
    }
  }

  function initBusinessesVisual() {
    var section = document.getElementById("businesses");
    if (!section) return;

    var geoA = section.querySelector(".section-visual__geo--a");
    var geoB = section.querySelector(".section-visual__geo--b");

    if (geoA) {
      gsap.fromTo(
        geoA,
        { xPercent: -5, scale: 0.94, yPercent: 4, force3D: true },
        {
          xPercent: 5,
          scale: 1.03,
          yPercent: -5,
          ease: "none",
          force3D: true,
          scrollTrigger: scrubTrigger(section, "bottom top", SCRUB),
        }
      );
    }

    if (geoB) {
      gsap.fromTo(
        geoB,
        { xPercent: 10, yPercent: 6, opacity: 0.12, force3D: true },
        {
          xPercent: -12,
          yPercent: -10,
          opacity: 0.28,
          ease: "none",
          force3D: true,
          scrollTrigger: scrubTrigger(section, "bottom top", SCRUB - 0.3),
        }
      );
    }
  }

  function initNewsVisual() {
    var section = document.getElementById("news");
    if (!section) return;

    var geoA = section.querySelector(".section-visual__geo--a");
    var geoB = section.querySelector(".section-visual__geo--b");

    if (geoA) {
      gsap.fromTo(
        geoA,
        { x: 25, y: 20, rotate: -3, scale: 0.97, force3D: true },
        {
          x: -35,
          y: -30,
          rotate: 5,
          scale: 1.05,
          ease: "none",
          force3D: true,
          scrollTrigger: scrubTrigger(section, "bottom top", SCRUB),
        }
      );
    }

    if (geoB) {
      gsap.fromTo(
        geoB,
        { x: -20, y: -15, opacity: 0.15, force3D: true },
        {
          x: 30,
          y: 25,
          opacity: 0.3,
          ease: "none",
          force3D: true,
          scrollTrigger: scrubTrigger(section, "bottom top", SCRUB + 0.4),
        }
      );
    }
  }

  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    ScrollTrigger.create({
      start: "top -80",
      onUpdate: function (self) {
        header.classList.toggle("is-scrolled", self.scroll() > 40);
      },
    });
  }

  function initHeroEntrance() {
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".scroll-bg__orb", {
      opacity: 0,
      scale: 0.92,
      duration: 1.2,
      stagger: 0.1,
    })
      .from(
        "#hero .section-visual__photo",
        { opacity: 0, scale: 1.05, duration: 1.4 },
        "-=0.9"
      )
      .from(
        "#hero .section-visual__geo",
        { opacity: 0, scale: 0.94, duration: 1, stagger: 0.1 },
        "-=1"
      )
      .from(".hero__eyebrow", { opacity: 0, y: 20, duration: 0.8 }, "-=0.7")
      .from(".hero__logo", { opacity: 0, y: 28, duration: 1 }, "-=0.6")
      .from(".hero__catchcopy", { opacity: 0, y: 22, duration: 0.8 }, "-=0.5")
      .from(".hero__lead", { opacity: 0, y: 18, duration: 0.75 }, "-=0.4")
      .from(
        ".hero__actions .btn",
        { opacity: 0, y: 16, duration: 0.65, stagger: 0.1 },
        "-=0.3"
      )
      .from(".scroll-hint", { opacity: 0, y: 8, duration: 0.6 }, "-=0.2");

    gsap.to(".hero .container", {
      y: -32,
      opacity: 0.5,
      ease: "none",
      force3D: true,
      scrollTrigger: scrubTrigger(document.getElementById("hero"), "bottom top", SCRUB),
    });
  }

  function fadeUp(el, opts) {
    gsap.from(el, {
      opacity: 0,
      y: opts.y || 40,
      duration: opts.duration || 1.2,
      ease: "power2.out",
      force3D: true,
      scrollTrigger: {
        trigger: el,
        start: opts.start || "top 88%",
        once: true,
      },
    });
  }

  function initScrollReveals() {
    gsap.utils.toArray("[data-animate-item]").forEach(function (el) {
      if (
        el.closest("#hero") ||
        el.closest(".business-box") ||
        el.closest(".news-card") ||
        el.classList.contains("section-header__title")
      ) {
        return;
      }
      fadeUp(el, { y: 36 });
    });

    gsap.utils.toArray(".section-header").forEach(function (header) {
      var label = header.querySelector(".section-header__label");
      var line = header.querySelector(".section-header__line");
      var title = header.querySelector(".section-header__title");

      if (label) {
        fadeUp(label, { y: 16, start: "top 86%" });
      }

      if (title) {
        gsap.fromTo(
          title,
          {
            opacity: 0,
            y: 36,
            "--title-underline-scale": 0,
            force3D: true,
          },
          {
            opacity: 1,
            y: 0,
            "--title-underline-scale": 1,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: header,
              start: "top 86%",
              end: "top 58%",
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (line) {
        gsap.from(line, {
          scaleX: 0,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: header,
            start: "top 84%",
            once: true,
          },
        });
      }
    });

  }

  /* ==========================================================================
     Our Businesses — scroll-synced interactive grid + AI navigation guide.
     拡張性: .business-box を増やすだけで自動整列＆アニメ適用（コード変更不要）。
     ========================================================================== */
  function initBusinessShowcase() {
    var section = document.getElementById("businesses");
    if (!section) return;

    /* 動的検知ループ: 現在の .business-box を全取得（増減に自動追従） */
    var boxes = Array.prototype.slice.call(
      section.querySelectorAll("[data-biz-box]")
    );
    if (!boxes.length) return;

    /* ボックス数に応じて AI ガイドのステップを動的生成 */
    buildGuideSteps(section, boxes);

    var steps = Array.prototype.slice.call(
      section.querySelectorAll("[data-ai-step]")
    );
    var fill = section.querySelector("[data-ai-fill]");
    var dot = section.querySelector("[data-ai-dot]");
    var ring = section.querySelector(".ai-guide__ring-progress");
    var percentEl = section.querySelector("[data-ai-percent]");
    var stack = section.querySelector(".biz__stack");

    function updateGuide(progress) {
      var p = Math.max(0, Math.min(1, progress));
      var pct = Math.round(p * 100);
      if (percentEl) percentEl.textContent = pct;
      if (ring) ring.style.strokeDashoffset = String(100 - pct);
      if (fill) fill.style.height = pct + "%";
      if (dot) dot.style.top = pct + "%";
      if (steps.length) {
        var current = Math.min(steps.length - 1, Math.floor(p * steps.length));
        steps.forEach(function (s, i) {
          s.classList.toggle("is-active", i <= current);
          s.classList.toggle("is-current", i === current);
        });
      }
    }

    var mm = gsap.matchMedia();

    /* --- PC: 2カラム・スクロール100%連動（scrub）でカチッと積み上がる --- */
    mm.add("(min-width: 901px)", function () {
      boxes.forEach(function (box) {
        gsap.set(box, { autoAlpha: 0, y: 64, scale: 0.96, force3D: true });
        gsap.to(box, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: box,
            start: "top 94%",
            end: "top 62%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      /* AIガイド: 右スタックの進捗とスクロール量を完全シンク */
      if (stack) {
        ScrollTrigger.create({
          trigger: stack,
          start: "top 75%",
          end: "bottom 70%",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: function (self) {
            updateGuide(self.progress);
          },
        });
      }
      updateGuide(0);

      return function () {
        gsap.set(boxes, { clearProps: "all" });
      };
    });

    /* --- SP/タブレット: 2カラム解除→シンプルなフェードイン --- */
    mm.add("(max-width: 900px)", function () {
      boxes.forEach(function (box) {
        gsap.set(box, { autoAlpha: 0, y: 36 });
        gsap.to(box, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: box,
            start: "top 90%",
            once: true,
          },
        });
      });

      return function () {
        gsap.set(boxes, { clearProps: "all" });
      };
    });
  }

  /* AIガイドのステップ一覧を .business-box から自動構築 */
  function buildGuideSteps(section, boxes) {
    var list = section.querySelector("[data-ai-steps]");
    if (!list || list.children.length) return;

    boxes.forEach(function (box, i) {
      var titleEl = box.querySelector(".business-box__title");
      var label = titleEl ? titleEl.textContent.trim() : "";
      var li = document.createElement("li");
      li.className = "ai-guide__step";
      li.setAttribute("data-ai-step", "");

      var num = document.createElement("span");
      num.className = "ai-guide__step-num";
      num.textContent = ("0" + (i + 1)).slice(-2);

      var text = document.createElement("span");
      text.className = "ai-guide__step-label";
      text.textContent = label;

      li.appendChild(num);
      li.appendChild(text);
      list.appendChild(li);
    });
  }

  function initNewsGrid() {
    var cards = gsap.utils.toArray(".news-card");
    if (!cards.length) return;

    gsap.from(cards, {
      opacity: 0,
      scale: 0.97,
      y: 24,
      duration: 1,
      stagger: 0.06,
      ease: "power2.out",
      force3D: true,
      scrollTrigger: {
        trigger: ".news-grid",
        start: "top 86%",
        once: true,
      },
    });
  }

  function initLogoShine() {
    var mark = document.querySelector(".site-logo__mark");
    if (!mark) return;

    mark.classList.add("site-logo__mark--shine");

    var SCROLL_PER_PASS = 620;
    var REST_POS = 130;
    var END_POS = -35;
    var RANGE = REST_POS - END_POS;
    var IDLE_DELAY = 2000;
    var SHINE_SMOOTHING = 0.07;

    var state = {
      mark: mark,
      virtualScroll: 0,
      lastScroll: 0,
      idleTimer: null,
      settleTween: null,
    };

    function readScroll(e) {
      if (typeof e === "number") return e;
      if (e && typeof e.scroll === "number") return e.scroll;
      if (e && typeof e.animatedScroll === "number") return e.animatedScroll;
      return window.scrollY || document.documentElement.scrollTop || 0;
    }

    function getCurrentPos() {
      var raw = gsap.getProperty(state.mark, "--logo-shine-pos");
      if (raw == null) return REST_POS;
      return parseFloat(String(raw).replace("%", "")) || REST_POS;
    }

    function syncVirtualFromPos() {
      state.virtualScroll =
        ((REST_POS - getCurrentPos()) / RANGE) * SCROLL_PER_PASS;
    }

    function targetPos() {
      return REST_POS - (state.virtualScroll / SCROLL_PER_PASS) * RANGE;
    }

    function targetBright(pos) {
      var progress = (REST_POS - pos) / RANGE;
      var peak = 1 - Math.abs(progress - 0.5) * 2;
      return 0.55 + Math.max(0, peak) * 0.45;
    }

    function applyShine() {
      var target = targetPos();
      var current = getCurrentPos();
      var pos = current + (target - current) * SHINE_SMOOTHING;
      var bright = targetBright(pos);

      gsap.set(state.mark, {
        "--logo-shine-pos": pos + "%",
        "--logo-shine-bright": bright,
      });
    }

    function resetShine() {
      clearTimeout(state.idleTimer);
      state.idleTimer = null;

      if (state.settleTween) {
        state.settleTween.kill();
        state.settleTween = null;
      }

      gsap.set(state.mark, {
        "--logo-shine-pos": REST_POS + "%",
        "--logo-shine-bright": 0.55,
      });
      state.virtualScroll = 0;
    }

    function settleShine() {
      if (state.settleTween) return;

      state.settleTween = gsap.to(state.mark, {
        "--logo-shine-pos": REST_POS + "%",
        "--logo-shine-bright": 0.55,
        duration: 2,
        ease: "power2.out",
        onComplete: function () {
          state.virtualScroll = 0;
          state.settleTween = null;
        },
      });
    }

    function scheduleSettle() {
      clearTimeout(state.idleTimer);
      state.idleTimer = setTimeout(settleShine, IDLE_DELAY);
    }

    function handleScrollDelta(delta) {
      if (!delta) return;

      if (state.settleTween) {
        state.settleTween.kill();
        state.settleTween = null;
        syncVirtualFromPos();
      }

      state.virtualScroll += delta;
      applyShine();
      scheduleSettle();
    }

    resetShine();

    window.onLenisLogoShine = function (e) {
      var current = readScroll(e);
      var delta = current - state.lastScroll;
      state.lastScroll = current;
      if (Math.abs(delta) < 0.5) return;
      handleScrollDelta(delta);
    };

    state.lastScroll = readScroll();

    if (typeof Lenis === "undefined") {
      window.addEventListener(
        "scroll",
        function () {
          window.onLenisLogoShine({ scroll: readScroll() });
        },
        { passive: true }
      );
    }
  }

  function initParallaxOrbs() {
    var mainSt = {
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: SCRUB + 0.8,
      invalidateOnRefresh: true,
    };

    gsap.to(".scroll-bg__wash", {
      y: 80,
      opacity: 0.94,
      ease: "none",
      force3D: true,
      scrollTrigger: mainSt,
    });

    gsap.to(".scroll-bg__orb--1", {
      y: 140,
      x: -40,
      scale: 1.12,
      ease: "none",
      force3D: true,
      scrollTrigger: Object.assign({}, mainSt, { scrub: SCRUB + 1.1 }),
    });

    gsap.to(".scroll-bg__orb--2", {
      y: -110,
      x: 55,
      scale: 1.08,
      ease: "none",
      force3D: true,
      scrollTrigger: Object.assign({}, mainSt, { scrub: SCRUB + 0.4 }),
    });

    gsap.to(".scroll-bg__orb--3", {
      y: 160,
      x: 30,
      scale: 1.1,
      ease: "none",
      force3D: true,
      scrollTrigger: Object.assign({}, mainSt, { scrub: SCRUB + 1.4 }),
    });

    gsap.to(".scroll-bg__grain", {
      y: 40,
      ease: "none",
      force3D: true,
      scrollTrigger: Object.assign({}, mainSt, { scrub: SCRUB + 2 }),
    });
  }

  if (document.readyState === "complete") {
    initScroll();
  } else {
    document.addEventListener("DOMContentLoaded", initScroll);
  }
})();
