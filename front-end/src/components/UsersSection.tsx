import { useEffect, useState  } from 'react';

import React from 'react';

import { UserType } from '../models/user.interface';
import { OrganizationType } from '../models/organization.interface';

import { User } from '../api/api';
import { Organization } from '../api/api';

import UserTable from './userSectionComponents/UserTable'
import LabeledInput from './LabeledInput';

function UsersSection() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);

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
        console.log(err)
      });
  }

  const onEditUser = (user: UserType, id: number) => {
    User.updateUser(user, id)
      .then((data) => {
        const newUsers = [...users]
        const index = users.findIndex((user) => user.id === id)
        newUsers[index] = data
        setUsers(newUsers)
      })
      .catch((err) => {
        console.log(err)
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
      .catch((err) => {
        console.log(err)
      });
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
      console.log(err)
    });

    Organization.getOrganizations()
			.then((data) => {
				setOrganizations(data);
        setOrganizationId(data[0].id)
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
        <h2 className='h2 section-title'>Users</h2>
      </div>
      <div className='form' onSubmit={onSubmit}>
        <form className='section-form'>
          <LabeledInput labelText='Name'>
            <input required value={name} type='text' name="name" placeholder='Jonas' className='text-input' onChange={handleNameChange} />
          </LabeledInput>
          <LabeledInput labelText='Email'>
            <input required value={email} type='email' name="email" placeholder='jonas@gmail.com' className='text-input' onChange={handleEmailChange} />
          </LabeledInput>
          <LabeledInput labelText='Organization'>
            <select required value={organizationId} id="organizationId" className='select-input' onChange={handleOrganizationIdChange}>
              {organizations?.map((item) => {
                return (
                <option key={item.id} value={item.id}>{item.name} (ID: {item.id})</option>
                )
              })}
            </select>
          </LabeledInput>
          <button type='submit' className='btn btn-primary btn-lg self-end' disabled={!validate()}>Create User</button>
        </form>
      </div>
      {users.length && <UserTable head={['ID', 'Name', 'Email', 'Organization ID']} body={users} handleDeleteUser={onDeleteUser} handleEditUser={onEditUser} organizations={organizations} handleEditFormUser={onEditUser}/> }
      </div>
    </section>
  )
}

export default UsersSection;