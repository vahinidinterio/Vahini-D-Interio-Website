import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { V } from "../utils/colors";

// Helper to get resolved color from CSS variable
const useResolvedColor = (cssVar) => {
    const [color, setColor] = useState("#C1A35D"); // Default fallback

    useEffect(() => {
        const updateColor = () => {
            const root = document.documentElement;
            const val = getComputedStyle(root).getPropertyValue(cssVar.replace("var(", "").replace(")", "")).trim();
            if (val) setColor(val);
        };

        updateColor();

        // Observer for class changes (theme toggle)
        const observer = new MutationObserver(updateColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, [cssVar]);

    return color;
};

const Particles = ({ count = 100 }) => {
    const mesh = useRef();
    const goldColor = useResolvedColor(V.gold);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            // Mouse interaction
            particle.mx += (state.mouse.x * 100 - particle.mx) * 0.1;
            particle.my += (state.mouse.y * 100 - particle.my) * 0.1;

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshPhongMaterial color={goldColor} emissive={goldColor} emissiveIntensity={0.5} transparent opacity={0.6} />
        </instancedMesh>
    );
};

const InteractiveBackground = () => {
    const goldColor = useResolvedColor(V.gold);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} color={goldColor} intensity={1} />
                <pointLight position={[-10, -10, -10]} color="#ffffff" intensity={0.5} />
                <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                    <Particles count={60} />
                </Float>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

export default InteractiveBackground;
