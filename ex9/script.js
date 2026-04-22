const apiKey = 'ca370d51a054836007519a00ff4ce59e'; // 講義提供的範例 Key

function getFlickrImages() {
    const listUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&per_page=10&format=json&nojsoncallback=1`;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', listUrl, true);
    xhr.onload = function () {
        if (this.status === 200) {
            var data = JSON.parse(this.responseText);
            var photos = data.photos.photo;
            
            // 清空舊內容
            document.getElementById("gallery").innerHTML = "";
            
            // 遍歷前幾張照片取得尺寸
            photos.forEach(photo => {
                getImageUrl(photo.id);
            });
        }
    };
    xhr.send();
}

function getImageUrl(photoId) {
    const sizeUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', sizeUrl, true);
    xhr.onload = function () {
        if (this.status === 200) {
            var sizeData = JSON.parse(this.responseText);
            // 取得 Medium 尺寸或第一個可用的尺寸
            var imgUrl = sizeData.sizes.size[4]?.source || sizeData.sizes.size[0].source;
            addImgToGallery(imgUrl);
        }
    };
    xhr.send();
}

function addImgToGallery(url) {
    var gal = document.getElementById("gallery");
    var img = document.createElement("img");
    img.setAttribute("src", url);
    gal.appendChild(img);
}