import { getSubjectDetails, getSubjects } from "@/lib/server";
import SubjectViewModal from "@/components/modals/subject-view-modal";
import SubjectList from "@/components/SubjectList";
import SubjectView from "@/components/SubjectView";
import { bcaSemesterList, Courses } from "@/config";
import { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
    const params = await props.params;
    const [semester, subject] = params.slug;

    if (semester) {
        // const subjects = await getSubjects({
        //     course: Courses.BCA,
        //     semester,
        // });

        if (subject) {
            const subjectDetail = await getSubjectDetails({
                course: Courses.BCA,
                semester,
                subject,
            });

            return {
                title: `${semester} | ${subjectDetail.subject}`,
                description: `Browse ${subjectDetail.subject} syllabus, notes, and resources for ${semester} semester on SyllabusX – the ultimate hub for syllabi and study materials`,
                openGraph: {
                    title: `SyllabusX | BCA | ${semester} | ${subjectDetail.subject}`,
                    description: `Browse ${subjectDetail.subject} syllabus, notes, and resources for ${semester} semester on SyllabusX – the ultimate hub for syllabi and study materials`,
                    url: `https://syllabusx.live/courses/bca/${semester}/${subjectDetail.subject}`,
                    siteName: "SyllabusX",
                    locale: "en_US",
                    type: "website",
                },
                twitter: {
                    title: `SyllabusX | BCA | ${semester} | ${subjectDetail.subject}`,
                    description: `Browse ${subjectDetail.subject} syllabus, notes, and resources for ${semester} semester on SyllabusX – the ultimate hub for syllabi and study materials`,
                    card: "summary_large_image",
                    site: `https://syllabusx.live/courses/bca/${semester}/${subjectDetail.subject}`,
                },
            };
        }

        return {
            title: `${semester}`,
            description: `Subjects for BCA ${semester} semester on SyllabusX – the ultimate hub for syllabi and study materials`,
            openGraph: {
                title: `SyllabusX | BCA | ${semester}`,
                description: `Subjects for BCA ${semester} semester on SyllabusX – the ultimate hub for syllabi and study materials`,
                url: `https://syllabusx.live/courses/bca/${semester}`,
                siteName: "SyllabusX",
                locale: "en_US",
                type: "website",
            },
            twitter: {
                title: `SyllabusX | BCA | ${semester}`,
                description: `Subjects for BCA ${semester} semester on SyllabusX – the ultimate hub for syllabi and study materials`,
                card: "summary_large_image",
                site: `https://syllabusx.live/courses/bca/${semester}`,
            },
        };
    }

    if (semester) {
        return {
            title: `${semester}`,
            description: `Browse subjects of BCA for ${semester} semester on SyllabusX – the ultimate hub for syllabi and study materials`,
            openGraph: {
                title: `SyllabusX | BCA | ${semester}`,
                description: `Browse subjects of BCA for ${semester} semester on SyllabusX – the ultimate hub for syllabi and study materials`,
                url: `https://syllabusx.live/courses/bca/${semester}`,
                siteName: "SyllabusX",
                locale: "en_US",
                type: "website",
            },
            twitter: {
                title: `SyllabusX | BCA | ${semester}`,
                description: `Browse subjects of BCA for ${semester} semester on SyllabusX – the ultimate hub for syllabi and study materials`,
                card: "summary_large_image",
                site: `https://syllabusx.live/courses/bca/${semester}`,
            },
        };
    }

    return {
        title: "Subjects",
        description:
            "Browse subjects for BCA courses at GGSIPU on SyllabusX – the ultimate hub for syllabi and study materials",
        openGraph: {
            title: "SyllabusX | BCA | Subjects",
            description:
                "Browse subjects for BCA courses at GGSIPU on SyllabusX – the ultimate hub for syllabi and study materials",
            url: "https://syllabusx.live/courses/bca",
            siteName: "SyllabusX",
            locale: "en_US",
            type: "website",
        },
        twitter: {
            title: "SyllabusX | BCA | Subjects",
            description:
                "Browse subjects for BCA courses at GGSIPU on SyllabusX – the ultimate hub for syllabi and study materials",
            card: "summary_large_image",
            site: "https://syllabusx.live/courses/bca",
        },
    };
}

export async function generateStaticParams() {
    const params: { slug: string[] }[] = [];

    // semester params
    for (const semester of bcaSemesterList) {
        params.push({ slug: [semester.label] });

        // subject params
        const subjects = await getSubjects({
            course: Courses.BCA,
            semester: semester.label,
        });

        for (const subject of subjects) {
            params.push({ slug: [semester.label, subject] });
        }
    }

    return params;
}

export default async function Page(props: {
    params: Promise<{ slug: string[] }>;
}) {
    const params = await props.params;
    const [semester, subject] = params.slug;

    if (semester) {
        const subjects = await getSubjects({
            course: Courses.BCA,
            semester,
        });

        if (subject) {
            const subjectDetail = await getSubjectDetails({
                course: Courses.BCA,
                semester,
                subject,
            });

            return (
                <>
                    <SubjectList course={Courses.BCA} list={subjects} />
                    <SubjectView
                        course={Courses.BCA}
                        subjectDetail={subjectDetail}
                    />
                    <SubjectViewModal subjectDetail={subjectDetail} />
                </>
            );
        }

        return (
            <>
                <SubjectList course={Courses.BCA} list={subjects} />
            </>
        );
    }

    return <></>;
}
