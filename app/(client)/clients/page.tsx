import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";
import UsersList from "@/src/blocks/users/UsersList";
import { UserMock } from "@/src/mock/client.mock";
import React from "react";

const ListClientPage: React.FC = () => {
  return (
    <DashboardShell>
      <section
        id="catalogue"
        className="relative flex-1 flex flex-col w-full p-4 items-center"
      >
        <UsersList users={UserMock} />
      </section>
    </DashboardShell>
  );
};

export default ListClientPage;
