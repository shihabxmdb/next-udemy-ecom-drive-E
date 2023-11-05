"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
export default function Login() {
  const [email, setEmail] = useState("shb@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //console.log(name,email,password);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        toast.error(result?.error);
        setLoading(false);
      } else {
        toast.success("Logged in Successfully");
        //router.push("/");
        router.push(callbackUrl);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <div className="row d-flex  justify-content-center  align-items-center vh-100">
          <div className="col-lg-5  shadow  p-5  ">
            <h1 className="mb-4 text-center">Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="forms-control mb-4"
                placeholder="Enter Email"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="forms-control mb-4"
                placeholder="Enter Password"
              />

              <button
                className="btn btn-primary btn-raised"
                disabled={loading || !email || !password}
              >
                {loading ? "Please wait.." : "Submit"}
              </button>
            </form>
            <button
              className="btn btn-danger  btn-raised mb-4"
              onClick={async () => await signIn("google", { callbackUrl: "/" })}
            >
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
