enum EntityType {
  USER = "USER",
  TENANT = "TENANT",
  CUSTOMER = "CUSTOMER",
}
enum UserRole {
  MANAGER = "MANAGER",
}

interface EntityId {
  entityType: EntityType;
  id: string;
}

interface AdditionalInfo {
  userCredentialsEnabled: boolean;
  failedLoginAttempts: number;
  lastLoginTs: number;
}

export interface User {
  id: EntityId;
  createdTime: number;
  additionalInfo: AdditionalInfo;
  tenantId: EntityId;
  customerId: EntityId;
  email: string;
  authority: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string | null;
  name: string;
  username: string;
  address: string | null;
  role: UserRole;
}
