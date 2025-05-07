import React from "react";
import { DashboardSidebar } from "../../components/Dashboard/DashBoard-sidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { SiteHeader } from "../../components/Dashboard/site-header";
import { SectionCards } from "../../components/Dashboard/section-cards";
import { ChartAreaInteractive } from "../../components/Dashboard/ChartAreaInteractive";

function Dashboard() {
  return (
    <div>
      <SidebarProvider>
        <DashboardSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default Dashboard;
