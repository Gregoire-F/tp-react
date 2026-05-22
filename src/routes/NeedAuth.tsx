import type { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../store/store";

export default function NeedAuth({}: PropsWithChildren) {
  const token = useAppSelector((s) => s.auth.token);

  return token ? <Outlet /> : <Navigate to="/login" />;
}
