const CreateAssignment = () => {
    return (
        <div>
            <div className="max-w-lg lg:ms-auto mx-auto text-center ">
                <div className="py-16 px-7 rounded-md bg-white">

                    <form className="" action="" method="POST">
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                            {/* Title */}
                            <div className="md:col-span-2">
                                <label htmlFor="title" className="float-left block  font-normal text-gray-400 text-lg">Give a title of the assignment</label>
                                <input type="text" id="title" name="title" placeholder="Title of the assignment" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label htmlFor="description" className="float-left block  font-normal text-gray-400 text-lg">Write the description</label>
                                <textarea name="description" rows="5" cols="" placeholder="Description of the assignment..." className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"></textarea>
                            </div>

                            {/* Thumbnail image url */}
                            <div className="md:col-span-2">
                                <label htmlFor="thumbnail_img" className="float-left block  font-normal text-gray-400 text-lg">Provide a thumbnail image url</label>
                                <input type="text" id="thumbnail_img" name="thumbnail_img" placeholder="Thumbnail image url" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="subject" className="float-left block  font-normal text-gray-400 text-lg">Vous accompagner sur :</label>
                                <select id="subject" name="subject" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700">
                                    <option value="" disabled selected>Sélectionnez un domaine</option>
                                    <option value="Option-1">Référencement</option>
                                    <option value="Option-2">Publicité Digitale</option>
                                    <option value="Option-3">Brand Content</option>
                                    <option value="Option-4">Marketing Digital</option>
                                    <option value="Option-5">Emailing</option>
                                    <option value="Option-6">Création Graphique</option>
                                    <option value="Option-7">Vidéo</option>
                                    <option value="Option-8">Ux Design</option>
                                    <option value="Option-9">Consulting</option>
                                    <option value="Option-10">Réalisation site internet</option>
                                    <option value="Option-11">Réalisation d'application mobile</option>
                                    <option value="Option-12">Réalisation d'application desktop</option>
                                    <option value="Option-13">Recrutement</option>
                                    <option value="Option-14">Formation</option>
                                    <option value="Option-15">Réalisation d'un captation drone Graphique / Vidéo</option>
                                    <option value="Option-16">Réalisation d'un montage vidéo</option>
                                    <option value="Option-17">Autre</option>

                                </select>
                            </div>


                            <div className="md:col-span-2">
                                <label htmlFor="subject" className="float-left block  font-normal text-gray-400 text-lg">Ajoutez un brief ou une pièce jointe de votre projet :</label>
                                <input type="file" id="file" name="file" placeholder="Charger votre fichier" className="peer block w-full appearance-none border-none   bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" />
                            </div>
                            <div className="md:col-span-2">
                                <textarea name="message" rows="5" cols="" placeholder="Votre Massage *" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <input type="checkbox" name="" id="" className="mr-2 sm:m-1" />
                                <label htmlFor="" className="text-sm col-span-2">
                                    Autoriser OC à vous envoyer des lettres d'information par E-mail.
                                </label>
                            </div>
                            <div className="md:col-span-2">
                                <button className="py-3 text-base font-medium rounded text-white bg-blue-800 w-full hover:bg-blue-700 transition duration-300">Valider</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAssignment;