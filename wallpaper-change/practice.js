

var fs = require('fs'),
    http = require('http'),
    https = require('https');
var Stream = require('stream').Transform;
var fetch = require('node-fetch')

// Download image from URL function 
async function downloadImageFromURL (url, filename) {
    var client = http;
    if (url.toString().indexOf("https") === 0) {
        client = https;
    }
    str = '';
    const resp = await fetch(url);
    var image_url = resp.url
    console.log('image', image_url)
    
    client.request(image_url, function(response) {
        var data = new Stream();
        response.on('data', function(chunk) {
            data.push(chunk);
        });
        response.on('end', function() {
            // fs.writeFileSync('/tmp/'+filename, data.read());
            fs.writeFileSync(filename, data.read());
        });
    }).end();
};


// Set wallpaper  
var setWallpaper = (image) => {
    // using ELECTRON
}



const imagePaths = [
    "https://source.unsplash.com/random/1600x900",
    // "https://images.unsplash.com/photo-1662534069358-31d1f40ddf58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
];

// Calling function to download
for(let i=0; i<imagePaths.length; i++){
    imageSrc = imagePaths[i]
    filename = `image+${i}.jpeg`
    downloadImageFromURL(imageSrc, filename);
}

// var path = require('path')
// var iconPath = path.join('/home/hussain','Downloads/image-gallery-2.png')
// console.log(iconPath)   // /home/hussain/Downloads/image-gallery-2.png
