function drawHalftoneGridThreeJS(grid) {
    if (THREE === "undefined") {
        throw new Error("We'll need three.js to get started.");
    } else if (grid === "undefined") {
        throw new Error("Can't draw nothing. Missing halftone grid.");
    }

    var threeScene = setupThreeScene();
    var scene = threeScene.scene,
        camera = threeScene.camera,
        renderer = threeScene.renderer,
        displayHeight = threeScene.height,
        displayWidth = threeScene.width;


    var blackDotMaterial = new THREE.MeshBasicMaterial({color: 'black'});

    // come up with a cell size such that it will just barely aspect-fit on the screen as it is right now:
    var cellSize = ~~Math.min(displayWidth/grid[0].length, displayHeight/grid.length);
    var maxSize = cellSize / 1.42;

    for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 1 || grid[y][x] === 0 || isNaN(grid[y][x])) {
                continue;
            }
            var circle = new THREE.Mesh(new THREE.CircleGeometry((1-grid[y][x])*maxSize,15),blackDotMaterial);
            circle.position = new THREE.Vector3( x*cellSize, displayHeight-y*cellSize, 0);
            scene.add(circle);
        }
    }

    camera.position.x = cellSize * grid[0].length / 2;
    camera.position.y = cellSize * grid.length / 2;

    renderer.render(scene,camera);
}

function createBlockPlate(grid,longDimension){
        var threeScene = setupThreeScene();
    var scene = threeScene.scene,
        camera = threeScene.camera,
        renderer = threeScene.renderer;
//        displayHeight = threeScene.height,
//        displayWidth = threeScene.width;

    var displayWidth = longDimension;
    var displayHeight = 4.0;

    // come up with a cell size such that it will just barely aspect-fit on the screen as it is right now:
    var cellSize = Math.min(displayWidth/grid[0].length, displayHeight/grid.length);
    var maxSize = cellSize / 1.42;
console.log(cellSize);
    var blackDotMaterial = new THREE.MeshBasicMaterial({color: 'black'});
    var basePlate = new THREE.Geometry();//new THREE.BoxGeometry( 1.0, 1.0, 0.125, 1,1,1 );

    for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 1 || grid[y][x] === 0 || isNaN(grid[y][x])) {
                continue;
            }
            var radius = (1-grid[y][x])*maxSize;
            var cyl = new THREE.CylinderGeometry(radius,radius,0.25,8);
            var cylMesh = new THREE.Mesh(cyl, blackDotMaterial);

            cylMesh.position = new THREE.Vector3( x*cellSize, displayHeight-y*cellSize, 0);
            cylMesh.rotation.x = Math.PI/2;
            // see http://stackoverflow.com/questions/24353756/migrating-geometryutils-merge-to-geometry-merge
//            scene.add(new THREE.Mesh(cyl,blackDotMaterial));
            cylMesh.updateMatrix();
            basePlate.merge(cyl,cylMesh.matrix);
        }
        console.log('done with row...');
    }

    var fullMesh = new THREE.Mesh(basePlate,blackDotMaterial);
    scene.add(fullMesh);

//    var finalMesh = baseCSG.toMesh(new THREE.MeshNormalMaterial());


    camera.position.z = 50;
//    camera.position.x = 3;
//    camera.position.y = 2;
    renderer.render(scene,camera);

    stlFromGeometry( basePlate, {download:true, useObjectPosition:false} );
}

function setupThreeScene(){

    var displayWidth = 6;
    var displayHeight =4;

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

    return {
        scene: scene,
        camera: camera,
        width: displayWidth,
        height: displayHeight,
        renderer: renderer
    };
}