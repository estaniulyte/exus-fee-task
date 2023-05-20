import { useState, Fragment } from 'react';

import { OrganizationType } from '../../models/organization.interface';
import EditableRow from './EditableRow';

import ReadOnlyRow from './ReadOnlyRow';

import React from 'react';

type TableProps = {
  head: Array<string>;
  body: OrganizationType[];
  projects: Array<Object>;
  handleDeleteOrganization: (id: number) => void;
  handleEditOrganization: (organization: OrganizationType, id: number) => void
  handleEditFormOrganization: (organization: OrganizationType, id: number) => void
}

function OrganizationsTable({ head, body, projects, handleDeleteOrganization, handleEditFormOrganization}: TableProps) {
  const [editOrganizationId, setEditOrganizationId] = useState(null);

  const [editName, setEditName] = useState<string>("")
  const [editAcronym, setEditAcronym] = useState<string>("")
  const [editCountry, setEditCountry] = useState<string>("")
  const [editProjectId, setEditProjectId] = useState<number>(-1)


  const handleEditNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditName(event.target.value)
  }

  const handleEditAcronymChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditAcronym(event.target.value)
  }

  const handleEditCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditCountry(event.target.value)
  }

  const handleEditProjectIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setEditProjectId(+event.target.value) 
  }

  const handleEditClick = (event: any, item: any) => {
    event.preventDefault();
    setEditOrganizationId(item.id)

    setEditName(item.name)
    setEditAcronym(item.acronym)
    setEditCountry(item.country)
    setEditProjectId(item.projectId)
  }

  const handleDeleteClickThis = (event: any, item: any) => {
    event.preventDefault();
    handleDeleteOrganization(item.id)
  }

  const handleEditFormChange = (event: any, item: any) => {
    event.preventDefault();
    const object = {
      id: item.id,
      name: editName,
      acronym: editAcronym,
      country: editCountry,
      projectId: editProjectId
    }
    handleEditFormOrganization(object, item.id);

    setEditOrganizationId(null)
  }

  const handleCancelClick = (event: any) => {
    event.preventDefault();
    setEditOrganizationId(null)
  }

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage; // first index on next page
  const records = body.slice(firstIndex, lastIndex);
  const pageCount = Math.ceil(body.length / recordsPerPage)
  const indexes = pageCount + 1
  const numbers = Array.from(Array(indexes).keys()).slice(1)
  
  const nextPage = () => {
    if (currentPage !== lastIndex){
      setCurrentPage(currentPage + 1)
    }
  }

  const previousPage = () => {
    if(currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
    }
  }

  const changePage = (number: number) => {
    setCurrentPage(number)
  }

  const validatePrevBtn = () => {
    return currentPage === 1;
  };

  const validateNextBtn = () => {
    return currentPage === pageCount;
  };

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-2 md:m-4 overflow-x-auto">
        <form>
          <table className="w-full md:table-fixed border-collapse bg-white text-left text-sm text-gray-500">
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
                  records.map((item) => {
                    return (
                      <Fragment key={item.id}>
                        { editOrganizationId === item.id ? 
                            <EditableRow
                              item={item}
                              projects={projects}
                              editName={editName}
                              editAcronym={editAcronym}
                              editCountry={editCountry}
                              editProjectId={editProjectId}
                              handleEditNameChange={handleEditNameChange}
                              handleEditAcronymChange={handleEditAcronymChange}
                              handleEditCountryChange={handleEditCountryChange}
                              handleEditProjectIdChange={handleEditProjectIdChange}
                              handleEditFormChange={handleEditFormChange}
                              handleCancelClick={handleCancelClick}
                            />
                          :
                            <ReadOnlyRow item={item} handleEditClick={handleEditClick} handleDeleteOrganization={handleDeleteClickThis} /> }
                      </Fragment>
                    )
                  })
                }
            </tbody>
          </table>
        </form>
      </div>
      <nav className="flex justify-end mx-2 md:mx-4">
        <ul className="flex gap-x-1">
          <button className="btn btn-page rounded-l" onClick={previousPage} disabled={validatePrevBtn()}>Previous</button>
            {
              numbers.map((number, index) => {
                return (
                  <li key={index}>
                    <button key={index} className={`btn-page ${currentPage === number ? "bg-primary-200 text-white" : ""}`} onClick={() => changePage(number)}>{number}</button>
                  </li>
                )
              })
            }
            <button className="btn btn-page rounded-r" onClick={nextPage} disabled={validateNextBtn()}>Next</button>
          </ul>
      </nav>
    </div>
  )
}

export default OrganizationsTable;