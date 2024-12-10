"use client";

import React from "react";
import { EditorPage } from "./EditorPage";
import { useSession } from "next-auth/react";
import LandingPage from "./LandingPage";

const HomePage = () => {
  const session = useSession();

  return (
    <div className="mt-24 mb-8 max-w-screen-xl mx-auto px-4">
      {session?.data?.user && <EditorPage />}
      {!session?.data?.user && <LandingPage/>}
    </div>
  );
};

export default HomePage;
