import { atom, useAtom } from 'jotai'
import { FC, useMemo } from 'react'

type Props = {
  incrementAmount: number
  initialValue: number
}
export const IncrementalCounter: FC<Props> = ({
  incrementAmount,
  initialValue
}) => {
  const counterAtom = useMemo(() => atom(initialValue), [initialValue])
  const [counter, setCounter] = useAtom(counterAtom)

  return (
    <button
      onClick={() => {
        setCounter(counter + incrementAmount)
      }}
    >
      count is {counter}, increment by {incrementAmount}
    </button>
  )
}
