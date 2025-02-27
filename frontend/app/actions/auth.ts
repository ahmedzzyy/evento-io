"use server"

import { signupUser } from "@/services/authService";
import { redirect } from "next/navigation";
import { z } from "zod";

const signupSchema = z.object({
    username: z
        .string()
        .min(2, "Name must be at least 2 characters"),
    email: z
        .string()
        .email("Invalid email address").trim(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
    role: z
        .enum(["attendee", "organizer"], {
            invalid_type_error: "Please select a valid role",
        }),
});

export async function signupAction(_prevState: unknown, formData: FormData) {
    const validatedFields = signupSchema.safeParse({
        username: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Simulate the signup process
    await signupUser(validatedFields.data);

    redirect("/login");
}