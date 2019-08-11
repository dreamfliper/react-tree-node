import React, {useState, useEffect} from "react"

export default function TreeNode({
  level = 0,
  name,
  children,
  isParentChecked,
  onCheckCallback = () => {},
}) {
  const [checked, setChecked] = useState(false)
  const showChecked = checked || isParentChecked
  useEffect(() => {
    !checked && setChecked(isParentChecked)
  }, [isParentChecked])
  return (
    <div style={{marginLeft: "1em", color: !isParentChecked ? "inherit" : "gray"}}>
      <input
        type="checkbox"
        checked={showChecked}
        // disabled={isParentChecked}
        onChange={({target: {checked}}) => {
          setChecked(checked)
          isParentChecked && onCheckCallback(checked)
        }}
      />
      {name}
      {children.map(node => (
        <TreeNode
          key={node.name}
          level={level + 1}
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
