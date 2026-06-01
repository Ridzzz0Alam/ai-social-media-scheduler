"use client"
import { usePathname } from 'next/navigation';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Calendar, CreditCard, Lightbulb, Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { getChannelIcon } from '@/constants/channels';
import { ChannelType } from '@/types/channel.type';

const mainNav = [
  { name: "Ideas", href: "/ideas", icon: Lightbulb },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const { data: channelsData, isPending } = useQuery({
    queryKey: ["channels"],
    queryFn: async () => {
      const res = await fetch("/api/channel");
      const data = await res.json();
      return data;
    },
  })

  const channels = (channelsData?.channels || []) as ChannelType[];
  const unconnectedChannels = channels.filter((channel: any) => !channel.connected);

  const connectedCount = channelsData?.connectedCount || 0; 
  const totalChannels = channelsData?.totalChannels || 0;
  const limitedChannels = unconnectedChannels.slice(0, 3);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className={cn("p-4", isCollapsed && "p-2")}>
        <div className="flex items-center justify-between">
          <Logo hideName={isCollapsed} />
          <SidebarTrigger className="hidden md:flex -mx-8 mb-0" />
        </div>
        <Button
          className="mt-4 w-full"
          size={isCollapsed ? "icon" : "lg"}
        >
          <Plus className="size-4" />
          {!isCollapsed && <span>New Post</span>}
        </Button>
      </SidebarHeader>

      <SidebarContent className={cn(!isCollapsed && "px-2")}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.name}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span className="text-[14.5px]">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

         {/* //connected channels section */}

         {/* //unconnected channels section */}
         {isPending ? (
            <div className="flex items-center justify-center py-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />   
            </div>
          ) : (
            limitedChannels.map((channel: any) => {
              const icon = getChannelIcon(channel.type)
              return (
                <SidebarMenuItem key={channel.id}>
                  <SidebarMenuButton>
                    <Link href={`/channels/${channel.id}`}>
                      <span className="text-[14.5px]">{channel.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })
          )} 
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;