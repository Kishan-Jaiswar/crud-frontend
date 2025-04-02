import { Dispatch, SetStateAction } from "react";

export interface User {
  _id: string;
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateUser {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  email: string;
  phone: string;
}

export interface TableProps {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  createdDataStatus: boolean;
}

export interface FormStatus {
  status: boolean;
  title: string;
}

export interface FormProps {
  openForm: FormStatus;
  setOpenForm: Dispatch<SetStateAction<FormStatus>>;
  formData: CreateUser;
  setFormData: Dispatch<SetStateAction<CreateUser>>;
  setCreatedDataStatus: Dispatch<SetStateAction<boolean>>;
  userId: string;
}

export interface TableStatus {
  page: number;
  size: number;
}
