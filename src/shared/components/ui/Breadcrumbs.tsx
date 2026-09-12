import { NavLink, useMatches } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type {
  BreadcrumbItem,
  BreadcrumbHandle,
  BreadcrumbsProps,
} from '@/shared/types/breadcrumbs';

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const matches = useMatches();

  const crumbs: BreadcrumbItem[] =
    items ??
    matches
      .filter((match) => {
        const handle = match.handle as BreadcrumbHandle | undefined;
        return Boolean(handle?.name);
      })
      .map((match) => {
        const handle = match.handle as BreadcrumbHandle;
        return {
          label: handle.name,
          href: match.pathname,
          icon: handle.icon,
        };
      });

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-y-1.5 m-0 p-0 list-none">
        {crumbs.map((crumb, index) => {
          const isCurrent = index === crumbs.length - 1;
          const Icon = crumb.icon;

          const content = (
            <>
              {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
              {crumb.label}
            </>
          );

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight
                  aria-hidden="true"
                  className="w-3.5 h-3.5 mx-1.5 shrink-0 text-text-secondary dark:text-slate-500"
                />
              )}

              {isCurrent ? (
                <span
                  aria-current="page"
                  className="flex items-center gap-1.5 font-semibold text-primary truncate"
                >
                  {content}
                </span>
              ) : crumb.href ? (
                <NavLink
                  to={crumb.href}
                  key={crumb.href}
                  className="flex items-center gap-1.5 rounded-sm text-text-secondary dark:text-slate-300 transition-colors hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                >
                  {content}
                </NavLink>
              ) : (
                <span className="flex items-center gap-1.5 text-text-secondary dark:text-slate-300">
                  {content}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
