import Button from './button';
import { scrollStyles } from '@/shared/utils/scroll';

import type { NavTabsProps } from './types/NavTabs';

const NavTabs = <T extends string>({
  label,
  ariaLabel,
  tabs,
  activeTab,
  onTabChange,
}: NavTabsProps<T>) => {
  return (
    <section
      className={scrollStyles.thin + ' flex items-center gap-3 mt-6 py-3 px-2'}
      role="tablist"
      aria-label={ariaLabel ?? label}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          size="sm"
          variant={activeTab === tab.key ? 'solid' : 'ghost'}
          className="whitespace-nowrap"
          role="tab"
          aria-selected={activeTab === tab.key}
          onClick={() => onTabChange(tab.key)}
          icon={tab.icon}
        >
          {tab.label}
        </Button>
      ))}
    </section>
  );
};

export default NavTabs;
