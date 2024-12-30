import Navbar from "@/components/Navbar";
import React from "react";
import { programs } from "@/lib/programs";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <main className="px-5">
      <Navbar />
      <h1 className="my-10 text-center text-3xl lg:text-7xl">PROGRAMACIÓN</h1>
      <section className="flex flex-col gap-5">
        {programs.map((program, index) => {
          return (
            <article
              key={index}
              className="cursor-pointer rounded-lg bg-neutral-900 p-4 ring-1 ring-inset ring-neutral-800"
            >
              <h2 className="text-2xl font-medium">{program.name}</h2>
              <p>
                {program.startTime} - {program.endTime}
              </p>
              <div className="flex gap-1 text-xs">
                {program.days.map((day, index) => (
                  <span key={index} className="capitalize">
                    {day}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </section>
      <Footer />
    </main>
  );
};

export default page;
