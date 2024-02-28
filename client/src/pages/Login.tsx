import toast from "react-hot-toast";
import FormWrapper from "../components/FormWrapper";
import { useAuth } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const { login, loading, setLoading } = useAuth();

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    setLoading(true);
    try {
      const res = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      if (res.ok && data.message) {
        login(data.user);
        toast.success(data.message);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <FormWrapper>
      <form onSubmit={handleLogin}>
        <h1 className="text-center text-4xl">Login</h1>
        <div className="flex flex-col">
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
        <button className="w-full bg-slate-800 rounded-lg text-white h-12 my-5">
          {loading ? <BeatLoader color="white" /> : "Login"}
        </button>
        <div className="text-center">
          <Link to="/signup" className="underline">
            Do not have an account ? Create One.
          </Link>
        </div>
      </form>
    </FormWrapper>
  );
};

export default Login;
