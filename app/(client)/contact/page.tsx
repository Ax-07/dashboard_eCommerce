import ContactForm from "@/src/blocks/Contact/contactForm";
import Navbar from "@/src/blocks/Navbar/Navbar";
import React from "react";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <section id="contact-page" className="px-8 py-32">
        <div className="container">
          <div className="mx-auto flex max-w-(--breakpoint-xl) lg:gap-20">
            <div className="mx-auto flex w-full max-w-96 flex-col items-center justify-between text-center lg:items-start lg:text-left">
              <div>
                <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
                  Contact Us
                </h1>
                <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                  We are available for questions, feedback, or collaboration
                  opportunities. Let us know how we can help!
                </p>
              </div>
              <div className="mb-8">
                <h2 className="mb-5 text-left text-2xl font-bold">
                  Contact Details
                </h2>
                <ul className="ml-4 flex list-disc flex-col">
                  <li className="">
                    <span className="font-bold">Phone: </span>(+33) 6 12 34 56
                    78
                  </li>
                  <li className="">
                    <span className="font-bold">Email: </span>
                    <a href="mailto:" className="underline">
                      your-email@example.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
