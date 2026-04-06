import type { PropsWithChildren } from "react";

export function PageWrapper({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-1 flex-col overflow-clip">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 -top-18 h-[34rem] w-[34rem] rounded-full border border-brand-copper/25" />
        <div className="absolute right-[-10rem] top-18 h-[30rem] w-[42rem] rounded-full border border-brand-copper/18" />
        <div className="absolute bottom-[-14rem] right-[-6rem] h-[28rem] w-[28rem] rounded-full border border-brand-copper/16" />
        <div className="absolute left-[10%] top-[35%] h-[28rem] w-[28rem] rounded-full bg-brand-accent/6 blur-[140px]" />
        <div className="absolute right-[8%] top-[18%] h-[20rem] w-[20rem] rounded-full bg-brand-ember/8 blur-[120px]" />
      </div>
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </div>
  );
}
