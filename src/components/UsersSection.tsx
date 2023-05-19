import { useEffect, useState  } from 'react';

import React from 'react';

import { UserType } from '../models/user.interface';
import { OrganizationType } from '../models/organization.interface';

import { User } from '../api/api';
import { Organization } from '../api/api';

import Table from './Table'

const defaultFormData = {
  name: '',
  email: '',
  organizationId: -1
}

function UsersSection() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const [formData, setFormData] = useState(defaultFormData)

  const onDeleteUser = (id: number | undefined) => {
    User.deleteUser(id)
      .then((data) => {
        setUsers((prevUsers) =>
          prevUsers.filter(item => item.id !== id)
      )})
      .catch((err) => {
        setIsError(true);
      });
  }

  useEffect(() => {
    User.getUsers()
    .then((data) => {
      setUsers(data);
      console.log(data)
    })
    .catch((err) => {
      setIsError(true);
    });

    Organization.getOrganizations()
			.then((data) => {
				setOrganizations(data);
        // console.log(data)
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
            <input required type='text' name="name" placeholder='Enter a name' className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' onChange={handleAddFormChange} />
            <input type='text' name="email" placeholder='Enter an email' className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' onChange={handleAddFormChange} />
            <select id="organizationId" className='block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' onChange={handleAddFormChange1}>
              { organizations?.map((item) => {
                return (
                <option value={item.id}>{item.name} + {item.id}</option>
                )
              })}
            </select>
            <button type='submit' className='btn btn-sm md:btn-md lg:btn-lg btn-primary' disabled={!validate()}>submit</button>
        </form>
      </div>
      <Table head={['ID', 'Name', 'Email', 'Organization ID']} body={users} handleDeleteUser={onDeleteUser} />
      </div>
    </section>
  )
}

export default UsersSection;