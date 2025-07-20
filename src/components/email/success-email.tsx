interface ISuccess {
  name: string;
}

export default function SuccessEmail({ name }: ISuccess) {
  return (
    <div>
      <h1 className="text-2xl font-medium text-green-500">Hi , {name}!</h1>✅
      <p className="my-4 text-lg text-neutral-700">
        ✅ Your account has been successfully created! You can now log in and
        start using all the features of our platform. Thank you for registering
        and being a part of our mission toward a cleaner and better tomorrow.
      </p>
    </div>
  );
}
