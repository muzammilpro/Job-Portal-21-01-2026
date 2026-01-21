import { Suspense } from "react";
import ProfileClient from "./ProfileClient";

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full" />
        </div>
      }
    >
      <ProfileClient />
    </Suspense>
  );
}
