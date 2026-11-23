import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

function PrivateLayout() {
  return (
    <div className="flex h-dvh bg-bg-app">
      <main className={clsx('flex-1 overflow-y-auto p-6 pt-20')}>
        <Outlet />
      </main>
    </div>
  );
}

export default PrivateLayout;
