import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero w-10 mx-au">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1><nav class="border border-gray-200 rounded p-4">
  <div class="flex items-center justify-between">
    <span class="font-bold text-lg">Acme Inc</span>
    <div class="flex items-center gap-4">
      <a href="#" class="text-gray-600">Home</a>
      <a href="#" class="text-gray-600">Products</a>
      <a href="#" class="text-gray-600">About</a>
      <a href="#" class="text-gray-600">Contact</a>
      <button class="border border-gray-300 rounded px-3 py-1 text-sm">Sign Up</button>
    </div>
  </div>
</nav>

            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            <button class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 active:scale-95 transition-all duration-200">
              Get Started
            </button>


            <button class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-0.5 transition-all duration-300">
              Get Started
            </button>


            <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter "
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
<div class="relative pl-8 space-y-6">
  <div class="absolute left-3 top-2 bottom-2 w-px bg-gray-300"></div>
  <div class="relative">
    <div class="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white"></div>
    <p class="text-sm font-medium text-gray-800">Project kickoff meeting</p>
    <p class="text-xs text-gray-500 mt-0.5">January 15, 2026</p>
  </div>
  <div class="relative">
    <div class="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white"></div>
    <p class="text-sm font-medium text-gray-800">Design phase completed</p>
    <p class="text-xs text-gray-500 mt-0.5">February 3, 2026</p>
  </div>
  <div class="relative">
    <div class="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white"></div>
    <p class="text-sm font-medium text-gray-800">Beta release deployed</p>
    <p class="text-xs text-gray-500 mt-0.5">March 20, 2026</p>
  </div>
  <div class="relative">
    <div class="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white"></div>
    <p class="text-sm font-medium text-gray-500">Public launch</p>
    <p class="text-xs text-gray-400 mt-0.5">April 10, 2026 (upcoming)</p>
  </div>
</div>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
