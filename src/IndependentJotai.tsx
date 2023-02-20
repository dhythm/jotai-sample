import { atom, createStore, Provider, useAtomValue, useStore } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import type { FC } from 'react'

const fooAtom = atom<string>('')
const barAtom = atom<string>('')
const bazAtom = atom<string>('')

export const IndependentJotai: FC = () => {
  const value = 'foo'
  fooAtom.onMount = (setAtom) => {
    setAtom(value)
  }
  const store = createStore()

  return (
    <Provider store={store}>
      <Parent initialValue="baz" />
    </Provider>
  )
}

const Parent: FC<{ initialValue: string }> = ({ initialValue }) => {
  const foo = useAtomValue(fooAtom)
  const bar = useAtomValue(barAtom)
  const store = useStore()
  store.set(barAtom, 'bar')

  return (
    <Provider>
      <p>fooAtom is {foo} in Parent</p>
      <p>barAtom is {bar} in Parent</p>
      <HydrateAtoms initialValues={[[bazAtom, initialValue]]}>
        <Child />
      </HydrateAtoms>
    </Provider>
  )
}

const Child: FC = () => {
  const baz = useAtomValue(bazAtom)
  return <p>bazAtom is {baz} in Child</p>
}

// https://jotai.org/docs/guides/initialize-atom-on-render
const HydrateAtoms = ({
  initialValues,
  children
}: {
  initialValues: any
  children: JSX.Element
}) => {
  useHydrateAtoms(initialValues)
  return children
}
