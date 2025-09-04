import * as React from "react";
import FeatureCard from "./FeatureCard";
import * as HeroIcons from "@heroicons/react/24/solid";

function FeatureSection({ title, description, features, iconName, backgroundImageName }) {
  let IconComponent = HeroIcons[iconName];

  return (
    <section className="relative mt-32 md:mt-28 mx-5 md:mx-0 w-full max-w-[1003px]">
      <div className="absolute top-[-85px] xl:top-[0px] left-[20px] xl:left-[-45px] flex flex-col justify-center items-center px-4 py-5 mt-7 mr-0 aspect-square w-[86px]">
        {/* Background Image */}
        <img
          loading="lazy"
          src={backgroundImageName}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0 rounded-md"
          aria-hidden="true"
        />

        {/* Icon Component */}
        {IconComponent && (
          <div className="relative z-10 flex items-center justify-center w-10 h-10">
            <IconComponent
              height="40"
              width="40"
              className="text-black"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col grow shrink-0 items-start px-20 pt-12 pb-20 basis-0 bg-zinc-50 w-fit max-md:px-5 max-md:max-w-full">
        <h2 className="text-2xl font-bold text-black">{title}</h2>
        <p className="mt-4 text-xl leading-none text-black max-md:max-w-full">
          {description}
        </p>
        <div className="grid grid-cols-2 gap-8 mt-14 w-full max-md:grid-cols-1">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
