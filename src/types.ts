import { ReactNode } from "react";

export type LayoutProps = Readonly<{ children: ReactNode }>;

export interface BookData {
  id: number;
  title: string;
  subTitle: string;
  author: string;
  publisher: string;
  description: string;
  coverImgUrl: string;
}
