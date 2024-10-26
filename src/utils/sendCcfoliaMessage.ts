import { messageFormQuery, submitFormQuery } from "./documentQueries";

function clearFormValue(element: HTMLInputElement|HTMLTextAreaElement) :void{ // フォームのinput要素等の既存の入力内容を削除する関数
    const valueLength: number = element.value.length
    element.focus()
    document.execCommand("selectAll", false);
    document.execCommand("removeFormat", false);
}

function addFormValue(element: HTMLInputElement|HTMLTextAreaElement, value: string): void{ // フォームのinput要素等に内容を入力する関数
    element.focus()
    document.execCommand('insertText', false, value);
}

function overrideFormValue(element: HTMLInputElement|HTMLTextAreaElement, value: string): void{ // フォームのinput要素等の内容を上書きする関数
    clearFormValue(element)
    addFormValue(element, value)
}

function clickTheButton(element: HTMLButtonElement){ // 特定のbutton要素をプログラムで押下する関数
    element.click()
}

export function changeMessage(messageText: string, isDo: boolean = true): boolean { // メッセージを変更する関数
    const messageElm = document.querySelector<HTMLTextAreaElement>(messageFormQuery) as HTMLTextAreaElement;
    if (messageElm?.value !== messageText) {
        if(isDo) overrideFormValue(messageElm, messageText);
        return true;
    }else{
        return false;
    }
}

export function clickSubmitButton(){ // 送信ボタンを押下して送信する関数
    const submitButton: HTMLButtonElement = document.querySelector(submitFormQuery) as HTMLButtonElement
    clickTheButton(submitButton)
}

export function sendMessage(messageText: string){ // ダブルクリックでメッセージを送信する関数
    const isDone: boolean = changeMessage(messageText);
    if(!isDone) clickSubmitButton();
}


async function sendMessagesWithDelay(messages: string[], interval: number = 100){ // 間隔を空けて複数メッセージを送信する関数
    for(const message of messages){
        changeMessage(message)
        clickSubmitButton()
        await new Promise((resolve) => setTimeout(resolve, interval));// 指定された時間だけ待機する
    }
    changeMessage("")
}

// ココフォリアのメッセージを送信する関数
export function sendCcfoliaMessage(messages: string[]): boolean{
    if(messages.length > 0){
        const isChangedMessage: boolean = changeMessage(messages[0]) // メッセージを変更する
        if(!isChangedMessage){
            // メッセージに変更なければ送信する
            if(messages.length === 1){
                // メッセージが1つのとき
                clickSubmitButton()
            }else{
                // メッセージが複数のとき、
                sendMessagesWithDelay(messages)
            }
        }
        return !isChangedMessage
    }
}