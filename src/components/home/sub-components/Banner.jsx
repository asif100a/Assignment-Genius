import Lottie from 'react-lottie';
import animation1 from './animation1.json';
import animation2 from './animation2.json';
import animation3 from './animation3.json';
import animation4 from './animation4.svg';
import './banner.css';

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
        <div className="background-image">
            <div className='flex flex-col lg:flex-row justify-evenly items-center w-full h-[346px] md:h-[700px] mx-2 md:mx-0'>
                <div className='mt-3 md:mt-6 lg:mt-0 '>
                    <h1 className='text-4xl md:text-7xl font-bold text-gray-100 font-noto-serif'>Assignment Genius</h1>
                    <p className='text-gray-100 text-base md:text-lg w-full md:w-[36rem] mt-2 md:mt-6 font-pt-serif'>Assignment Genius is a service provider that offers high-quality assignment writing services to students and professionals. The platform is known for its commitment to delivering original and timely assignments, which include coursework, research papers, and various other types of academic work. </p>

                    <div className='flex gap-6 justify-start items-center'>
                        <div className='border-8 border-white w-fit lg:w-auto px-0 lg:px-8 bg-white bg-opacity-25 rounded-lg mt-4 md:mt-6'>
                            <div className='h-[100px] w-[150px] md:h-[220px] md:w-[340px] lg:h-[330px] lg:w-[450px]'>
                                <Lottie options={animate2options} />
                            </div>
                        </div>
                        <div className='h-[116px] w-[116px] md:h-[250px] md:w-[250px] flex lg:hidden'>
                            <Lottie options={defaultOptions} />
                        </div>
                    </div>
                </div>

                <div className='md:flex flex-col gap-6 h-[346px] md:h-[700px] hidden'>
                    <div className='flex justify-center items-center gap-4 mt-6 lg:mt-0'>
                        <div className='h-[100px] w-[100px]'>
                            <Lottie options={animate3options} />
                        </div>
                        <img src={animation4} alt="" className='w-40 h-40' />
                    </div>

                    <div className='mt-[86px] hidden lg:flex'>
                        <div className='h-[400px] w-[400px]'>
                            <Lottie options={defaultOptions} />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Banner;