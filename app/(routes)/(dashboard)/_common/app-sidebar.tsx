"use client"
import { usePathname } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Calendar, CreditCard, Lightbulb, Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { getChannelIcon, getChannelUrl } from '@/constants/channels';
import { ChannelType } from '@/types/channel.type';
import { PlusSignIcon } from '@hugeicons/core-free-icons';
import { UserButton } from '@clerk/nextjs';
import ChannelAvatar from '@/components/channel-avatar';


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
  const connectedChannels = channels.filter((channel: any) => channel.connected);

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
         {connectedChannels.length > 0 && ( 
          <SidebarGroup className={cn(isCollapsed && "px-1")}>
          <SidebarGroupLabel>Channels</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {isPending ? (
            <div className="flex items-center justify-center py-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />   
            </div>
          ) : (
            <>
            {connectedChannels.map((channel: ChannelType) => {
              const url = getChannelUrl(channel.type)
              return (
                <SidebarMenuItem key={channel.id}>
                  <SidebarMenuButton asChild>
                    <a
                    href={`${url}/${channel.handle}`}
                    target='_blank' rel='noreferrer'
                    className='w-full flex items-center gap-2'
                    >
                      <ChannelAvatar 
                      size="sm"
                      className="w-full flex items-center gap-2"
                      type={channel.type}
                      color={channel.color}
                      profileImage={channel.profile_image}
                      name={!isCollapsed ? (channel.handle || channel.name) : ""}
                      />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
            </>
            )}
            </SidebarMenu>
          </SidebarGroupContent>
         </SidebarGroup>
         )}


         {/* //unconnected channels section */}
         <SidebarGroup className={cn(isCollapsed && "px-1")}>
          <SidebarGroupLabel>Connect Channels</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {isPending ? (
            <div className="flex items-center justify-center py-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />   
            </div>
          ) : (
            <>
            {limitedChannels.map((channel: ChannelType) => {
              const icon = getChannelIcon(channel.type)
              return (
                <SidebarMenuItem key={channel.id}>
                  <SidebarMenuButton asChild
                  tooltip={`Connect ${channel.name}`}
                  >
                    <button
                    className='w-full flex items-center gap-2'
                    >
                      <span className="text-[14.5px]">
                        <div>
                          {
                            icon?(
                              <HugeiconsIcon icon={icon} color="currentColor"
                              className='text-white! size-6! p-1 rounded-sm'
                              style={{background: channel.color}}
                              />
                            ) : null
                          }
                          <div className={`absolute -right-1 bottom-0 p-0.5
                            bg-white dark:bg-background rounded-xs
                            `}>
                              <HugeiconsIcon icon={PlusSignIcon} className='size-2!' />
                          </div>
                        </div>
                      </span>
                      <span className="truncate">{channel.name}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button asChild variant="ghost" className="w-full justify-start mt-1">
                  <Link href="/settings" className='w-full flex items-center gap-2'>
                    <HugeiconsIcon icon={PlusSignIcon} className='size-4' />
                    <span className="text-sm">More Channels</span>
                  </Link>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            </>
            )}
            </SidebarMenu>
          </SidebarGroupContent>
         </SidebarGroup>  
      </SidebarContent>
      <SidebarFooter>
        <div className='mb-3 text-xs text-muted-foreground'>
          <span>
            {connectedCount}/{totalChannels} channels connected
          </span>
        </div>
        <div>
          <UserButton
          showName={false}
          appearance={{
            elements:{
              avatarBox: "h-8 w-8"
            },
          }}
          />
          <span className='text-sm'></span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;