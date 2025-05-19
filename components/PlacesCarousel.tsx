"use client";
import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImageWithFade } from "./ImageWithFade";
import Image from "next/image";

// Types
interface Category {
  id: string;
  name: string;
}

interface Place {
  id: string;
  category: string;
  bg: string;
  cardBg: string;
  title: string;
  tags: string[];
  visitPeriod: string;
  images: string[];
}

const categories: Category[] = [
  { id: "flora", name: "Flora" },
  { id: "fauna", name: "Fauna" },
  { id: "feni", name: "Feni" },
];

const places: Place[] = [
  {
    id: "1",
    category: "flora",
    cardBg: "#384b58",
    bg: "#384b58",
    title: "Mangrove Forests",
    tags: ["Joy", "Adventure"],
    visitPeriod: "March - June",
    images: [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      "https://images.unsplash.com/photo-1609560140261-4efaa689b6c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: "2",
    category: "fauna",
    cardBg: "#fff",
    bg: "#fff",
    title: "Coastal Wildlife",
    tags: ["Nature", "Discovery"],
    visitPeriod: "Year Round",
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    ],
  },
  {
    id: "3",
    category: "feni",
    cardBg: "#384b58",
    bg: "#fff",
    title: "Local Distilleries",
    tags: ["Culture", "Experience"],
    visitPeriod: "October - February",
    images: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    ],
  },
];

const PlacesCarousel: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0].id
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentBg, setCurrentBg] = useState("#fff");

  const slider1Ref = useRef<Slider>(null);
  const slider2Ref = useRef<Slider>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === places.length - 1 ? 0 : prevIndex + 1
    );
    if (slider1Ref.current && slider2Ref.current) {
      slider1Ref.current.slickNext();
      slider2Ref.current.slickNext();
    }

  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? places.length - 1 : prevIndex - 1
    );
    if (slider1Ref.current && slider2Ref.current) {
      slider1Ref.current.slickPrev();
      slider2Ref.current.slickPrev();
    }
    setCurrentBg("#fff");
  };

  const lefImages = places.map((item) => {
    return item.images[1];
  });

  // const rightImages = places.map((item)=>{
  //   return item.images[0];
  // })

  const handleActions = (type: string, category: string, bg: string) => {
    console.log("category ", category);
    console.log("bg ", bg);
    setCurrentBg(bg);
    if (type === "next") {
      if (category == "flora") setActiveCategory("fauna");
      if (category == "fauna") setActiveCategory("feni");
      if (category == "feni") setActiveCategory("flora");
      nextSlide();
    }
    if (type == "prev") {
      if (category == "flora") setActiveCategory("feni");
      if (category == "fauna") setActiveCategory("flora");
      if (category == "feni") setActiveCategory("fauna");
      prevSlide();
    }
  };

  // const handleCategoryChange = (category: string) => {
  //   setActiveCategory(category);
  //   setCurrentIndex(0);
  // };

  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    autoplaySpeed: 3000,
    arrows: false,
    adaptiveHeight: true,
    swipe: false,
  };

  return (
    <div className="w-full">
      {
        <div className="max-w-5xl mx-auto">
          <div className=" flex">
            {categories.map((category, idx) => (
              <div
                key={idx}
                className={`${
                  category.id === "fauna"
                    ? " bg-[#384b58] text-white"
                    : category.id === "feni"
                    ? " bg-[#DFE8EF] text-[#020202]"
                    : category.id === "flora"
                    ? " bg-[#fff] text-[#23303B] font-medium"
                    : " text-white"
                } 
                ${
                  activeCategory === "flora"
                    ? `
                  ${category.id == "fauna" ? " z-[2] " : ""}
                  `
                    : ""
                }
           ${
             activeCategory == category.id
               ? `
            ${category.id === "flora" ? " scale-100" : " scale-105 "}
            transition-all duration-300 ease-in-out transform z-[999]`
               : " "
           }
             transition-all duration-300 ease-in-out hover:scale-102 relative rounded-t-2xl px-16 p-3 -mr-5`}
              >
                <h2>{category.name}</h2>
              </div>
            ))}
          </div>
          <div
            style={{ backgroundColor: currentBg }}
            className="flex flex-col md:flex-row overflow-hidden rounded-tl-none rounded-2xl transition-all duration-300 p-6 shadow-2xl gap-5"
          >
            <div className="md:w-1/3 relative transition-all duration-300">
              <ImageWithFade
                src={places[currentIndex].images[0]}
                alt={places[currentIndex].title}
                className="object-cover w-full h-64 md:h-full rounded-2xl"
              />
            </div>

            <div className="md:w-1/3 relative">
              <Slider ref={slider1Ref} {...settings} className="flex h-full">
                {places.map((place, idx) => (
                  <div className="" key={idx}>
                    <DetailsCard place={place} actions={handleActions} />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="md:w-1/3 relative">
              <Slider
                ref={slider2Ref}
                {...settings}
                className=" outline-none flex  gap-10"
              >
                {lefImages.map((image, idx) => (
                  <div key={idx} className=" outline-none px-1 0">
                    <Image
                      width={500}
                      height={500}
                      priority
                      src={image}
                      alt={`${places[currentIndex].title} view ${idx + 1}`}
                      className="object-cover w-full h-64 md:h-full rounded-2xl outline-none"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default PlacesCarousel;

const DetailsCard = ({
  place,
  actions,
}: {
  place: Place;
  actions: (val1: string, val2: string, val3: string) => void;
}) => {
  return (
    <div
      style={{ backgroundColor: place.cardBg }}
      className={`
  
  relative h-[480px]  text-white  flex flex-col justify-between rounded-2xl items-start`}
    >
      <div>
        <div className="  p-6 pt-8 pb-32 relative">
          <div className="  flex w-full">
            <div
              style={{
                borderImageSource:
                  "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(102, 102, 102, 0.1) 100%)",
                  background: "linear-gradient(180deg, rgba(164, 165, 166, 0.21) 3.31%, rgba(255, 255, 255, 0.21) 94.97%)",

                borderImageSlice: 1,
              }}
              className={` 
      inline-block  px-4 py-1 rounded-full text-sm mb-8`}
            >
              {place.tags.join(" | ")}
            </div>
          </div>

          <h1
            className={`
      ${place.id == "2" ? " text-gray-600" : " text-white"}
      
      text-5xl leading-tight text-start`}
          >
            {place.title.split(" ")[0]} <br />
            {place.title.split(" ")[1]} <br />
          </h1>

          <div className="mt-8 flex flex-col items-start">
            <p
              className={`
            ${place.id == "2" ? " text-gray-500" : " text-white"}
            
            text-sm`}
            >
              Best time to visit
            </p>
            <p
              className={`
            ${place.id == "2" ? " text-gray-600" : " text-white"}
            
            text-xl mt-1`}
            >
              {place.visitPeriod}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div
          className={` 
      ${place.id == "2" ? " text-gray-600" : " text-white"}
      absolute bottom-3 right-2 flex gap-2 mt-6`}
        >
          <button
            onClick={() => actions("prev", place.category, place.bg)}
            className=" p-3"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={() => actions("next", place.category, place.bg)}
            className="  p-3"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
