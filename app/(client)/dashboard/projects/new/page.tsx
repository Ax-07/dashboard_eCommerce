"use client";
// app/(client)/dashboard/projects/new/page.tsx

import React from 'react';
import AddNewProjectForm from '@/src/blocks/admins/projects/AddNewProjectForm';
import { DashboardShell } from '@/src/blocks/dashboardBlocks/DashboardShell';
import { Separator } from '@/src/components/ui/separator';

const NewProjectsPage = () => {
    return (
        <DashboardShell>
        <section className='container w-full'>
            <header className='bg-primary/10 pt-4 rounded-t-2xl'>
                <h1 className='text-center'>Créer un nouveau projet</h1>
                <Separator className='bg-primary my-4'/>
            </header>
            <AddNewProjectForm />
        </section>
        </DashboardShell>
    );
};

export default NewProjectsPage;