'use server';

import { auth } from "../better-auth/auth";
import { SignInFormData, SignUpFormData } from "@/interfaces/auth.interface";
import { inngest } from '../inngest/client';
import { INNGEST_EVENTS } from '../inngest/functions';
import { headers } from "next/headers";

export const signUpWithEmail = async ({ email, password, fullName: name, ...restFields }: SignUpFormData) => {
  try {
    const res = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      }
    });

    if (res) {
      inngest.send({ name: INNGEST_EVENTS.USER_CREATED, data: { email, name, ...restFields } });
    }

    return { success: true, data: res };
  } catch (error) {
    console.error("Error during sign-up:", error);
    if (error instanceof Error) {
      if (error.message.includes("already exists")) {
        return { success: false, message: "This email is already registered." };
      }
    }
    return { success: false, message: "Unable to sign up. Please try again." };
  }
}

export const signInWithEmailAndPassword = async ({ email, password }: SignInFormData) => {
  try {
    const res = await auth.api.signInEmail({
      body: {
        email,
        password,
      }
    });
    return { success: true, data: res };
  } catch (error) {
    console.error("Error during log-in:", error);
    return { success: false, message: "An error occurred during log in." };
  }
}

export const signOut = async () => {
  try {
    const res = await auth.api.signOut({ headers: await headers() });
    return { success: true, data: res };
  } catch (error) {
    console.error("Error during log-out:", error);
    return { success: false, message: "An error occurred during log out." };
  }
}