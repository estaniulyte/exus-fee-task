function EditableRow({ item, organizations, editName, editEmail, editOrganizationId, handleEditNameChange, handleEditEmailChange, handleEditOrganizationIdChange, handleEditFormChange, handleCancelClick }: any) {  
  return (
    <tr>
      <td className="px-6 py-4 text-gray-700">
        { item.id }
      </td>
      <td className="px-6 py-4 text-gray-700">
        <input value={editName} type="text" required placeholder="Enter a name" name="name" className="text-input" onChange={handleEditNameChange}></input>
      </td>
      <td className="px-6 py-4 text-gray-700">
        <input value={editEmail} type="email" required placeholder="Enter an email" name="email" className="text-input" onChange={handleEditEmailChange}></input>
      </td>
      <td className="px-6 py-4 text-gray-700">
        <select value={editOrganizationId} required id="organizationId" name="organizationId" className='select-input' onChange={handleEditOrganizationIdChange}>
          {organizations?.map((item: any) => {
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