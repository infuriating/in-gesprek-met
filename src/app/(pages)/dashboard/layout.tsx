import { currentUser } from "@clerk/nextjs";
import RoleChecker from "./components/RoleChecker";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const role = user?.publicMetadata.role;

  return <RoleChecker role={role}>{children}</RoleChecker>;
}
