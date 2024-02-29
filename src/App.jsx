import "./App.css"
import { useState } from 'react'

export const App = () => {
  const [inputValue, setInputValue] = useState('')


  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div>
      <input
        type="type"
        value={inputValue}
        onChange={handleChange}
        placeholder="joke here">
      </input>
    </div>
  )
}