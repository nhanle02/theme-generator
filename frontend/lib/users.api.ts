import apiFetch from "./api";

export type User = {
  id:number;

  google_id:string;

  email:string;

  name:string;

  avatar_url:string;

  credit_balance:number;

  created_at:string;

  updated_at:string;
};

export const getUsers = () => apiFetch<User[]>("/users");