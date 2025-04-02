import {
  handleChange,
  handleSubmit,
  handleUpdateSubmit,
} from "../helpers/helper";
import { FormProps } from "../types/types";

const Form: React.FC<FormProps> = ({
  openForm,
  setOpenForm,
  formData,
  setFormData,
  setCreatedDataStatus,
  userId,
}) => {
  return (
    <div className="border-2 border-gray-300 bg-gray-50 rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">{openForm.title}</h1>
        <span
          className="cursor-pointer"
          onClick={() => setOpenForm({ status: false, title: "" })}
        >
          ❌
        </span>
      </div>
      <form
        onSubmit={(e) =>
          openForm?.title === "Add User"
            ? handleSubmit(
                e,
                formData,
                setCreatedDataStatus,
                setFormData,
                setOpenForm
              )
            : handleUpdateSubmit(
                e,
                formData,
                setCreatedDataStatus,
                setFormData,
                userId,
                setOpenForm
              )
        }
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Title Select */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <select
            name="title"
            id="title"
            onChange={(e) => handleChange(e, setFormData, formData)}
            value={formData.title}
            required
            autoFocus
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="mr">Mr</option>
            <option value="ms">Ms</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={(e) => handleChange(e, setFormData, formData)}
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) => handleChange(e, setFormData, formData)}
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange(e, setFormData, formData)}
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Gender */}
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            onChange={(e) => handleChange(e, setFormData, formData)}
            value={formData.gender}
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Age */}
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            placeholder="Age"
            max={100}
            min={0}
            onChange={(e) => handleChange(e, setFormData, formData)}
            value={formData.age}
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Phone"
            maxLength={10}
            onChange={(e) => handleChange(e, setFormData, formData)}
            value={formData.phone}
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-full flex justify-end">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
