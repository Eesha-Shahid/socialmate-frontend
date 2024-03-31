import { ContentCalendar, Dashboard, Integrations, SchedulerHub, Subscriptions } from "@/app";
import { Calendar, HomeAlt1, LinkChain, Schedule, ShoppingBag } from "akar-icons";
import { TabsProps } from "antd";

export const icons = [HomeAlt1, Calendar, Schedule, LinkChain, ShoppingBag]

export const items: TabsProps['items'] = [
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