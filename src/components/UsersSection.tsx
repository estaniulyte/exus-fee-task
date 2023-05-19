import { useEffect, useState  } from 'react';

import React from 'react';

import { UserType } from '../models/user.interface';
import { OrganizationType } from '../models/organization.interface';

import { User } from '../api/api';
import { Organization } from '../api/api';

import UserTable from './UserTable'

function UsersSection() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [isError, setIsError] = useState<boolean>(false);


  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [organizationId, setOrganizationId] = useState<number>(organizations[0]?.id!)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.target.value)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value)
  }

  const handleOrganizationIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setOrganizationId(+event.target.value) 
  }

  const onDeleteUser = (id: number) => {
    User.deleteUser(id)
      .then((data) => {
        setUsers((prevUsers) =>
          prevUsers.filter(item => item.id !== id)
      )})
      .catch((err) => {
        setIsError(true);
      });
  }

  const onSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const newUser = {
      name,
      email,
      organizationId
    }

    User.createUser(newUser)
      .then((data) => {
        setUsers((previousUsers) => [...previousUsers, data])
        clearForm()
      })
  }

  const clearForm = () => {
    setOrganizationId(organizations[0].id)
    setName("")
    setEmail("")
  }

  const validate = () => {
    return name.length && email.length && organizationId !== -1;
  };

  useEffect(() => {
    User.getUsers()
    .then((data) => {
      setUsers(data);
    })
    .catch((err) => {
      setIsError(true);
    });

    Organization.getOrganizations()
			.then((data) => {
				setOrganizations(data);
        setOrganizationId(data[0].id)
			})
			.catch((err) => {
				setIsError(true);
			});
    return () => {};
	}, []);

  return (
    <section className=''>
      <div className='mx-auto px-[0px] lg:px-[5px]'>
      <div className='flex items-center justify-between mx-2 md:mx-4'>
        <h2 className='h4 md:h3 section-title'>Users</h2>
        <button className='btn btn-primary btn-sm md:btn-md lg:btn-lg'>New User</button>
      </div>
      <div className='form' onSubmit={onSubmit}>
        <form className='w-full flex gap-x-2 p-5'>
            <input required value={name} type='text' name="name" placeholder='Enter a name' className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' onChange={handleNameChange} />
            <input required value={email} type='text' name="email" placeholder='Enter an email' className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' onChange={handleEmailChange} />
            <select required value={organizationId} id="organizationId" className='block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' onChange={handleOrganizationIdChange}>
              {organizations?.map((item) => {
                return (
                <option key={item.id} value={item.id}>{item.name} + {item.id}</option>
                )
              })}
            </select>
            <button type='submit' className='btn btn-sm md:btn-md lg:btn-lg btn-primary' disabled={!validate()}>submit</button>
        </form>
      </div>
      {users.length && <UserTable head={['ID', 'Name', 'Email', 'Organization ID']} body={users} handleDeleteUser={onDeleteUser} /> }
      </div>
    </section>
  )
}

export default UsersSection;