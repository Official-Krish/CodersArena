
import { Appbar } from "../components/Appbar"
import { Contests } from "../components/Contests"
import { Footer } from "../components/Footer"
import { Hero } from "../components/Hero"
import { Problems } from "../components/Problems"

export const LandingPage = () => {
    return (
        <div>
            <Appbar/>
            <Hero/>
            {/* <Contests/> */}
            <Problems/>
            <Footer/>
            
        </div>
        
    )
}