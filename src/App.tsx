import reactLogo from './assets/react.svg'
import './App.css'
import { Counter } from './Counter'
import { atom, Provider, useAtom } from 'jotai'
import { IncrementalCounter } from './IncrementalCounter'
import { simpleStore } from './stores'
import { FC } from 'react'
import { IndependentJotai } from './IndependentJotai'

const localAtom = atom(0)
simpleStore.set(localAtom, 1)
simpleStore.sub(localAtom, () => {
  console.log('localAtom value is changed to', simpleStore.get(localAtom))
})

function App() {
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <IndependentJotai />
      </div>
      <div className="card">
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <Provider>
          <Counter />
        </Provider>
        <IncrementalCounter incrementAmount={2} initialValue={5} />
        <Provider store={simpleStore}>
          <Local />
        </Provider>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

const Local: FC = () => {
  const [value, setValue] = useAtom(localAtom)

  return (
    <button
      onClick={() => {
        setValue(value + 1)
      }}
    >
      click me!
    </button>
  )
}

export default App
