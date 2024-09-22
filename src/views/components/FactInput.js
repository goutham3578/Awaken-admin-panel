// import React from 'react'

// export default function FactInput({name=null,type,id,value,label,size="base",onChange=null,hasValue=null,spanLabel=null}) {
//   return (
//     <div className={`input-container relative ${label =="Address" ? "w-full":""}`}>
//       <input
//         type={type === 'number' ? 'text' : type}
//         id={id}
//         name={name || id}
//         className={`w-full border has-value-fact-input border-secondary rounded-lg p-3 px-6 peer focus:outline-secondary fact-input`}
//         value={value || ''}
//         // onInput={(e) =>
//         //   e.target.value
//         //     ? e.target.classList.add("has-value-fact-input")
//         //     : e.target.classList.remove("has-value-fact-input")
//         // }
//         onChange={onChange}
//         onKeyPress={((e) => {if(e.key === 'Enter') e.preventDefault()})}
//         {...type === 'number' && { pattern: '[0-9]*' }}
//       />
//       <label
//         htmlFor={id}
//         className={`text-${size} absolute top-3 left-5 transition-all duration-200 ease-in-out peer-focus:-top-3  bg-white px-2`}
//       >
//         {label}<span className='text-sm'>{spanLabel}</span>
//       </label>
//     </div>
//   );
// }


import React from 'react';
import { useField } from 'formik';

export default function FactInput({
  name = null,
  type,
  id,
  label,
  size = "base",
  spanLabel = null,
  onChange
}) {
  // Use Formik's useField hook to manage input state and validation
  const [field, meta, helpers] = useField(name || id);
  const { setValue } = helpers;

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value); // Update Formik's internal value
    if (onChange) {
      onChange(e); // Call external onChange handler
    }
  };

  return (
    <div className="mb-3 position-relative">
      {/* Input Field */}
      <input
        {...field}  // Spread field props from Formik
        type={type === 'number' ? 'text' : type}
        name={name}
        id={id || name}
        className={`form-control p-3 border-input  ${meta.touched && meta.error ? 'is-invalid' : ''}`} // Add 'is-invalid' class if there is an error
        pattern={type === 'number' ? '[0-9]*' : undefined} // pattern for number type
        style={{ width: '90%',height:'75px',borderRadius:12 }}
        onChange={handleChange}   // Use Formik's setValue to handle input changes
        value={field.value}  // Field value managed by Formik
      />

      {/* Label */}
      <label
        htmlFor={id}
        className={`position-absolute px-1 bg-white text-input`}
        style={{
          top: '-10px', // Adjusting the position of label over the top border
          left: '20px', // Adjusting left position of label
          whiteSpace: 'nowrap',
          fontSize: size === "base" ? "16px" : "12px", // Handling label size
          padding: '0 5px',
        }}
      >
        {label} <span className="small">{spanLabel}</span>
      </label>

      {/* Validation Error Message */}
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  );
}
