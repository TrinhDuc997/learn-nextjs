import { LayoutProps } from "@/models/index";
import Link from "next/link";
import * as React from "react";

export interface IAdminLayoutProps {}

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div>
      <h1>Main Layout</h1>
      <div>Slidebar</div>
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
