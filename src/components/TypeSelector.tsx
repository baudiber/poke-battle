import React, { useState } from 'react';
import { TiArrowSortedDown } from "react-icons/ti";
import { RxCrossCircled } from "react-icons/rx";
import { PokemonType } from './PokemonApp';


interface TypeSelectorProps {
  onTypeSelect: (type: string[] | null) => void;
  types: PokemonType[];
}

const TypeSelector: React.FC<TypeSelectorProps> = ({ onTypeSelect, types }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleChange = (selected: string) => {
    const newTypes = selectedTypes.includes(selected) ? selectedTypes.filter((type) => type !== selected) : [...selectedTypes, selected];
    setSelectedTypes(newTypes);
    if (newTypes.length === 0) {
      onTypeSelect(null);
    } else {
      onTypeSelect(newTypes);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <button 
        className="flex flex-col items-center"
        onClick={() => setIsVisible(!isVisible)}
      >
        Advanced search
        <TiArrowSortedDown />
      </button>
      <div className={`${isVisible ? '' : 'hidden'} m-4 max-w-3xl text-center flex flex-wrap`}>
        {types.map((type) => (
          <button 
            className={`${selectedTypes.includes(type.name) ? 'bg-amber-300' : 'bg-amber-100'} flex items-center rounded-md p-2 px-3 m-1 relative`} 
            onClick={() => handleChange(type.name)}
            key={type.name}
          >
            <img src={type.image} alt={type.name} style={{ width: "20px"}} />
            <p className='text-sm mx-2'>{type.name}</p>
            {selectedTypes.includes(type.name) && (
              <RxCrossCircled className="inline-block ml-1" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypeSelector;
