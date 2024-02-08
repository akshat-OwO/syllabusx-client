import EmailTemplate, { EmailAdminTemplate } from "@/components/EmailTemplate";
import { FeedbackSchema, TFeedbackSchema } from "@/lib/schemas";
import { Resend } from "resend";

declare global {
    var resend: Resend;
}

if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
} else {
    console.log("Missing Resend API Key");
}

export async function POST(req: Request) {
    const { values } = await req.json();

    if (!FeedbackSchema.safeParse(values).success)
        return Response.json({ error: "Invalid fields" }, { status: 401 });

    const validatedFormFields = values as TFeedbackSchema;

    try {
        const data = await Promise.all([
            resend.emails.send({
                from: "SyllabusX <mail@syllabusx.live>",
                to: ["iboard990@gmail.com"],
                subject: "New response has arrived",
                react: EmailAdminTemplate(
                    validatedFormFields
                ) as React.ReactElement,
            }),
            resend.emails.send({
                from: "SyllabusX <mail@syllabusx.live>",
                to: [validatedFormFields.email],
                subject: "Thanks for the feedback",
                react: EmailTemplate({
                    name: validatedFormFields.name,
                }) as React.ReactElement,
            }),
        ]);
        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}
