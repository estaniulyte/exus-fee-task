function EditableRow({ item, editName, editAcronym, editDescription, handleEditNameChange, handleEditAcronymChange, handleEditDescriptionChange, handleEditFormChange, handleCancelClick }: any) {  
  return (
    <tr>
      <td className="px-6 py-4 text-gray-700">
        { item.id }
      </td>
      <td className="px-6 py-4 text-gray-700">
        <input value={editName} type="text" required placeholder="Enter a name" name="name" className="text-input" onChange={handleEditNameChange}></input>
      </td>
      <td className="px-6 py-4 text-gray-700">
        <input value={editAcronym} type="text" required placeholder="Enter an acronym" name="acronym" className="text-input" onChange={handleEditAcronymChange}></input>
      </td>
      <td className="px-6 py-4 text-gray-700">
        <input value={editDescription} type="text" required placeholder="Enter a description" name="description" className="text-input" onChange={handleEditDescriptionChange}></input>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          <button
            onClick={event => handleEditFormChange(event, item)}
            className="btn btn-xs-sm btn-primary"
          >
            Save
          </button>
          <button
            onClick={event => handleCancelClick(event)}
            className="btn btn-xs-sm btn-cancel"
          >
            Cancel
          </button>
        </div>
      </td>
    </tr>
  )
}

export default EditableRow;