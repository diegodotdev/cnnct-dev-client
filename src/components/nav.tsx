import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignInButton,
} from "@clerk/clerk-react";

export default function Nav() {
  return (
    <header className="w-full py-2 flex justify-between items-center">
      <Link to="/">
        <span className="text-4xl font-[pacifico] text-gray-200">cnnct</span>
      </Link>
      <SignedIn>
        <SignOutButton>
          <button className="px-5 py-1 bg-red-400 rounded-lg outline-none text-white">
            Sign Out
          </button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-5 py-1 bg-blue-400 rounded-lg outline-none text-white">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </header>
  );
}
