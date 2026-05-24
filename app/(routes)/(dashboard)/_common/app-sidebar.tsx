import Logo from '@/components/logo';
import { Sidebar, SidebarHeader, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Calendar, CreditCard, Lightbulb, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';


const mainNav = [
  { name: "Ideas", href: "/ideas", icon: Lightbulb },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];


const AppSidebar = () => {
  const pathname = usePathname();
  const {state} = useSidebar();
  const isCollapsed = state === "collapsed";
  
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className={cn("p-4", isCollapsed && "p-2")}></SidebarHeader>
      <div className="flex items-center justify-between">
        <Logo hideName={isCollapsed}/>
        <SidebarTrigger className="hidden md:flex -mx-8 mb-0"/>
      </div>
    </Sidebar>
  )
}

export default AppSidebar