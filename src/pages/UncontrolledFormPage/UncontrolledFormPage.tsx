import { FormEvent, useRef, useState } from 'react';
import { formSchema } from '../../schemas/formValidationSchema.ts';
import { ValidationError } from 'yup';

type ErrorsState = {
  name: string | null;
  age: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  gender: string | null;
  acceptTerms: string | null;
  file: string | null;
};

export const UncontrolledFormPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<ErrorsState | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedGender = maleRef.current?.checked
      ? 'option1'
      : femaleRef.current?.checked
        ? 'option2'
        : '';

    const formData = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      age: ageRef.current?.value ? Number(ageRef.current.value) : null,
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: selectedGender || null,
      acceptTerms: checkboxRef.current?.checked || false,
      file: fileRef.current?.files ? fileRef.current.files[0] : null,
    };

    console.log(formData);

    try {
      await formSchema.validate(formData, { abortEarly: false });
      setErrors(null);
      console.log(formData);
    } catch (validationErrors) {
      if (validationErrors instanceof ValidationError) {
        const formattedErrors: ErrorsState = {
          name: null,
          age: null,
          email: null,
          password: null,
          confirmPassword: null,
          gender: null,
          acceptTerms: null,
          file: null,
        };

        validationErrors.inner.forEach((error) => {
          if (error.path) {
            formattedErrors[error.path as keyof ErrorsState] = error.message;
          }
        });

        setErrors(formattedErrors);
      } else {
        console.error('An unexpected error occurred', validationErrors);
      }
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit} noValidate>
        <div>
          <label>
            <input
              ref={nameRef}
              type='text'
              placeholder='Name'
              className='input-field invalid'
            />
          </label>
          <p className='error'>{errors?.name}</p>
        </div>
        <div>
          <label>
            <input
              ref={ageRef}
              type='number'
              placeholder='Age'
              className='input-field invalid'
            />
          </label>
          <p className='error'>{errors?.age}</p>
        </div>
        <div>
          <label>
            <input
              ref={emailRef}
              type='email'
              placeholder='Email'
              className='input-field invalid'
            />
          </label>
          <p className='error'>{errors?.email}</p>
        </div>
        <div>
          <label>
            <input
              ref={passwordRef}
              type='password'
              placeholder='Password'
              className='input-field invalid'
            />
          </label>
          <p className='error'>{errors?.password}</p>
        </div>
        <div>
          <label>
            <input
              ref={confirmPasswordRef}
              type='password'
              placeholder='Confirm password'
              className='input-field invalid'
            />
          </label>
          <p className='error'>{errors?.confirmPassword}</p>
        </div>
        <div>
          <div className='gender'>
            <label className='gender-input'>
              <input
                type='radio'
                name='gender'
                value='option1'
                ref={maleRef}
                style={{ position: 'relative' }}
              />
              Male
            </label>
            <label className='gender-input'>
              <input
                type='radio'
                name='gender'
                value='option2'
                ref={femaleRef}
              />
              Female
            </label>
          </div>
          <p className='error'>{errors?.gender}</p>
        </div>
        <div>
          <label className='terms-input'>
            <input ref={checkboxRef} type='checkbox' />
            Accept T&C
          </label>
          <p className='error'>{errors?.acceptTerms}</p>
        </div>
        <div>
          <label className='terms-input'>
            <input
              type='file'
              ref={fileRef}
              id='imageUpload'
              accept='image/*'
            />
          </label>
          <p className='error'>{errors?.file}</p>
        </div>
        <button type='submit' className='button'>
          Submit
        </button>
      </form>
    </div>
  );
};
