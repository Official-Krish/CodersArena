"use client";
import { signIn, useSession } from "next-auth/react";
import Avatar from "./Avatar"
import Link from "next/link";
import Image from "next/image";
import Logo2 from "../assets/Logo2.png";
export const Appbar = () => {
    const { data: session } = useSession();
    return (
        <div className="flex justify-between py-8 px-8 bg-black text-white">
            <div className="flex justify-center">
                <Link href ="/">
                    CodersArena
                </Link>
            </div>
            <div className="flex justify-between mr-7">
                <Link href="/contests">
                    <div className="mr-8">
                        Contests
                    </div>
                </Link>
                
                <div className="mr-8">
                    Problems
                </div>
                <div>
                    Standings
                </div>
            </div>
            {session ? (
            <div>
                <Avatar/>
            </div>
            ) : (
                <button onClick={() => signIn()}>Sign in</button>
            )}
            
        </div>
    )
} 