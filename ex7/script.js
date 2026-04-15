var container = document.getElementById('container'); 

        window.onload = function() { 
            container.textContent = add_new_chars(3); // 初始化產生 3 個字 [cite: 127, 193]
        }; 

        function add_new_chars(x) { 
            var n = Math.floor(Math.random() * x) + 1;
            var str = ''; 
            for (let i = 0; i < n; i++) { 
                str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
            }
            return str; 
        }

        window.addEventListener("keyup", function(e) { 
            var currentText = container.textContent;
            var firstone = currentText.substring(0, 1); // 取得第一個字 [cite: 146, 218]

            if (e.key === firstone) { 
                // 如果按對了，消掉第一個字 [cite: 151, 220]
                container.textContent = currentText.substring(1); 
                // 只有按對時才增加新字元，維持遊戲平衡 [cite: 160, 237]
                container.textContent += add_new_chars(3); 
            } else {
                // 如果按錯了，可以選擇增加懲罰字元（投影片 ex#7 的練習要求） [cite: 167, 221]
                console.log("按錯了！");
            }
        });
