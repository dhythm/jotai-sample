import { useAtom } from 'jotai/react'
import { atomWithLocation } from 'jotai-location'
import { useLocation, useSearchParams, Link } from 'react-router-dom'

const locationAtom = atomWithLocation()

export const Location = () => {
  const [loc, setLoc] = useAtom(locationAtom)
  const location = useLocation()
  const [searchParams] = useSearchParams()

  return (
    <div>
      <p>pathname(react-router-dom): {location.pathname}</p>
      <p>search(react-router-dom): {location.search}</p>
      <p>pathname(jotai-location){loc.pathname}</p>
      <p>parameter(jotai-location): {loc.searchParams?.get('foo')}</p>
      <ul>
        <li>
          <button
            onClick={() => {
              setLoc((prev) => ({ pathname: '/' }))
            }}
          >
            /
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setLoc((prev) => ({
                ...prev,
                pathname: '/location',
                searchParams: new URLSearchParams()
              }))
            }}
          >
            /location
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
            /location?foo=1
          </button>
        </li>
        <li>
          <Link to="/">/</Link>
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
      </ul>
    </div>
  )
}
