
import { Suspense, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
} from '@react-three/drei'
import * as THREE from 'three'
import MODEL_URL from '../assets/glb/sneakers_adidas_yellow__black.glb'
import './Hero.css'

const colors = [
  { id: 'stone', name: 'Stone', hex: '#e1d8c6' },
  { id: 'black', name: 'Graphite', hex: '#383838' },
  { id: 'sage', name: 'Sage', hex: '#66815d' },
  { id: 'terra', name: 'Terra', hex: '#b94f32' },
]

const colorToVector = (hex) => new THREE.Color(hex)

function SneakerModel({ activeColor }) {
  const { scene } = useGLTF(MODEL_URL)

  const model = useMemo(() => {
    const clone = scene.clone(true)

    clone.traverse((object) => {
      if (!object.isMesh) return

      object.castShadow = true
      object.receiveShadow = true

      const sourceMaterials = Array.isArray(object.material)
        ? object.material
        : [object.material]

      const clonedMaterials = sourceMaterials.map((sourceMaterial) => {
        const material = sourceMaterial.clone()

        material.metalness = 0.12
        material.roughness = 0.78

        material.onBeforeCompile = (shader) => {
          shader.uniforms.uTargetColor = {
            value: colorToVector('#e1d8c6'),
          }

          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <common>',
            `#include <common>
            uniform vec3 uTargetColor;

            vec3 sprintRgbToHsv(vec3 c) {
              vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
              vec4 p = mix(
                vec4(c.bg, K.wz),
                vec4(c.gb, K.xy),
                step(c.b, c.g)
              );
              vec4 q = mix(
                vec4(p.xyw, c.r),
                vec4(c.r, p.yzx),
                step(p.x, c.r)
              );
              float d = q.x - min(q.w, q.y);
              float e = 1.0e-10;

              return vec3(
                abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x
              );
            }`,
          )

          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <color_fragment>',
            `#include <color_fragment>

            // Analisa a cor do material/textura antes da iluminação final.
            vec3 sprintOriginal = diffuseColor.rgb;
            vec3 sprintHsv = sprintRgbToHsv(sprintOriginal);

            // Máscara para amarelos e amarelos alaranjados.
            float sprintHueDistance = abs(sprintHsv.x - 0.13);
            sprintHueDistance = min(
              sprintHueDistance,
              1.0 - sprintHueDistance
            );

            float sprintYellowMask =
              1.0 - smoothstep(0.025, 0.17, sprintHueDistance);

            sprintYellowMask *= smoothstep(
              0.12,
              0.35,
              sprintHsv.y
            );

            sprintYellowMask *= smoothstep(
              0.12,
              0.32,
              sprintHsv.z
            );

            // A cor escolhida substitui o amarelo.
            // O brilho original é preservado para manter o volume.
            float sprintBrightness = clamp(
              sprintHsv.z / 0.72,
              0.45,
              1.2
            );

            vec3 sprintNewColor = uTargetColor * sprintBrightness;

            diffuseColor.rgb = mix(
              sprintOriginal,
              sprintNewColor,
              clamp(sprintYellowMask, 0.0, 1.0)
            );`,
          )

          material.userData.shader = shader
        }

        material.customProgramCacheKey = () => 'sprint-recolor-v4'

        return material
      })

      object.material = Array.isArray(object.material)
        ? clonedMaterials
        : clonedMaterials[0]
    })

    const bounds = new THREE.Box3().setFromObject(clone)
    const size = bounds.getSize(new THREE.Vector3())
    const center = bounds.getCenter(new THREE.Vector3())
    const maxDimension = Math.max(size.x, size.y, size.z)
    const scale = 3.2 / maxDimension

    clone.scale.setScalar(scale)
    clone.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale,
    )

    return clone
  }, [scene])

  const selectedColor =
    colors.find((item) => item.id === activeColor) || colors[0]

  const targetColor = useMemo(
    () => colorToVector(selectedColor.hex),
    [selectedColor.hex],
  )

  model.traverse((object) => {
    if (!object.isMesh) return

    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material]

    materials.forEach((material) => {
      const shader = material.userData.shader

      if (shader?.uniforms?.uTargetColor) {
        shader.uniforms.uTargetColor.value.copy(targetColor)
      }
    })
  })

  return (
    <group rotation={[0.12, -0.55, -0.08]} position={[0, 0.05, 0]}>
      <primitive object={model} />
    </group>
  )
}

function ModelLoader() {
  return (
    <Html center>
      <div className="hero-model-loader">
        <span />
        Preparando o modelo
      </div>
    </Html>
  )
}

function SneakerScene({ activeColor }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{
        position: [4.5, 3.1, 6.5],
        fov: 34,
        near: 0.1,
        far: 100,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}
    >
      <Suspense fallback={<ModelLoader />}>
        <ambientLight intensity={0.8} />

        <directionalLight
          position={[4, 7, 5]}
          intensity={3.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <spotLight
          position={[-5, 5, 1]}
          intensity={65}
          angle={0.52}
          penumbra={1}
          distance={12}
          color="#fff0d9"
        />

        <pointLight
          position={[1, -1, -4]}
          intensity={14}
          distance={10}
          color="#c5b9a8"
        />

        <Environment preset="studio" />

        <SneakerModel activeColor={activeColor} />

        <ContactShadows
          position={[0, -1.45, 0]}
          opacity={0.48}
          scale={5}
          blur={2.8}
          far={3}
          resolution={512}
          color="#24211d"
        />

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 1.9}
          rotateSpeed={0.65}
        />
      </Suspense>
    </Canvas>
  )
}

export default function Hero({ onExplore }) {
  const [active, setActive] = useState('stone')

  const color = colors.find((item) => item.id === active) || colors[0]

  return (
    <section
      className={`hero-section hero-section--${active}`}
      id="lancamento"
    >
      <div className="hero-background-glow" />

      <div className="hero-copy">
        <span className="eyebrow">
          <span className="eyebrow-star">✳</span>
          COLEÇÃO 001 · DESIGN INDEPENDENTE
        </span>

        <h1>
          Seu ritmo.
          <br />
          <em>Seu caminho.</em>
        </h1>

        <p>
          Menos ruído. Mais movimento. Conheça o Velocity 001:
          design essencial para acompanhar a vida como ela acontece.
        </p>

        <div className="hero-price">
          <strong>R$ 599,90</strong>
          <span>ou 6x de R$ 99,98</span>
        </div>

        <button className="hero-cta" onClick={onExplore}>
          Conheça o lançamento <span>↗</span>
        </button>

        <div className="hero-colors">
          <div className="hero-colors-label">
            <small>ESCOLHA SUA COR</small>
            <strong>{color.name}</strong>
          </div>

          <div className="swatches">
            {colors.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Selecionar cor ${item.name}`}
                aria-pressed={active === item.id}
                title={`${item.name} — ${item.hex}`}
                className={`hero-swatch ${
                  active === item.id ? 'selected' : ''
                }`}
                style={{ '--swatch-color': item.hex }}
                onClick={() => setActive(item.id)}
              />
            ))}
          </div>
        </div>

        <div className="hero-copy-footnote">
          <span>01 / 04</span>
          <span>FEITO PARA ACOMPANHAR VOCÊ</span>
        </div>
      </div>

      <div className="hero-art">
        <div className="hero-art-top">
          <span>SPRINT ORIGINALS</span>
          <span>EST. 2026</span>
        </div>

        <div className="hero-art-halo" />

        <div className="hero-model-stage">
          <SneakerScene activeColor={active} />
        </div>

        <div className="hero-art-caption">
          <span className="hero-art-number">
            VELOCITY
            <strong>001</strong>
          </span>

          <span className="hero-art-description">
            FORM FOLLOWS FEELING
            <small>DESIGN IN MOTION</small>
          </span>
        </div>

        <span className="hero-drag-hint">
          <span>↔</span> ARRASTE PARA EXPLORAR
        </span>
      </div>

      <a className="hero-scroll" href="#colecao">
        ROLE PARA EXPLORAR <span>↓</span>
      </a>
    </section>
  )
}

useGLTF.preload(MODEL_URL)
