import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import React, { Suspense, useRef } from 'react'

function RotatingCube() {
  const meshRef = useRef()
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })
  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, Math.PI / 9]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function Home() {
  return (
    <div className="relative h-screen w-full bg-black">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <RotatingCube />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <div className="absolute top-4 left-4 z-10 text-white text-2xl font-bold">
        Thakur Industries
      </div>
    </div>
  )
}

function About() {
  return <div className="p-10">About Us</div>
}

function Products() {
  return <div className="p-10">Our Products</div>
}

function Blog() {
  return <div className="p-10">Blog Page</div>
}

function Contact() {
  return <div className="p-10">Contact Us</div>
}

function Admin() {
  return <div className="p-10">Admin Panel (CMS coming soon)</div>
}

function Navbar() {
  return (
    <nav className="p-4 bg-gray-900 text-white flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/products">Products</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  )
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}
