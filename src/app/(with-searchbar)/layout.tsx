import Searchbar from "@/components/searchbar";
import { type LayoutProps } from "@/types";

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
