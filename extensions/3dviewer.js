addNode("3dplane", {
    alias: ["3D Plane", "plane", "displace", "displacement", "depth", "3d plane"],
    inputs: ["Displacement"],
    outputs: [],
    func: function (displacement) {
        this.displacement = displacement;
        return [];
    },
    init: function () {
        let self = this;
        var canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        canvas.style.display = "none";
        self.append(canvas);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
        
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(1024, 1024);
        renderer.domElement.style.width = "512px";
        renderer.domElement.style.height = "512px";
        this.append(renderer.domElement);

        const geometry = new THREE.PlaneGeometry( 8, 8, 200, 200 );
        const material = new THREE.MeshStandardMaterial( { flatShading: true, color: 0xffffff, roughness: 0.5, metalness: 0.0, side: THREE.DoubleSide } );
        const plane = new THREE.Mesh( geometry, material );
        plane.rotation.x = -90;
        plane.position.y = 2;
        scene.add( plane );
        const light = new THREE.AmbientLight( 0x707070 );
        scene.add( light );
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 4.0 );
        directionalLight.position.x = 8;
        scene.add( directionalLight );

        camera.position.z = 5;
        camera.position.y = 8;
        camera.rotation.x = -0.8;

        var renderBtn = document.createElement("div");
        renderBtn.classList.add("btn");
        renderBtn.style.display = "block";
        renderBtn.style.float = "right";
        renderBtn.innerText = "Render";
        this.append(renderBtn);

        var textureUrl = null;


        renderBtn.addEventListener("click", function () {
            if (flags.benchmarking) {
                var start = performance.now();
            }
            window.rentex.rx = 0;
            window.rentex.ry = 0;

            var graph = compileGraph(self);
            graph.calculate(true);
            var recompiled = recompileGraph(graph);

            rentex.width = canvas.width;
            rentex.height = canvas.height;

            var ctx = canvas.getContext("2d");
            var imageData = ctx.createImageData(canvas.width, canvas.height);
            var data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                rentex.rx = (i / 4) % canvas.width;
                rentex.ry = Math.floor(i / 4 / canvas.height);
                recompiled();
                data[i] = self.displacement;
                data[i + 3] = 255;
            }
            ctx.putImageData(imageData, 0, 0);
            if (flags.benchmarking) {
                console.log("Rendered image with graph in " + (performance.now() - start).toFixed(2) + "ms");
            }
            soundEffect("chime");
            self.dragListeners.forEach((func) => {
                func();
            });
            if (textureUrl) {
                URL.revokeObjectURL(textureUrl);
            }
            canvas.toBlob(blob => {
                textureUrl = URL.createObjectURL(blob);
                if (plane.material.displacementMap) {
                    plane.material.displacementMap.dispose();
                }
                
                plane.material.displacementMap = new THREE.TextureLoader().load(textureUrl, function (texture) {
                    plane.material.displacementMap = texture;
                    texture.needsUpdate=true;
                    plane.material.needsUpdate=true;
                });
                plane.material.displacementScale = 1.0;
            });
        });
        function animate() {
            plane.rotation.z += 0.001;
        
            renderer.render( scene, camera );

            requestAnimationFrame( animate );
        }
        animate();
    },
    doc: `View heightmaps within flow. (Use x and y nodes from canvas for the render)`,
});