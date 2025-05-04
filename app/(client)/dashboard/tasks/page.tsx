// app/client/dashboard/tasks/page.tsx
"use client";

import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";
import { Separator } from "@/src/components/ui/separator";
import React from "react";

const TasksPage = () => {
  return (
    <DashboardShell>
      <section className="w-full px-8">
        <div className="flex justify-between items-center mb-4">
          <h1>Tasks page</h1>
        </div>
        <Separator className="mb-4 bg-gradient" />
      </section>
      <div className="grid gap-4 p-4">
        <p>Aucune tâche pour le moment.</p>
      </div>
    </DashboardShell>
  );
};

export default TasksPage;
