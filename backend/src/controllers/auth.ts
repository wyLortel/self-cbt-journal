import { Context } from 'hono';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { createSession } from '../utils/session';
import bcryptjs from 'bcryptjs';

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const signup = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { email, password } = SignupSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return c.json(
        { success: false, data: null, error: 'Email already exists' },
        400,
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const { token, expiresAt } = await createSession(newUser.id);

    return c.json(
      {
        success: true,
        data: {
          user_id: newUser.id,
          email: newUser.email,
          token,
          created_at: newUser.createdAt,
        },
        error: null,
      },
      201,
    );
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return c.json(
        { success: false, data: null, error: err.errors[0].message },
        400,
      );
    }

    return c.json(
      { success: false, data: null, error: 'Internal server error' },
      500,
    );
  }
};

export const login = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { email, password } = LoginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return c.json(
        { success: false, data: null, error: 'Invalid email or password' },
        401,
      );
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      return c.json(
        { success: false, data: null, error: 'Invalid email or password' },
        401,
      );
    }

    const { token, expiresAt } = await createSession(user.id);

    return c.json(
      {
        success: true,
        data: {
          user_id: user.id,
          email: user.email,
          token,
          expires_at: expiresAt,
        },
        error: null,
      },
      200,
    );
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return c.json(
        { success: false, data: null, error: err.errors[0].message },
        400,
      );
    }

    return c.json(
      { success: false, data: null, error: 'Internal server error' },
      500,
    );
  }
};
