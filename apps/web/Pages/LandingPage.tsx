"use client"
import { SessionProvider } from "next-auth/react"
import { Appbar } from "../components/Appbar"
import { Footer } from "../components/Footer"
import { Hero } from "../components/Hero"

export const LandingPage = () => {
    return (
        <div>
            <SessionProvider>
                <Appbar/>
            </SessionProvider>
            
            <Hero/>
            <Footer/>
        </div>
        
    )
}