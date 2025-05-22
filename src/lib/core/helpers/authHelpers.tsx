import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/core/hooks/useHooks";
import { useEffect } from "react";

export function hasPrivilege(
  permission: string[],
  pathName: string,
  action: string,
  endpoint?: string
) {
  let currentPath0 = pathName.substring(1);
  let explodePath = currentPath0.split("/");
  let currentPath = explodePath.join(".");

  // Exsum
  if (currentPath == "executive-summary") currentPath = "exsum";

  // Penetapan
  if (currentPath == "penetapan.objek") currentPath = "penetapan.objectUpr";
  if (currentPath == "penetapan.konteks-strategis")
    currentPath = "penetapan.eksplorasiKonteks";

  // Manajemen
  if (currentPath == "manajemen-role") currentPath = "manajemenRole";
  if (currentPath == "manajemen-user") currentPath = "manajemenUser";

  currentPath = endpoint != undefined ? endpoint : currentPath;

  return permission.filter((x) => x === currentPath + "." + action).length > 0;
}

export const usePermissionChecker = (endpoint?: string) => {
  const router = useRouter();
  const { permission } = useAuthContext((state) => state);
  const pathname = usePathname();

  useEffect(() => {
    if (
      permission.length > 0 &&
      !hasPrivilege(permission, pathname, "list", endpoint)
    ) {
      sessionStorage.clear();
      router.replace("/login");
    }
    if (permission.length == 0) {
      router.replace("/");
    }
  }, [permission]);
};
