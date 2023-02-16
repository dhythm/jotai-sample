import { useAtom } from 'jotai'
import type { FC } from 'react'
import { counterAtom } from './atoms'

export const Counter: FC = () => {
  const [counter, setCounter] = useAtom(counterAtom)

  return (
    <button
      onClick={() => {
        setCounter(counter + 1)
      }}
    >
      count is {counter}
    </button>
  )
}
