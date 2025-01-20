import React from 'react';

type TextInputProps = {
  value: string;
  setValue: (newValue: string) => void;
};

function TextInput({ value, setValue }: TextInputProps): React.JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return <input type="text" value={value} onChange={handleChange} />;
}

export default TextInput;
