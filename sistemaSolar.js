let scene, camera, renderer;

function init() {
    // Escena
    scene = new THREE.Scene();

    // Cámara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 50, 100);

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Luz
    const light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 0, 0);
    scene.add(light);

    // Crear el Sol y los planetas
    createSolarSystem();

    // Animación
    animate();
}

function createSolarSystem() {
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    const planets = [
        { name: 'Mercury', radius: 0.5, distance: 10, color: 0x8B8B83 },
        { name: 'Venus', radius: 1.2, distance: 20, color: 0xE6E6FA },
        { name: 'Earth', radius: 1.3, distance: 30, color: 0x0000FF },
        { name: 'Mars', radius: 0.7, distance: 40, color: 0xFF0000 },
        { name: 'Jupiter', radius: 2.5, distance: 50, color: 0xFFD700 },
        { name: 'Saturn', radius: 2.2, distance: 60, color: 0xF4A460 },
        { name: 'Uranus', radius: 1.8, distance: 70, color: 0x40E0D0 },
        { name: 'Neptune', radius: 1.7, distance: 80, color: 0x000080 }
    ];

    planets.forEach(planet => {
        const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: planet.color });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = planet.distance;
        scene.add(sphere);
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function getPlanetPositions() {
    axios.get('https://api.le-systeme-solaire.net/rest/bodies/')
        .then(response => {
            const bodies = response.data.bodies;
            bodies.forEach(body => {
                console.log(body.englishName, body.semimajorAxis);
            });
        })
        .catch(error => {
            console.error('Error fetching planet positions:', error);
        });
}

window.onload = init;
