import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left */}
        <div>
          <img src={assets.logo} alt="" className="mb-5 w-40" />
          <p className="w-full md:w237 text-gray-600 leading-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil odio
            magnam expedita nesciunt recusandae alias atque repudiandae enim eos
            earum laborum perspiciatis, fugit laudantium. Eaque reiciendis quam
            corrupti blanditiis quod?
          </p>
        </div>

        {/* center */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col text-gray-500 gap-2">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy & Policy</li>
          </ul>
        </div>

        {/* right */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOuCH</p>
          <ul className="flex flex-col text-gray-500 gap-2">
            <li>+212 762 824 091</li>
            <li>khalidnabgaoui4@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          &copy; 2024@ - All right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
