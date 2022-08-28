import * as React from "react";
import { authAPI } from "../api-client";

export default function LoginPage() {
  const handleLogin = async () => {
    try {
        await authAPI.login({
            username: "test",
            password: "test123"
        });
    } catch (error) {
        console.log("failed to login", error);
    }
  };
  const handleGetProfile = async () => {
    try {
        await authAPI.getProfile();
    } catch (error) {
        console.log("failed to get profile", error);
    }
  };
  const handleLogout = async () => {
    try {
        await authAPI.logOut();
    } catch (error) {
        console.log("failed to log out", error);
    }
  };
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>login</button>
      <button onClick={handleGetProfile}>get profile</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
