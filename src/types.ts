import { ReactNode } from "react";

export type ErrorProps = {
  error: Error;
  reset: () => void;
};

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

export interface ReviewData {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  bookId: number;
}
