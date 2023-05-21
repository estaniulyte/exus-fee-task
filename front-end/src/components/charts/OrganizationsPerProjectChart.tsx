import { ProjectType } from '../../models/project.interface';
import { OrganizationType } from '../../models/organization.interface';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ChartProps = {
  organizations: OrganizationType[];
  projects: ProjectType[];
}

function OrganizationsPerProject({ organizations, projects }: ChartProps) {
  const orgPerProjectData = projects.map((item) => {
    return {
      name: item.name,
      id: item.id,
      organizationsCount: (organizations.filter((org) => org.projectId === item.id)).length,
    }
  })

  return (
    <div className='w-full'>
      <h2 className='h2 mx-2 md:mx-7 pb-3'>Organizations per Project</h2>
      {orgPerProjectData &&
        <ResponsiveContainer width="100%" height={450}>
          <BarChart
              data={orgPerProjectData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="organizationsCount" fill="#8884d8" label="Projects count" />
          </BarChart>
        </ResponsiveContainer>
        }
    </div>
  )
}

export default OrganizationsPerProject;