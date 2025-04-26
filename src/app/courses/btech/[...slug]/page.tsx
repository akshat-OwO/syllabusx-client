import { getSubjectDetails, getSubjects } from "@/lib/server";
import SubjectViewModal from "@/components/modals/subject-view-modal";
import SubjectList from "@/components/SubjectList";
import SubjectView from "@/components/SubjectView";
import { branchList, Courses, semesterList } from "@/config";
import { Metadata } from "next";

export const dynamicParams = false;

export async function generateMetadata(props: {
    params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
    const params = await props.params;
    const [semester, branch, subject] = params.slug;

    if (semester && branch) {
        // const subjects = await getSubjects({
        //     course: Courses.BTECH,
        //     semester,
        //     branch,
        // });

        if (subject) {
            const subjectDetail = await getSubjectDetails({
                course: Courses.BTECH,
                semester,
                branch,
                subject,
            });

            return {
                title: `${semester} | ${branch.toUpperCase()} | ${subjectDetail.subject}`,
                description: `Browse ${subjectDetail.subject} syllabus, notes, and resources for ${semester} semester ${branch.toUpperCase()} branch on SyllabusX – the ultimate hub for syllabi and study materials`,
                openGraph: {
                    title: `SyllabusX | Btech | ${semester} | ${branch.toUpperCase()} | ${subjectDetail.subject}`,
                    description: `Browse ${subjectDetail.subject} syllabus, notes, and resources for ${semester} semester ${branch.toUpperCase()} branch on SyllabusX – the ultimate hub for syllabi and study materials`,
                    url: `https://syllabusx.live/courses/btech/${semester}/${branch.toLowerCase()}/${subjectDetail.subject}`,
                    siteName: "SyllabusX",
                    locale: "en_US",
                    type: "website",
                },
                twitter: {
                    title: `SyllabusX | Btech | ${semester} | ${branch.toUpperCase()} | ${subjectDetail.subject}`,
                    description: `Browse ${subjectDetail.subject} syllabus, notes, and resources for ${semester} semester ${branch.toUpperCase()} branch on SyllabusX – the ultimate hub for syllabi and study materials`,
                    card: "summary_large_image",
                    site: `https://syllabusx.live/courses/btech/${semester}/${branch.toLowerCase()}/${subjectDetail.subject}`,
                },
            };
        }

        return {
            title: `${semester} | ${branch.toUpperCase()}`,
            description: `Subjects for Btech ${semester} semester and ${branch.toUpperCase()} branch on SyllabusX – the ultimate hub for syllabi and study materials`,
            openGraph: {
                title: `SyllabusX | Btech | ${semester} | ${branch.toUpperCase()}`,
                description: `Subjects for Btech ${semester} semester and ${branch.toUpperCase()} branch on SyllabusX – the ultimate hub for syllabi and study materials`,
                url: `https://syllabusx.live/courses/btech/${semester}/${branch.toLowerCase()}`,
                siteName: "SyllabusX",
                locale: "en_US",
                type: "website",
            },
            twitter: {
                title: `SyllabusX | Btech | ${semester} | ${branch.toUpperCase()}`,
                description: `Subjects for Btech ${semester} semester and ${branch.toUpperCase()} branch on SyllabusX – the ultimate hub for syllabi and study materials`,
                card: "summary_large_image",
                site: `https://syllabusx.live/courses/btech/${semester}/${branch.toLowerCase()}`,
            },
        };
    }

    if (semester) {
        return {
            title: `${semester}`,
            description: `Browse subjects of Btech for ${semester} semester on SyllabusX – the ultimate hub for syllabi and study materials`,
            openGraph: {
                title: `SyllabusX | Btech | ${semester}`,
                description: `Browse subjects of Btech for ${semester} semester on SyllabusX – the ultimate hub for syllabi and study materials`,
                url: `https://syllabusx.live/courses/btech/${semester}`,
                siteName: "SyllabusX",
                locale: "en_US",
                type: "website",
            },
            twitter: {
                title: `SyllabusX | Btech | ${semester}`,
                description: `Browse subjects of Btech for ${semester} semester on SyllabusX – the ultimate hub for syllabi and study materials`,
                card: "summary_large_image",
                site: `https://syllabusx.live/courses/btech/${semester}`,
            },
        };
    }

    return {
        title: "Subjects",
        description:
            "Browse subjects for BTech courses at GGSIPU on SyllabusX – the ultimate hub for syllabi and study materials",
        openGraph: {
            title: "SyllabusX | Btech | Subjects",
            description:
                "Browse subjects for BTech courses at GGSIPU on SyllabusX – the ultimate hub for syllabi and study materials",
            url: "https://syllabusx.live/courses/btech",
            siteName: "SyllabusX",
            locale: "en_US",
            type: "website",
        },
        twitter: {
            title: "SyllabusX | Btech | Subjects",
            description:
                "Browse subjects for BTech courses at GGSIPU on SyllabusX – the ultimate hub for syllabi and study materials",
            card: "summary_large_image",
            site: "https://syllabusx.live/courses/btech",
        },
    };
}

export async function generateStaticParams() {
    const params: { slug: string[] }[] = [];

    // semester params
    for (const semester of semesterList) {
        params.push({ slug: [semester.label] });

        // branch params
        for (const branch of branchList) {
            params.push({ slug: [semester.label, branch.label.toLowerCase()] });

            // subject params
            const subjects = await getSubjects({
                course: Courses.BTECH,
                semester: semester.label,
                branch: branch.label,
            });

            for (const subject of subjects) {
                params.push({
                    slug: [semester.label, branch.label.toLowerCase(), subject],
                });
            }
        }
    }

    return params;
}

export default async function Page(props: {
    params: Promise<{ slug: string[] }>;
}) {
    const params = await props.params;
    const [semester, branch, subject] = params.slug;

    if (semester && branch) {
        const subjects = await getSubjects({
            course: Courses.BTECH,
            semester,
            branch,
        });

        if (subject) {
            const subjectDetail = await getSubjectDetails({
                course: Courses.BTECH,
                semester,
                branch,
                subject,
            });

            return (
                <>
                    <SubjectList course={Courses.BTECH} list={subjects} />
                    <SubjectView
                        course={Courses.BTECH}
                        subjectDetail={subjectDetail}
                    />
                    <SubjectViewModal subjectDetail={subjectDetail} />
                </>
            );
        }

        return (
            <>
                <SubjectList course={Courses.BTECH} list={subjects} />
            </>
        );
    }

    return <></>;
}
