import { useEffect, useState  } from 'react';

import { ProjectType } from './models/project.interface';
import { OrganizationType } from './models/organization.interface';
import { UserType } from './models/user.interface';

import { Project } from './api/api';
import { Organization } from './api/api';
import { User } from './api/api';

import UsersSection from './components/UsersSection';
import SideBar from './components/SideBar';
import ProjectsSection from './components/ProjectsSection';
import OrganizationsSection from './components/OrganizationsSection';
import OrganizationsPerProjectChart from './components/charts/OrganizationsPerProjectChart';
import UsersPerProject from './components/charts/UsersPerProjectChart';

function App() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
		Project.getProjects()
			.then((data) => {
				setProjects(data);
			})
			.catch((err) => {
				console.log(err)
			});

      Organization.getOrganizations()
			.then((data) => {
				setOrganizations(data);
			})
			.catch((err) => {
				console.log(err)
			});

      User.getUsers()
			.then((data) => {
				setUsers(data);
			})
			.catch((err) => {
				console.log(err)
			});
		return () => {};
	}, []);

  return (
    <div className="App">
      <SideBar />
      <div className="flex flex-col p-4 sm:ml-64 gap-y-8">
        <UsersSection />
        <ProjectsSection />
        <OrganizationsSection />
        <OrganizationsPerProjectChart organizations={organizations} projects={projects} />
        <UsersPerProject organizations={organizations} projects={projects} users={users} />
      </div>
    </div>
  );
}

export default App;
