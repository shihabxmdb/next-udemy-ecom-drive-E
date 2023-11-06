import Link from "next/link";
//import AdminNav from "@/components/nav/AdminNav";
import AdminNav from "@/app/components/nav/AdminNav";
export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNav />
      {children}
    </>
  );
}
