import Lottie from 'react-lottie';
import animation1 from './animation1.json';
import animation2 from './animation2.json';
import animation3 from './animation3.json';
import animation4 from './animation4.svg';
import wonAnimate from './won.svg'

const Banner = () => {
    const defaultOptions = {
        loop: true,
        autoPlay: true,
        animationData: animation1,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const animate2options = {
        loop: true,
        autoPlay: true,
        animationData: animation2,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    const animate3options = {
        loop: true,
        autoPlay: true,
        animationData: animation3,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <div className="relative">
            <img src="https://i.ibb.co/CHSGVj6/chrome-8o-TEMJP1-IP.png" alt="" className="w-full h-[346px] md:h-[700px]" />
            <div className="absolute top-0 right-0 left-0 w-full h-[346px] md:h-[700px] bg-black bg-opacity-45">
                <div className='flex justify-evenly items-center border border-red-700 w-full h-[346px] md:h-[700px]'>
                    <div>
                        <h1 className='text-7xl font-bold text-gray-100'>Assignment Genius</h1>
                        <p className='text-gray-100 text-lg w-[36rem] mt-6'>Assignment Genius is a service provider that offers high-quality assignment writing services to students and professionals. The platform is known for its commitment to delivering original and timely assignments, which include coursework, research papers, and various other types of academic work. </p>

                        <div className='border-8 border-white bg-white bg-opacity-25 rounded-lg mt-6'>
                            <Lottie options={animate2options} height={330} width={450} />
                        </div>
                    </div>

                    <div className='flex flex-col gap-6 h-[346px] md:h-[700px] '>
                        <div className='flex justify-center items-center gap-4'>
                            <Lottie options={animate3options} height={100} width={100} />
                            <img src={animation4} alt="" className='w-40 h-40' />
                        </div>

                        <div className='mt-8'>
                            <Lottie options={defaultOptions} height={400} width={400} />
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    );
};

export default Banner;