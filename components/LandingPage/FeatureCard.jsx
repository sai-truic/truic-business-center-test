import * as React from "react";

function FeatureCard({ icon, title, description}) {
  return (
    <div 
      className="flex gap-5 cursor-text p-4 rounded-lg transition-colors"
      role="button"
      tabIndex={0}
    >
      <img
        loading="lazy"
        src="burst_bullet_point.png"
        className="object-contain shrink-0 self-start mt-1 w-5 aspect-[1.11]"
        aria-hidden="true"
      />
      <div className="flex flex-col grow shrink-0 basis-0 w-fit">
        <h3 className="self-start font-bold text-xl">{title}</h3>
        {description && (
          <p className="mt-3 leading-6 text-gray-700">{description}</p>
        )}
      </div>
    </div>
  );
}

export default FeatureCard;