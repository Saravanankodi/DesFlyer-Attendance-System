// src/pages/auth/Login.tsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from '../../components/base/Button'
import { Input } from "../../components/base/Input";
import bgImg from '../../assets/bg.png'
import logo from '../../assets/logo.png'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <section className="w-full h-screen overflow-hidden md:flex items-center justify-center m-auto">
        <aside className="hidden md:block md:w-3/5 h-full m-auto">
            <img src={bgImg} alt="" className='h-auto w-full' />
        </aside>
        <main className="md:w-2/5 h-full flex flex-col items-center justify-center gap-5">
            <header className="w-full h-fit m-auto">
                <img src={logo} alt="" className='block w-1/2 h-auto m-auto ' />
            </header>
            <section className="w-full h-full p-5">
                <header className="w-full h-auto p-2">
                <h2 className="heading text-3xl my-3 text-center">
                    ATTENDANCE LOGIN
                </h2>
                <p className="text text-[18px]">
                    Login with your <span className="text-[#0496ff] font-semibold">employee</span> or{" "}
                    <span className="text-[#0496ff] font-semibold">admin</span> credential.
                </p>
                </header>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 items-center justify-center">
                <Input
                    type="email"
                    placeholder="Enter email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="text-sm text-blue-600 self-end"
                    onClick={() => setShowPassword(p => !p)}
                >
                    {showPassword ? "Hide password" : "Show password"}
                </button>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-full text-lg font-medium"
                >
                    {loading ? "Logging in..." : "LOGIN"}
                </Button>

                {error && (
                    <p className="text-center text-red-600 font-medium bg-red-50 py-3 rounded-lg">
                    {error}
                    </p>
                )}
                </form>

                <p className="text-center text-sm text-gray-500 mt-8">
                Contact administrator for access issues
                </p>
            </section>
        </main>
    </section>
  );
};

export default Login;