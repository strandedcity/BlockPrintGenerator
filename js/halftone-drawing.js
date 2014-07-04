function drawHalftoneGridThreeJS(grid) {
    if (THREE === "undefined") {
        throw new Error("We'll need three.js to get started.");
    } else if (grid === "undefined") {
        throw new Error("Can't draw nothing. Missing halftone grid.");
    }

    var displayWidth = window.innerWidth;
    var displayHeight = window.innerHeight;

    // renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // camera
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1000;

    // scene
    var scene = new THREE.Scene();

    var blackDotMaterial = new THREE.MeshBasicMaterial({
        color: 'red'
    });

    for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid[y].length; x++) {
            var circle = new THREE.Mesh(new THREE.CircleGeometry(grid[y][x]*20,20),blackDotMaterial);
            circle.position = new THREE.Vector3( x*20-displayWidth/2, y*20-displayHeight/2, 0);
            scene.add(circle);
        }
    }

    renderer.render(scene,camera);
}