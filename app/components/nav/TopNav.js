import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
export const TopNav = () => {
  const { data, status } = useSession();
  console.log(data, status);
  return (
    <nav className="nav shadow p-2 d-flex justify-content-between ">
      <Link className="nav-link" href="/">
        🛒NEXTCOM
      </Link>
      {status === "authenticated" ? (
        <div className="d-flex">
          <Link className="nav-link" href="/dashboard/user">
            {data?.user?.name}({data?.user?.role})
          </Link>

          <a
            className="nav-link"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </a>
        </div>
      ) : status === "loading" ? (
        <div>loading</div>
      ) : (
        <div className="d-flex ">
          <Link className="nav-link" href="/login">
            Login
          </Link>
          <Link className="nav-link" href="/register">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};
