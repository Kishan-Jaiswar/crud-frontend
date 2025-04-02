import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  capitalizeFirstLetter,
  handleAddUserClick,
  handleDelete,
  handleEdit,
  handleTableStatusChange,
} from "../helpers/helper";
import { CreateUser, FormStatus, TableStatus, User } from "../types/types";
import Form from "./Form";

const Table: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  console.log("users", users?.length);
  const [tableStatus, setTableStatus] = useState<TableStatus>({
    page: 1,
    size: 10,
  });
  const [createdDataStatus, setCreatedDataStatus] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<FormStatus>({
    status: false,
    title: "",
  });
  const [formData, setFormData] = useState<CreateUser>({
    title: "",
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
  });
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    navigate(
      `api/v1/users?page=${tableStatus?.page}&size=${tableStatus?.size}`
    );

    fetch(
      `http://localhost:8080/api/v1/users?page=${tableStatus?.page}&size=${tableStatus?.size}`
    )
      .then((res) => res.json())
      .then((data) => setUsers(data?.data))
      .catch((err) => console.log("Error while fetching users:", err.message));
  }, [createdDataStatus, tableStatus]);

  return (
    <div className="relative">
      <div className="border-2 border-gray-300 rounded-lg p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Users</h1>
          <div className="flex">
            <button
              className="md:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition"
              onClick={() => handleAddUserClick(setOpenForm, setFormData)}
            >
              Add User
            </button>
          </div>
        </div>
        <div className="">
          <table className="min-w-full bg-white border border-gray-100 text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-6 border-b">Title</th>
                <th className="py-3 px-6 border-b">First Name</th>
                <th className="py-3 px-6 border-b">Last Name</th>
                <th className="py-3 px-6 border-b">ID</th>
                <th className="py-3 px-6 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                users.map((user, index) => {
                  const { title, firstName, lastName, _id } = user;
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-200 transition border-b"
                    >
                      <td className="py-3 px-6">
                        {capitalizeFirstLetter(title)}
                      </td>
                      <td className="py-3 px-6">
                        {capitalizeFirstLetter(firstName)}
                      </td>
                      <td className="py-3 px-6">
                        {capitalizeFirstLetter(lastName)}
                      </td>
                      <td className="py-3 px-6">{_id}</td>
                      <td className="py-3 px-6">
                        <div className="flex justify-center space-x-4">
                          <span
                            className="text-blue-500 cursor-pointer hover:text-blue-700"
                            onClick={() =>
                              handleEdit(
                                _id,
                                user,
                                setOpenForm,
                                setFormData,
                                setUserId
                              )
                            }
                          >
                            ✏️
                          </span>
                          <span
                            className="text-red-500 cursor-pointer hover:text-red-700"
                            onClick={() => handleDelete(_id, setUsers)}
                          >
                            🗑️
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700"
              >
                Size
              </label>
              <select
                name="size"
                id="size"
                onChange={(e) =>
                  handleTableStatusChange(e, setTableStatus, tableStatus)
                }
                value={tableStatus.size}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                className={`md:w-auto ${
                  tableStatus?.page === 1
                    ? `bg-blue-200`
                    : `bg-blue-500 hover:bg-blue-600 transition`
                } text-white px-6 py-3 rounded-lg shadow-lg`}
                onClick={() =>
                  setTableStatus((prev) => ({
                    ...prev,
                    page: prev?.page > 1 ? prev?.page - 1 : 1,
                  }))
                }
                disabled={tableStatus?.page === 1}
              >
                Previous
              </button>
              <button
                className={`md:w-auto ${
                  users?.length < 10
                    ? "bg-blue-200"
                    : "bg-blue-500 hover:bg-blue-600 transition"
                } text-white px-6 py-3 rounded-lg shadow-lg`}
                onClick={() =>
                  setTableStatus((prev) => ({ ...prev, page: prev?.page + 1 }))
                }
                disabled={users?.length < 10}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {openForm.status && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-1/2">
            <Form
              openForm={openForm}
              setOpenForm={setOpenForm}
              formData={formData}
              setFormData={setFormData}
              setCreatedDataStatus={setCreatedDataStatus}
              userId={userId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
