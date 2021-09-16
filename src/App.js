import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const addPerson = event => {
    event.preventDefault()
    if (persons.find(p => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      return false
    }
    
    const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = event => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  )
}

export default App
