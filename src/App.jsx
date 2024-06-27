import "./App.css"
import { useEffect, useState } from 'react'
import { deleteJoke, editJoke, getJokes, postJoke } from "./services/jokeService"
import stevePic from "./assets/steve.png"

export const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [jokes, setJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])

  const fetchData = async () => {
    try {
      const jokesData = await getJokes()
      setJokes(jokesData)
    } catch (error) {
      console.error('Error fetching jokes', error)
    }
  }

  useEffect(() => {

    fetchData()
  }, [])

  useEffect(() => {
    // const filterJokes = () => {
    const untold = jokes.filter(joke => !joke.told)
    const told = jokes.filter(joke => joke.told)
    setUntoldJokes(untold)
    setToldJokes(told)
    // }
    // filterJokes()
  }, [jokes])

  const toggleToldStatus = async (jokeId, isTold) => {
    const jokeToEdit = jokes.find(joke => joke.id === jokeId)
    const updatedJoke = { ...jokeToEdit, told: isTold }
    await editJoke(jokeId, updatedJoke)

    fetchData()
  }

  const deleteTheJoke = async (jokeId) => {
    await deleteJoke(jokeId)
    fetchData()
  }


  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handlePostJoke = async () => {
    try {
      const newJoke = {
        id: 0,
        text: inputValue,
        told: false
      }
      await postJoke(newJoke)
      setInputValue("")
      fetchData()
    } catch (error) {
      console.error('Error posting joke', error)
    }
  }

  return (
    <div>
      <div className="app-heading" >
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>

        <div className="app-heading-text">Chuckling Checklist</div>

      </div>
      <h2>Add Joker</h2>
      <div className="joke-add-form">
        <div className="joke-input">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="joke-input"
            placeholder="Joke Here">
          </input>
          <button className="joke-input-submit" onClick={handlePostJoke}>Post Joker</button>
        </div>



      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>Untold Jokes <span className="untold-count">{untoldJokes.length}</span></h2>
          <ul>
            {untoldJokes.map(joke => (
              <li className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>
                <div className="joke-list-action-toggle"><button onClick={() => toggleToldStatus(joke.id, true)}>Move</button></div>
                <div className="joke-list-action-delete"><button onClick={() => deleteTheJoke(joke.id)}>Delete</button></div>
                </li>
            ))}
          </ul>
        </div>
        <div className="joke-list-container">
          <h2>Told Jokes <span className="told-count">{toldJokes.length}</span></h2>
          <ul>
            {toldJokes.map(joke => (
              <li className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>
                <div className="joke-list-action-toggle"><button onClick={() => toggleToldStatus(joke.id, false)}>Move</button></div>
                <div className="joke-list-action-delete"><button onClick={() => deleteTheJoke(joke.id)}>Delete</button></div>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}