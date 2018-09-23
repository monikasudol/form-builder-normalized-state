export const selectSecondaryInputs = (state, id) => {
  const inputs = state.subInputs.filter(input => input.id === id)
}

export const selectFirstLevelInputs = (inputs) => {
  return inputs.filter(input => !input.parentId)
}

export const selectChildrenOfCurrentInput = (inputs, parentId) => {
  return inputs.filter(input => input.parentId === parentId)
}

export const selectChildrenInputs = (inputs, childrenIds) => {
  const childrenInputs = inputs.filter(input => childrenIds.includes(input.id));
  return childrenInputs;
}
