import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { CreateUser, FormStatus, TableStatus, User } from "../types/types";

export const capitalizeFirstLetter = (string: String) =>
  string
    ?.split(" ")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join(" ");

export const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setFormData: Dispatch<SetStateAction<CreateUser>>,
  formData: CreateUser
) => {
  e.preventDefault();
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

export const handleAddUserClick = (
  setOpenForm: Dispatch<SetStateAction<FormStatus>>,
  setFormData: Dispatch<SetStateAction<CreateUser>>
) => {
  setOpenForm({ status: true, title: "Add User" });
  setFormData({
    title: "",
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
  });
};

export const handleSubmit = (
  e: FormEvent<HTMLFormElement>,
  formData: CreateUser,
  setCreatedDataStatus: Dispatch<SetStateAction<boolean>>,
  setFormData: Dispatch<SetStateAction<CreateUser>>,
  setOpenForm: Dispatch<SetStateAction<FormStatus>>
) => {
  console.log("form", formData);
  e.preventDefault();
  fetch(
    /* `http://localhost:8080/api/v1/users` */ `https://crud-backend-delta.vercel.app/api/v1/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      setCreatedDataStatus(data?.status);
      if (data?.status) {
        setFormData({
          title: "",
          firstName: "",
          lastName: "",
          gender: "",
          age: "",
          email: "",
          phone: "",
        });
        setOpenForm({ status: false, title: "" });
      }
    });
};

export const handleEdit = (
  _id: string,
  user: CreateUser,
  setOpenForm: Dispatch<SetStateAction<FormStatus>>,
  setFormData: Dispatch<SetStateAction<CreateUser>>,
  setUserId: Dispatch<SetStateAction<string>>
) => {
  // const navigate=useNavigate()
  console.log("id", _id, "user", user);
  setUserId(_id);
  setOpenForm({ status: true, title: "Update User" });
  setFormData({
    title: user.title,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    age: user.age,
    email: user.email,
    phone: user.phone,
  });
};

export const handleUpdateSubmit = (
  e: FormEvent<HTMLFormElement>,
  formData: CreateUser,
  setCreatedDataStatus: Dispatch<SetStateAction<boolean>>,
  setFormData: Dispatch<SetStateAction<CreateUser>>,
  userId: string,
  setOpenForm: Dispatch<SetStateAction<FormStatus>>
) => {
  console.log("formData", formData);
  e.preventDefault();
  fetch(`https://crud-backend-delta.vercel.app/api/v1/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      setCreatedDataStatus(data?.status);
      if (data?.status) {
        setFormData({
          title: "",
          firstName: "",
          lastName: "",
          gender: "",
          age: "",
          email: "",
          phone: "",
        });
        setOpenForm({ status: false, title: "" });
      }
    });
};

export const handleDelete = (
  _id: string,
  setUsers: Dispatch<SetStateAction<User[]>>
) => {
  const confirmDelete = window.confirm(
    "Are you sure? you want to dlete this data!"
  );
  if (!confirmDelete) return;

  fetch(`https://crud-backend-delta.vercel.app/api/v1/users/${_id}`, {
    method: "DELETE",
  });

  setUsers((prev) => prev?.filter((users) => users?._id !== _id));
};

export const handleTableStatusChange = (
  e: ChangeEvent<HTMLSelectElement>,
  setTableStatus: Dispatch<SetStateAction<TableStatus>>,
  tableStatus: TableStatus
) => {
  e.preventDefault();
  const { value } = e.target;
  console.log("value", value, tableStatus);

  setTableStatus((prev) => ({ ...prev, size: +value }));
};
