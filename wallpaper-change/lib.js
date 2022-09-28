const {spawn} = require('child_process');
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

// To download image from Unsplash
function downloadImage() {
    var url = "https://source.unsplash.com/random/1600x900"
    var filename = "image-0.jpeg"
    downloadImageFromURL(url, filename)
}

// To call Python
function callPython(function_name){
    const childPython = spawn('python', ['changeWallpaper.py', function_name]);

    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    childPython.stdout.on('close', (code) => {
        console.log(`child process exited with code: ${code}`);
    });
}

module.exports = {
  changeCurrentWallpaper: function() {
    console.log("change current wallpaper")
    downloadImage();
    arg = "Cool"
    callPython('set')
  },

  openSettings: function() {
    console.log("Open Settings")
  },
}