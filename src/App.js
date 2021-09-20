import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import peopleService from './services/people'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    peopleService.getAll().then(initialPeople => {
      setPersons(initialPeople)
    })
  }, [])

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  const results = !searchTerm
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )

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

    peopleService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }
  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      peopleService.remove(id).then(() => {
        const del = persons.filter(person => id !== person.id)
        setPersons(del)
      })
    }
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
      {results.map(person => (
        <Person key={person.id} person={person} removePerson={removePerson} />
      ))}
    </div>
  )
}

export default App
