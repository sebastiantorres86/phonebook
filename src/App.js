import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
      setSearchResult(response.data)
    })
  }, [])

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    const results = persons.filter(person =>
      person.name.toLowerCase().includes(searchTerm)
    )
    setSearchResult(results)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  const addPerson = event => {
    event.preventDefault()
    if (persons.find(p => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      return false
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleChange={handleChange} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons searchResult={searchResult} />
    </div>
  )
}

export default App
