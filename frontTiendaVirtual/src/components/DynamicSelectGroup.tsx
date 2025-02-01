import React, { useEffect, useState } from "react";

interface Option {
  id: number;
  name: string;
}

interface DynamicSelectGroupProps {
  options: Option[];
  selectedOptions: Option[];
  onSelect: (selected: Option[]) => void;
}

export const DynamicSelectGroup: React.FC<DynamicSelectGroupProps> = ({
  options,
  selectedOptions,
  onSelect,
}) => {
  const [availableOptions, setAvailableOptions] = useState<Option[]>(options);

  useEffect(() => {
    setAvailableOptions(
      options.filter(
        (option) => !selectedOptions.some((s) => s.id === option.id)
      )
    );
  }, [options, selectedOptions]);

  // Inicializa el select con una opción por defecto si no hay ninguno
  useEffect(() => {
    if (selectedOptions.length === 0 && availableOptions.length > 0) {
      onSelect([availableOptions[0]]);
    }
  }, [availableOptions]);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const selectedOption = options.find(
      (opt) => opt.id === Number(event.target.value)
    );
    if (selectedOption) {
      const updatedSelection = [...selectedOptions];
      updatedSelection[index] = selectedOption;
      onSelect(updatedSelection);
    }
  };

  const addNewSelect = () => {
    if (availableOptions.length > 0) {
      onSelect([...selectedOptions, availableOptions[0]]);
    }
  };

  const removeSelect = (index: number) => {
    const updatedSelection = selectedOptions.filter((_, i) => i !== index);
    onSelect(updatedSelection);
  };

  return (
    <div className="flex flex-col gap-2">
      {selectedOptions.map((selected, index) => (
        <div key={index} className="flex items-center gap-2">
          <select
            className="p-2 border rounded-lg w-full"
            value={selected.id}
            onChange={(e) => handleSelectChange(e, index)}
          >
            {options.map((option) => (
              <option
                key={option.id}
                value={option.id}
                disabled={selectedOptions.includes(option)}
              >
                {option.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="text-white bg-red-500 px-2 py-1 rounded"
            onClick={() => removeSelect(index)}
          >
            X
          </button>
        </div>
      ))}

      {availableOptions.length > 0 && (
        <button
          type="button"
          className="text-white bg-blue-500 px-3 py-2 rounded mt-2"
          onClick={addNewSelect}
        >
          + Agregar
        </button>
      )}
    </div>
  );
};
