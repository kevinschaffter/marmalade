export type User = {
  id: string;
  name: string;
};

export type UserDetail = {
  userId: string;
  role: string;
  createdAt: string;
};

export type UsersResponse = {
  users: User[];
};

export type UserDetailsResponse = {
  details: UserDetail[];
};
