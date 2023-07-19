/* ココフォリアページの要素のクエリの文字列 */

// 入力フォーム
const formQuery: string = "#root > div > div.MuiDrawer-root > div > div > div > form";

// メッセージ入力フォームの名前欄
export const nameFormQuery: string = `${formQuery} > div:nth-child(2) > div:nth-child(1) > div > input`;

// メッセージ入力フォームの送信ボタン
export const submitFormQuery: string = `${formQuery} > div:nth-child(2) > button:nth-of-type(3)`;

// メッセージ入力フォームのメッセージ欄
export const messageFormQuery: string = `${formQuery} > div:nth-child(3) textarea`;

// 「ルームチャット」タブ(メッセージ一覧)
export const roomChatQuery: string = "#root > div > div.MuiDrawer-root.MuiDrawer-docked > div > div > ul > div:nth-child(1) > div";
export const messageColumnQuery: string = `${roomChatQuery} > div`;