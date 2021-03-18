import React, { useCallback, useState, useRef } from 'react'
import TreeNode from './TreeNode'
import db from './db.json'

function App() {
  const [checkedTrees, setCheckTrees] = useState([])
  const notify = useCallback(
    (name, checked) => {
      checked
        ? setCheckTrees(checkedTrees => [...new Set(checkedTrees.concat(name))])
        : setCheckTrees(checkedTrees => checkedTrees.filter(n => n !== name))
    },
    []
  )
  return (
    <>
      {checkedTrees.join(', ')}
      <TreeNode notify={notify} {...db} />
    </>
  )
}

export default App
