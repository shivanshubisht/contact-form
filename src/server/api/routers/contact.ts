import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const contactRouter = createTRPCRouter({
  send: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), message: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, message } = input;
      await ctx.prisma.contact.create({
        data: {
          name,
          email,
          message,
        },
      });
      return {
        response: `Thanks for submitting your message ${name}`,
      };
    }),
});
