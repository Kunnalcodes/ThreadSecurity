import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './HoloScene.css';

function HoloScene() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        /* ─── Renderer ─── */
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        /* ─── Scene & Camera ─── */
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000d1a, 0.08);

        const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 200);
        camera.position.set(0, 0.5, 5.5);

        /* ─── Colours ─── */
        const CYAN = new THREE.Color(0x00f5ff);
        const TEAL = new THREE.Color(0x00c8b8);
        const DEEP_CYAN = new THREE.Color(0x004466);
        const GLOW_BLUE = new THREE.Color(0x0080ff);
        const WHITE_HOL = new THREE.Color(0xccffff);

        /* ─── Lighting ─── */
        scene.add(new THREE.AmbientLight(0x001133, 2));
        const cyLight = new THREE.PointLight(CYAN, 8, 12);
        cyLight.position.set(0, 1, 2);
        scene.add(cyLight);
        const tealLight = new THREE.PointLight(TEAL, 5, 10);
        tealLight.position.set(-2, -1, 1);
        scene.add(tealLight);
        const blueLight = new THREE.PointLight(GLOW_BLUE, 4, 14);
        blueLight.position.set(3, 2, -2);
        scene.add(blueLight);

        /* ─── Orbit Controls ─── */
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.4;
        controls.minPolarAngle = Math.PI * 0.25;
        controls.maxPolarAngle = Math.PI * 0.75;

        /* ─── Resize ─── */
        const onResize = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight || 520;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', onResize);

        /* ─── Helpers ─── */
        function makeRing(radius, tubeR, color, opacity = 0.9) {
            const geo = new THREE.TorusGeometry(radius, tubeR, 4, 128);
            const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide });
            return new THREE.Mesh(geo, mat);
        }

        function makeDashedOrbitRing(radius, color, opacity = 0.5) {
            const pts = [];
            for (let i = 0; i <= 128; i++) {
                const a = (i / 128) * Math.PI * 2;
                pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
            }
            const geo = new THREE.BufferGeometry().setFromPoints(pts);
            const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
            return new THREE.LineLoop(geo, mat);
        }

        function makeHexOutline(size, color, opacity = 0.8) {
            const pts = [];
            for (let i = 0; i <= 6; i++) {
                const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
                pts.push(new THREE.Vector3(Math.cos(a) * size, Math.sin(a) * size, 0));
            }
            const geo = new THREE.BufferGeometry().setFromPoints(pts);
            const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
            return new THREE.Line(geo, mat);
        }

        function holoMat(color, opacity = 0.85, wire = false) {
            return new THREE.MeshStandardMaterial({
                color, emissive: color, emissiveIntensity: 0.7,
                transparent: true, opacity, wireframe: wire,
                side: THREE.DoubleSide, roughness: 0.0, metalness: 0.0,
            });
        }

        /* ─── Master Pivot ─── */
        const masterPivot = new THREE.Group();
        scene.add(masterPivot);

        /* ─── Particle Grid ─── */
        const count = 1200;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 18;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
        }
        const pgeo = new THREE.BufferGeometry();
        pgeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        scene.add(new THREE.Points(pgeo, new THREE.PointsMaterial({ color: CYAN, size: 0.04, transparent: true, opacity: 0.55 })));

        /* ─── Scan Lines ─── */
        const scanGroup = new THREE.Group();
        const lineMat = new THREE.LineBasicMaterial({ color: DEEP_CYAN, transparent: true, opacity: 0.22 });
        for (let x = -5; x <= 5; x += 0.5) {
            scanGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, -2.5, -5), new THREE.Vector3(x, -2.5, 5)]), lineMat));
        }
        for (let z = -5; z <= 5; z += 0.5) {
            scanGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-5, -2.5, z), new THREE.Vector3(5, -2.5, z)]), lineMat));
        }
        scene.add(scanGroup);

        /* ─── Orbit Rings ─── */
        const orbitGroup = new THREE.Group();
        masterPivot.add(orbitGroup);
        const orbit1 = makeDashedOrbitRing(2.0, CYAN, 0.35);
        orbit1.rotation.x = THREE.MathUtils.degToRad(65);
        orbitGroup.add(orbit1);
        const orbit2 = makeDashedOrbitRing(2.4, TEAL, 0.25);
        orbit2.rotation.x = THREE.MathUtils.degToRad(20);
        orbit2.rotation.z = THREE.MathUtils.degToRad(45);
        orbitGroup.add(orbit2);
        const orbit3 = makeDashedOrbitRing(2.8, GLOW_BLUE, 0.2);
        orbit3.rotation.x = THREE.MathUtils.degToRad(80);
        orbit3.rotation.y = THREE.MathUtils.degToRad(30);
        orbitGroup.add(orbit3);
        const equatRing = makeRing(1.65, 0.008, CYAN, 0.7);
        equatRing.rotation.x = Math.PI / 2;
        masterPivot.add(equatRing);

        /* ─── Holographic Shield ─── */
        const shieldPivot = new THREE.Group();
        masterPivot.add(shieldPivot);

        function buildHexShield() {
            const g = new THREE.Group();
            [1.3, 1.55, 1.8, 2.05].forEach((s, i) => g.add(makeHexOutline(s, i === 0 ? CYAN : TEAL, [0.9, 0.65, 0.45, 0.25][i])));
            const hexShape = new THREE.Shape();
            for (let i = 0; i < 6; i++) {
                const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
                if (i === 0) hexShape.moveTo(Math.cos(a) * 1.28, Math.sin(a) * 1.28);
                else hexShape.lineTo(Math.cos(a) * 1.28, Math.sin(a) * 1.28);
            }
            hexShape.closePath();
            g.add(new THREE.Mesh(new THREE.ShapeGeometry(hexShape), new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.06, side: THREE.DoubleSide })));
            [1.32, 1.58, 1.85].forEach((r, i) => g.add(makeRing(r, 0.01, CYAN, 0.5 - i * 0.12)));
            return g;
        }

        const shield = buildHexShield();
        shield.rotation.x = THREE.MathUtils.degToRad(-30);
        shield.rotation.y = THREE.MathUtils.degToRad(15);
        shieldPivot.add(shield);

        /* ─── Lock Hologram ─── */
        function buildLockHologram() {
            const g = new THREE.Group();
            g.add(new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.28, 0.08, 2, 2, 1), holoMat(CYAN, 0.55)));
            const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.03, 8, 24, Math.PI), holoMat(TEAL, 0.7));
            shackle.position.y = 0.19;
            g.add(shackle);
            const khS = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), holoMat(CYAN, 0.9));
            khS.position.set(0, 0.02, 0.05);
            g.add(khS);
            const khC = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.1, 6), holoMat(CYAN, 0.85));
            khC.position.set(0, -0.04, 0.05);
            g.add(khC);
            g.add(new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.32, 0.1), new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.4 })));
            const scanBeam = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.015), new THREE.MeshBasicMaterial({ color: WHITE_HOL, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
            g.userData.scanBeam = scanBeam;
            g.add(scanBeam);
            return g;
        }

        const lockPivot = new THREE.Group();
        shield.add(lockPivot);
        const lock = buildLockHologram();
        lock.position.set(0, 0, 0.12);
        lock.scale.setScalar(0.6);
        lockPivot.add(lock);

        /* ─── Data Sphere ─── */
        const dataSphere = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.38, 1),
            new THREE.MeshBasicMaterial({ color: TEAL, wireframe: true, transparent: true, opacity: 0.75 })
        );
        dataSphere.userData = { orbitR: 2.15, orbitSpeed: 0.7, orbitAngle: Math.PI * 0.6, orbitTilt: THREE.MathUtils.degToRad(40) };
        masterPivot.add(dataSphere);

        /* ─── Hex Node Orbs ─── */
        const hexNodePivot = new THREE.Group();
        masterPivot.add(hexNodePivot);
        for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2;
            const orb = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 0), holoMat(i % 2 === 0 ? CYAN : TEAL, 0.8));
            orb.position.set(Math.cos(a) * 1.9, Math.sin(a) * 0.4, Math.sin(a) * 1.7);
            hexNodePivot.add(orb);
        }

        /* ─── Earth GLB ─── */
        const earthPivot = new THREE.Group();
        masterPivot.add(earthPivot);

        let earthModel = null;

        const scanPlaneMat = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false });
        const scanPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.04), scanPlaneMat);
        earthPivot.add(scanPlane);

        earthPivot.add(new THREE.Mesh(new THREE.SphereGeometry(1.35, 32, 32), new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.04, side: THREE.BackSide, depthWrite: false })));
        earthPivot.add(new THREE.Mesh(new THREE.SphereGeometry(1.15, 32, 32), new THREE.MeshBasicMaterial({ color: TEAL, transparent: true, opacity: 0.06, side: THREE.BackSide, depthWrite: false })));

        const loader = new GLTFLoader();
        loader.load(
            'assets/3d/earth_hologram.glb',
            (gltf) => {
                const model = gltf.scene;
                earthModel = model;
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const scl = 2.0 / Math.max(size.x, size.y, size.z);
                model.scale.setScalar(scl);
                const centre = box.getCenter(new THREE.Vector3());
                model.position.sub(centre.multiplyScalar(scl));
                model.traverse((child) => {
                    if (!child.isMesh) return;
                    const prevMap = child.material?.map || null;
                    child.material = new THREE.MeshStandardMaterial({ color: CYAN, emissive: TEAL, emissiveIntensity: 0.6, transparent: true, opacity: 0.82, roughness: 0.1, metalness: 0.3, map: prevMap });
                });
                const wireClone = model.clone(true);
                wireClone.traverse((child) => {
                    if (!child.isMesh) return;
                    child.material = new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.12 });
                });
                earthPivot.add(wireClone);
                earthPivot.add(model);
            },
            undefined,
            () => {
                const fallback = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), holoMat(CYAN, 0.7, true));
                earthPivot.add(fallback);
            }
        );

        /* ─── Animate ─── */
        const clock = new THREE.Clock();
        let animId;

        function animate() {
            animId = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const elapsed = clock.getElapsedTime();

            if (earthModel) earthModel.rotation.y += 0.003;
            scanPlane.position.y = Math.sin(elapsed * 1.2) * 0.9;
            if (lock.userData.scanBeam) lock.userData.scanBeam.position.y = Math.sin(elapsed * 3) * 0.13;
            shieldPivot.rotation.y = elapsed * 0.25;
            shieldPivot.rotation.x = Math.sin(elapsed * 0.18) * 0.12;
            lock.scale.setScalar(0.6 + Math.sin(elapsed * 2.5) * 0.03);

            dataSphere.userData.orbitAngle += delta * dataSphere.userData.orbitSpeed;
            const { orbitAngle: da, orbitR: dr, orbitTilt: dt } = dataSphere.userData;
            dataSphere.position.set(Math.cos(da) * dr, Math.sin(da) * Math.sin(dt) * dr * 0.6, Math.sin(da) * Math.cos(dt) * dr);
            dataSphere.rotation.x += delta * 1.2;
            dataSphere.rotation.y += delta * 0.8;

            hexNodePivot.rotation.y += delta * 0.4;
            hexNodePivot.rotation.x = Math.sin(elapsed * 0.3) * 0.15;
            orbit1.rotation.z += delta * 0.06;
            orbit2.rotation.z -= delta * 0.04;
            orbit3.rotation.y += delta * 0.05;
            cyLight.intensity = 7 + Math.sin(elapsed * 2.1) * 2;
            masterPivot.rotation.y += delta * 0.08;

            controls.update();
            renderer.render(scene, camera);
        }
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
        };
    }, []);

    return (
        <div className="hero-visual">
            <canvas ref={canvasRef} id="holo-canvas" />
            <span className="earth-hint">🔒 Drag to explore</span>
        </div>
    );
}

export default HoloScene;
