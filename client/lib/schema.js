import { z } from "zod";

export const bioSchema = z.object({
  bioName: z
    .string("expected data type wrong!!")
    .min(5, {
      message: "short input value!!",
    })
    .max(70, {
      message: "too long input value!!",
    }),
  jobTitle: z.string("expected data type wrong!!"),
  bio: z
    .string("expected data type wrong!!")
    .min(10, {
      message: "short input value!!",
    })
    .max(400, {
      message: "too long input value!!",
    }),
});

export const experienceSchema = z.object({
  cName: z
    .string("expected wrong type of data!!")
    .min(5, {
      message: "short input value!!",
    })
    .max(80, {
      message: "too long input value!!",
    }),
  position: z
    .string("expected wrong type of data!!")
    .min(3, {
      message: "short input value!!",
    })
    .max(80, {
      message: "too long input value!!",
    }),
  start: z.string().date(),
  end: z.string().date(),
  location: z.string("expected type of data!!").min(3, {
    message: "short input value!!",
  }),
  role: z
    .string("expected wrong type of data!!")
    .min(5, {
      message: "short input value!!",
    })
    .max(300, {
      message: "too long input value!!",
    }),
});

export const projectSchema = z.object({
  title: z
    .string("wrong type of data!!")
    .min(5, { message: "short input value!!" })
    .max(60, { message: "too long input value!!" }),
  description: z
    .string("wrong type of data")
    .min(10, { message: "short input value!!" })
    .max(300, { message: "too long input value!!" }),
  tags: z.string().array().min(1).max(10).optional(),
  sourceLink: z
    .string("wrong type of data!!")
    .min(10, { message: "short input value!!" })
    .max(200, { message: "too long input value!!" })
    .optional(),
});

export const skillsSchema = z.object({
  skillName: z
    .string("expected type wrong!!")
    .min(3, { message: "short input value!!" })
    .max(80, { message: "too long input value!!" }),
  skillLogo: z
    .string("expected type wrong!!")
    .min(10, { message: "short input value!!" })
    .max(200, { message: "too long input value!!" }),
});

export const userSchema = z.object({
  id: z.string(),
  given_name: z.string(),
  family_name: z.string(),
  picture: z
    .string()
    .min(10, { message: "too short url " })
    .max(300, { message: "too long url text" })
    .url({ message: "Invalid url" }),
  email: z.string().email({ message: "Invalid email address" }),
});

export const contactsSchema = z.object({
  linkedin: z.string().min(0).optional(),
  github: z.string().min(0).optional(),
  youtube: z.string().min(0).optional(),
  twitter: z.string().min(0).optional(),
});

export const layoutsSchema = z.object({
  heroLayout: z.string().length(1, { message: "not valid experience layout" }),
  expLayout: z.string().length(1, { message: "not valid experience layout" }),
  projectsLayout: z
    .string()
    .length(1, { message: "not valid projects layout" }),
  skillsLayout: z.string().length(1, { message: "not valid skills layout" }),
});
export const feedBackSchema = z.object({
  name: z
    .string()
    .min(1, { message: "not valid name data" })
    .max(80, { message: "too large data" }),
  position: z
    .string()
    .min(1, { message: "not valid position data" })
    .max(80, { message: "too large data" }),
});
