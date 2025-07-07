import Searchbar from "@/components/searchbar";
import { Props } from "@/types";

export default function Layout({ children }: Props) {
  return (
    <div>
      <Searchbar />
      <div>{children}</div>
    </div>
  );
}
