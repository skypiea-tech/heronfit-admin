<script setup>
import { LayoutGrid, FileText, UsersRound, CalendarDays, Bell, ChartColumn,} from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutGrid,
  },
  {
    title: "Booking Management",
    url: "#",
    icon: FileText,
  },
  {
    title: "User Management",
    url: "#",
    icon: UsersRound,
  },
  {
    title: "Schedule Management",
    url: "#",
    icon: CalendarDays,
  },
  {
    title: "Announement",
    url: "#",
    icon: Bell,
  },
  {
    title: "Analytics",
    url: "#",
    icon: ChartColumn,
  },
];
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <div class="m-5 mt-8">
            <img class='h-50 w-60' src="/resources/assets/img/HF_logo_trans.png" alt="HFLogo" />
        </div>
        <SidebarGroupContent>
          <SidebarMenu>
              <div class='m-4'>
                <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                    <a class="mt-5" :href="item.url">
                      <component  :is="item.icon" />
                      <span class="text-lg font-sans font-semibold">{{item.title}}</span>
                    </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>