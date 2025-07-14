import Link from "next/link";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  sidebar: ReactNode;
  feed: ReactNode;
};

export default function Layout({ children, sidebar, feed }: LayoutProps) {
  return (
    <div>
      <div>
        <Link href={"/parallel"}>parallel</Link>
        &nbsp;
        <Link href={"/parallel/setting"}>parallel/setting</Link>
      </div>
      <br />
      {sidebar}
      {feed}
      {children}
    </div>
  );
}
