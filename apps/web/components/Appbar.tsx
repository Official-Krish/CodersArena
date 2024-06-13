"use client";
import { signIn, useSession } from "next-auth/react";
import Avatar from "./Avatar"

export const Appbar = () => {
    const { data: session } = useSession();
    return (
        <div className="flex justify-between py-4 px-8 bg-gray-900 text-white">
            <div>
                Coders Arena
            </div>
            <div className="flex justify-between mr-7"> 
                <div className="mr-8">
                    Contests
                </div>
                <div className="mr-8">
                    Problem
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