import { ReactNode } from "react";

interface IItem {
  key: string; 
  label: string;
  icon: any;
  route: string;
}

export interface TopNavigationProps {
  items: IItem[];
}