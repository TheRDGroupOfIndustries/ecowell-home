import Login from "@/components/pages/auth/forms/Login";
import Register from "@/components/pages/auth/forms/Register";

export default function AuthFormPage({ params }) {
  // console.log(params.form);

  return <>{params.form === "sign-in" ? <Login /> : <Register />}</>;
}
