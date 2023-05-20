import { useState, Fragment } from 'react';

import { ProjectType } from '../../models/project.interface';

import EditableRow from './EditableRow';

import ReadOnlyRow from './ReadOnlyRow';

import React from 'react';

type TableProps = {
  head: Array<string>;
  body: ProjectType[];
  handleDeleteProject: (id: number) => void;
  handleEditProject: (project: ProjectType, id: number) => void
  handleEditFormProject: (project: ProjectType, id: number) => void
}

function Table({ head, body, handleDeleteProject, handleEditFormProject}: TableProps) {
  const [editProjectId, setEditProjectId] = useState(null);

  const [editName, setEditName] = useState<string>("")
  const [editAcronym, setEditAcronym] = useState<string>("")
  const [editDescription, setEditDescription] = useState<string>("")

  const handleEditNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditName(event.target.value)
  }

  const handleEditDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditDescription(event.target.value)
  }

  const handleEditAcronymChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setEditAcronym(event.target.value) 
  }

  const handleEditClick = (event: any, item: any) => {
    event.preventDefault();
    setEditProjectId(item.id)

    setEditName(item.name)
    setEditAcronym(item.acronym)
    setEditDescription(item.description)
  }

  const handleDeleteClickThis = (event: any, item: any) => {
    event.preventDefault();
    handleDeleteProject(item.id)
  }

  const handleEditFormChange = (event: any, item: any) => {
    event.preventDefault();
    const object = {
      id: item.id,
      name: editName,
      acronym: editAcronym,
      description: editDescription
    }
    handleEditFormProject(object, item.id);

    setEditProjectId(null)
  }

  const handleCancelClick = (event: any) => {
    event.preventDefault();
    setEditProjectId(null)
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
                        { editProjectId === item.id ? 
                            <EditableRow
                              item={item}
                              editName={editName}
                              editAcronym={editAcronym}
                              editDescription={editDescription}
                              handleEditNameChange={handleEditNameChange}
                              handleEditDescriptionChange={handleEditDescriptionChange}
                              handleEditAcronymChange={handleEditAcronymChange}
                              handleEditFormChange={handleEditFormChange}
                              handleCancelClick={handleCancelClick}
                            />
                          :
                            <ReadOnlyRow item={item} handleEditClick={handleEditClick} handleDeleteProject={handleDeleteClickThis} /> }
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

export default Table;