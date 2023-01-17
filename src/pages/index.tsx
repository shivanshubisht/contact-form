import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";
import { FormEvent, useRef } from "react";

const Home: NextPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);

  const mutation = api.contact.send.useMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !nameRef.current?.value ||
      !emailRef.current?.value ||
      !messageRef.current?.value
    )
      return;
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const message = messageRef.current?.value;
    mutation.mutate({ name, email, message });
  };
  return (
    <>
      <Head>
        <title>
          Contact Form built using NextJS, tRPC, Prisma and TailwindCSS
        </title>
        <meta
          name="description"
          content="Contact Form built using NextJS, tRPC, Prisma and TailwindCSS."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#191919] to-[#15162c]">
        <form onSubmit={handleSubmit} className="grid w-full max-w-sm gap-2">
          <input
            type="text"
            placeholder="Name"
            ref={nameRef}
            className="rounded border-2 border-black bg-black p-2 outline-none transition duration-300 ease-in-out focus:border-white"
          />
          <input
            type="text"
            placeholder="Email"
            ref={emailRef}
            className="rounded border-2 border-black bg-black p-2 outline-none transition duration-300 ease-in-out focus:border-white"
          />
          <input
            type="text"
            placeholder="Message"
            ref={messageRef}
            className="rounded border-2 border-black bg-black p-2 outline-none transition duration-300 ease-in-out focus:border-white"
          />
          <button
            type="submit"
            className="rounded border-2 border-white bg-white p-2 text-black transition duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Submit
          </button>
        </form>
        <div className="h-0">
          {mutation.error && (
            <p>Something went wrong! {mutation.error.message}</p>
          )}
          {mutation.isSuccess && (
            <div className="transition-all duration-300 ease-in-out">
              {mutation.data?.response}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
