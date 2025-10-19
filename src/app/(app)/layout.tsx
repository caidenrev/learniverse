import { AppSidebar } from '@/components/app-sidebar';
import { Logo } from '@/components/logo';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { type ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card px-4 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SidebarTrigger className="sm:hidden" />
          <div className="sm:hidden">
            <Logo withText={true} />
          </div>
        </header>
        <main className="flex-1 p-4 pt-0 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
