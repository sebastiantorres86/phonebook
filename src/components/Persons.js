import React from 'react'

const Persons = ({ results }) => {
  return (
    <div>
      {results.map(person => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  )
}

export default Persons
