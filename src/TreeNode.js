import React, { useState, useEffect } from 'react'

export default function TreeNode({
  level = 0,
  name,
  children,
  isParentChecked,
  notify = () => {},
  onCheckCallback = () => {},
}) {
  const [checked, setChecked] = useState(false)
  const showChecked = isParentChecked || checked
  useEffect(() => {
    isParentChecked !== undefined && setChecked(isParentChecked)
    notify(name, showChecked)
  }, [isParentChecked, checked, notify, name, showChecked])
  return (
    <div style={{ marginLeft: '1em', color: !isParentChecked ? 'inherit' : 'gray' }}>
      <input
        type="checkbox"
        checked={showChecked}
        // disabled={isParentChecked}
        onChange={({ target: { checked } }) => {
          setChecked(checked)
          isParentChecked !== undefined && onCheckCallback(undefined)
        }}
      />
      {name}
      {children.map(node => (
        <TreeNode
          key={node.name}
          level={level + 1}
          notify={notify}
          isParentChecked={showChecked}
          onCheckCallback={checked => {
            setChecked(checked)
            onCheckCallback(checked)
          }}
          {...node}
        />
      ))}
    </div>
  )
}
