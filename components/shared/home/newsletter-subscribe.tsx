const NewsletterSubscribe = () => {
  return (
    <section className="py-16 px-4 flex flex-col items-center text-center">
      {/* Headline */}
      <h2 className="text-xl md:text-2xl font-serif mb-6">
        Get <span className="font-semibold">15% off</span> your next order,{" "}
        <br />
        Subscribe to our Newsletter
      </h2>

      {/* Input + Button Row */}
      <form className="flex flex-col sm:flex-row items-stretch max-w-md w-full">
        <input
          type="email"
          placeholder="Enter your email here"
          required
          className="flex-1 px-4 py-2 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-gray-100 text-sm font-serif"
        />
        <button
          type="submit"
          className="mt-2 sm:mt-0 sm:ml-2 px-6 py-2 bg-black text-white text-sm font-bold tracking-wide uppercase hover:bg-gray-900 transition"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsletterSubscribe;
