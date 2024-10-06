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











import React, { useEffect, useState } from 'react';
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
  const [isFocused, setIsFocused] = useState(false);
  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value); // Update Formik's internal value
    if (onChange) {
      onChange(e); // Call external onChange handler
    }
  };

  useEffect(() => {
        if (field.value) {
          setIsFocused(true);
        }
      }, [field.value]);

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
        style={{
                    width: '100%', // w-full
                    border:  isFocused?'2px solid #344071':'2px solid grey', // border-secondary (assuming secondary is #6c757d)
                    borderRadius: '0.5rem', // rounded-lg (8px border radius)
                    padding: '0.75rem', // p-3 (12px padding)
                    paddingLeft: '1.5rem', // px-6 (24px left-right padding)
                    paddingRight: '1.5rem',
                    outline: 'none', // Removes focus outline
                    height:'60px',
                  }}
                  onFocus={() => setIsFocused(true)} // Handle focus
                  onBlur={(e) => {
                    setIsFocused(!!e.target.value); // Keep label floated if value exists
                  }}
        onChange={handleChange}   // Use Formik's setValue to handle input changes
        value={field.value}  // Field value managed by Formik
      />

      {/* Label */}
      <label
        htmlFor={id}
        onClick={()=>setIsFocused(true)}
                style={{
                  fontSize: isFocused ? '1rem' : '1rem', // Smaller font size when floating
                  color:isFocused?'#344071':'black',
                  fontWeight:500,
                  position: 'absolute',
                  top: isFocused ? '-0.75rem' : '0.75rem', // This is equivalent to top-3 in Tailwind (12px)
                  left: '1.25rem', // This is equivalent to left-5 in Tailwind (20px)
                  transition: 'all 0.2s ease-in-out', // Equivalent to transition-all duration-200 ease-in-out
                  backgroundColor: 'white', // bg-white
                  paddingLeft: '0.5rem', // px-2 (Padding left and right)
                  paddingRight: '0.5rem',
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




// import React, { useEffect, useState } from 'react';
// import { useField } from 'formik';

// export default function FactInput({
//   name = null,
//   type,
//   id,
//   label,
//   size = "base",
//   spanLabel = null,
//   onChange
// }) {
//   // Use Formik's useField hook to manage input state and validation
//   const [field, meta, helpers] = useField(name || id);
//   const { setValue } = helpers;
//   const [isFocused, setIsFocused] = useState(false); // Manage focus state

//   const handleChange = (e) => {
//     const { value } = e.target;
//     setValue(value); // Update Formik's internal value
//     if (onChange) {
//       onChange(e); // Call external onChange handler
//     }
//   };

//    // Check if input has value to keep the label floated after input
//    useEffect(() => {
//     if (field.value) {
//       setIsFocused(true);
//     }
//   }, [field.value]);

//   return (
//     <div className="mb-3 position-relative">
//       {/* Input Field */}
//       <input
//         {...field}  // Spread field props from Formik
//         type={type === 'number' ? 'text' : type}
//         name={name}
//         id={id || name}
//         pattern={type === 'number' ? '[0-9]*' : undefined} // pattern for number type
//         // style={{ width: '100%',height:'60px',borderRadius:12 }}
//         className={`form-control p-3  ${meta.touched && meta.error ? 'is-invalid' : ''}`} // Add 'is-invalid' class if there is an error
//         style={{
//           width: '100%', // w-full
//           border:  isFocused?'2px solid #344071':'2px solid grey', // border-secondary (assuming secondary is #6c757d)
//           borderRadius: '0.5rem', // rounded-lg (8px border radius)
//           padding: '0.75rem', // p-3 (12px padding)
//           paddingLeft: '1.5rem', // px-6 (24px left-right padding)
//           paddingRight: '1.5rem',
//           outline: 'none', // Removes focus outline
//           height:'60px',
//         }}
//         onFocus={() => setIsFocused(true)} // Handle focus
//         onBlur={(e) => {
//           setIsFocused(!!e.target.value); // Keep label floated if value exists
//         }}
//         onChange={handleChange}   // Use Formik's setValue to handle input changes
//         value={field.value}  // Field value managed by Formik
//       />

//       {/* Label */}
//       <label
//         htmlFor={id}
//         onClick={()=>setIsFocused(true)}
//         style={{
//           fontSize: isFocused ? '1rem' : '1rem', // Smaller font size when floating
//           color:isFocused?'#344071':'black',
//           fontWeight:500,
//           position: 'absolute',
//           top: isFocused ? '-0.75rem' : '0.75rem', // This is equivalent to top-3 in Tailwind (12px)
//           left: '1.25rem', // This is equivalent to left-5 in Tailwind (20px)
//           transition: 'all 0.2s ease-in-out', // Equivalent to transition-all duration-200 ease-in-out
//           backgroundColor: 'white', // bg-white
//           paddingLeft: '0.5rem', // px-2 (Padding left and right)
//           paddingRight: '0.5rem',
//         }}
//       >
//         {label} <span className="small">{spanLabel}</span>
//       </label>

//       {/* Validation Error Message */}
//       {meta.touched && meta.error ? (
//         <div className="invalid-feedback">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// }
