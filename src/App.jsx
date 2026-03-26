import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import GPComponent from './GPComponent'

function App() {
  return (
    <div className="container mt-3">
      <h1 className="text-center text-primary">
        🚀 Advanced GP App
      </h1>

      <GPComponent />
    </div>
  );
}

export default App
