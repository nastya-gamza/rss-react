import { FormEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import { formSchema } from '../../schemas/formValidationSchema.ts';
import { ValidationError } from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setSubmittedData,
  submittedDataSelector,
} from '../../store/slices/submittedData.ts';
import { PasswordStrengthBar } from '../../components/PasswordStrengthBar/PasswordStrengthBar.tsx';
import { convertFileToBase64 } from '../../utils/convertFileToBase64.ts';
import { useNavigate } from 'react-router-dom';

type ErrorsState = {
  name: string | null;
  age: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  gender: string | null;
  acceptTerms: string | null;
  file: string | null;
  autocomplete: string | null;
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

  const dispatch = useAppDispatch();
  const data = useAppSelector(submittedDataSelector);
  console.log('DATA - ', data);

  const navigate = useNavigate();

  const getSelectedGender = (): string => {
    return maleRef.current?.checked
      ? 'option1'
      : femaleRef.current?.checked
        ? 'option2'
        : '';
  };

  const getFormData = () => {
    return {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      age: ageRef.current?.value ? Number(ageRef.current.value) : null,
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: getSelectedGender() || null,
      acceptTerms: checkboxRef.current?.checked || false,
      file: fileRef.current?.files ? fileRef.current.files[0] : null,
    };
  };

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
      autocomplete: null,
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
    const formData = getFormData();

    try {
      await formSchema.validate(formData, { abortEarly: false });
      setErrors(null);

      const base64File = await handleFileUpload(formData.file);
      if (base64File) {
        console.log(base64File);
        dispatch(
          setSubmittedData({
            ...formData,
            file: base64File,
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
      <form className='form' onSubmit={handleSubmit} noValidate>
        <div className='field'>
          <label>
            <input
              ref={nameRef}
              type='text'
              placeholder='Name'
              className={classNames('input-field', { invalid: errors?.name })}
            />
          </label>
          <p className='error'>{errors?.name}</p>
        </div>
        <div className='field'>
          <label>
            <input
              ref={ageRef}
              type='number'
              placeholder='Age'
              className={classNames('input-field', { invalid: errors?.age })}
            />
          </label>
          <p className='error'>{errors?.age}</p>
        </div>
        <div className='field'>
          <label>
            <input
              ref={emailRef}
              type='email'
              placeholder='Email'
              className={classNames('input-field', { invalid: errors?.email })}
            />
          </label>
          <p className='error'>{errors?.email}</p>
        </div>
        <div className='field'>
          <label>
            <input
              ref={passwordRef}
              type='password'
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
              ref={confirmPasswordRef}
              type='password'
              placeholder='Confirm password'
              className={classNames('input-field', {
                invalid: errors?.confirmPassword,
              })}
            />
          </label>
          <p className='error'>{errors?.confirmPassword}</p>
        </div>
        <div className='field'>
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
        <div className='field'>
          <label className='terms-input'>
            <input ref={checkboxRef} type='checkbox' />
            Accept T&C
          </label>
          <p className='error'>{errors?.acceptTerms}</p>
        </div>
        <div className='field'>
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
