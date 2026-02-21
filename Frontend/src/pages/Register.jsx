import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const submit = async e => {
    e.preventDefault();

    await API.post("/auth/register", form);

    alert("Account created successfully!");
    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-blue-700">

      <form onSubmit={submit}
        className="bg-white w-96 p-10 rounded-xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <input className="input"
          placeholder="First Name"
          onChange={e => setForm({ ...form, firstName: e.target.value })}
        />

        <input className="input mt-3"
          placeholder="Last Name"
          onChange={e => setForm({ ...form, lastName: e.target.value })}
        />

        <input className="input mt-3"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input className="input mt-3"
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white mt-6 py-2 rounded-lg">
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have account?
          <Link to="/" className="text-blue-600 ml-1 font-semibold">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}