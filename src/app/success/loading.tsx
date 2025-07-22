export default function Loading() {
  return (
    <section className="min-h-screen max-w-screen relative overflow-x-hidden flex justify-center items-center">
      <div
        className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-green-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </section>
  );
}
