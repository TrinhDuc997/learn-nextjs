import { LayoutProps } from "@/models/index";
import Link from "next/link";
import React, { useEffect} from "react";

export interface IMainLayoutProps {}

export default function MainLayout({ children }: LayoutProps) {
  useEffect(() => {
    console.log("Main Layout mounting...");
    return () => (console.log("main Layout unmounting..."));
  }, [])
  return (
    <div>
      <h1>Main Layout</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>about</a>
      </Link>
      <div>{children}</div>
    </div>
  );
}
