import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {

  const { user } = useContext(AuthContext);

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        My Profile
      </h2>

      <div className="bg-white p-8 rounded-lg shadow max-w-xl">

        <div className="flex items-center gap-5 mb-6">

          <div className="w-16 h-16 rounded-full bg-blue-500
            flex items-center justify-center text-white text-xl">
            {user?.email?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              {user?.firstName} {user?.lastName}
            </h3>

            <p className="text-gray-500">
              {user?.email}
            </p>

            <span className="text-sm bg-blue-100
              text-blue-600 px-3 py-1 rounded">
              {user?.role}
            </span>
          </div>

        </div>

        <button className="bg-blue-600 text-white px-5 py-2 rounded">
          Edit Profile
        </button>

      </div>

    </div>
  );
}