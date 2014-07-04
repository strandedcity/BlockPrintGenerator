if (THREE === "undefined") {
    throw new Error("We'll need three.js to get started.");
}

function intensitiesForImageWithGridSize(imgEl,gridSize){
    var canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height;

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);
    data = context.getImageData(0, 0, width, height);

    var y = 0;
    while (y*gridSize < height) {
        var x = 0;
        while (x*gridSize < width) {
            var rgb = pixelDensityAtCell(x,y,width,gridSize,data.data);
            console.log(x,y,rgb);
            x++;
        }
        y++;
    }

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
//    return {
//        r: ~~(cumulativeR / pixelCount),
//        g: ~~(cumulativeG / pixelCount),
//        b: ~~(cumulativeB / pixelCount)
//    }
    return (cumulativeB + cumulativeG + cumulativeR) / (pixelCount*3*255);
}