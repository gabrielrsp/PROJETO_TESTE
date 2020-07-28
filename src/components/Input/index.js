import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { InputUnform } from './styles';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <InputUnform
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest} />
      {error && <span className="error">{error}</span>}
    </div>

  );

}
