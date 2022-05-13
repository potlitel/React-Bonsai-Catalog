import React from 'react';
import Card from './Card';

function DataList({ filteredPersons }) {
  const filtered = filteredPersons.map(person =>  <Card key={person.id} person={person} />); 
  return (
    <div>
      {filtered}
    </div>
  );
}

export default DataList;