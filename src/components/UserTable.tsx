import { useState, Fragment } from 'react';

import { UserType } from '../models/user.interface';
import EditableRow from './EditableRow';

import ReadOnlyRow from './ReadOnlyRow';

type TableProps = {
  head: Array<string>;
  body: UserType[];
  organizations: Array<Object>;
  handleDeleteUser: (id: number) => void;
  handleEditUser: (user: UserType, id: number) => void
  handleEditFormUser: (user: UserType, id: number) => void
}

function Table({ head, body, organizations, handleDeleteUser, handleEditFormUser}: TableProps) {
  const [editUserId, setEditUserId] = useState(null);

  const [editName, setEditName] = useState<string>("")
  const [editEmail, setEditEmail] = useState<string>("")
  const [editOrganizationId, setEditOrganizationId] = useState<number>(-1)

  const handleEditNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditName(event.target.value)
  }

  const handleEditEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditEmail(event.target.value)
  }

  const handleEditOrganizationIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setEditOrganizationId(+event.target.value) 
  }

  const handleEditClick = (event: any, item: any) => {
    event.preventDefault();
    setEditUserId(item.id)

    setEditName(item.name)
    setEditEmail(item.email)
    setEditOrganizationId(item.organizationId)
  }

  const handleDeleteClickThis = (event: any, item: any) => {
    event.preventDefault();
    handleDeleteUser(item.id)
  }

  const handleEditFormChange = (event: any, item: any) => {
    event.preventDefault();
    const object = {
      id: item.id,
      name: editName,
      email: editEmail,
      organizationId: editOrganizationId
    }
    handleEditFormUser(object, item.id);

    setEditUserId(null)
  }

  const handleCancelClick = (event: any) => {
    event.preventDefault();
    setEditUserId(null)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-2 md:m-4 overflow-x-auto">
      <form>
        <table className="w-full table-fixed border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              {
                head?.map((item, idx) => {
                  return (
                    <th
                      className="px-6 py-4 font-medium text-gray-900"
                      key={idx}
                    >
                      { item }
                    </th>
                  )
                })
              }
              <th className="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {
                body.map((item) => {
                  return (
                    <Fragment key={item.id}>
                      { editUserId === item.id ? 
                          <EditableRow
                            item={item}
                            organizations={organizations}
                            editName={editName}
                            editEmail={editEmail}
                            editOrganizationId={editOrganizationId}
                            handleEditNameChange={handleEditNameChange}
                            handleEditEmailChange={handleEditEmailChange}
                            handleEditOrganizationIdChange={handleEditOrganizationIdChange}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelClick={handleCancelClick}
                          />
                        :
                          <ReadOnlyRow item={item} handleEditClick={handleEditClick} handleDeleteUser={handleDeleteClickThis} /> }
                    </Fragment>
                  )
                })
              }
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default Table;