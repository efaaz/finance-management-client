import React from "react";

function AboutUs() { 
  return (
    <>
      <div className="max-w-5xl mt-28 mx-auto text-neutral-300 p-4 md:p-8">
        <h1 className=" md:text-5xl font-bold text-2xl mb-4">About Us</h1>
        <p className=" font-semibold">
          FinX was born out of a personal need. As someone who has always been
          meticulous about money, I spent years tracking every expense and
          income using Microsoft Excel. But managing finances this way was a
          constant hassle—time-consuming and frustrating. I explored countless
          finance management tools, yet none fully met my expectations. So, I
          decided to take control and build something better.
        </p>
        <br />
        <p className="font-semibold">
          As a software developer, I saw an opportunity: if I could create a
          tool that brought clarity and control to my finances, others who care
          about managing their money could benefit too. FinX isn’t just a
          personal project—it’s a passion project crafted for anyone eager to
          take charge of their financial future. My vision was to design a
          platform that’s feature-rich, intuitive, and adaptable, with plans to
          integrate AI to make it evolve alongside your needs.
        </p>
        <br />
        <p className="font-semibold">
          Creating FinX was no small feat. I built it from the ground
          up—handling the frontend, backend, and database entirely on my own.
          It’s been a challenging journey, fueled by extensive research to
          ensure the best possible user experience. Today, FinX is more than
          just a tool for me; it’s a platform designed to give everyone
          effortless control over their financial life.
        </p>
        <br />
        <p className="font-semibold">
          We’re just getting started. Our roadmap is brimming with exciting
          features, and we’d love for you to join us on this journey. Sign up
          for our newsletter to stay updated on new releases and help shape the
          future of FinX.
        </p>
        <br />
        <p className="font-semibold">
          FinX is proudly open source. We welcome fellow developers to
          contribute, collaborate, and help us refine this tool. With a mobile
          app on the horizon, we’re committed to making FinX the ultimate
          financial management solution.
        </p>
      </div>
      {/* <div className="mt-10">
        <WavyBackground className="max-w-lg mx-auto overflow-hidden">
          <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
            Hero waves are cool
          </p>
          <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
            Leverage the power of canvas to create a beautiful hero section
          </p>
        </WavyBackground>
      </div> */}
    </>
  );
}

export default AboutUs;
