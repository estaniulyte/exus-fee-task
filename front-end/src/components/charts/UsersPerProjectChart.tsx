import { ProjectType } from '../../models/project.interface';
import { UserType } from '../../models/user.interface';
import { OrganizationType } from '../../models/organization.interface';

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

type ChartProps = {
  organizations: OrganizationType[];
  projects: ProjectType[];
  users: UserType[];
}

function UsersPerProject({ organizations, projects, users }: ChartProps) {

  const organizationsPeopleCounted = organizations.map(org => {
        const numberOfPeople = users.filter(
          user => user.organizationId === org.id
          ).length
        return { ...org, numberOfPeople }
    })

  const usersPerProjectData = projects.map((item) => {
    return {
      name: item.name,
      id: item.id,
      organizations: (organizationsPeopleCounted.filter((org) => org.projectId === item.id)),
      organizationsPeopleCount: (organizationsPeopleCounted.filter((org) => org.projectId === item.id)).map(org => {
        return org.numberOfPeople
        }).reduce((a, b) => a + b, 0),   
    }
  })

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, name }:any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x-70} y={y} fill="black" fontSize={15}  dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`} {name}
    </text>
  );
};


  return (
    <div className='w-full'>
      <h2 className='h2 mx-2 md:mx-7 pb-3'>Users per Project</h2>
      {usersPerProjectData &&
      <ResponsiveContainer width="100%" height={450}>
        <PieChart>
        <Pie
          data={usersPerProjectData}
          cx="50%"
          cy="50%"
          label={renderCustomizedLabel}
          labelLine={false}
          outerRadius={200}
          fill="#8884d8"
          dataKey="organizationsPeopleCount"
        >
          {usersPerProjectData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
        </ResponsiveContainer>
        }
    </div>
  )
}

export default UsersPerProject;