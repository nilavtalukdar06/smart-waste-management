export default function SuccessPage() {
  return (
    <div className="max-w-2xl p-4 mx-auto">
      <div className="my-12 w-full flex flex-col justify-center items-center gap-6">
        <h2 className="text-2xl sm:text-3xl text-neutral-600 font-medium text-center">
          Thank You! 🌱
        </h2>
        <p className="text-center text-neutral-500">
          Your donation to <span className="text-green-500">Eco Swacch</span>{" "}
          makes a real difference!
        </p>
      </div>
    </div>
  );
}
