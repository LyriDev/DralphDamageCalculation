import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App"

function addPortalRoot(): HTMLDivElement{ // ポータルを追加するためのルート要素を作成する関数
    // ポータルを追加するためのルート要素を作成
    const portalRoot = document.createElement('div');
    portalRoot.id = 'portal-root-DamageCalculator';
    portalRoot.style.position = "relative";
    portalRoot.style.zIndex = "1500";
    document.body.appendChild(portalRoot);
    return portalRoot;
}

async function renderApp(portal: HTMLDivElement): Promise<void>{ // ポータルにAppコンポーネントを追加する関数
    // 「マイキャラクター一覧」の要素の前に拡張チャットパレットボタンを追加する
    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        portal
    );
}

window.onload = async function(){
    const portal: HTMLDivElement = addPortalRoot();
    renderApp(portal);
};