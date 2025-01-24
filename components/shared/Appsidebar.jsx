
import { Calendar, Home, Inbox, Search, Settings,ChevronUp,Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { permanentRedirect } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button";

export const  Appsidebar=({useremail,userid})=> {
  const items = [
    {
      title: "New Chat",
      url: "/home",
      icon: Plus,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]
  const logout = () => {
              document.cookie = 'sessionId-forAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
              permanentRedirect('/sign');
            };
  const username=useremail.split('@');
  return (
    <Sidebar>
      <SidebarHeader >
        <SidebarContent>
          <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-lg text-white">Application</SidebarGroupLabel>
          </SidebarGroup>
        </SidebarContent>
      </SidebarHeader>
      <SidebarContent className="bg-[#171717]">
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-sm text-white">Your Previous searches</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="pt-10">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a  href={item.url}>
                      <item.icon />
                      <span className="font-semibold text-xs text-white">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-5 dark">
      <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <h2 className="text-xs font-semibold">{`@${username[0]}`}</h2>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width] dark:"
                >
                  <DropdownMenuItem className="dark">
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="dark">
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="dark">
                    <span onClick={logout}>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default Appsidebar;