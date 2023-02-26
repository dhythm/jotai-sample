import { useAtom } from 'jotai/react'
import { atomWithLocation } from 'jotai-location'
import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'

const locationAtom = atomWithLocation()

export const Location = () => {
  const [loc, setLoc] = useAtom(locationAtom)
  const location = useLocation()

  useEffect(() => {
    const cb = () => {
      console.log('popstate is called!')
    }
    window.addEventListener('popstate', cb)
    return () => {
      window.removeEventListener('popstate', cb)
    }
  }, [])

  return (
    <div style={{ padding: 8 }}>
      <h2>react-router-dom</h2>
      <p>pathname: {location.pathname}</p>
      <p>search: {location.search}</p>

      <h2>jotai-location</h2>
      <p>pathname: {loc.pathname}</p>
      <p>parameter: {loc.searchParams?.get('foo')}</p>

      <h2>window.location</h2>
      <p>pathname: {window.location.pathname}</p>
      <p>search: {window.location.search}</p>

      <ul>
        <li>
          <button
            onClick={() => {
              setLoc(() => ({ pathname: '/' }))
            }}
          >
            home
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setLoc((prev) => ({
                ...prev,
                pathname: '/location',
                searchParams: new URLSearchParams([['foo', '1']])
              }))
            }}
          >
            foo=1
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setLoc((prev) => ({
                ...prev,
                pathname: '/location',
                searchParams: new URLSearchParams([['foo', '2']])
              }))
            }}
          >
            foo=2
          </button>
        </li>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/location">/location</Link>
        </li>
        <li>
          <Link to="/location?foo=1">/location?foo=1</Link>
        </li>
        <li>
          <Link to="/location?bar=2">/location?bar=2</Link>
        </li>
        <li>
          <button
            onClick={() => {
              window.location.replace('/location?foo=1')
            }}
          >
            foo=1
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              window.location.replace('/location?foo=2')
            }}
          >
            foo=2
          </button>
        </li>
      </ul>
    </div>
  )
}
