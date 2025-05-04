"use client";

import React, { useEffect } from "react";
import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";
import { Separator } from "@/src/components/ui/separator";
import { ProjectDetails } from "@/src/blocks/admins/projects/ProjectDetails";
import { selectProjectById } from "@/src/stores/selectors/projects.selector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/src/stores/stores";
import { fetchProjectById } from "@/src/stores/actions/projects.actions";
import TasksList from "@/src/blocks/admins/tasks/Tasklist";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { FileText, Kanban, List } from "lucide-react";
import KanbanBoard from "@/src/blocks/admins/kanban/KanbanBoard";

type Props = {
  params: { id: string };
};

const ProjectByIdPage = ({ params }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const project = useSelector(selectProjectById);
  const projectId = params.id;

  useEffect(() => {
    dispatch(fetchProjectById(projectId));
  }, [dispatch, projectId]);

  if (!project || !projectId) {
    return (
      <DashboardShell>
        <section className="size-full px-8">
          <p>Chargement du projet...</p>
        </section>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <section className="size-full px-8">
        <Separator className="mb-4 bg-gradient" />
        <Tabs defaultValue="project" className="w-full mt-4">
          <TabsList className="w-full justify-between">
            <TabsTrigger value="project" className="w-full text-center !text-sm">
              <FileText className="mr-2 h-4 w-4" /> Détails du projet
            </TabsTrigger>
            <TabsTrigger value="backlog" className="w-full text-center !text-sm">
              <List className="mr-2 h-4 w-4" /> Backlog
            </TabsTrigger>
            <TabsTrigger value="kanban" className="w-full text-center !text-sm">
             <Kanban className="mr-2 h-4 w-4" /> Kanban
            </TabsTrigger>
          </TabsList>
          <TabsContent value="project" className="mt-4">
            <ProjectDetails project={project} />
          </TabsContent>
          <TabsContent value="backlog" className="mt-4">
            <TasksList project={project} />
          </TabsContent>
          <TabsContent value="kanban" className="mt-4">
            <KanbanBoard projectId={projectId} />
          </TabsContent>
        </Tabs>
      </section>
    </DashboardShell>
  );
};

export default ProjectByIdPage;
