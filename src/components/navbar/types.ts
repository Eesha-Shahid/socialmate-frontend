import { ReactNode } from "react";

export interface IItem {
  key: string; 
  label: string;
  icon: any;
  content: string;
}

export interface TopNavigationProps {
  items: IItem[];
}