// hooks/usePermission.ts

import { useUserStore } from "@/modules/IAM/account/store/useUserStore";

export function usePermission() {
  const { roles } = useUserStore();

  const hasRole = (role: string) => roles?.includes(role.toLocaleLowerCase());

  const hasPermission = (perm?: string) => {
    if (!perm) return false;
    const check = perm?.toLocaleLowerCase();

    // tenant.admin ise full access
    if (hasRole("admin")) return true;

    // wildcard desteği
    // "service.*" gibi role varsa, tüm service alt izinlerini aç
    const [prefix] = check.split(".");
    if (roles?.includes(`${prefix}.*`)) {
      return true;
    }

    return roles?.includes(check!);
  };

  return { roles, hasRole, hasPermission };
}
