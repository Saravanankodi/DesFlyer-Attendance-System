// src/pages/auth/Login.tsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from '../../components/base/Button'
import { Input } from "../../components/base/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword,] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const user = await login(email, password);
  
      // Role-based redirect
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError(err.message || "Failed to log in.");
      }
      console.error(err);
    }
  
    setLoading(false);
  };
  

  return (
    <section className="w-full h-screen relative overflow-hidden m-auto bg-[#050A24] ">
      <div className="absolute top-0 -right-60 z-10 w-95 h-95 rounded-full bg-[#2D55FB] blur-[550px]  "></div>
      <div className="absolute -bottom-95 -left-50 z-10 w-95 h-95 rounded-full bg-[#2D55FB] blur-[550px]  "></div>
      <main className="w-full max-w-140 h-fit absolute top-1/2 left-1/2 -translate-1/2  px-8 py-6 md:px-12 md:py-8  xl:px-18 xl:py-12 bg-white rounded-[20px] ">
          <header className="w-full h-auto p-2">
            <h2 className="heading text-[28px] text-center">
                Welcome to DesFlyer
            </h2>
          </header>
          
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 items-center justify-center">
          <Input
              label="Email"
              type="email"
              placeholder="Enter email..."
              className="focus:border-[3px] focus:border-[#D1E9FF] placeholder:text-[#98A2B3]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              className=" focus:border-[3px] focus:border-[#D1E9FF]  placeholder:text-[#98A2B3]"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-lg bg-[#1570EF] text-base font-medium"
          >
              {loading ? "Logging in..." : "Login now"}
          </Button>

          {error && (
              <p className="text-center text-red-600 font-medium bg-red-50 py-3 rounded-lg">
              {error}
              </p>
          )}
          </form>
      </main>
    </section>
  );
};

export default Login;