import { DashboardShell } from '@/src/blocks/dashboardBlocks/DashboardShell';
import UsersList from '@/src/blocks/users/UsersList';
import { UserMock } from '@/src/mock/client.mock';
import React from 'react';

const ListClientPage: React.FC = () => {
    return (
    <DashboardShell>
      <section id="catalogue" className="relative flex-1 justify-between flex flex-col p-4">
        <UsersList users={UserMock}/>
      </section>
    </DashboardShell>
    );
};

export default ListClientPage;