import { z } from "zod";
interface Model {
  id: string;
  name: string;
  header_image: string;
  content: string;
  published_date: string;
  created_at: string;
  likes: number;
  parameters: string;
  tags: string[];
  status: string;
  provider: string;
  website: string;
  access_type: string;
}
const LoginSchema = z.object({
  email: z.string().email("Invalid email").min(5, "Too short"),
  password: z.string().min(6, "Password is too short"),
});

const SignupSchema = z
  .object({
    firstName: z.string().min(2, { message: "❌ Too short" }),
    lastName: z.string().min(2, { message: "❌ Too short" }),
    occupation: z.string().min(2, { message: "❌ Too short" }),
    user_type: z.string().min(2, { message: "❌ Too short" }),
    email: z.string().email({ message: "❌ Invalid email" }),
    password: z
      .string()
      .min(8, { message: "❌ Password is too short" })
      .max(20, { message: "❌ Password is too long" }),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: " ❌Passwords do not match",
    path: ["❌ confirmPassword"],
  });

const CreateModelSchema = z.object({
  name: z.string().min(2, { message: "❌ Too short" }),
  header_image: z.instanceof(File),
  content: z.string().min(2, { message: "❌ Too short" }),
  published_date: z.string().min(2, { message: "❌ Too short" }),
  likes: z.coerce.number(),
  parameters: z.string().min(2, { message: "❌ Too short" }),
  tags: z.array(z.string()),
  status: z.string().min(2, { message: "❌ Too short" }),
  provider: z.string().min(2, { message: "❌ Too short" }),
  website: z.string().url({ message: "❌ Invalid URL" }),
  access_type: z.string().min(2, { message: "❌ Too short" }),
});

const SearchSchema = z.object({
  search: z.string().nonempty(),
});

export { CreateModelSchema, LoginSchema, SignupSchema, SearchSchema };
