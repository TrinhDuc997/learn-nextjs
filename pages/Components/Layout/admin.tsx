import { LayoutProps } from "@/models/index";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useAuth } from "../../../hooks";
import { AuthLayout } from "../Common";

export interface IAdminLayoutProps {}

export default function AdminLayout({ children }: LayoutProps) {
  const { logout } = useAuth({
    revalidateOnMount: false,
  });
  const router = useRouter();
  const handleLogout = async () => {
    try {
        await logout();
        router.push("/login");
        console.log("redirect to logout page");
    } catch (error) {
        console.log("failed to log out", error);
    }
  };
  return (
    <AuthLayout>
      <h1>Main Layout</h1>
      <div>Slidebar</div>
      <button onClick={handleLogout}>Logout</button>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>about</a>
      </Link>
      <div>{children}</div>
    </AuthLayout>
  );
}
