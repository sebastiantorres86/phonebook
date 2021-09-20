import React from 'react'

const Persons = ({ person, removePerson }) => {
  return (
    <div>
      {person.name} {person.number}{' '}
      <button
        onClick={() => {
          removePerson(person.id, person.name)
        }}
      >
        delete
      </button>
    </div>
  )
}

export default Persons
