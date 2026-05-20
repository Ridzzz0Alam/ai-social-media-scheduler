import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Sidebar } from 'lucide-react';
import React from 'react'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
        <SidebarInset className="bg-sidebar! border-none"
        >
            <div>

                {children}
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}   