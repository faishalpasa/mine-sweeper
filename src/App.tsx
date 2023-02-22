import React from 'react'

import Wheel from './components/Wheel'

const getUrlParams = (params: string) => {
  const urlParams = new URLSearchParams(window.location.search)
  const param = urlParams.get(params)
  return param
}

const App = () => {
  const type = getUrlParams('type')
  return (
    <>
      {(!type || type === '1') && <Wheel />}
      {type === '2' && <Wheel />}
    </>
  )
}

export default App
