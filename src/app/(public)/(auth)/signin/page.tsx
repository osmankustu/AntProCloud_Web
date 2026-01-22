import { Suspense } from "react";

import Spinner from "@/components/ui/spinner/Spinner";
import SignInForm from "@/modules/IAM/auth/components/SignInForm";

export default function SignIn() {
  return (
    <Suspense fallback={<Spinner />}>
      <SignInForm />
    </Suspense>
  );
}
