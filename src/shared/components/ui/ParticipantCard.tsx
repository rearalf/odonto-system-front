import type { ReactNode } from 'react';

export interface ParticipantCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

function ParticipantCard({ icon, title, children }: ParticipantCardProps) {
  return (
    <section className="rounded-2xl border border-border-default bg-bg-surface p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3 border-b border-border-default pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h2 className="text-headline-sm font-semibold text-text-primary">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default ParticipantCard;
