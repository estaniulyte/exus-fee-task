function ReadOnlyRow() {
  return (
    <tr className="hover:bg-gray-50" key={item.id}>
      <td className="px-6 py-4 text-gray-700">
        {item.id}
      </td>
      <td className="px-6 py-4 text-gray-700">
        {item.name}
      </td>
      <td className="px-6 py-4 text-gray-700">
        {item.email}
      </td>
      <td className="px-6 py-4 text-gray-700">
        {item.organizationId}
      </td>
    </tr>
  )
}

export default ReadOnlyRow