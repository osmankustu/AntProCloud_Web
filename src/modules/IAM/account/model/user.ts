export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
  authenticatorType: number;
}

export interface UserChangePasswordModel {
  password: string;
  newPassword: string;
}
