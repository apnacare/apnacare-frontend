import React from "react";
import { FaLinkedin } from "react-icons/fa";
import gobindaPic from "../assest/team/gobinda_profile_pic.jpg" 
import milanPic from "../assest/team/milan_profile_pic.jpg"
import dibyenduPic from "../assest/team/dibyendu_profile_pic.jpg"
import manasPic from "../assest/team/manas_profile_pic.jpg"
import suvroPic from "../assest/team/suvro_profile_pic.jpg"

const About = () => {
    const teamMembers = [
        {
            name: "Dibyendu Bhakta",
            role: "Project Lead",
            bio: "Coordinating team efforts and ensuring project milestones are met efficiently.",
            linkedIn: "https://www.linkedin.com/in/dibyendu-bhakta/",
            image: dibyenduPic,
        },
        {
            name: "Gobinda Jana",
            role: "Backend Developer",
            bio: "Experienced in building robust server-side applications and RESTful APIs.",
            linkedIn: "https://www.linkedin.com/in/gobinda-jana-0b1900253/",
            image: gobindaPic,
        },
        {
            name: "Milan Dalal",
            role: "Backend Developer",
            bio: "Experienced in building robust server-side applications and RESTful APIs.",
            linkedIn: "https://www.linkedin.com/in/milan-dalal-494974219/",
            image: milanPic,
        },
        {
            name: "Suvrodeep Pal",
            role: "Frontend Developer",
            bio: "Passionate about creating intuitive user interfaces and exceptional user experiences.",
            linkedIn: "",
            image: suvroPic,
        },
        {
            name: "Manas Ghosh",
            role: "Frontend Developer",
            bio: "Passionate about creating intuitive user interfaces and exceptional user experiences.",
            linkedIn: "https://www.linkedin.com/in/manas-ghosh-a949bb312/",
            image: manasPic,
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">About Apnacare</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Apnacare is a service platform designed to connect users with high-quality service providers.
                    From home repairs to personal care, we make it easy to find the service you need.
                </p>
            </div>

            <div className="mb-16">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Our Mission</h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center">
                    At Apnacare, our mission is to provide seamless access to premium services at affordable prices.
                    We strive to create a platform where quality service providers can connect with customers who need them,
                    creating a mutually beneficial ecosystem that improves lives and supports local businesses.
                </p>
            </div>

            <div>
                <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
                            onClick={() => window.open(member.linkedIn, "_blank")}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-green-600 font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600 mb-4">{member.bio}</p>
                                <div className="flex items-center text-blue-600">
                                    <FaLinkedin className="mr-2" />
                                    <span className="text-sm">Connect on LinkedIn</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
