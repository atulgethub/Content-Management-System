import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const submit = e => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-blue-700">

      <form onSubmit={submit}
        className="bg-white w-96 p-10 rounded-xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login as Admin or User
        </h2>

        <input
          className="input"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="input mt-4"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white mt-6 py-2 rounded-lg">
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?
          <Link to="/register" className="text-blue-600 ml-1 font-semibold">
            Sign Up
          </Link>
        </p>

      </form>
    </div>
  );
}