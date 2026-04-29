import './App.css';

// 定義點擊觸發的函式 (參考第 53、55 頁)
const changeText = (event) => {
  // 函式會接收到一個 event 參數
  console.log(event.target); 
  // 點擊後在原本文字後方加上 "被點了"
  event.target.innerText = event.target.innerText + "被點了";
};

function App() {
  // 定義樣式物件 (參考第 47 頁)
  const styleArgument = { 
    fontSize: '100px', 
    color: 'red',
    cursor: 'pointer' // 額外加入這行可以讓滑鼠移上去時顯示手指符號
  };

  return (
    <div className="App">
      {/* 
        1. 使用 style 屬性套用自訂樣式
        2. 使用 onClick 屬性連動 changeText 函式 (參考第 53 頁)
      */}
      <h1 style={styleArgument} onClick={changeText}>
        hello CGU!!
      </h1>
    </div>
  );
}

export default App;