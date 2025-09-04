import React, { useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import useInputState from '../useInputState';

/*
This is how you can use the Carousel component:

<Carousel id="myCarousel" items={[
  { id: 1, content: <img src="/image1.jpg" alt="Image 1" /> },
  { id: 2, content: <img src="/image2.jpg" alt="Image 2" /> },
  { id: 3, content: <img src="/image3.jpg" alt="Image 3" /> }
]}>
  {(item) => (
    <CarouselItem key={item.id}>
      {item.content}
    </CarouselItem>
  )}
</Carousel>
*/

export const Carousel = ({ id, items, children }) => {
  const { getState, updateState } = useInputState();
  const { currentIndex = 0, carouselItems = [] } = getState('carousel', id) || {};

  useEffect(() => {
    updateState('carousel', id, { currentIndex: 0, carouselItems: items });
  }, [id, items, updateState]);

  const next = () => {
    updateState('carousel', id, { 
      currentIndex: (currentIndex + 1) % carouselItems.length 
    });
  };

  const prev = () => {
    updateState('carousel', id, { 
      currentIndex: (currentIndex - 1 + carouselItems.length) % carouselItems.length 
    });
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselItems.map(children)}
        </div>
      </div>
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-800" />
      </button>
    </div>
  );
};

export const CarouselItem = ({ children, className = '' }) => (
  <div className={`flex-shrink-0 w-full ${className}`}>{children}</div>
);
