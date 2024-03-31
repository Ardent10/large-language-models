export function Hero() {
  return (
    <>
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={"/assets/hero/bg1.webp"}
          alt="Background"
          className="absolute inset-0 bg-contain object-cover w-full h-full z-0"
        />
        <div className="pt-10">
          <h1 className="relative z-1 text-center text-[3rem] sm:text-[6rem] md:text-[10rem] leading-none font-bold text-green-600 mix-blend-difference">
            <span className="relative ">Large Language</span>
            <br />
            <span className=" text-green-600">Models</span>
          </h1>
        </div>
      </div>
    </>
  );
}
