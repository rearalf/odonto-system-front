import type { LucideIcon } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: LucideIcon;
};

export type BreadcrumbHandle = {
  name: string;
  icon?: LucideIcon;
};

export type BreadcrumbsProps = {
  items?: BreadcrumbItem[];
};