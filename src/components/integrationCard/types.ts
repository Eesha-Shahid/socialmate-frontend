import { IIntegration } from "@/redux/types/integrations/reducer";
import { Platform } from "@/types";
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { ComponentType, ForwardRefExoticComponent, SVGProps } from "react";

export interface IIntegrationCardProps {
    platform: Platform;
    icon: ComponentType<CustomIconComponentProps | SVGProps<SVGSVGElement>> | ForwardRefExoticComponent<CustomIconComponentProps> | undefined;
    data: IIntegration | null;
    onToggle: () => void;
    onDelete: () => void;
}