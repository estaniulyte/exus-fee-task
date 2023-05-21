import { useEffect, useState  } from 'react';

import React from 'react';

import { ProjectType } from '../models/project.interface';
import { OrganizationType } from '../models/organization.interface';

import { Project } from '../api/api';
import { Organization } from '../api/api';

import OrganizationsTable from './organizationsSectionComponents/OrganizationsTable'
import LabeledInput from './LabeledInput';

function OrganizationsSection() {
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const [name, setName] = useState<string>("")
  const [acronym, setAcronym] = useState<string>("")
  const [country, setCountry] = useState<string>("")
  const [projectId, setProjectId] = useState<number>(projects[0]?.id!)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.target.value)
  }

  const handleAcronymChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAcronym(event.target.value)
  }

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCountry(event.target.value)
  }

  const handleProjectIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setProjectId(+event.target.value) 
  }

  const onDeleteOrganization = (id: number) => {
    Organization.deleteOrganization(id)
      .then((data) => {
        setOrganizations((prevOrganizations) =>
          prevOrganizations.filter(item => item.id !== id)
      )})
      .catch((err) => {
        console.log(err)
      });
  }

  const onEditOrganization = (organization: OrganizationType, id: number) => {
    Organization.updateOrganization(organization, id)
      .then((data) => {
        const newOrganizations = [...organizations]
        const index = organizations.findIndex((organization) => organization.id === id)
        newOrganizations[index] = data
        setOrganizations(newOrganizations)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const onSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const newOrganization = {
      name,
      acronym,
      country,
      projectId
    }

    Organization.createOrganization(newOrganization)
      .then((data) => {
        setOrganizations((previousOrganizations) => [...previousOrganizations, data])
        clearForm()
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const clearForm = () => {
    setName("")
    setAcronym("")
    setCountry("")
    setProjectId(organizations[0].id)
  }

  const validate = () => {
    return name.length && acronym.length && country.length && projectId !== -1;
  };

  useEffect(() => {
    Organization.getOrganizations()
    .then((data) => {
      setOrganizations(data);
    })
    .catch((err) => {
      console.log(err)
    });

    Project.getProjects()
			.then((data) => {
				setProjects(data);
        setProjectId(data[0].id)
			})
			.catch((err) => {
        console.log(err)
			});
    return () => {};
	}, []);

  return (
    <section className=''>
      <div className='mx-auto px-[0px] lg:px-[5px]'>
      <div className='flex items-center mx-2 md:mx-4'>
        <h2 className='h2 section-title'>Organizations</h2>
        {/* <button className='btn btn-primary btn-sm md:btn-md lg:btn-lg'>New Organization</button> */}
      </div>
      <div className='form' onSubmit={onSubmit}>
        <form className='section-form'>
            <LabeledInput labelText='Name'>
              <input required value={name} type='text' name="name" placeholder='Exus' className='text-input' onChange={handleNameChange} />
            </LabeledInput>
            <LabeledInput labelText='Acronym'>
              <input required value={acronym} type='text' name="acronym" placeholder='EXU' className='text-input' onChange={handleAcronymChange} />
            </LabeledInput>
            <LabeledInput labelText='Country'>
              <input required value={country} type='text' name="country" placeholder='Lithuania' className='text-input' onChange={handleCountryChange} />
            </LabeledInput>
            <LabeledInput labelText='Project'>
              <select required value={projectId} id="organizationId" className='select-input' onChange={handleProjectIdChange}>
                {projects?.map((item) => {
                  return (
                  <option key={item.id} value={item.id}>{item.name} (ID: {item.id})</option>
                  )
                })}
              </select>
            </LabeledInput>
            <button type='submit' className='btn btn-primary btn-lg self-end' disabled={!validate()}>create Organization</button>
        </form>
      </div>
      {organizations.length && <OrganizationsTable head={['ID', 'Name', 'Acronym', 'Country','Project ID']} body={organizations} handleDeleteOrganization={onDeleteOrganization} handleEditOrganization={onEditOrganization} projects={projects} handleEditFormOrganization={onEditOrganization}/> }
      </div>
    </section>
  )
}

export default OrganizationsSection;