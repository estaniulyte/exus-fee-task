function EditableRow({ item, projects, editName, editAcronym, editCountry, editProjectId, handleEditNameChange, handleEditAcronymChange, handleEditCountryChange, handleEditProjectIdChange, handleEditFormChange, handleCancelClick }: any) {  
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
        <input value={editCountry} type="text" required placeholder="Enter a country" name="country" className="text-input" onChange={handleEditCountryChange}></input>
      </td>
      <td className="px-6 py-4 text-gray-700">
        <select value={editProjectId} required id="organizationId" name="organizationId" className='select-input' onChange={handleEditProjectIdChange}>
          {projects?.map((item: any) => {
            return (
              <option key={item.id} value={item.id}>{item.name} (ID: {item.id})</option>
            )
          })}
        </select>
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