import React from "react";
import { Link } from "react-router-dom";
export default function Card() {
  return (
    <>
      <section className="py-16 bg-black relative font-playfair">

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h2 className="text-4xl font-bold text-white w-full text-center">
            NEWS CATEGORIES
          </h2>
          <Link to='/news/general'
            className="mt-4 text-white text-lg font-semibold group transition-all duration-300 ease-in-out"
          >
            View All
            <span className="inline-block transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
              {" "}
              --&gt;
            </span>
          </Link>
        </div>
        <div className="container mx-auto flex flex-col md:flex-row relative z-0 mt-16">
          <div className="w-full md:w-1/4 p-2">
            <div className="relative group overflow-hidden">
              <img
                src="images/pexels-chuck-2834917.jpg"
                alt="Sports"
                className="object-cover w-full h-full brightness-75 transition-all duration-300 ease-in-out group-hover:brightness-90"
              />
              <h3 className="text-white text-2xl font-bold text-center mt-4">
                Sports
              </h3>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2">
            <div className="relative group overflow-hidden">
              <img
                src="/images/pexels--rahulshah--6571000.jpg"
                alt="Politics"
                className="object-cover w-full h-full brightness-75 transition-all duration-300 ease-in-out group-hover:brightness-90"
              />
              <h3 className="text-white text-2xl font-bold text-center mt-4">
                Politics
              </h3>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2">
            <div className="relative group overflow-hidden">
              <img
                src="/images/pexels-athena-2582937.jpg"
                alt="Technology"
                className="object-cover w-full h-full brightness-75 transition-all duration-300 ease-in-out group-hover:brightness-90"
              />
              <h3 className="text-white text-2xl font-bold text-center mt-4">
                Technology
              </h3>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2">
            <div className="relative group overflow-hidden">
              <img
                src="/images/pexels-omerderinyar-17846072.jpg"
                alt="General"
                className="object-cover w-full h-full brightness-75 transition-all duration-300 ease-in-out group-hover:brightness-90"
              />
              <h3 className="text-white text-2xl font-bold text-center mt-4">
                General
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
