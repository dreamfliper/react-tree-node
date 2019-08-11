import React from "react"
import TreeNode from "./TreeNode"
import db from "./db.json"

function App() {
  return <TreeNode {...db} />
}

export default App
