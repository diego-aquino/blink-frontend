import { Fragment } from 'react';

import ChevronIcon from '@/components/icons/common/ChevronIcon';
import { cn } from '@/utils/html';

import DashboardHeaderLink from './DashboardHeaderLink';

export interface Crumb {
  href: string;
  label: string;
  size?: 'md' | 'lg';
}

interface Props {
  crumbs: Crumb[];
}

function DashboardHeaderBreadCrumbs({ crumbs }: Props) {
  return (
    <div className="flex items-center space-x-1">
      {crumbs.map((crumb, index) => (
        <Fragment key={crumb.href}>
          <DashboardHeaderLink href={crumb.href}>
            <h2
              className={cn(
                'font-medium',
                (crumb.size === 'md' || crumb.size === undefined) && 'text-lg',
                crumb.size === 'lg' && 'text-2xl',
              )}
            >
              {crumb.label}
            </h2>
          </DashboardHeaderLink>

          {index < crumbs.length - 1 && <ChevronIcon className="h-7 w-7 text-indigo-400" />}
        </Fragment>
      ))}
    </div>
  );
}

export default DashboardHeaderBreadCrumbs;
