"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
  const { email, password, uid , name} = params;
  try {
    // CHECK IF THE USER ALREADY EXISTS
    const userRecord = await db.collection("users").doc(uid).get();

    if(userRecord.exists) {
        return {
            success: false,
            message: "This User Already Exists. Please Sign In",
        }
    }

    // CREATE THE USER

    await db.collection("users").doc(uid).set({
        name,
        email,
    });

    return {
        success: true,
        message: "Account Created Successfully. Please Sign In",
    }
  } catch (error: any) {
    console.error("Error Creating a User", error);

    if(error.code === "auth/email-already-exists") {
        return {
            success: false,
            message: "This Email Already in Use. Please Sign In",
        }
    }


    return {
        success: false,
        message: "Failed to Create An Account. Please Try Again Later"
    }
  }
}

export async function signIn(params: SignInParams) {
    const {email, idToken} = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord) {
            return {
                success: false,
                message: "User Not Found. Please Sign Up"
            }
        }
        await setSessionCookie(idToken)
    } catch (error) {
        console.error("Error Signing In", error);


        return {
            success: false,
            message: "Failed to Sign In. Please Try Again Later"
        }
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore =  await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK_IN_SECONDS * 1000
    })

    cookieStore.set("session", sessionCookie, {
        maxAge: ONE_WEEK_IN_SECONDS,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    })
}