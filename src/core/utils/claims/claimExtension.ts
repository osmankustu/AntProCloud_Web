interface TokenPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  EmployeeId: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string[];
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/name": string;
}

export function GetNameidentifier(token: object): string {
  const payload = token as TokenPayload;

  return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
}

export function GetEmployeeId(token?: object): string {
  const payload = token as TokenPayload;

  return payload.EmployeeId;
}

export function GetRoleClaims(token: object): string[] {
  const payload = token as TokenPayload;
  const roles = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] as String[];

  return (Array.isArray(roles) ? roles : roles ? [roles] : []).map(role => role.toLowerCase());
}

export function GetClaimName(token: object): string {
  const payload = token as TokenPayload;

  return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/name"];
}
