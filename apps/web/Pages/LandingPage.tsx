
import { Appbar } from "../components/Appbar"
import { Contests } from "../components/Contests"
import { Footer } from "../components/Footer"
import { Hero } from "../components/Hero"

export const LandingPage = () => {
    return (
        <div>
            <Appbar/>
            <Hero/>
            <Contests/>
            <Footer/>
            
        </div>
        
    )
}