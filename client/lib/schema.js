import { z } from "zod";

export const bioSchema = z.object({
  heroImage: z
    .string()
    .min(5, {
      message: "short input value!!",
    })
    .max(20, {
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
  jobTittle: z.string("expected data type wrong!!"),
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
    .max(30, {
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
    .max(30, {
      message: "too long input value!!",
    }),
  start: z.date("expected wrong type of data!!"),
  end: z.date("expected wrong type of data!!"),
  role: z
    .string("expected wrong type of data!!")
    .min(10, {
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
    .max(30, { message: "too long input value!!" }),
  description: z
    .string("wrong type of data")
    .min(10, { message: "short input value!!" })
    .max(300, { message: "too long input value!!" }),
  thumbnail: z
    .string()
    .min(10, { message: "short input value!!" })
    .max(200, { message: "too long input value!!" }),
  tags: z.array([z.string("wrong value type!!")], {
    message: "expected data  wrong !!",
  }),
  liveLink: z
    .string("wrong type of data!!")
    .min(10, { message: "short input value!!" })
    .max(200, { message: "too long input value!!" }),
  sourceLink: z
    .string("wrong type of data!!")
    .min(10, { message: "short input value!!" })
    .max(200, { message: "too long input value!!" }),
});

export const skillsSchema = z.object({
  skillName: z
    .string("expected type wrong!!")
    .min(5, { message: "short input value!!" })
    .max(30, { message: "too long input value!!" }),
  skillLogo: z
    .string("expected type wrong!!")
    .min(10, { message: "short input value!!" })
    .max(200, { message: "too long input value!!" }),
});

// export const contactsSchema = z.object({});
