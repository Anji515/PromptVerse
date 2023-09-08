"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [dropDown,setDropDOwn] = useState(false)

  useEffect(() => {
    const setProv = async () => {
      const resp = await getProviders();
      setProviders(resp);
    };
    setProv();
  }, []);
  return (
    <nav className="flex-between w-full mb-12 pt-4">
      <Link href={"/"} className="flex gap-4 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptVerse</p>
      </Link>

      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button className="outline_btn" onClick={signOut}>
              Sign Out
            </button>

            <Link href={"/profile"}>
              <Image
                src={"/assets/images/logo.svg"}
                width={35}
                height={35}
                className="rounded-full"
                alt="user-profile"
              />
            </Link>
          </div>
        ) : (
          providers && Object.values(provider).map((prov)=>
          <button type="button"
          onClick={()=>signIn(prov.id)}
          key={prov.name}
          className="black_btn"
          >
           Sign In
          </button>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
