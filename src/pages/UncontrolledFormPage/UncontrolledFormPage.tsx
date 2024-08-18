import { FormEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import { formSchema } from '../../schemas/formValidationSchema.ts';
import { ValidationError } from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSubmittedData } from '../../store/slices/submittedData.ts';
import { PasswordStrengthBar } from '../../components/PasswordStrengthBar/PasswordStrengthBar.tsx';
import { convertFileToBase64 } from '../../utils/convertFileToBase64.ts';
import { useNavigate } from 'react-router-dom';
import { Autocomplete } from '../../components/Autocomplete/Autocomplete.tsx';
import { countriesSelector } from '../../store/slices/countries.ts';

type ErrorsState = {
  name: string | null;
  age: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  gender: string | null;
  acceptTerms: string | null;
  file: string | null;
  country: string | null;
};

type AutocompleteHandle = {
  getValue: () => string;
};

export const UncontrolledFormPage = () => {
  const [errors, setErrors] = useState<ErrorsState | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<AutocompleteHandle>(null);

  const dispatch = useAppDispatch();
  const countries = useAppSelector(countriesSelector);

  const navigate = useNavigate();

  const handleFileUpload = async (file: File | null) => {
    if (file) {
      try {
        return await convertFileToBase64(file);
      } catch (error) {
        console.error('Error converting file:', error);
      }
    }
    return null;
  };

  const handleValidationErrors = (validationErrors: ValidationError) => {
    const formattedErrors: ErrorsState = {
      name: null,
      age: null,
      email: null,
      password: null,
      confirmPassword: null,
      gender: null,
      acceptTerms: null,
      file: null,
      country: null,
    };

    validationErrors.inner.forEach((error) => {
      if (error.path) {
        formattedErrors[error.path as keyof ErrorsState] = error.message;
      }
    });

    setErrors(formattedErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = formRef.current;
    if (!formElement) return;
    const formData = new FormData(formElement);

    const data = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      age: formData.get('age') ? Number(formData.get('age')) : null,
      password: formData.get('password')?.toString() || '',
      confirmPassword: formData.get('confirmPassword')?.toString() || '',
      gender: formData.get('gender')?.toString() || null,
      acceptTerms: formData.get('acceptTerms') === 'on',
      file: formData.get('file') as File | null,
      country: autocompleteRef.current?.getValue() || '',
    };

    try {
      await formSchema.validate(data, { abortEarly: false });
      setErrors(null);

      const base64File = await handleFileUpload(data.file);
      if (base64File) {
        dispatch(
          setSubmittedData({
            ...data,
            file: base64File,
            date: Date.now(),
          }),
        );
      }
      navigate('/');
    } catch (validationErrors) {
      if (validationErrors instanceof ValidationError) {
        handleValidationErrors(validationErrors);
      } else {
        console.error('An unexpected error occurred', validationErrors);
      }
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit} ref={formRef} noValidate>
        <div className='field'>
          <label>
            <input
              type='text'
              name='name'
              placeholder='Name'
              className={classNames('input-field', { invalid: errors?.name })}
            />
          </label>
          <p className='error'>{errors?.name}</p>
        </div>
        <div className='field'>
          <label>
            <input
              type='number'
              name='age'
              placeholder='Age'
              className={classNames('input-field', { invalid: errors?.age })}
            />
          </label>
          <p className='error'>{errors?.age}</p>
        </div>
        <div className='field'>
          <label>
            <input
              type='email'
              name='email'
              placeholder='Email'
              className={classNames('input-field', { invalid: errors?.email })}
            />
          </label>
          <p className='error'>{errors?.email}</p>
        </div>
        <div className='field'>
          <label>
            <input
              type='password'
              name='password'
              ref={passwordRef}
              placeholder='Password'
              className={classNames('input-field', {
                invalid: errors?.password,
              })}
            />
          </label>
          <PasswordStrengthBar password={passwordRef.current?.value || ''} />
          <p className='error'>{errors?.password}</p>
        </div>
        <div className='field'>
          <label>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm password'
              className={classNames('input-field', {
                invalid: errors?.confirmPassword,
              })}
            />
          </label>
          <p className='error'>{errors?.confirmPassword}</p>
        </div>
        <div className='field'>
          <Autocomplete ref={autocompleteRef} options={countries} />
          <p className='error'>{errors?.country}</p>
        </div>
        <div className='field'>
          <div className='gender'>
            <label className='gender-input'>
              <input
                type='radio'
                name='gender'
                value='male'
                style={{ position: 'relative' }}
              />
              Male
            </label>
            <label className='gender-input'>
              <input type='radio' name='gender' value='female' />
              Female
            </label>
          </div>
          <p className='error'>{errors?.gender}</p>
        </div>
        <div className='field'>
          <label className='terms-input'>
            <input type='checkbox' name='acceptTerms' />
            Accept T&C
          </label>
          <p className='error'>{errors?.acceptTerms}</p>
        </div>
        <div className='field'>
          <label className='terms-input'>
            <input type='file' name='file' id='imageUpload' accept='image/*' />
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
