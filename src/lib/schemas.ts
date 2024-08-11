import * as z from "zod";

export const FeedbackSchema = z.object({
    email: z.string().email(),
    name: z.string().min(5),
    course: z.string().min(2),
    college: z.string().min(5),
    semester: z
        .string()
        .min(1)
        .refine((num) => typeof Number(num) === "number"),
    branch: z.string().min(2),
    query: z.string(),
});

export type TFeedbackSchema = z.infer<typeof FeedbackSchema>;

const aiModels = z.enum(["gemini-pro", "gpt-3.5-turbo", "gpt-3.5-turbo-16k"]);
export type TaiModels = z.infer<typeof aiModels>;

export const AiSchema = z.object({
    key: z.string(),
    model: aiModels,
});

export type TAiSchema = z.infer<typeof AiSchema>;

export const AiSearchSchema = z.object({
    prompt: z.string().min(10),
});

export type TAiSearchSchema = z.infer<typeof AiSearchSchema>;

export const datesheetSchema = z.object({
    name: z.string().min(1),
    date: z.date(),
});

export type TDatesheetSchema = z.infer<typeof datesheetSchema>;
