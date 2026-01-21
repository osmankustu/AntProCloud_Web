import { create } from "zustand";
import { persist } from "zustand/middleware";

import { PersonelModel, PersonelUpdateModel } from "../../../WFM/employee/model/personel";
import { UserChangePasswordModel, UserModel } from "../model/user";
import { GetIdentityUser, GetPersonelFromTenant } from "../service/userService";
import { GetUserRoles } from "@/core/utils/token/tokenHandler";

interface UserState {
  user: PersonelModel | null;
  fetchUser: () => Promise<void>;

  updateFormData: PersonelUpdateModel;
  setUpdateField: (field: keyof PersonelUpdateModel, value: string) => void;
  setUpdateForm: (data: PersonelUpdateModel) => void;

  identityUser: UserModel | null;
  fetchIdentityUser: () => Promise<void>;
  roles: string[] | null;

  changePasswordForm: UserChangePasswordModel;

  setFormField: (field: keyof UserChangePasswordModel, value: string) => void;
  setFormData: (data: UserChangePasswordModel) => void;

  fetchAccountRoles: () => string[];

  isLoading: boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      identityUser: null,
      roles: null,
      isLoading: false,

      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const data = await GetPersonelFromTenant();
          set({ user: data });
        } catch (error) {
          console.error("fetchUser error", error);
        } finally {
          set({ isLoading: false });
        }
      },

      updateFormData: {
        birthDate: "",
        createdDate: "",
        departmentId: 0,
        email: "",
        firstName: "",
        hireDate: "",
        id: "",
        avatarUrl: "",
        isActive: true,
        position: "",
        lastName: "",
        code: "",
        phone: "",
        updateAt: "",
      },

      setUpdateField: (field, value) => {
        set(state => ({
          updateFormData: {
            ...state.updateFormData,
            [field]: value,
          },
        }));
      },

      fetchIdentityUser: async () => {
        set({ isLoading: true });
        try {
          const data = await GetIdentityUser();

          set({ identityUser: data });
        } catch (error) {
          console.error("fetchUser error", error);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchAccountRoles: () => {
        var roles = GetUserRoles();
        set({ roles: roles });
        return roles;
      },

      changePasswordForm: {
        newPassword: "",
        password: "",
      },

      setFormField: (field, value) => {
        set(state => ({
          changePasswordForm: {
            ...state.changePasswordForm,
            [field]: value,
          },
        }));
      },

      setUpdateForm: data => set({ updateFormData: data }),
      setFormData: data => set({ changePasswordForm: data }),
    }),
    {
      name: "login-user", // localStorage anahtarı
      partialize: state => ({
        user: state.user,
        identityUser: state.identityUser,
      }), // sadece `user` saklansın
    },
  ),
);
