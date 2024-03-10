import { cn } from "@/lib/utils";
import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import { GeistSans } from "geist/font/sans";
import { FC } from "react";

const baseUrl = process.env.NEXT_PUBLIC_URL ?? "";

interface EmailTemplateProps {
    name: string;
}

const EmailTemplate: FC<EmailTemplateProps> = ({ name }) => {
    return (
        <Html>
            <Head>
                <title>Acknowledgment of Your Feedback on SyllabusX</title>
            </Head>
            <Preview>
                We&apos;ve received your feedback! Our team is on it.
            </Preview>
            <Tailwind>
                <Body
                    className={
                        (cn("mx-auto my-auto bg-white px-2"),
                        GeistSans.className)
                    }
                >
                    <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
                        <Section className="mt-[32px]">
                            <Img
                                src={`${baseUrl}/email-x.png`}
                                width={"40"}
                                height={"37"}
                                alt="SyllabusX"
                                className="mx-auto my-0"
                            />
                        </Section>
                        <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
                            Thanks for the feedback
                        </Heading>
                        <Text className="text-[14px] leading-[24px] text-black">
                            Hello {name},
                        </Text>
                        <Text className="text-[14px] leading-[24px] text-black">
                            Thank you for taking the time to provide valuable
                            feedback to SyllabusX! Your input is important to
                            us, and we appreciate your effort in helping us
                            enhance our platform.
                        </Text>
                        <Text className="text-[14px] leading-[24px] text-black">
                            Please rest assured that your concerns or
                            suggestions will be carefully considered. We aim to
                            address and respond to your feedback promptly.
                        </Text>
                        <Text className="text-[14px] leading-[24px] text-black">
                            If you have any additional thoughts or questions,
                            please feel free to reach out to us at{" "}
                            <Link
                                href="mailto:iboard990@gmail.com"
                                className="text-blue-600 no-underline"
                            >
                                iboard990@gmail.com
                            </Link>
                            . We&apos;re here to assist you and ensure that
                            SyllabusX continues to meet your expectations.
                        </Text>
                        <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export function EmailAdminTemplate({
    name,
    email,
    college,
    course,
    semester,
    branch,
    query,
}: {
    name: string;
    email: string;
    college: string;
    course: string;
    semester: string;
    branch: string;
    query: string;
}) {
    return (
        <Html>
            <Head>
                <title>New form response</title>
            </Head>
            <Preview>{name} submitted the feedback form</Preview>
            <Tailwind>
                <Body
                    className={
                        (cn("mx-auto my-auto bg-white px-2"),
                        GeistSans.className)
                    }
                >
                    <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
                        <Section className="mt-[32px]">
                            <Img
                                src={`${baseUrl}/email-x.png`}
                                width={"40"}
                                height={"37"}
                                alt="SyllabusX"
                                className="mx-auto my-0"
                            />
                        </Section>
                        <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
                            A new response has arrived.
                        </Heading>
                        <Text className="text-[14px] leading-[24px] text-black">
                            Form submitted by {name}
                        </Text>
                        <Text className="text-[20px] leading-[24px] text-black">
                            Here&apos;s what {name} wrote
                        </Text>
                        <Text className="rounded bg-[#f2f3f3] p-[24px] text-[16px] leading-[1.4] text-black">
                            {query}
                        </Text>
                        <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
                        <Section>
                            <Row>
                                <Text className="text-[14px] leading-[24px] text-blue-600">
                                    Email: {email}
                                </Text>
                                <Text className="text-[14px] leading-[24px] text-blue-600">
                                    College: {college}
                                </Text>
                                <Text className="text-[14px] leading-[24px] text-blue-600">
                                    Course: {course}
                                </Text>
                                <Text className="text-[14px] leading-[24px] text-blue-600">
                                    Semester: {semester}
                                </Text>
                                <Text className="text-[14px] leading-[24px] text-blue-600">
                                    Branch: {branch}
                                </Text>
                            </Row>
                        </Section>
                        <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

export default EmailTemplate;
