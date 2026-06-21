/**
 * NIKKA Opening Intro — 編集用コンテンツ設定
 * ---------------------------------------------------------------------------
 * イントロで表示するワード・画像・ロゴ文言は、このファイルだけ編集してください。
 * intro.js / index.html の HTML 初期値は起動時にここから同期されます。
 *
 * words[].text   … 英語（serif・大きく表示）
 * words[].sub    … 日本語サブ（小さく下に表示）
 * words[].accent … true でティール色＋イタリック
 *
 * photos.paths   … 空のまま = グラデーションのダミー枠
 *                  画像パスを並べると、浮遊枠に実写真が入ります（例: "assets/intro-01.jpg"）
 */
window.NIKKA_INTRO_CONFIG = {
  /* ----- フェーズ1: 浮遊コンセプトワード ----- */
  words: [
    { text: "Beauty", sub: "美", accent: true },
    { text: "Design", sub: "意匠" },
    { text: "Space", sub: "空間", accent: true },
    { text: "Technology", sub: "技術" },
    { text: "Creative", sub: "創造" },
    { text: "Future", sub: "未来", accent: true },
    { text: "Salon", sub: "美容" },
    { text: "Estate", sub: "不動産" },
    { text: "Craft", sub: "匠" },
    { text: "Light", sub: "光", accent: true }
  ],

  /* ----- フェーズ1: 浮遊写真（任意） ----- */
  /* paths が空 = グラデーションのダミー枠。画像パスを並べると浮遊枠に実写真が入ります。 */
  photos: {
    paths: [
      "assets/FLIC_img.png",
      "assets/GRACE_img.png",
      "assets/iixii_img.png",
      "assets/Somesyo_img.png",
      "assets/GRACE-LOGO.JPG",
      "assets/Somesyo-LOGO.png",
      "assets/LOGO-LIFE.png"
    ]
  },

  /* ----- フェーズ3: メインロゴ画像 ----- */
  logo: {
    src: "public/logo-nikka.png",
    alt: "日華 NIKKA CO.JP"
  },

  /* ----- フェーズ3: ロゴ画像未読込時のフォールバック ----- */
  fallback: {
    symbolText: "iixii",
    kanji: "日華",
    latin: "NIKKA CO.JP"
  }

  /* slots（浮遊位置 %）は intro.js 内 SLOTS を参照。通常は変更不要。 */
};
