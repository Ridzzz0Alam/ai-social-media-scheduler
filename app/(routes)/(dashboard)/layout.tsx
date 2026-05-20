import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Sidebar } from 'lucide-react';
import React from 'react'
import AppSidebar from './_common/app-sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-sidebar! border-none"
        > 
            <div className="m-1 px-4 rounded-lg border border-border
            dark:border">
                <div className="py-2 px-3">{children}</div>
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}   