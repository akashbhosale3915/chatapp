import { Link } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuthContext";
import { BeatLoader } from "react-spinners";
import { useState } from "react";

const Signup = () => {
  const { login, loading, setLoading } = useAuth();
  const [gender, setGender] = useState("");
  async function handleSignup(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fname = formData.get("fname");
    const username = formData.get("username");
    const password = formData.get("password");
    const cpassword = formData.get("cpassword");

    if (
      !fname ||
      !username ||
      !password ||
      !cpassword ||
      !gender
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    const user = {
      fullName: fname,
      username,
      password,
      gender,
      confirmPassword: cpassword,
    };

    try {
      setLoading(true);
      const createUser = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await createUser.json();
      if (data.error) {
        toast.error(data.error);
      }
      if (createUser.ok && data.message) {
        login(data.user);
        toast.success(data.message);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error);
    }
  }
  return (
    <FormWrapper>
      <form onSubmit={handleSignup}>
        <h1 className="text-center text-4xl">Signup</h1>
        <div className="flex flex-col">
          <label htmlFor="fname">Full Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            className="h-12 rounded-md mt-3 indent-2"
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="h-12 rounded-md mt-3 indent-2"
          />
        </div>

        <div className="flex flex-col mt-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="h-12 rounded-md mt-3 indent-2"
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="cpassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            className="h-12 rounded-md mt-3 indent-2"
          />
        </div>
        <div className="flex mt-3 gap-4 items-center">
          <label htmlFor="male">
            Male
            <input
              type="radio"
              name="gender"
              id="male"
              className="ml-2"
              onChange={(e) => setGender(e.target.value)}
              value="male"
              checked={gender === "male"}
            />
          </label>
          <label htmlFor="female">
            Female
            <input
              type="radio"
              name="gender"
              id="female"
              className="ml-2"
              onChange={(e) => setGender(e.target.value)}
              value="female"
              checked={gender === "female"}
            />
          </label>
        </div>
        <button className="w-full bg-slate-800 rounded-lg text-white h-12 my-5">
          {loading ? (
            <BeatLoader color="white" />
          ) : (
            "Signup"
          )}
        </button>
        <div className="text-center">
          <Link to="/login" className="underline">
            Already have an account ? Login.
          </Link>
        </div>
      </form>
    </FormWrapper>
  );
};

export default Signup;
