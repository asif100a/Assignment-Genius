import faqImage1 from '../../../assets/faq-1.jpeg'
import faqImage2 from '../../../assets/faq-2.jpeg'
import faqImage3 from '../../../assets/faq-3.png'
import faqImage4 from '../../../assets/faq-4.png'
import faqImage5 from '../../../assets/faq-5.jpg'
import faqImage6 from '../../../assets/faq-6.jpg'
import './faq.css';

const Faq = () => {
    return (
        <section className="bg-color py-12">
            <div className="container px-6 mx-auto">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-color capitalize text-center">Frequently asked questions(FAQ)</h1>

                <div className="grid grid-cols-1 w-fit gap-8 mx-auto mt-8 lg:mt-16 md:grid-cols-2 xl:grid-cols-3">
                    {/* FAQ-1 */}
                    <div className='w-full md:w-[332px] lg:w-[424px] faq-border'>
                        <div>
                            <h1 className="text-xl font-semibold text-color">What do I do if I encounter technical issues while submitting an assignment online?</h1>
                            
                            <img src={faqImage1} alt="Faq image 1" className='my-3 w-full lg:w-[380px] h-[180px] lg:h-[236px] rounded-md' />

                            <p className="mt-2 text-sm text-color">
                                If you encounter technical issues during assignment submission, please try refreshing the page or using a different browser. If the problem persists, contact our technical support team for assistance.
                            </p>
                        </div>
                    </div>
                    {/* FAQ-2 */}
                    <div className='w-full md:w-[332px] lg:w-[424px] faq-border'>
                        <div>
                            <h1 className="text-xl font-semibold text-color">How do I know when my assignment is due?</h1>
                            
                            <img src={faqImage2} alt="Faq image 2" className='my-3 w-full lg:w-[380px] h-[180px] lg:h-[236px] rounded-md' />

                            <p className="mt-2 text-sm text-color">
                                Assignment due dates are typically listed on the course syllabus or within the assignment instructions. You can also check the deadline management feature on our website for a calendar view of all assignment due dates.
                            </p>
                        </div>
                    </div>
                    {/* FAQ-3 */}
                    <div className='w-full md:w-[332px] lg:w-[424px] faq-border'>
                        <div>
                            <h1 className="text-xl font-semibold text-color">Can I submit multiple files for a single assignment ?</h1>
                            
                            <img src={faqImage3} alt="Faq image 3" className='my-3 w-full lg:w-[380px] h-[180px] lg:h-[236px] rounded-md' />

                            <p className="mt-2 text-sm text-color">
                                Yes, you can submit multiple files for a single assignment.Simply upload all the necessary files before the submission deadline.
                            </p>
                        </div>
                    </div>
                    {/* FAQ-4 */}
                    <div className='w-full md:w-[332px] lg:w-[424px] faq-border'>
                        <div>
                            <h1 className="text-xl font-semibold text-color">How will I receive feedback on my submitted assignments ?</h1>
                            
                            <img src={faqImage4} alt="Faq image 4" className='my-3 w-full lg:w-[380px] h-[180px] lg:h-[236px] rounded-md' />

                            <p className="mt-2 text-sm text-color">
                                Feedback on submitted assignments will be provided by your instructor through our grading and feedback feature.You can view your grades and feedback directly on the website.
                            </p>
                        </div>
                    </div>
                    {/* FAQ-5 */}
                    <div className='w-full md:w-[332px] lg:w-[424px] faq-border'>
                        <div>
                            <h1 className="text-xl font-semibold text-color">What criteria are used for grading assignments ?</h1>
                            
                            <img src={faqImage5} alt="Faq image 5" className='my-3 w-full lg:w-[380px] h-[180px] lg:h-[236px] rounded-md' />

                            <p className="mt-2 text-sm text-color">
                                Grading criteria for assignments are typically outlined in the assignment instructions or provided by your instructor.Common criteria include content accuracy, organization, clarity, and adherence to instructions.
                            </p>
                        </div>
                    </div>
                    {/* FAQ-6 */}
                    <div className='w-full md:w-[332px] lg:w-[424px] faq-border'>
                        <div>
                            <h1 className="text-xl font-semibold text-color">Where can I find additional resources to help with my assignments ?</h1>
                            
                            <img src={faqImage6} alt="Faq image 6" className='my-3 w-full lg:w-[380px] h-[180px] lg:h-[236px] rounded-md' />

                            <p className="mt-2 text-sm text-color">
                                Additional resources to help with your assignments, such as lecture notes, study materials, and reference materials, can be found in our resource library.Explore the library to access materials relevant to your assignments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;


















