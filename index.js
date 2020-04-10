var elements = require('./elements.json');
var fs = require('fs');
var request = require('request');

function downloadFromOriginImages() {
    for (let i = 0; i < elements.elements.length; i++) {
        var element = elements.elements[i];
        let newName = element.name.toLowerCase().replace(/\s/g, '-')
        if (!element.image) {
            continue;
        }

        var download = function (uri, filename, callback) {
            request.head(uri, function (err, res, body) {
                if ('image/jpeg' !== res.headers['content-type']) {
                    return;
                }
                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);

                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
        };

        download(element.image, 'images/' + newName.replace(/\//g, '') + '.jpg', function () {
            console.log('done');
        });
    }
}

// downloadFromOriginImages();

for (let i = 0; i < elements.elements.length; i++) {
    var element = elements.elements[i];
    let newName = element.name.toLowerCase().replace(/\s/g, '-')

    var download = function (uri, filename, callback) {
        request({
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:74.0) Gecko/20100101 Firefox/74.0'
            },
            url: uri
        }).pipe(fs.createWriteStream(filename)).on('close', callback);
    };

    download('https://xebialabs.com/wp-content/uploads/files/tool-chest/' + newName + '.jpg', 'origin/' + newName.replace(/\//g, '') + '.jpg', function () {
        console.log('done');
    });
}
