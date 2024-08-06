import { z } from "zod";

export const bioSchema = z.object({
  heroImage: z
    .string()
    .min(5, {
      message: "short input value!!",
    })
    .max(200, {
      message: "too long input value!!",
    }),
  name: z
    .string("expected data type wrong!!")
    .min(5, {
      message: "short input value!!",
    })
    .max(20, {
      message: "too long input value!!",
    }),
  jobTitle: z.string("expected data type wrong!!"),
  summary: z
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
    .min(10, {
      message: "short input value!!",
    })
    .max(70, {
      message: "too long input value!!",
    }),
  cLogo: z
    .string("expected wrong type of data!!")
    .min(10, {
      message: "short input value!!",
    })
    .max(200, {
      message: "too long input value!!",
    }),
  position: z
    .string("expected wrong type of data!!")
    .min(5, {
      message: "short input value!!",
    })
    .max(60, {
      message: "too long input value!!",
    }),
  start: z.string(),
  end: z.string(),
  role: z
    .string("expected wrong type of data!!")
    .min(10, {
      message: "short input value!!",
    })
    .max(300, {
      message: "too long input value!!",
    }),
  location: z
    .string("expected type of data!!")
    .min(5, {
      message: "short input value!!",
    })
    .max(60, {
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
  thumbnail: z
    .string()
    .min(10, { message: "short input value!!" })
    .max(200, { message: "too long input value!!" }),
  tags: z.array(),
  liveLink: z
    .string("wrong type of data!!")
    .min(10, { message: "short input value!!" })
    .max(200, { message: "too long input value!!" }),
  sourceLink: z
    .string("wrong type of data!!")
    .min(10, { message: "short input value!!" })
    .max(200, { message: "too long input value!!" }),
  likes: z.number("not valid type input"),
  views: z.number("not valid type input"),
});

export const skillsSchema = z.object({
  skillName: z
    .string("expected type wrong!!")
    .min(5, { message: "short input value!!" })
    .max(30, { message: "too long input value!!" }),
  skillLogo: z
    .string("expected type wrong!!")
    .min(10, { message: "short input value!!" })
    .max(300, { message: "too long input value!!" }),
});

// export const contactsSchema = z.object({});
