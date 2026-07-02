import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

// Coordenadas lat/lon de cada ciudad Erasmus (lat, lon)
const CITY_COORDS = [
  { name: "Bolonia",    slug: "bolonia",    flag: "🇮🇹", lat: 44.49,  lon: 11.34  },
  { name: "Milán",      slug: "milan",      flag: "🇮🇹", lat: 45.46,  lon: 9.19   },
  { name: "Roma",       slug: "roma",       flag: "🇮🇹", lat: 41.90,  lon: 12.49  },
  { name: "Turín",      slug: "turin",      flag: "🇮🇹", lat: 45.07,  lon: 7.69   },
  { name: "Cracovia",   slug: "cracovia",   flag: "🇵🇱", lat: 50.06,  lon: 19.94  },
  { name: "Varsovia",   slug: "varsovia",   flag: "🇵🇱", lat: 52.23,  lon: 21.01  },
  { name: "Budapest",   slug: "budapest",   flag: "🇭🇺", lat: 47.50,  lon: 19.04  },
  { name: "Praga",      slug: "praga",      flag: "🇨🇿", lat: 50.08,  lon: 14.44  },
  { name: "La Haya",    slug: "la-haya",    flag: "🇳🇱", lat: 52.07,  lon: 4.30   },
  { name: "Rotterdam",  slug: "rotterdam",  flag: "🇳🇱", lat: 51.92,  lon: 4.48   },
  { name: "Múnich",     slug: "munich",     flag: "🇩🇪", lat: 48.14,  lon: 11.58  },
  { name: "Berlín",     slug: "berlin",     flag: "🇩🇪", lat: 52.52,  lon: 13.40  },
  { name: "Lisboa",     slug: "lisboa",     flag: "🇵🇹", lat: 38.72,  lon: -9.14  },
  { name: "Oporto",     slug: "oporto",     flag: "🇵🇹", lat: 41.16,  lon: -8.63  },
  { name: "París",      slug: "paris",      flag: "🇫🇷", lat: 48.86,  lon: 2.35   },
  { name: "Londres",    slug: "londres",    flag: "🇬🇧", lat: 51.51,  lon: -0.13  },
  { name: "Ámsterdam",  slug: "amsterdam",  flag: "🇳🇱", lat: 52.37,  lon: 4.90   },
  { name: "Viena",      slug: "viena",      flag: "🇦🇹", lat: 48.21,  lon: 16.37  },
  { name: "Rosenheim",  slug: "rosenheim",  flag: "🇩🇪", lat: 47.86,  lon: 12.12  },
  { name: "Bruselas",   slug: "bruselas",   flag: "🇧🇪", lat: 50.85,  lon: 4.35   },
];

// Convierte lat/lon a vector 3D en la esfera
function latLonToVec3(lat, lon, radius = 1) {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function Globe3D({ onCityHover }) {
  const mountRef  = useRef(null);
  const sceneRef  = useRef(null);
  const navigate  = useNavigate();
  const [tooltip, setTooltip] = useState(null); // { name, flag, x, y }
  const isDragging   = useRef(false);
  const prevMouse    = useRef({ x: 0, y: 0 });
  const globeGroup   = useRef(null);
  const autoRotate   = useRef(true);
  const autoTimer    = useRef(null);
  const markersRef   = useRef([]);
  const raycaster    = useRef(new THREE.Raycaster());
  const mouseVec     = useRef(new THREE.Vector2());
  const rendererRef  = useRef(null);
  const cameraRef    = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    // ── SCENE ──────────────────────────────────────────────
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // ── CAMERA ─────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 0, 2.85);
    cameraRef.current = camera;

    // ── RENDERER ───────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── LIGHTS ─────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0x7ec8f5, 2.2);
    sun.position.set(-4, 3, 5);
    scene.add(sun);

    const rimLight = new THREE.DirectionalLight(0x14B8A6, 0.6);
    rimLight.position.set(4, -2, -3);
    scene.add(rimLight);

    // ── GROUP (para rotar el globo) ─────────────────────────
    const group = new THREE.Group();
    globeGroup.current = group;
    scene.add(group);

    // ── GLOBE SPHERE ───────────────────────────────────────
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64);

    // Textura procedural: degradado oceano + tierra
    const canvas2d = document.createElement("canvas");
    canvas2d.width  = 2048;
    canvas2d.height = 1024;
    const ctx = canvas2d.getContext("2d");

    // Fondo oceano
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    oceanGrad.addColorStop(0,   "#0C2340");
    oceanGrad.addColorStop(0.4, "#0F3460");
    oceanGrad.addColorStop(1,   "#0D5C6E");
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 2048, 1024);

    // Continentes simplificados (Europa + África + Asia en colores sólidos)
    ctx.fillStyle = "rgba(20,80,60,0.55)";
    // Europa
    ctx.beginPath();
    ctx.ellipse(1170, 320, 130, 100, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(1100, 280, 60, 45, 0.3, 0, Math.PI * 2);
    ctx.fill();
    // Escandinavia
    ctx.beginPath();
    ctx.ellipse(1145, 220, 30, 70, 0.1, 0, Math.PI * 2);
    ctx.fill();
    // Península Ibérica
    ctx.beginPath();
    ctx.ellipse(1065, 360, 50, 45, 0, 0, Math.PI * 2);
    ctx.fill();
    // Italia
    ctx.beginPath();
    ctx.ellipse(1180, 370, 18, 55, 0.2, 0, Math.PI * 2);
    ctx.fill();
    // África
    ctx.beginPath();
    ctx.ellipse(1160, 600, 130, 180, 0, 0, Math.PI * 2);
    ctx.fill();
    // Asia
    ctx.beginPath();
    ctx.ellipse(1420, 320, 280, 150, 0, 0, Math.PI * 2);
    ctx.fill();
    // América
    ctx.fillStyle = "rgba(20,80,50,0.5)";
    ctx.beginPath();
    ctx.ellipse(460, 360, 100, 200, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(490, 640, 70, 160, 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Grid de latitud/longitud muy suave
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 12; i++) {
      const x = (i / 12) * 2048;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke();
    }
    for (let j = 0; j <= 6; j++) {
      const y = (j / 6) * 1024;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(2048, y); ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas2d);

    const sphereMat = new THREE.MeshPhongMaterial({
      map: tex,
      shininess: 18,
      specular: new THREE.Color(0x1a5080),
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(sphere);

    // ── ATMOSPHERE GLOW ────────────────────────────────────
    const atmGeo = new THREE.SphereGeometry(1.065, 64, 64);
    const atmMat = new THREE.MeshPhongMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.08,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(atmGeo, atmMat);
    scene.add(atmosphere); // fuera del grupo para que no rote

    // Halo exterior
    const haloGeo = new THREE.SphereGeometry(1.12, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    scene.add(halo);

    // ── CITY MARKERS ───────────────────────────────────────
    const markerObjs = [];

    CITY_COORDS.forEach((city) => {
      const pos = latLonToVec3(city.lat, city.lon, 1.015);

      // Dot
      const dotGeo = new THREE.SphereGeometry(0.018, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9 });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      dot.userData = { city };
      group.add(dot);

      // Ring (halo del marcador)
      const ringGeo = new THREE.RingGeometry(0.024, 0.032, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x14B8A6,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      // Orientar el ring perpendicular al radio (mirando al centro)
      ring.lookAt(0, 0, 0);
      ring.rotateX(Math.PI / 2);
      group.add(ring);

      markerObjs.push({ dot, ring, city });
    });

    markersRef.current = markerObjs;

    // Rotar el globo para que Europa quede centrada al inicio
    // lon=10 => centro de Europa
    group.rotation.y = -(10 + 180) * (Math.PI / 180);
    group.rotation.x = 0.18; // leve inclinación

    // ── ANIMATE ────────────────────────────────────────────
    let hoveredCity = null;

    function animate() {
      animFrameRef.current = requestAnimationFrame(animate);

      // Auto-rotate suave
      if (autoRotate.current && !isDragging.current) {
        group.rotation.y += 0.0018;
      }

      // Pulsar rings
      const t = Date.now() * 0.002;
      markerObjs.forEach(({ ring }, i) => {
        ring.material.opacity = 0.4 + 0.35 * Math.sin(t + i * 0.8);
        const s = 1 + 0.15 * Math.sin(t * 1.3 + i * 0.6);
        ring.scale.setScalar(s);
      });

      // Raycasting para hover
      raycaster.current.setFromCamera(mouseVec.current, camera);
      const dots = markerObjs.map(m => m.dot);
      const hits  = raycaster.current.intersectObjects(dots);

      if (hits.length > 0) {
        const hit  = hits[0];
        const city = hit.object.userData.city;

        // Cambiar cursor
        renderer.domElement.style.cursor = "pointer";

        // Highlight
        hit.object.material.color.set(0x14B8A6);
        hit.object.scale.setScalar(1.8);

        // Proyectar posición a pantalla
        const worldPos = hit.object.getWorldPosition(new THREE.Vector3());
        worldPos.project(camera);
        const rect = el.getBoundingClientRect();
        const sx = ((worldPos.x + 1) / 2) * rect.width;
        const sy = ((-worldPos.y + 1) / 2) * rect.height;

        setTooltip({ name: city.name, flag: city.flag, x: sx, y: sy });
        hoveredCity = hit.object;
      } else {
        renderer.domElement.style.cursor = "grab";
        if (hoveredCity) {
          hoveredCity.material.color.set(0x0ea5e9);
          hoveredCity.scale.setScalar(1);
          hoveredCity = null;
        }
        setTooltip(null);
      }

      // Restaurar no-hovered
      markerObjs.forEach(({ dot }) => {
        if (dot !== hoveredCity) {
          dot.material.color.set(0x0ea5e9);
          dot.scale.setScalar(1);
        }
      });

      renderer.render(scene, camera);
    }
    animate();

    // ── EVENTS: DRAG to rotate ─────────────────────────────
    const onPointerDown = (e) => {
      isDragging.current = true;
      autoRotate.current = false;
      clearTimeout(autoTimer.current);
      prevMouse.current = { x: e.clientX, y: e.clientY };
      renderer.domElement.style.cursor = "grabbing";
    };

    const onPointerMove = (e) => {
      // Actualizar mouse para raycasting
      const rect = el.getBoundingClientRect();
      mouseVec.current.x =  ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
      mouseVec.current.y = -((e.clientY - rect.top)   / rect.height) * 2 + 1;

      if (!isDragging.current) return;

      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;

      group.rotation.y += dx * 0.008;
      group.rotation.x += dy * 0.008;
      // Limitar inclinación
      group.rotation.x = Math.max(-0.8, Math.min(0.8, group.rotation.x));

      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      renderer.domElement.style.cursor = "grab";
      // Reanudar auto-rotación tras 2.5s sin interacción
      autoTimer.current = setTimeout(() => {
        autoRotate.current = true;
      }, 2500);
    };

    const onPointerLeave = () => {
      isDragging.current = false;
      mouseVec.current.set(-9999, -9999); // fuera del frustum
      renderer.domElement.style.cursor = "grab";
      autoTimer.current = setTimeout(() => {
        autoRotate.current = true;
      }, 2500);
    };

    // Click en ciudad
    const onClick = (e) => {
      raycaster.current.setFromCamera(mouseVec.current, camera);
      const dots = markerObjs.map(m => m.dot);
      const hits  = raycaster.current.intersectObjects(dots);
      if (hits.length > 0) {
        const city = hits[0].object.userData.city;
        navigate(`/city/${city.slug}`);
      }
    };

    renderer.domElement.style.cursor = "grab";
    renderer.domElement.addEventListener("pointerdown",  onPointerDown);
    window.addEventListener("pointermove",  onPointerMove);
    window.addEventListener("pointerup",    onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
    renderer.domElement.addEventListener("click",        onClick);

    // Touch support
    const onTouchStart = (e) => {
      const t = e.touches[0];
      isDragging.current = true;
      autoRotate.current = false;
      clearTimeout(autoTimer.current);
      prevMouse.current = { x: t.clientX, y: t.clientY };
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      const dx = t.clientX - prevMouse.current.x;
      const dy = t.clientY - prevMouse.current.y;
      group.rotation.y += dx * 0.008;
      group.rotation.x += dy * 0.008;
      group.rotation.x = Math.max(-0.8, Math.min(0.8, group.rotation.x));
      prevMouse.current = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = () => {
      isDragging.current = false;
      autoTimer.current = setTimeout(() => { autoRotate.current = true; }, 2500);
    };
    renderer.domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    renderer.domElement.addEventListener("touchmove",  onTouchMove,  { passive: false });
    renderer.domElement.addEventListener("touchend",   onTouchEnd);

    // ── RESIZE ─────────────────────────────────────────────
    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── CLEANUP ────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(autoTimer.current);
      renderer.domElement.removeEventListener("pointerdown",  onPointerDown);
      window.removeEventListener("pointermove",  onPointerMove);
      window.removeEventListener("pointerup",    onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      renderer.domElement.removeEventListener("click",        onClick);
      renderer.domElement.removeEventListener("touchstart", onTouchStart);
      renderer.domElement.removeEventListener("touchmove",  onTouchMove);
      renderer.domElement.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [navigate]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: "absolute",
          left: tooltip.x,
          top:  tooltip.y - 52,
          transform: "translateX(-50%)",
          background: "rgba(10,20,40,0.93)",
          border: "1px solid rgba(14,165,233,0.5)",
          borderRadius: 10,
          padding: "7px 14px",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex: 10,
          backdropFilter: "blur(8px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          transition: "opacity 0.15s",
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "DM Sans, sans-serif" }}>
            {tooltip.flag} {tooltip.name}
          </span>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2, textAlign: "center" }}>
            Clic para explorar →
          </div>
        </div>
      )}

      {/* Hint drag */}
      <div style={{
        position: "absolute", bottom: 12, left: "50%",
        transform: "translateX(-50%)",
        fontSize: 11, color: "rgba(255,255,255,0.3)",
        fontFamily: "DM Sans, sans-serif",
        pointerEvents: "none",
        letterSpacing: "0.5px",
      }}>
        Arrastra para rotar · Clic en ciudad para explorar
      </div>
    </div>
  );
}
