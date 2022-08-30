import { useRouter } from "next/router";
import * as React from "react";
import { authAPI } from "../api-client";
import { useAuth } from "../hooks";

export default function LoginPage() {
  const router = useRouter();
  const { profile, login, logout } = useAuth({
    revalidateOnMount: false,
  });
  const handleLogin = async () => {
    try {
        await login()
        router.push("/about")
        console.log("redirect to login page");
    } catch (error) {
        console.log("failed to login", error);
    }
  };
  // const handleGetProfile = async () => {
  //   try {
  //       await authAPI.getProfile();
  //   } catch (error) {
  //       console.log("failed to get profile", error);
  //   }
  // };
  const handleLogout = async () => {
    try {
        await logout();
        console.log("redirect to logout page");
    } catch (error) {
        console.log("failed to log out", error);
    }
  };
  return (
    <div>
      <h1>Login Page</h1>
      <p> profile: {JSON.stringify(profile || {}, null, 4)}</p>
      <button onClick={handleLogin}>login</button>
      {/* <button onClick={handleGetProfile}>get profile</button> */}
      <button onClick={handleLogout}>logout</button>
      <button onClick={() => {router.push('/about');}}>go to about</button>
    </div>
  );
}
