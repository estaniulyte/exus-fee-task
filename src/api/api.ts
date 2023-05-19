import axios, { AxiosResponse } from 'axios';

import { ProjectType } from '../models/project.interface';
import { UserType } from '../models/user.interface';
import { NewUserType } from '../models/newUser.interface';
import { OrganizationType } from '../models/organization.interface';

const instance = axios.create({
  baseURL: 'https://assignments-ailabs.exus.ai/',
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};

export const Project = {
	getProjects: (): Promise<ProjectType[]> => requests.get('projects'),
	getAProject: (id: number): Promise<ProjectType> => requests.get(`projects/${id}`),
	createProject: (project: ProjectType): Promise<ProjectType> =>
		requests.post('projects', project),
	updateProject: (project: ProjectType, id: number): Promise<ProjectType> =>
		requests.put(`projects/${id}`, project),
	deleteProject: (id: number): Promise<void> => requests.delete(`projects/${id}`),
};

export const User = {
	getUsers: (): Promise<UserType[]> => requests.get('users'),
	getAUser: (id: number): Promise<UserType> => requests.get(`users/${id}`),
	createUser: (user: NewUserType): Promise<UserType> =>
		requests.post('users', user),
	updateUser: (user: UserType, id: number): Promise<UserType> =>
		requests.put(`users/${id}`, user),
	deleteUser: (id: number): Promise<void> => requests.delete(`users/${id}`),
};

export const Organization = {
	getOrganizations: (): Promise<OrganizationType[]> => requests.get('organizations'),
	getAOrganization: (id: number): Promise<OrganizationType> => requests.get(`organizations/${id}`),
	createOrganization: (organization: OrganizationType): Promise<OrganizationType> =>
		requests.post('organizations', organization),
	updateOrganization: (organization: OrganizationType, id: number): Promise<OrganizationType> =>
		requests.put(`organizations/${id}`, organization),
	deleteOrganization: (id: number): Promise<void> => requests.delete(`organizations/${id}`),
};