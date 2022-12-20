'use client';
import React, { useRef } from 'react';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const Contact = () => {
  const nameInput = useRef<HTMLInputElement | null>(null);
  const emailInput = useRef<HTMLInputElement | null>(null);
  const messageInput = useRef<HTMLTextAreaElement | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = nameInput.current?.value;
    const email = emailInput.current?.value;
    const message = messageInput.current?.value;
    if (!name || !email || !message) {
      return;
    }
    const { data } = await axios.post('/api/contact', { name, email, message });
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type='text' name='name' ref={nameInput} />
      </label>
      <br />
      <label>
        Email:
        <input type='email' name='email' ref={emailInput} />
      </label>
      <br />
      <label>
        Message:
        <textarea name='message' ref={messageInput} />
      </label>
      <br />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Contact;
