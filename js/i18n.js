(function () {
  "use strict";

  var STORAGE_KEY = "nikka-lang";
  var SUPPORTED = ["ja", "en", "zh"];

  var t = {
    ja: {
      meta: {
        title: "有限会社NIKKA",
        description:
          "有限会社NIKKA公式サイト。AIを駆使したWeb・デザインクリエイティブを核に、美容・不動産・店舗システムなど多様な事業を展開。",
      },
      logo: { ariaHome: "有限会社NIKKA ホーム", tagline: "Designing Happy Futures" },
      lang: { switcher: "言語を選択" },
      nav: {
        main: "メインナビゲーション",
        about: "About",
        businesses: "Businesses",
        news: "News",
        contact: "Contact",
      },
      hero: {
        eyebrow: "有限会社NIKKA",
        catchcopy:
          'AIと感性で、<br class="u-sp-only">次の価値を設計する。',
        lead:
          'NIKKAは人工知能を駆使し、Webサイト・デザインクリエイティブをはじめ、<br class="u-pc-only">美容から店舗システムまで多様な事業を展開。テクノロジーと北欧的ミニマリズムで、未来のビジネスを形にします。',
        ctaBusinesses: "事業を見る",
        ctaAbout: "会社概要",
      },
      about: {
        label: "About Us",
        title: "会社概要",
        lead:
          "有限会社NIKKAは、AIを核とした事業創造カンパニーです。Web・デザイン・店舗体験まで、テクノロジーの力でブランドと暮らしに新しい価値を届けます。",
        text:
          "美容、クリエイティブ制作、不動産管理、次世代店舗プラットフォーム——異なる領域を横断しながら事業を育てています。AIは効率と発想の両方を高め、人が向き合うべき本質的な仕事に集中できる環境をつくるパートナーです。北欧的な美学を骨格に、すべてのプロジェクトに一貫した品質を求めます。",
        dtCompany: "会社名",
        dtEnglish: "英文名",
        dtMission: "ミッション",
        dtVision: "ビジョン",
        dtBusiness: "事業内容",
        dtPhilosophy: "理念",
        companyName: "有限会社NIKKA",
        englishName: "NIKKA Industry Co., Ltd.",
        mission: "AIの力で、事業と体験の可能性を広げる。",
        vision: "テクノロジーとデザインが調和した、持続可能な事業の未来をつくる。",
        business:
          "Web・デザインクリエイティブ / 美容事業 / 不動産管理 / AI連携店舗システム",
        philosophy: "AIで広げ、人の手で仕上げる。余白を大切に、本質だけを残す。",
      },
      businesses: {
        label: "Our Businesses",
        title: "事業内容",
        b1Title: "Beauty Business",
        b1Subtitle: "美容事業",
        b1Desc:
          "サロン運営を中心に、内側から輝く美しさを提案。上質な空間と確かな技術で、日常に小さな贅沢を。",
        b1Link1Meta: "美容室",
        b1Link2Meta: "エステサロン",
        b2Title: "Design & Creative",
        b2Subtitle: "Web・デザインクリエイティブ",
        b2Desc:
          "コーポレートサイト、ブランディング、UI/UXまで。AIを活用した制作フローで、北欧的な視点とスピードを両立したクリエイティブを提供します。",
        b2LinkMeta: "未来へつながるデザイン",
        b3Title: "Real Estate Management",
        b3Subtitle: "不動産管理事業",
        b3Desc:
          "物件の価値を見極め、丁寧に管理。オーナー様と入居者様、双方にとって心地よい関係を築きます。",
        b3LinkLabel: "未来のくらし相談室 FLIC",
        b3LinkMeta: "暮らしのお金サポート",
        b4Badge: "Next Project",
        b4Title: "ShopCrew",
        b4Subtitle: "最先端店舗システム",
        b4Desc:
          "AIを組み込んだ次世代店舗プラットフォーム。スタッフ、お客様、経営をひとつの体験としてつなぎ、店舗運営の未来を再定義します。",
        b4Status: "Coming Soon",
        visitSite: "サイトを見る",
      },
      news: {
        label: "News & Press",
        title: "最新情報",
        note: 'Instagram <span class="hashtag">#nikka_official_news</span> から自動取得予定',
        feedAria: "Instagram ニュースフィード（プレースホルダー）",
        caption:
          "写真と日付が整然と並ぶミニマルグリッド。API 連携後はここに Instagram 投稿が自動表示されます。",
      },
      footer: {
        groupSites: "グループサイト",
        copyright: "有限会社NIKKA All Rights Reserved.",
      },
      common: { companyName: "有限会社NIKKA" },
      contact: {
        meta: {
          title: "お問い合わせ | 有限会社NIKKA",
          description:
            "有限会社NIKKAへのお問い合わせ。Web・デザイン・事業提携など、お気軽にご連絡ください。",
        },
        label: "Contact",
        title: "お問い合わせ",
        lead:
          "Web制作・デザイン・事業提携など、お気軽にお問い合わせください。内容を確認のうえ、担当よりご連絡いたします。",
        form: {
          name: "お名前",
          namePlaceholder: "山田 太郎",
          email: "メールアドレス",
          emailPlaceholder: "example@email.com",
          company: "会社名・団体名",
          companyPlaceholder: "有限会社NIKKA",
          category: "お問い合わせ種別",
          categoryDefault: "選択してください",
          catGeneral: "一般的なお問い合わせ",
          catWeb: "Web・デザイン制作",
          catBeauty: "美容事業について",
          catPartnership: "業務提携・協業",
          catOther: "その他",
          message: "お問い合わせ内容",
          messagePlaceholder: "お問い合わせ内容をご記入ください",
          privacy: "個人情報の取り扱いに同意する",
          required: "必須",
          optional: "任意",
          submit: "送信する",
          error: "入力内容をご確認ください。",
        },
        aside: {
          title: "ご連絡について",
          text: "通常、2〜3営業日以内にご返信いたします。お急ぎの場合は、その旨をお問い合わせ内容にご記載ください。",
        },
        success: {
          title: "送信が完了しました",
          text: "お問い合わせありがとうございます。内容を確認のうえ、担当よりご連絡いたします。",
          home: "トップへ戻る",
        },
      },
      error404: {
        meta: {
          title: "404 Not Found | 有限会社NIKKA",
          description: "ページが見つかりませんでした。有限会社NIKKA公式サイト",
        },
        code: "404",
        title: "ページが見つかりません",
        message:
          "お探しのページは移動または削除された可能性があります。URLをご確認いただくか、トップページからお探しください。",
        ctaHome: "トップへ戻る",
        ctaContact: "お問い合わせ",
      },
    },
    en: {
      meta: {
        title: "NIKKA Co., Ltd.",
        description:
          "Official site of NIKKA Co., Ltd. — leveraging AI for web design, creative services, beauty, real estate, and next-generation retail platforms.",
      },
      logo: { ariaHome: "NIKKA Co., Ltd. Home", tagline: "Designing Happy Futures" },
      nav: {
        main: "Main navigation",
        about: "About",
        businesses: "Businesses",
        news: "News",
        contact: "Contact",
      },
      lang: { switcher: "Select language" },
      hero: {
        eyebrow: "NIKKA Co., Ltd.",
        catchcopy:
          'Designing tomorrow\'s value<br class="u-sp-only">with AI and craft.',
        lead:
          'NIKKA harnesses artificial intelligence across web design, creative production, beauty, and store systems.<br class="u-pc-only">We blend technology with Nordic minimalism to shape the next generation of business.',
        ctaBusinesses: "Our Businesses",
        ctaAbout: "About Us",
      },
      about: {
        label: "About Us",
        title: "Company Overview",
        lead:
          "NIKKA Co., Ltd. is a venture studio powered by AI — delivering new value to brands and daily life through web, design, and retail experiences.",
        text:
          "From beauty and creative production to property management and next-gen store platforms, we grow businesses across diverse fields. AI elevates both efficiency and imagination, freeing people to focus on work that truly matters. Guided by Nordic aesthetics, we pursue consistent quality in every project.",
        dtCompany: "Company",
        dtEnglish: "English Name",
        dtMission: "Mission",
        dtVision: "Vision",
        dtBusiness: "Services",
        dtPhilosophy: "Philosophy",
        companyName: "NIKKA Co., Ltd.",
        englishName: "NIKKA Industry Co., Ltd.",
        mission: "Expand what business and experience can become — with AI.",
        vision: "Build a sustainable future where technology and design work in harmony.",
        business:
          "Web & Creative / Beauty / Real Estate / AI-Powered Store Systems",
        philosophy: "Amplify with AI. Refine by hand. Keep only what matters.",
      },
      businesses: {
        label: "Our Businesses",
        title: "What We Do",
        b1Title: "Beauty Business",
        b1Subtitle: "Salon & Wellness",
        b1Desc:
          "Centered on salon operations, we propose beauty that radiates from within — refined spaces and skilled care for everyday indulgence.",
        b1Link1Meta: "Hair Salon",
        b1Link2Meta: "Esthetic Salon",
        b2Title: "Design & Creative",
        b2Subtitle: "Web & Creative",
        b2Desc:
          "Corporate websites, branding, and UI/UX — AI-accelerated workflows paired with Nordic sensibility for creative that is both fast and refined.",
        b2LinkMeta: "Design for the future",
        b3Title: "Real Estate Management",
        b3Subtitle: "Property Management",
        b3Desc:
          "We identify property value and manage with care, building comfortable relationships for owners and tenants alike.",
        b3LinkLabel: "FLIC Lifestyle Consultation",
        b3LinkMeta: "Personal finance support",
        b4Badge: "Next Project",
        b4Title: "ShopCrew",
        b4Subtitle: "Next-Gen Store Platform",
        b4Desc:
          "A next-generation store platform built with AI — connecting staff, customers, and management into one seamless experience.",
        b4Status: "Coming Soon",
        visitSite: "Visit Site",
      },
      news: {
        label: "News & Press",
        title: "Latest Updates",
        note: 'Auto-import from Instagram <span class="hashtag">#nikka_official_news</span> planned',
        feedAria: "Instagram news feed (placeholder)",
        caption:
          "A minimal grid of photos and dates. Instagram posts will appear here after API integration.",
      },
      footer: {
        groupSites: "Group Sites",
        copyright: "NIKKA Co., Ltd. All Rights Reserved.",
      },
      common: { companyName: "NIKKA Co., Ltd." },
      contact: {
        meta: {
          title: "Contact | NIKKA Co., Ltd.",
          description:
            "Contact NIKKA Co., Ltd. — inquiries about web design, creative services, partnerships, and more.",
        },
        label: "Contact",
        title: "Contact Us",
        lead:
          "For web production, design, partnerships, and other inquiries — we'll review your message and get back to you shortly.",
        form: {
          name: "Name",
          namePlaceholder: "John Smith",
          email: "Email",
          emailPlaceholder: "example@email.com",
          company: "Company / Organization",
          companyPlaceholder: "NIKKA Co., Ltd.",
          category: "Inquiry Type",
          categoryDefault: "Please select",
          catGeneral: "General inquiry",
          catWeb: "Web & design",
          catBeauty: "Beauty business",
          catPartnership: "Partnership",
          catOther: "Other",
          message: "Message",
          messagePlaceholder: "Please enter your message",
          privacy: "I agree to the handling of personal information",
          required: "Required",
          optional: "Optional",
          submit: "Send Message",
          error: "Please check your input.",
        },
        aside: {
          title: "Response Time",
          text: "We typically respond within 2–3 business days. For urgent matters, please note that in your message.",
        },
        success: {
          title: "Message Sent",
          text: "Thank you for your inquiry. We will review your message and contact you soon.",
          home: "Back to Home",
        },
      },
      error404: {
        meta: {
          title: "404 Not Found | NIKKA Co., Ltd.",
          description: "Page not found. NIKKA Co., Ltd. official website.",
        },
        code: "404",
        title: "Page Not Found",
        message:
          "The page you are looking for may have been moved or removed. Please check the URL or return to the homepage.",
        ctaHome: "Back to Home",
        ctaContact: "Contact Us",
      },
    },
    zh: {
      meta: {
        title: "有限会社日华 | NIKKA",
        description:
          "有限会社日华（NIKKA）官方网站。以AI驱动的网站与创意设计为核心，拓展美容、不动产及门店系统等多种事业。",
      },
      logo: { ariaHome: "有限会社日华 首页", tagline: "Designing Happy Futures" },
      nav: {
        main: "主导航",
        about: "About",
        businesses: "Businesses",
        news: "News",
        contact: "Contact",
      },
      lang: { switcher: "选择语言" },
      hero: {
        eyebrow: "有限会社日华",
        catchcopy:
          '以AI与感性，<br class="u-sp-only">设计下一代价值。',
        lead:
          'NIKKA运用人工智能，从网站与创意设计到美容、门店系统，<br class="u-pc-only">拓展多元事业。融合科技与北欧极简主义，塑造未来的商业形态。',
        ctaBusinesses: "了解业务",
        ctaAbout: "公司概况",
      },
      about: {
        label: "About Us",
        title: "公司概况",
        lead:
          "有限会社日华（NIKKA）是以AI为核心的事业创造公司。从Web、设计到门店体验，以科技之力为品牌与生活带来新价值。",
        text:
          "跨越美容、创意制作、不动产管理与下一代门店平台等领域培育事业。AI同时提升效率与创意，助力人们专注于真正重要的工作。以北欧美学为骨架，在所有项目中追求一贯的品质。",
        dtCompany: "公司名称",
        dtEnglish: "英文名称",
        dtMission: "使命",
        dtVision: "愿景",
        dtBusiness: "业务范围",
        dtPhilosophy: "理念",
        companyName: "有限会社日华",
        englishName: "NIKKA Industry Co., Ltd.",
        mission: "以AI之力，拓展事业与体验的可能性。",
        vision: "创造科技与设计和谐共存的可持续事业未来。",
        business: "Web·设计创意 / 美容事业 / 不动产管理 / AI联动门店系统",
        philosophy: "以AI拓展，以人手打磨。珍视留白，只留本质。",
      },
      businesses: {
        label: "Our Businesses",
        title: "事业内容",
        b1Title: "Beauty Business",
        b1Subtitle: "美容事业",
        b1Desc:
          "以沙龙运营为核心，倡导由内而外的美丽。以优质空间与精湛技艺，为日常增添小小奢华。",
        b1Link1Meta: "美发沙龙",
        b1Link2Meta: "美容沙龙",
        b2Title: "Design & Creative",
        b2Subtitle: "Web·设计创意",
        b2Desc:
          "涵盖企业网站、品牌与UI/UX。运用AI加速制作流程，兼顾北欧视角与效率，提供高品质创意服务。",
        b2LinkMeta: "面向未来的设计",
        b3Title: "Real Estate Management",
        b3Subtitle: "不动产管理事业",
        b3Desc:
          "精准判断物业价值，悉心管理。为业主与租户双方建立舒适的关系。",
        b3LinkLabel: "未来生活咨询室 FLIC",
        b3LinkMeta: "生活理财支持",
        b4Badge: "Next Project",
        b4Title: "ShopCrew",
        b4Subtitle: "尖端门店系统",
        b4Desc:
          "融入AI的下一代门店平台。将员工、顾客与经营连接为一体化体验，重新定义门店运营的未来。",
        b4Status: "Coming Soon",
        visitSite: "访问网站",
      },
      news: {
        label: "News & Press",
        title: "最新资讯",
        note: '计划从 Instagram <span class="hashtag">#nikka_official_news</span> 自动获取',
        feedAria: "Instagram 资讯动态（占位）",
        caption:
          "照片与日期整齐排列的极简网格。API 对接后将在此自动显示 Instagram 投稿。",
      },
      footer: {
        groupSites: "集团网站",
        copyright: "有限会社日华 版权所有。",
      },
      common: { companyName: "有限会社日华" },
      contact: {
        meta: {
          title: "联系我们 | 有限会社日华",
          description: "联系有限会社日华（NIKKA）——网站、设计、业务合作等咨询。",
        },
        label: "Contact",
        title: "联系我们",
        lead: "网站制作、设计、业务合作等，欢迎随时咨询。确认内容后，负责人将与您联系。",
        form: {
          name: "姓名",
          namePlaceholder: "张三",
          email: "电子邮箱",
          emailPlaceholder: "example@email.com",
          company: "公司 / 团体名称",
          companyPlaceholder: "有限会社日华",
          category: "咨询类型",
          categoryDefault: "请选择",
          catGeneral: "一般咨询",
          catWeb: "网站·设计制作",
          catBeauty: "美容事业相关",
          catPartnership: "业务合作",
          catOther: "其他",
          message: "咨询内容",
          messagePlaceholder: "请输入咨询内容",
          privacy: "同意个人信息的处理方式",
          required: "必填",
          optional: "选填",
          submit: "发送",
          error: "请确认输入内容。",
        },
        aside: {
          title: "回复时间",
          text: "通常在2〜3个工作日内回复。如有紧急事项，请在咨询内容中注明。",
        },
        success: {
          title: "发送完成",
          text: "感谢您的咨询。确认内容后，负责人将与您联系。",
          home: "返回首页",
        },
      },
      error404: {
        meta: {
          title: "404 Not Found | 有限会社日华",
          description: "未找到页面。有限会社日华（NIKKA）官方网站",
        },
        code: "404",
        title: "未找到页面",
        message: "您访问的页面可能已移动或删除。请检查网址，或从首页重新查找。",
        ctaHome: "返回首页",
        ctaContact: "联系我们",
      },
    },
  };

  function resolve(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : null;
    }, obj);
  }

  function detectLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;

    var browser = (navigator.language || "ja").toLowerCase();
    if (browser.indexOf("zh") === 0) return "zh";
    if (browser.indexOf("en") === 0) return "en";
    return "ja";
  }

  var LANG_LABELS = { ja: "JA", en: "EN", zh: "中文" };

  function closeLangMenu() {
    var menu = document.querySelector(".lang-switcher__menu");
    var toggle = document.querySelector(".lang-switcher__toggle");
    if (menu) menu.hidden = true;
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function openLangMenu() {
    var menu = document.querySelector(".lang-switcher__menu");
    var toggle = document.querySelector(".lang-switcher__toggle");
    if (menu) menu.hidden = false;
    if (toggle) toggle.setAttribute("aria-expanded", "true");
  }

  function toggleLangMenu() {
    var menu = document.querySelector(".lang-switcher__menu");
    if (!menu) return;
    if (menu.hidden) openLangMenu();
    else closeLangMenu();
  }

  function updateLangSwitcherUI(lang) {
    var current = document.querySelector(".lang-switcher__current");
    if (current) current.textContent = LANG_LABELS[lang] || lang.toUpperCase();

    document.querySelectorAll(".lang-switcher__option").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    closeLangMenu();
  }

  function initLangSwitcher() {
    var toggle = document.querySelector(".lang-switcher__toggle");
    var switcher = document.querySelector(".lang-switcher");

    if (toggle) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleLangMenu();
      });
    }

    document.querySelectorAll(".lang-switcher__option").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var next = btn.getAttribute("data-lang");
        if (SUPPORTED.indexOf(next) !== -1) applyLang(next);
      });
    });

    if (switcher) {
      switcher.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }

    document.addEventListener("click", closeLangMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLangMenu();
    });
  }

  function applyLang(lang) {
    var strings = t[lang];
    if (!strings) return;

    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;

    var page = document.body.getAttribute("data-page");
    var meta = strings.meta;
    if (page && strings[page] && strings[page].meta) {
      meta = strings[page].meta;
    }

    document.title = meta.title;

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && meta.description) {
      metaDesc.setAttribute("content", meta.description);
    }

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = resolve(strings, el.getAttribute("data-i18n"));
      if (value !== null) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var value = resolve(strings, el.getAttribute("data-i18n-html"));
      if (value !== null) el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr")
        .split(";")
        .forEach(function (pair) {
          var parts = pair.split(":");
          var attr = parts[0].trim();
          var key = parts[1].trim();
          var value = resolve(strings, key);
          if (value !== null) el.setAttribute(attr, value);
        });
    });

    updateLangSwitcherUI(lang);

    localStorage.setItem(STORAGE_KEY, lang);

    if (typeof window.initHeaderRoll === "function") {
      window.initHeaderRoll();
    } else if (typeof window.initHeaderRollScroll === "function") {
      window.initHeaderRollScroll();
    }
  }

  function init() {
    var lang = detectLang();
    applyLang(lang);
    initLangSwitcher();
  }

  /* defer スクリプトは interactive の段階で順次実行されるため、
     後続の header-roll.js より先に init するとロール演出が初期化されない */
  if (document.readyState === "complete") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
