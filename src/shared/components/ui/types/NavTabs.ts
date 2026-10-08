import type { ReactNode } from 'react';

export interface NavTabItem<T extends string = string> {
  key: T;
  label: string;
  icon?: ReactNode;
}

export interface NavTabsProps<T extends string = string> {
  label: string;
  ariaLabel?: string;
  tabs: readonly NavTabItem<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
}
