import { useEffect, useState  } from 'react';

import React from 'react';

import { Project } from '../api/api';
import { ProjectType } from '../models/project.interface';

import ProjectsTable from './projectsSectionComponents/ProjectsTable' 

function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const [name, setName] = useState<string>("")
  const [acronym, setAcronym] = useState<string>("")
  const [description, setDescription] = useState<string>("")


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.target.value)
  }

  const handleAcronymChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAcronym(event.target.value)
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDescription(event.target.value)
  }

  const onDeleteProject = (id: number) => {
    Project.deleteProject(id)
      .then((data) => {
        setProjects((prevProjects) =>
          prevProjects.filter(item => item.id !== id)
      )})
      .catch((err) => {
        console.log(err)
      });
  }

  const onEditProject = (project: ProjectType, id: number) => {
    Project.updateProject(project, id)
      .then((data) => {
        const newProjects = [...projects]
        const index = projects.findIndex((project) => project.id === id)
        newProjects[index] = data
        setProjects(newProjects)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const onSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const newProject = {
      name,
      acronym,
      description
    }

    Project.createProject(newProject)
      .then((data) => {
        setProjects((previousProjects) => [...previousProjects, data])
        clearForm()
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const clearForm = () => {
    setName("")
    setAcronym("")
    setDescription("")
  }

  const validate = () => {
    return name.length && acronym.length && description.length;
  };

  useEffect(() => {
    Project.getProjects()
    .then((data) => {
      setProjects(data);
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
    });
	}, []);

  return (
    <section className=''>
      <div className='mx-auto px-[0px] lg:px-[5px]'>
      <div className='flex items-center justify-between mx-2 md:mx-4'>
        <h2 className='h2 section-title'>Projects</h2>
        <button className='btn btn-primary btn-sm md:btn-md lg:btn-lg'>New Project</button>
      </div>
      <div className='form' onSubmit={onSubmit}>
        <form className='w-full flex gap-x-2 p-5'>
            <input required value={name} type='text' name="name" placeholder='Enter a name' className='text-input' onChange={handleNameChange} />
            <input required value={acronym} type='text' name="acronym" placeholder='Enter an acronym' className='text-input' onChange={handleAcronymChange} />
            <input required value={description} type='text' name="description" placeholder='Enter a description' className='text-input' onChange={handleDescriptionChange} />
            <button type='submit' className='btn btn-sm md:btn-md lg:btn-lg btn-primary' disabled={!validate()}>submit</button>
        </form>
      </div>
      {projects.length && <ProjectsTable head={['ID', 'Name', 'Acronym', 'Description']} body={projects} handleDeleteProject={onDeleteProject} handleEditProject={onEditProject} handleEditFormProject={onEditProject}/> }
      </div>
    </section>
  )
}

export default ProjectsSection;