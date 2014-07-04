if (THREE === "undefined") {
    throw new Error("We'll need three.js to get started.");
}

function intensitiesForImageWithGridSize(imgEl,gridSize){
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */alert('x');
        return defaultRGB;
    }

    var rgb = pixelDensityAtCell(0,0,width,gridSize,data.data);

    console.log(rgb);
//    length = data.data.length;
//
//
//
//    while ( (i += blockSize * 4) < length ) {
//        ++count;
//        rgb.r += data.data[i];
//        rgb.g += data.data[i+1];
//        rgb.b += data.data[i+2];
//    }
//
//    // ~~ used to floor values
//    rgb.r = ~~(rgb.r/count);
//    rgb.g = ~~(rgb.g/count);
//    rgb.b = ~~(rgb.b/count);
//
//    return rgb;

}

function pixelDensityAtCell(x,y,imageWidth,cellsize,data) {
    var a = 0, cumulativeR = 0, cumulativeG = 0, cumulativeB = 0, pixelCount = cellsize*cellsize;
    while ( a < cellsize) {
        var b = 0;
        while ( b < cellsize) {
            cumulativeR += data[x*cellsize + (y+a)*imageWidth + b];
            cumulativeG += data[x*cellsize + (y+a)*imageWidth + b + 1];
            cumulativeB += data[x*cellsize + (y+a)*imageWidth + b + 2];
            b++;
        }
        a++;
    }
    return {
        r: ~~(cumulativeR / pixelCount),
        g: ~~(cumulativeG / pixelCount),
        b: ~~(cumulativeB / pixelCount)
    }
}