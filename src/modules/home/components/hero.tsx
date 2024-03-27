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
          <h1 className="relative z-1 text-center text-[6rem] md:text-[12rem] leading-none font-bold text-green-600 mix-blend-difference">
            <span className="relative ">Large Language</span>
            <br />
            <span className=" text-green-600">Models</span>
          </h1>
        </div>
      </div>
      {/* <div
        className=" bottom-5 inset-0 h-full w-full items-center px-5 py-24"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #000 40%, #54bf53 100%)",
        }}
      /> */}
      {/* <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-green-600 to-blue-500"></div> */}
    </>
  );
}

// export function Hero() {
//   return (
//     <div className="relative h-screen flex items-center justify-center overflow-hidden">
//       <img
//         src={"/assets/hero/bg1.webp"}
//         alt="Background"
//         className="absolute inset-0 bg-contain object-cover w-full h-full z-0"
//       />
//       <div className="pt-10">
//         <h1 className="relative z-1 text-center text-[6rem] md:text-[12rem] leading-none font-bold text-green-600 mix-blend-difference">
//           <span className="relative ">Large Language</span>
//           <br />
//           <span className=" text-green-600">Models</span>
//         </h1>
//       </div>
//       <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
//     </div>
//   );
// }
