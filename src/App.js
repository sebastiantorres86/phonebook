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
    const personObject = {
      name: newName,
      number: newNumber
    }

    const duplicateName = persons.some(person => person.name === newName)
    const duplicateNumber = persons.some(person => person.number === newNumber)

    if (!duplicateName) {
      peopleService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    } else if (duplicateName && duplicateNumber) {
      window.alert(`${newName} is already added to the phonebook`)
    } else if (duplicateName && !duplicateNumber) {
      const person = persons.find(person => person.name === newName)
      const changedPerson = { ...person, number: newNumber }
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
        ? peopleService
            .update(changedPerson.id, changedPerson)
            .then(response => {
              setPersons(
                persons.map(person =>
                  person.id !== changedPerson.id ? person : response
                )
              )
            })
        : setPersons(persons)
    }

    setNewName('')
    setNewNumber('')
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
