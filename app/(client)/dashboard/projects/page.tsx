"use client"

import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";
import { Separator } from "@/src/components/ui/separator";
import { selectError, selectLoading, selectProjects } from "@/src/stores/selectors/projects.selector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/src/stores/stores";
import { fetchProjectsOverview } from "@/src/stores/actions/projects.actions";

const ProjectPage = () => {
  const projects = useSelector(selectProjects);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProjectsOverview());
  }, [dispatch]);

  return (
    <DashboardShell>
      <section className="w-full px-8">
        <div className="flex justify-between items-center mb-4">
          <h1>Projets</h1>
          <Link href="/dashboard/projects/new">
            <Button variant="outline">Nouveau projet</Button>
          </Link>
        </div>
        <Separator className="mb-4 bg-gradient" />
        <div className="grid gap-4">
          
          {isLoading && <p>Chargement...</p>}
          {error && <p>Erreur: {error}</p>}

          {projects.length === 0 ? (
            <p>Aucun projet pour le moment.</p>
          ) : (
            projects.map((project) => (
              <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
                <div key={project.id} className="border p-4 rounded">
                  <h2 className="font-semibold">{project.name}</h2>
                  <p className="text-muted-foreground text-sm">
                    {project.description || "Pas de description."}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </DashboardShell>
  );
};

export default ProjectPage;
