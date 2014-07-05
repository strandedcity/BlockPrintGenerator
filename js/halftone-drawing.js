function drawHalftoneGridThreeJS(grid) {
    if (THREE === "undefined") {
        throw new Error("We'll need three.js to get started.");
    } else if (grid === "undefined") {
        throw new Error("Can't draw nothing. Missing halftone grid.");
    }

    var displayWidth = window.innerWidth;
    var displayHeight = window.innerHeight;

    // renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true }   );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColorHex( 0xffffff, 1 );
    document.body.appendChild(renderer.domElement);

    // camera
    var camera = new THREE.OrthographicCamera( displayWidth / - 2, displayWidth / 2, displayHeight / 2, displayHeight / - 2, 1, 1000 );;
    camera.position.z = 500;

    // scene
    var scene = new THREE.Scene();

    var blackDotMaterial = new THREE.MeshBasicMaterial({
        color: 'black'
    });

    // come up with a cell size such that it will just barely aspect-fit on the screen as it is right now:
    var cellSize = ~~Math.min(displayWidth/grid[0].length, displayHeight/grid.length);
    var maxSize = cellSize / 1.42;

    for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 1) {
                continue;
            }
            var circle = new THREE.Mesh(new THREE.CircleGeometry((1-grid[y][x])*maxSize,15),blackDotMaterial);
            circle.position = new THREE.Vector3( x*cellSize, y*cellSize, 0);
            scene.add(circle);
        }
    }

    camera.position.x = cellSize * grid[0].length / 2;
    camera.position.y = cellSize * grid.length / 2;

    renderer.render(scene,camera);
}