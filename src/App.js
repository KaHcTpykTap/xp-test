import React from 'react'
import TAbleDrop from './components/table/TableDrop'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


function App() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <TAbleDrop />
      </DndProvider>
    </div>
  )
}

export default App