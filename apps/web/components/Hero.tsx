import Image from "next/image";
import HeroImg from "../assets/HeroImg.jpeg";
import Logo from "../assets/Logo.png";
export const Hero = () => {
    return (
        // <div>
        //     <div className="bg-gray-900 text-white">
        //         <div className="container mx-auto py-12 px-8">
        //             <div className="flex flex-col md:flex-row justify-between items-center">
        //                 <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        //                     <h1 className="text-4xl font-bold">Coders Arena</h1>
        //                     <p className="mt-4 text-lg">A platform to showcase your coding skills and compete with others</p>
        //                     <button className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started</button>
        //                 </div>
        //                 <div className="md:w-1/2">
        //                     <Image
        //                         src={HeroImg}
        //                         width="600"
        //                         height="400"
        //                         alt="Coders Arena - Showcase and Compete"
        //                         className="rounded-lg mx-auto"
        //                     />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>


        <div className="h-[calc(100vh/1.5)] bg-black">
            <div className="flex items-center justify-center h-[calc(100vh/1.5)] text-white">
                <Image
                    src={Logo}
                    width="350"
                    height="350"
                    alt="Coders Arena - Showcase and Compete"
                    className="rounded-lg mx-auto"
                />
            </div>
                

        </div>

        
        
    );
};
