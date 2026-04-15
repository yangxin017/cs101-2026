// 設定 API 網址 [cite: 859, 1028]
var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

// 1. 建立 XMLHttpRequest 物件 [cite: 865, 886]
var xhr = new XMLHttpRequest();

// 2. 開啟連結並傳送請求 [cite: 866, 867, 887, 888]
xhr.open('GET', openUrl, true);
xhr.send();

// 3. 監聽狀態變化 [cite: 868, 889]
xhr.onreadystatechange = function() {
    // 狀態為 4 且 status 為 200 表示成功完成 [cite: 870, 891]
    if (this.readyState == 4 && this.status == 200) {
        // 解析 JSON 資料 [cite: 876, 891, 957]
        var dataset = JSON.parse(this.responseText);
        addNewData(dataset); // 呼叫更新表格函式 [cite: 876, 960]
    }
};

// 4. 將資料新增至表格的函式 [cite: 965]
function addNewData(dataset) {
    var myTable = document.getElementById("csie"); // 取得表格 [cite: 973]
    
    // 遍歷所有資料 [cite: 973]
    dataset.forEach(function(data, index) {
        var row = myTable.insertRow(-1); // 在最後一行新增 [cite: 975]
        
        // 根據 JSON 結構填入內容 [cite: 976, 977, 978, 983, 988, 991]
        row.insertCell(0).innerHTML = data['title']; // 名稱
        row.insertCell(1).innerHTML = data['showInfo'][0]['location']; // 地點
        row.insertCell(2).innerHTML = data['showInfo'][0]['price']; // 票價
    });
}