import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email?: string;
  phone?: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ name, email, phone }: FormData) => {
    // Use the API to create new check in
    const response = await fetch(`/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
      }),
    });

    console.log(response);

    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Please enter your name"
        {...register('name', { required: true })}
      />
      <input
        placeholder="Please enter your email if you have one"
        {...register('email')}
      />
      <input
        placeholder="Please enter your phone number if you have one"
        {...register('phone')}
      />
      <input type="submit" value="Register" />
      {errors.name && (
        <span className="error-message">Please enter a name</span>
      )}
      {errors.email && (
        <span className="error-message">Please enter a valid Email</span>
      )}
      {errors.phone && (
        <span className="error-message">Please enter a valid Phone Number</span>
      )}
    </form>
  );
};

export default RegisterForm;
