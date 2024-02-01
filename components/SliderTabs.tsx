import { SlideType } from "@/types/slide";
import React from "react";

interface Props {
  movieTypes: SlideType[],
  width: number;
  spaceWidth: number; 
  setActiveType: React.Dispatch<React.SetStateAction<SlideType>>
  activeType: SlideType;
  className?: string;
  setData: React.Dispatch<React.SetStateAction<any>>
}

function SliderTabs({ movieTypes, width, spaceWidth, activeType, setActiveType, className, setData }: Props) {
  
  const getSliderPosition = (movieType: SlideType): string => {
    const index = movieTypes.findIndex(type => type.value === movieType.value);
    const result = width * index + (index - 1) * spaceWidth;
    return result + "px";
  };
  
  return (
    <div className={`flex items-center w-full rounded-full relative ${className}`}>
      {movieTypes.map((type: SlideType) => (
        <div 
          className={`text-base cursor-pointer w-32 rounded-full py-1 transition-transform transform ${activeType.value === type.value ? 'text-white scale-105': 'hover:bg-blue-700 hover:text-white'} active:scale-95 duration-200 z-10 text-center`} 
          onClick={() => {
            setData([]);
            setActiveType(type);
          }}
          style={{
            width: `${width}px`
          }}
          key={type.value}>
          <p>{type.name}</p>
        </div>
      ))}
      <div 
        className={`absolute top-0 h-full bg-blue-700 transition duration-300 rounded-full z-0`} 
        style={{ 
          left: getSliderPosition(activeType), transition: 'left 0.5s ease',
          width: `${width}px`
        }} />
    </div>
  )
}

export default SliderTabs;