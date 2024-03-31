import ContentCalendar from "@/components/mainTabs/contentCalendar";
import Dashboard from "@/components/mainTabs/dashboard";
import Integrations from "@/components/mainTabs/integrations";
import SchedulerHub from "@/components/mainTabs/schedulerHub";
import Subscriptions from "@/components/mainTabs/subscriptions";
import { Calendar, HomeAlt1, LinkChain, Schedule, ShoppingBag } from "akar-icons";
import { TabsProps } from "antd";

export const navigationIcons = [HomeAlt1, Calendar, Schedule, LinkChain, ShoppingBag]

export const navigationItems: TabsProps['items'] = [
  {
    key: '1',
    label: 'Dashboard',
    children: <Dashboard/>,
  },
  {
    key: '2',
    label: 'Calendar',
    children: <ContentCalendar/>,
  },
  {
    key: '3',
    label: 'Scheduler Hub',
    children: <SchedulerHub/>,
  },
  {
    key: '4',
    label: 'Integrations',
    children: <Integrations/>,
  },
  {
    key: '5',
    label: 'Subscriptions',
    children: <Subscriptions/>,
  },
];