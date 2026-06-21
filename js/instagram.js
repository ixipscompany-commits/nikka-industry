(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     Instagram feed integration
     --------------------------------------------------------------------------
     静的サイト向けの軽量クライアント連携。
     設定方法（いずれか）:
       1) window.NIKKA_INSTAGRAM = { token: "ACCESS_TOKEN", limit: 6, profile: "nikka_official" }
       2) .news-grid[data-instagram-feed] に data 属性で指定
          data-ig-token / data-ig-limit / data-ig-profile / data-ig-json

     token 未設定時は既存のプレースホルダー表示のまま（デザインを維持）。
     JSON フィード（自社サーバー / サーバーレス書き出し）にも対応。
     -------------------------------------------------------------------------- */

  var GRAPH_ENDPOINT = "https://graph.instagram.com/me/media";
  var GRAPH_FIELDS =
    "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
  var CACHE_KEY = "nikka-ig-feed";
  var CACHE_TTL = 5 * 60 * 1000; /* 5 分（短めにして新投稿を早く反映） */

  function getConfig(grid) {
    var global = window.NIKKA_INSTAGRAM || {};
    return {
      token: grid.getAttribute("data-ig-token") || global.token || "",
      jsonUrl: grid.getAttribute("data-ig-json") || global.jsonUrl || "",
      limit:
        parseInt(grid.getAttribute("data-ig-limit"), 10) ||
        global.limit ||
        6,
      profile:
        grid.getAttribute("data-ig-profile") || global.profile || "",
    };
  }

  function readCache(key) {
    try {
      var raw = localStorage.getItem(CACHE_KEY + ":" + key);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || Date.now() - parsed.ts > CACHE_TTL) return null;
      return parsed.items;
    } catch (e) {
      return null;
    }
  }

  function writeCache(key, items) {
    try {
      localStorage.setItem(
        CACHE_KEY + ":" + key,
        JSON.stringify({ ts: Date.now(), items: items })
      );
    } catch (e) {
      /* localStorage 不可でも無視 */
    }
  }

  function formatDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    var y = d.getFullYear();
    var m = ("0" + (d.getMonth() + 1)).slice(-2);
    var day = ("0" + d.getDate()).slice(-2);
    return y + "." + m + "." + day;
  }

  /* Behold.so 等が返す sizes から適切な画像URLを選ぶ */
  function pickSized(item) {
    var s = item.sizes;
    if (s) {
      var pref = s.medium || s.large || s.small || s.full || s.thumbnail;
      if (pref && (pref.mediaUrl || pref.url)) return pref.mediaUrl || pref.url;
    }
    return "";
  }

  /* Graph API(snake_case) / Behold(camelCase) 双方のフィールド名に対応 */
  function normalize(items) {
    return (items || [])
      .map(function (item) {
        var type = (item.media_type || item.mediaType || "").toUpperCase();
        var isVideo = type === "VIDEO";
        var thumb = item.thumbnail_url || item.thumbnailUrl || "";
        var full = item.media_url || item.mediaUrl || pickSized(item) || "";
        var image = isVideo ? thumb || full : pickSized(item) || full || thumb;
        return {
          id: item.id,
          image: image,
          permalink: item.permalink || "",
          caption: (item.caption || item.prunedCaption || "").trim(),
          timestamp: item.timestamp || "",
          isVideo: isVideo,
        };
      })
      .filter(function (post) {
        return post && post.image;
      });
  }

  function fetchFromGraph(cfg) {
    var url =
      GRAPH_ENDPOINT +
      "?fields=" +
      encodeURIComponent(GRAPH_FIELDS) +
      "&access_token=" +
      encodeURIComponent(cfg.token) +
      "&limit=" +
      encodeURIComponent(cfg.limit);

    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("Instagram API " + res.status);
        return res.json();
      })
      .then(function (json) {
        if (json && json.error) {
          throw new Error(json.error.message || "Instagram API error");
        }
        return normalize(json && json.data);
      });
  }

  function fetchFromJson(cfg) {
    var url = cfg.jsonUrl;
    var sep = url.indexOf("?") >= 0 ? "&" : "?";
    url = url + sep + "_=" + Date.now();

    return fetch(url, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("Feed JSON " + res.status);
        return res.json();
      })
      .then(function (json) {
        var data = Array.isArray(json)
          ? json
          : json && (json.data || json.posts || json.media);
        return normalize(data);
      });
  }

  function buildCard(post) {
    var article = document.createElement("article");
    article.className = "news-card news-card--live";

    var link = document.createElement("a");
    link.className = "news-card__link";
    link.href = post.permalink || "#";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    if (post.caption) {
      link.setAttribute("aria-label", post.caption.slice(0, 80));
    }

    var media = document.createElement("div");
    media.className = "news-card__media";

    var img = document.createElement("img");
    img.src = post.image;
    img.alt = post.caption ? post.caption.slice(0, 120) : "Instagram post";
    img.loading = "lazy";
    img.decoding = "async";
    media.appendChild(img);

    if (post.isVideo) {
      var badge = document.createElement("span");
      badge.className = "news-card__badge-video";
      badge.setAttribute("aria-hidden", "true");
      media.appendChild(badge);
    }

    link.appendChild(media);

    var dateStr = formatDate(post.timestamp);
    if (dateStr) {
      var time = document.createElement("time");
      time.className = "news-card__date";
      time.setAttribute("datetime", (post.timestamp || "").slice(0, 10));
      time.textContent = dateStr;
      link.appendChild(time);
    }

    if (post.caption) {
      var cap = document.createElement("p");
      cap.className = "news-card__caption";
      /* 1行目（ハッシュタグ前）を中心に抜粋し、長文は省略 */
      var text = post.caption.split(/\r?\n/)[0] || post.caption;
      if (text.length > 90) text = text.slice(0, 90).trim() + "…";
      cap.textContent = text;
      link.appendChild(cap);
    }

    article.appendChild(link);
    return article;
  }

  function render(grid, posts, cfg) {
    if (!posts || !posts.length) return;

    var limited = posts.slice(0, cfg.limit);
    var fragment = document.createDocumentFragment();
    limited.forEach(function (post) {
      fragment.appendChild(buildCard(post));
    });

    grid.innerHTML = "";
    grid.appendChild(fragment);
    grid.classList.add("news-grid--live");

    if (typeof window.refreshNewsGridReveal === "function") {
      window.refreshNewsGridReveal();
    }
  }

  function initInstagram() {
    var grid = document.querySelector("[data-instagram-feed]");
    if (!grid) return;

    var cfg = getConfig(grid);
    if (!cfg.token && !cfg.jsonUrl) return; /* 未設定: プレースホルダー維持 */

    var cacheKey = cfg.token ? "graph" : "json:" + cfg.jsonUrl;
    var cached = readCache(cacheKey);
    if (cached) {
      render(grid, cached, cfg);
    }

    var loader = cfg.token ? fetchFromGraph(cfg) : fetchFromJson(cfg);
    loader
      .then(function (posts) {
        if (posts && posts.length) {
          writeCache(cacheKey, posts);
          render(grid, posts, cfg);
        }
      })
      .catch(function (err) {
        if (window.console && console.warn) {
          console.warn("[NIKKA] Instagram feed unavailable:", err.message);
        }
        /* 失敗時はプレースホルダー（または直前のキャッシュ）を維持 */
      });
  }

  if (document.readyState === "complete") {
    initInstagram();
  } else {
    document.addEventListener("DOMContentLoaded", initInstagram);
  }
})();
