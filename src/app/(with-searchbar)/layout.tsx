import { ReactNode } from "react";

type LayoutProps = Readonly<{ children: ReactNode }>;

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div>임시서치바</div>
      <div>{children}</div>
    </div>
  );
}
