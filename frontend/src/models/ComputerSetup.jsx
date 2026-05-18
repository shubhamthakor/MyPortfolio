import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

// Glowing screen texture
function makeScreenTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 320
  const ctx = canvas.getContext('2d')

  // Dark bg
  ctx.fillStyle = '#050510'
  ctx.fillRect(0, 0, 512, 320)

  // Code lines
  const colors = ['#7c3aed', '#06b6d4', '#ec4899', '#a855f7', '#10b981', '#f59e0b']
  const lines = [
    'const shubham = {',
    "  name: 'Shubham Thakor',",
    "  role: 'MERN Developer',",
    "  skills: ['React', 'Node', 'Three.js'],",
    "  cgpa: 8.80,",
    '  passionate: true',
    '};',
    '',
    'function buildAmazingApps() {',
    '  return shubham.skills.map(',
    "    skill => `${skill} 🚀`",
    '  );',
    '}',
  ]

  ctx.font = '14px JetBrains Mono, monospace'
  lines.forEach((line, i) => {
    const col = colors[i % colors.length]
    ctx.fillStyle = col
    ctx.fillText(line, 20, 30 + i * 22)
  })

  // Scanlines
  for (let y = 0; y < 320; y += 3) {
    ctx.fillStyle = 'rgba(0,0,0,0.08)'
    ctx.fillRect(0, y, 512, 1)
  }

  // Glow overlay
  const g = ctx.createRadialGradient(256, 160, 0, 256, 160, 256)
  g.addColorStop(0, 'rgba(124,58,237,0.1)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 512, 320)

  return new THREE.CanvasTexture(canvas)
}

// Desk wood texture
function makeDeskTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#3d2410'
  ctx.fillRect(0, 0, 256, 128)
  for (let i = 0; i < 30; i++) {
    ctx.beginPath()
    ctx.moveTo(0, Math.random() * 128)
    ctx.lineTo(256, Math.random() * 128)
    ctx.strokeStyle = `rgba(${80 + Math.random() * 40},${40 + Math.random() * 20},${10 + Math.random() * 10},0.3)`
    ctx.lineWidth = 1 + Math.random() * 2
    ctx.stroke()
  }
  return new THREE.CanvasTexture(canvas)
}

export function ComputerSetup3D() {
  const groupRef = useRef()
  const screenGlowRef = useRef()
  const light1Ref = useRef()
  const light2Ref = useRef()

  const screenTex = useMemo(() => makeScreenTexture(), [])
  const deskTex = useMemo(() => makeDeskTexture(), [])

  useFrame((state) => {
    if (!groupRef.current) return
    // Gentle floating
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08

    // Screen glow pulse
    if (screenGlowRef.current) {
      screenGlowRef.current.intensity = 1.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.4
    }
    if (light1Ref.current) {
      light1Ref.current.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
    if (light2Ref.current) {
      light2Ref.current.intensity = 0.6 + Math.sin(state.clock.elapsedTime * 1.2 + 1) * 0.2
    }
  })

  const BLUE = '#06b6d4'
  const PURPLE = '#7c3aed'

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* === DESK === */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[5.5, 0.12, 2.2]} />
        <meshStandardMaterial map={deskTex} roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Desk legs */}
      {[[-2.3, -0.6], [2.3, -0.6], [-2.3, 0.6], [2.3, 0.6]].map(([x, z], i) => (
        <mesh key={i} position={[x, -1.85, z]}>
          <boxGeometry args={[0.08, 1.4, 0.08]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}

      {/* === MONITOR STAND === */}
      <mesh position={[0, -0.85, -0.1]}>
        <boxGeometry args={[0.08, 0.45, 0.08]} />
        <meshStandardMaterial color="#0f0f1a" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, -1.12, -0.1]}>
        <boxGeometry args={[0.55, 0.06, 0.35]} />
        <meshStandardMaterial color="#0f0f1a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* === MONITOR FRAME === */}
      <mesh position={[0, 0.08, -0.12]}>
        <boxGeometry args={[2.8, 1.75, 0.09]} />
        <meshStandardMaterial color="#0a0a15" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0.08, -0.07]}>
        <planeGeometry args={[2.55, 1.55]} />
        <meshStandardMaterial map={screenTex} emissiveMap={screenTex} emissive="#ffffff" emissiveIntensity={0.6} />
      </mesh>

      {/* Screen glow light */}
      <pointLight ref={screenGlowRef} position={[0, 0.08, 0.5]} intensity={1.5} color={PURPLE} distance={3} />

      {/* Monitor edge glow strip */}
      <mesh position={[0, -0.79, -0.12]}>
        <boxGeometry args={[2.82, 0.04, 0.1]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={3} />
      </mesh>

      {/* === KEYBOARD === */}
      <mesh position={[0, -1.13, 0.65]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[1.8, 0.06, 0.6]} />
        <meshStandardMaterial color="#0d0d1f" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Keys hint rows */}
      {[0, 1, 2, 3].map(row => (
        <mesh key={row} position={[0, -1.095, 0.42 + row * 0.13]} rotation={[-0.05, 0, 0]}>
          <boxGeometry args={[1.72, 0.01, 0.09]} />
          <meshStandardMaterial color="#1a1a3a" emissive={PURPLE} emissiveIntensity={0.2} />
        </mesh>
      ))}
      {/* Keyboard underglow */}
      <pointLight ref={light1Ref} position={[0, -1.18, 0.65]} intensity={0.8} color={PURPLE} distance={1.5} />

      {/* === MOUSE === */}
      <mesh position={[1.15, -1.12, 0.65]} rotation={[0, 0, 0]}>
        <capsuleGeometry args={[0.07, 0.2, 8, 16]} />
        <meshStandardMaterial color="#0d0d1f" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[1.15, -1.07, 0.65]}>
        <boxGeometry args={[0.12, 0.01, 0.01]} />
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2} />
      </mesh>

      {/* === LEFT SPEAKER === */}
      <mesh position={[-1.75, -0.85, -0.1]}>
        <boxGeometry args={[0.3, 0.65, 0.25]} />
        <meshStandardMaterial color="#090915" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Speaker grille */}
      {[0, 1, 2].map(i => (
        <mesh key={i} position={[-1.75, -0.72 + i * 0.15, 0.03]}>
          <boxGeometry args={[0.22, 0.03, 0.01]} />
          <meshStandardMaterial color="#1a1a30" roughness={0.8} />
        </mesh>
      ))}
      <pointLight ref={light2Ref} position={[-1.75, -1.1, 0.05]} intensity={0.6} color={BLUE} distance={1} />
      <mesh position={[-1.75, -1.1, 0.03]}>
        <circleGeometry args={[0.05, 16]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={3} />
      </mesh>

      {/* === RIGHT SPEAKER === */}
      <mesh position={[1.75, -0.85, -0.1]}>
        <boxGeometry args={[0.3, 0.65, 0.25]} />
        <meshStandardMaterial color="#090915" roughness={0.4} metalness={0.6} />
      </mesh>
      {[0, 1, 2].map(i => (
        <mesh key={i} position={[1.75, -0.72 + i * 0.15, 0.03]}>
          <boxGeometry args={[0.22, 0.03, 0.01]} />
          <meshStandardMaterial color="#1a1a30" roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[1.75, -1.1, 0.03]}>
        <circleGeometry args={[0.05, 16]} />
        <meshStandardMaterial color={PURPLE} emissive={PURPLE} emissiveIntensity={3} />
      </mesh>
      <pointLight position={[1.75, -1.1, 0.05]} intensity={0.6} color={PURPLE} distance={1} />

      {/* === DESK LAMP === */}
      <mesh position={[-2.0, -1.1, 0.4]}>
        <cylinderGeometry args={[0.04, 0.06, 0.6, 8]} />
        <meshStandardMaterial color="#111122" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[-2.0, -0.7, 0.2]} rotation={[0.6, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.5, 8]} />
        <meshStandardMaterial color="#111122" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Lamp head */}
      <mesh position={[-2.0, -0.44, 0.0]} rotation={[0.8, 0, 0]}>
        <coneGeometry args={[0.18, 0.2, 16, 1, true]} />
        <meshStandardMaterial color="#111122" roughness={0.3} metalness={0.9} side={THREE.DoubleSide} />
      </mesh>
      <pointLight position={[-2.0, -0.5, 0.05]} intensity={1.5} color="#fff5cc" distance={2.5} />

      {/* === COFFEE MUG === */}
      <mesh position={[2.0, -1.1, 0.3]}>
        <cylinderGeometry args={[0.12, 0.1, 0.28, 16, 1, true]} />
        <meshStandardMaterial color="#1a0a30" roughness={0.4} metalness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[2.0, -1.22, 0.3]}>
        <circleGeometry args={[0.1, 16]} />
        <meshStandardMaterial color="#1a0a30" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Mug handle */}
      <mesh position={[2.15, -1.11, 0.3]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.07, 0.015, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#1a0a30" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Coffee glow */}
      <pointLight position={[2.0, -1.0, 0.3]} intensity={0.3} color="#ff6600" distance={0.8} />

      {/* === NOTEBOOK === */}
      <mesh position={[-1.3, -1.15, 0.7]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.55, 0.04, 0.75]} />
        <meshStandardMaterial color="#7c3aed" roughness={0.6} metalness={0.1} />
      </mesh>
      <mesh position={[-1.3, -1.12, 0.7]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.52, 0.01, 0.72]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.9} />
      </mesh>

      {/* === AMBIENT === */}
      <ambientLight intensity={0.2} color="#080820" />
      <directionalLight position={[-3, 4, 4]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, 2, 2]} intensity={0.4} color="#7c3aed" distance={6} />

      {/* Desk underglow */}
      <pointLight position={[0, -1.5, 0.5]} intensity={1.2} color={BLUE} distance={3} />
    </group>
  )
}

const CYAN = '#06b6d4'
