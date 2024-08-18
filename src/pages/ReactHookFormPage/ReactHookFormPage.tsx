import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  formSchema,
  FormValidationSchema,
} from '../../schemas/formValidationSchema.ts';
import { PasswordStrengthBar } from '../../components/PasswordStrengthBar/PasswordStrengthBar.tsx';
import { useNavigate } from 'react-router-dom';
import { convertFileToBase64 } from '../../utils/convertFileToBase64.ts';
import { setSubmittedData } from '../../store/slices/submittedData.ts';
import { ControlledAutocomplete } from '../../components/Autocomplete/ControlledAutocomplete.tsx';
import { countriesSelector } from '../../store/slices/countries.ts';

export const ReactHookFormPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValidationSchema>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const countries = useAppSelector(countriesSelector);

  const passwordValue = watch('password');

  const handleFileUpload = async (file: File) => {
    try {
      return await convertFileToBase64(file);
    } catch (error) {
      console.error('Error converting file:', error);
    }
  };

  const onSubmitHandler = async (data: FormValidationSchema) => {
    const { file } = data;

    if (file) {
      const base64File = await handleFileUpload(file);

      if (base64File) {
        dispatch(
          setSubmittedData({
            ...data,
            file: base64File,
            date: Date.now(),
          }),
        );
        reset();
        navigate('/');
      } else {
        console.log('File is not defined');
      }
    }
  };

  return (
    <div className='container'>
      <form
        className='form'
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
      >
        <div className='field'>
          <label>
            <input
              type='text'
              {...register('name')}
              placeholder='Name'
              className={classNames('input-field', { invalid: errors?.name })}
            />
          </label>
          <p className='error'>{errors.name?.message}</p>
        </div>
        <div className='field'>
          <label>
            <input
              type='number'
              {...register('age')}
              placeholder='Age'
              className={classNames('input-field', { invalid: errors?.age })}
            />
          </label>
          <p className='error'>{errors.age?.message}</p>
        </div>
        <div className='field'>
          <label>
            <input
              type='email'
              {...register('email')}
              placeholder='Email'
              className={classNames('input-field', { invalid: errors?.email })}
            />
          </label>
          <p className='error'>{errors.email?.message}</p>
        </div>
        <div className='field'>
          <label>
            <input
              type='password'
              {...register('password')}
              placeholder='Password'
              className={classNames('input-field', {
                invalid: errors?.password,
              })}
            />
          </label>
          <PasswordStrengthBar password={passwordValue || ''} />
          <p className='error'>{errors.password?.message}</p>
        </div>
        <div className='field'>
          <label>
            <input
              type='password'
              {...register('confirmPassword')}
              placeholder='Confirm password'
              className={classNames('input-field', {
                invalid: errors?.confirmPassword,
              })}
            />
          </label>
          <p className='error'>{errors.confirmPassword?.message}</p>
        </div>
        <Controller
          name='country'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <ControlledAutocomplete
              options={countries}
              value={field.value || ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.country?.message}
            />
          )}
        />
        <div className='field'>
          <div className='gender'>
            <label className='gender-input'>
              <input
                type='radio'
                {...register('gender')}
                value='male'
                style={{ position: 'relative' }}
              />
              Male
            </label>
            <label className='gender-input'>
              <input type='radio' {...register('gender')} value='female' />
              Female
            </label>
          </div>
          <p className='error'>{errors.gender?.message}</p>
        </div>
        <div className='field'>
          <label className='terms-input'>
            <input type='checkbox' {...register('acceptTerms')} />
            Accept T&C
          </label>
          <p className='error'>{errors.acceptTerms?.message}</p>
        </div>
        <div className='field'>
          <label className='terms-input'>
            <input type='file' {...register('file')} accept='image/*' />
          </label>
          <p className='error'>{errors.file?.message}</p>
        </div>
        <button type='submit' className='button' disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};
