const container = document.getElementById('container');

// 2. window.onload 時，亂數產生 0-2 個字元 
window.onload = function() {
    container.focus(); // 自動聚焦以接收鍵盤事件
    const initialCount = Math.floor(Math.random() * 3); // 產生 0, 1, 或 2
    for (let i = 0; i < initialCount; i++) {
        add_new_chars(1); 
    }
};

// 監聽 keyup 事件 
window.addEventListener("keyup", function(e) {
    console.log("按下的按鍵:", e.key);
    
    let currentStr = container.textContent;

    // 3. 打入字元和第一個字相等時，消除該字元 
    if (currentStr.length > 0 && e.key === currentStr[0]) {
        container.textContent = currentStr.substring(1);
    }

    // 4. keyup 時，隨機產生 1-3 個字元接在後面 
    const addCount = Math.floor(Math.random() * 3) + 1; // 產生 1, 2, 或 3
    add_new_chars(addCount);
});

// 輔助函式：亂數增加字元 [cite: 1683]
function add_new_chars(num) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let newStr = "";
    for (let i = 0; i < num; i++) {
        // 隨機選取 a-z 
        newStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    container.textContent += newStr;
}
