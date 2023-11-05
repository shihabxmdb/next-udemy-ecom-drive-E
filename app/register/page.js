"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("shb");
  const [email, setEmail] = useState("shb@gmail.com");
  const [password, setPassword] = useState("shb");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //console.log(name,email,password);
      const response = await fetch(`${process.env.API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.err);
        setLoading(false);
      } else {
        toast.success(data.success);
        //setLoading(false);
        router.push("/login");
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
            <h1 className="mb-4 text-center">Register</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" mb-4"
                placeholder="Enter Name"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" mb-4"
                placeholder="Enter Email"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" mb-4"
                placeholder="Enter Password"
              />

              <button
                className="btn btn-primary btn-raised"
                disabled={loading || !name || !email || !password}
              >
                {loading ? "Please wait.." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
