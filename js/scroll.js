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

  /* --------------------------------------------------------------------------
     Businesses — AIガイド固定 + スクロール100%連動のボックスグリッド
     .business-box を HTML に増やすだけで自動的に列整列・演出が適用される。
     -------------------------------------------------------------------------- */
  function initBusinessShowcase() {
    var stage = document.querySelector("[data-biz-stage]");
    if (!stage) return;

    var boxes = Array.prototype.slice.call(
      stage.querySelectorAll(".business-box")
    );
    if (!boxes.length) return;

    var total = boxes.length;
    var totalEl = stage.querySelector("[data-biz-total]");
    var currentEl = stage.querySelector("[data-biz-current]");
    var nameEl = stage.querySelector("[data-biz-name]");
    var emblemEl = stage.querySelector("[data-biz-emblem]");
    var progressEl = stage.querySelector("[data-biz-progress]");
    var orbitPathsRoot = stage.querySelector("[data-biz-orbit-paths]");
    var orbitsRoot = stage.querySelector("[data-biz-orbits]");
    var fillEl = stage.querySelector("[data-biz-fill]");
    var trackEl = stage.querySelector("[data-biz-track]");

    function pad(n) {
      return (n < 10 ? "0" : "") + n;
    }

    if (totalEl) totalEl.textContent = pad(total);

    /* ボックス数に応じてガイドのティックを動的生成（増減に自動追従） */
    var ticks = [];
    if (trackEl) {
      trackEl.querySelectorAll(".biz-guide__tick").forEach(function (t) {
        t.remove();
      });
      boxes.forEach(function (_, i) {
        var tick = document.createElement("span");
        tick.className = "biz-guide__tick";
        tick.style.top = total > 1 ? (i / (total - 1)) * 100 + "%" : "0%";
        trackEl.appendChild(tick);
        ticks.push(tick);
      });
    }

    function boxName(i) {
      var title = boxes[i] && boxes[i].querySelector(".business-box__title");
      return title ? title.textContent.trim() : "";
    }

    var lastActive = -1;
    function setActive(idx) {
      if (idx === lastActive) return;
      lastActive = idx;
      if (currentEl) currentEl.textContent = pad(idx + 1);
      if (nameEl) nameEl.textContent = boxName(idx);
      ticks.forEach(function (tk, i) {
        tk.classList.toggle("is-active", i === idx);
      });
    }

    /* ===== ワイヤーフレーム球体（ネットワーク構造） =====
       3D頂点を回転・透視投影してSVGの点（頂点）と線（エッジ）を描く。
       スクロール進捗 + 常時のゆるやかなドリフトで宇宙空間のように自転する。 */
    var SVGNS = "http://www.w3.org/2000/svg";
    var netRoot = stage.querySelector("[data-biz-net]");

    var reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var scrollP = 0;
    var idle = 0;
    var geo = null;
    var edgeEls = [];
    var vertEls = [];

    function normalize3(v) {
      var l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) || 1;
      return [v[0] / l, v[1] / l, v[2] / l];
    }

    /* 正二十面体を周波数 v で分割した測地球を生成。
       頂点数=10v²+2／エッジ数=30v²。v=2→42頂点,120エッジ／v=3→92頂点,270エッジ／v=4→162頂点,480エッジ。
       4倍刻みのicosphereと違い任意の密度を細かく指定できる。 */
    function buildGeodesic(v) {
      var t = (1 + Math.sqrt(5)) / 2;
      var base = [
        [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
        [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
        [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
      ].map(normalize3);
      var faces = [
        [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
        [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
        [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
        [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
      ];

      var verts = [];
      var vmap = {};
      function getVert(p) {
        var n = normalize3(p);
        var key =
          n[0].toFixed(4) + "," + n[1].toFixed(4) + "," + n[2].toFixed(4);
        if (vmap[key] != null) return vmap[key];
        verts.push(n);
        return (vmap[key] = verts.length - 1);
      }

      var eset = {}, edges = [];
      function addEdge(a, b) {
        if (a === b) return;
        var k = a < b ? a + "_" + b : b + "_" + a;
        if (!eset[k]) { eset[k] = 1; edges.push([a, b]); }
      }

      for (var f = 0; f < faces.length; f++) {
        var A = base[faces[f][0]], B = base[faces[f][1]], C = base[faces[f][2]];
        var grid = [];
        for (var i = 0; i <= v; i++) {
          grid[i] = [];
          for (var j = 0; j <= v - i; j++) {
            var k = v - i - j;
            grid[i][j] = getVert([
              (A[0] * k + B[0] * j + C[0] * i) / v,
              (A[1] * k + B[1] * j + C[1] * i) / v,
              (A[2] * k + B[2] * j + C[2] * i) / v
            ]);
          }
        }
        for (var i2 = 0; i2 < v; i2++) {
          for (var j2 = 0; j2 < v - i2; j2++) {
            addEdge(grid[i2][j2], grid[i2][j2 + 1]);
            addEdge(grid[i2][j2], grid[i2 + 1][j2]);
            addEdge(grid[i2][j2 + 1], grid[i2 + 1][j2]);
          }
        }
      }
      return { verts: verts, edges: edges };
    }

    if (netRoot) {
      geo = buildGeodesic(3); /* 92頂点・270エッジ（v=2とv=4の中間の密度） */
      for (var ei = 0; ei < geo.edges.length; ei++) {
        var ln = document.createElementNS(SVGNS, "line");
        ln.setAttribute("class", "biz-guide__edge");
        netRoot.appendChild(ln);
        edgeEls.push(ln);
      }
      for (var vi = 0; vi < geo.verts.length; vi++) {
        var nd = document.createElementNS(SVGNS, "circle");
        nd.setAttribute("class", "biz-guide__vertex");
        netRoot.appendChild(nd);
        vertEls.push(nd);
      }
    }

    var R = 38;     /* 球の半径（viewBox単位） */
    var DIST = 4;   /* 視点距離（半径の倍数）／透視の強さ */

    function renderNet() {
      if (!geo) return;
      var ay = scrollP * Math.PI * 4 + idle;          /* 横回転（ヨー） */
      var ax = 0.5 + scrollP * Math.PI * 1.2 + idle * 0.35; /* 縦回転（ピッチ／やや傾き） */
      var cay = Math.cos(ay), say = Math.sin(ay);
      var cax = Math.cos(ax), sax = Math.sin(ax);

      var P = [];
      for (var i = 0; i < geo.verts.length; i++) {
        var v = geo.verts[i];
        var x = v[0] * cay + v[2] * say;
        var z = -v[0] * say + v[2] * cay;
        var y = v[1] * cax - z * sax;
        var z2 = v[1] * sax + z * cax;        /* 奥行き(-1:奥 〜 1:手前) */
        var persp = DIST / (DIST - z2);
        P.push({
          x: 60 + x * R * persp,
          y: 60 + y * R * persp,
          d: z2
        });
      }

      for (var e = 0; e < geo.edges.length; e++) {
        var a = P[geo.edges[e][0]], b = P[geo.edges[e][1]];
        var ln = edgeEls[e];
        ln.setAttribute("x1", a.x.toFixed(2));
        ln.setAttribute("y1", a.y.toFixed(2));
        ln.setAttribute("x2", b.x.toFixed(2));
        ln.setAttribute("y2", b.y.toFixed(2));
        var td = ((a.d + b.d) / 2 + 1) / 2;   /* 0:奥 〜 1:手前 */
        ln.style.opacity = (0.1 + td * 0.6).toFixed(3);
      }

      for (var n = 0; n < vertEls.length; n++) {
        var pt = P[n];
        var tn = (pt.d + 1) / 2;
        vertEls[n].setAttribute("cx", pt.x.toFixed(2));
        vertEls[n].setAttribute("cy", pt.y.toFixed(2));
        vertEls[n].setAttribute("r", (0.5 + tn * 1.0).toFixed(2));
        vertEls[n].style.opacity = (0.25 + tn * 0.75).toFixed(3);
      }
    }

    /* スクロール進捗(0–1)を AIガイドの各要素へ反映（PC/SP共通） */
    function drawGuide(p) {
      p = Math.max(0, Math.min(1, p));
      scrollP = p;
      if (progressEl) {
        progressEl.style.strokeDashoffset = (100 - p * 100).toFixed(2);
      }
      if (emblemEl) {
        emblemEl.style.transform = "scale(" + (0.94 + p * 0.1).toFixed(3) + ")";
      }
      if (fillEl) {
        fillEl.style.height = (p * 100).toFixed(2) + "%";
      }
      renderNet();
      var idx = Math.max(0, Math.min(total - 1, Math.floor(p * total + 0.0001)));
      setActive(idx);
    }

    /* ===== 衛星（3基）：それぞれ独立した軌道を“回り続ける” =====
       スクロール量に関係なく一定の角速度で公転（衛星のように）。
       軌道ごとに半径・傾き・速度・向きを変えて立体的に見せる。
       手前で大きく明るく／奥で小さく淡く描画。 */
    var ORBITS = [
      { rx: 52, ry: 17, tilt: -18, speed: 0.020, phase: 0.4, trail: 4 },
      { rx: 44, ry: 40, tilt: 32, speed: -0.015, phase: 2.3, trail: 3 },
      { rx: 50, ry: 30, tilt: 74, speed: 0.024, phase: 4.1, trail: 3 },
    ];

    var orbits = [];
    ORBITS.forEach(function (cfg) {
      var tiltRad = cfg.tilt * (Math.PI / 180);

      if (orbitPathsRoot) {
        var path = document.createElementNS(SVGNS, "ellipse");
        path.setAttribute("class", "biz-guide__orbit-path");
        path.setAttribute("cx", "60");
        path.setAttribute("cy", "60");
        path.setAttribute("rx", String(cfg.rx));
        path.setAttribute("ry", String(cfg.ry));
        path.setAttribute("transform", "rotate(" + cfg.tilt + " 60 60)");
        orbitPathsRoot.appendChild(path);
      }

      var grp = document.createElementNS(SVGNS, "g");
      var trail = [];
      for (var i = 0; i < cfg.trail; i++) {
        var t = document.createElementNS(SVGNS, "circle");
        t.setAttribute("class", "biz-guide__sat-trail");
        grp.appendChild(t);
        trail.push(t);
      }
      var sat = document.createElementNS(SVGNS, "circle");
      sat.setAttribute("class", "biz-guide__satellite");
      grp.appendChild(sat);
      if (orbitsRoot) orbitsRoot.appendChild(grp);

      orbits.push({
        cfg: cfg,
        angle: cfg.phase,
        dir: cfg.speed >= 0 ? 1 : -1,
        ct: Math.cos(tiltRad),
        st: Math.sin(tiltRad),
        sat: sat,
        trail: trail,
      });
    });

    function orbitPoint(o, a) {
      var lx = o.cfg.rx * Math.cos(a);
      var ly = o.cfg.ry * Math.sin(a);
      return {
        x: 60 + lx * o.ct - ly * o.st,
        y: 60 + lx * o.st + ly * o.ct,
        near: (Math.sin(a) + 1) / 2, /* 0:奥 〜 1:手前 */
      };
    }

    function renderSatellites() {
      for (var k = 0; k < orbits.length; k++) {
        var o = orbits[k];
        var p0 = orbitPoint(o, o.angle);
        o.sat.setAttribute("cx", p0.x.toFixed(2));
        o.sat.setAttribute("cy", p0.y.toFixed(2));
        o.sat.setAttribute("r", (1.7 + p0.near * 1.7).toFixed(2));
        o.sat.style.opacity = (0.4 + p0.near * 0.6).toFixed(3);
        for (var i = 0; i < o.trail.length; i++) {
          var pt = orbitPoint(o, o.angle - (i + 1) * 0.16 * o.dir);
          var fade = 1 - (i + 1) / (o.trail.length + 1);
          o.trail[i].setAttribute("cx", pt.x.toFixed(2));
          o.trail[i].setAttribute("cy", pt.y.toFixed(2));
          o.trail[i].setAttribute("r", (0.5 + pt.near * 1.0 * fade).toFixed(2));
          o.trail[i].style.opacity = (pt.near * 0.5 * fade).toFixed(3);
        }
      }
    }

    drawGuide(0);
    renderSatellites();

    /* 常時アニメーション（reduced-motion時は停止）。
       球体はゆるやかに自転し、3基の衛星は一定速度で公転し続ける。 */
    if (!reduceMotion) {
      (function loop() {
        idle += 0.004;
        for (var k = 0; k < orbits.length; k++) {
          orbits[k].angle += orbits[k].cfg.speed;
        }
        if (geo) renderNet();
        renderSatellites();
        requestAnimationFrame(loop);
      })();
    }

    var lastBox = boxes[boxes.length - 1];
    var isMobileGuide = window.matchMedia("(max-width: 500px)").matches;

    /* ガイドをスクロール進捗と連動（PC/SP共通）。
       PC：sticky 親 (.biz-guide) をボックス列と同じ高さに伸ばし、最後のボックスが
       流れ切るまでガイドが固定されるよう end を最終ボックス基準に合わせる。
       SP：従来どおりステージ全体を基準。 */
    ScrollTrigger.create({
      trigger: stage,
      start: isMobileGuide ? "top center" : "top 75%",
      endTrigger: isMobileGuide ? stage : lastBox,
      end: isMobileGuide ? "bottom center" : "bottom 85%",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: function (self) {
        drawGuide(self.progress);
      },
    });

    /* 各ボックスを scrub 連動で個別に演出。
       縦移動(yPercent)はボックスごとの位置ズレ＝間隔バラつきの原因になるため使わず、
       透明度＋中心スケールのみで「止めると止まる」感を維持しつつ整列を崩さない。
       .business-box を増やすだけで自動的に同じ演出が適用される。 */
    boxes.forEach(function (box) {
      gsap.fromTo(
        box,
        { autoAlpha: 0, scale: 0.985 },
        {
          autoAlpha: 1,
          scale: 1,
          ease: "power2.out",
          force3D: true,
          transformOrigin: "50% 50%",
          scrollTrigger: {
            trigger: box,
            start: "top 90%",
            end: "top 66%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
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

  /* Instagram フィードで .news-card が差し替わった後に再演出 */
  window.refreshNewsGridReveal = function () {
    if (typeof gsap === "undefined") return;
    var cards = gsap.utils.toArray(".news-card");
    if (!cards.length) return;

    gsap.set(cards, { clearProps: "all" });
    gsap.from(cards, {
      opacity: 0,
      scale: 0.97,
      y: 24,
      duration: 0.9,
      stagger: 0.06,
      ease: "power2.out",
      force3D: true,
    });

    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  };

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
