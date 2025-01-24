import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import { TMockSchema } from "@/lib/schemas";
import { decompress, decompressFromEncodedURIComponent } from "lz-string";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const compressedData = url.searchParams.get("data");

        if (!compressedData) {
            return NextResponse.json(
                { success: false, error: "No data provided" },
                { status: 400 }
            );
        }
        const decompressedStr = decompress(
            decompressFromEncodedURIComponent(compressedData)
        );
        if (!decompressedStr) {
            return NextResponse.json(
                { success: false, error: "Invalid compressed data" },
                { status: 400 }
            );
        }

        const data: TMockSchema = JSON.parse(decompressedStr);

        const doc = new jsPDF();

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15;
        const maxWidth = pageWidth - margin * 2;
        const SPACING = {
            AFTER_HEADER: 8,
            AFTER_QUESTION_BOX: 4,
            BETWEEN_SUBQUESTIONS: 4,
            BETWEEN_QUESTIONS: 6,
        };

        let y = margin;

        const timestamp = new Date().toLocaleString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

        const calculateTextHeight = (
            text: string,
            fontSize: number,
            indent: number = 0,
            marksWidth: number = 0
        ) => {
            doc.setFontSize(fontSize);
            const effectiveWidth = maxWidth - indent - marksWidth;
            const lines = doc.splitTextToSize(text, effectiveWidth);
            return Array.isArray(lines)
                ? lines.length * fontSize * 0.5
                : fontSize * 0.5;
        };

        const calculateQuestionHeight = (question: any) => {
            let height = 16 + SPACING.AFTER_QUESTION_BOX;

            question.content.forEach((subQ: any, idx: number) => {
                const subQuestionText = `${String.fromCharCode(97 + idx)}) ${subQ.subQuestion}`;
                const marksText = `[${subQ.marks} Marks]`;
                const marksWidth =
                    doc.getStringUnitWidth(marksText) * 11 * 0.352778 + 10;
                height += calculateTextHeight(
                    subQuestionText,
                    11,
                    8,
                    marksWidth
                );
                height +=
                    idx < question.content.length - 1
                        ? SPACING.BETWEEN_SUBQUESTIONS
                        : 0;
            });

            height += SPACING.BETWEEN_QUESTIONS;
            return height;
        };

        const formatTitleCase = (text: string) => {
            return text
                .split(/[-\s]+/)
                .map((word) => {
                    const lowercaseWords = [
                        "and",
                        "or",
                        "in",
                        "of",
                        "the",
                        "to",
                        "for",
                        "with",
                        "on",
                        "at",
                    ];
                    return lowercaseWords.includes(word.toLowerCase())
                        ? word.toLowerCase()
                        : word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase();
                })
                .join(" ");
        };

        const addWrappedTitle = (title: string) => {
            doc.setFontSize(20);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(40, 40, 40);

            const formattedTitle = formatTitleCase(title);

            const titleLines = doc.splitTextToSize(
                formattedTitle,
                maxWidth * 0.95
            );

            titleLines.forEach((line: string, index: number) => {
                doc.text(line, margin, y + index * 12);
            });

            y += titleLines.length * 12;
        };

        const addHeader = () => {
            doc.setFillColor(40, 40, 40);
            doc.rect(margin, margin, maxWidth, 0.5, "F");
            y += 10;

            addWrappedTitle(data.output.examMetadata.subject);

            doc.setFontSize(14);
            doc.setFont("helvetica", "normal");
            const examType =
                data.output.examMetadata.type === "midSem"
                    ? "Mid Semester"
                    : "End Semester";
            doc.text(`${examType} Examination`, margin, y);
            y += 12;

            doc.setDrawColor(220, 220, 220);
            doc.setFillColor(250, 250, 250);
            const metadataBoxHeight = 20;
            doc.roundedRect(margin, y, maxWidth, metadataBoxHeight, 2, 2, "FD");

            doc.setFontSize(11);
            doc.setTextColor(60, 60, 60);
            doc.text(
                `Total Marks: ${data.output.examMetadata.totalMarks}`,
                margin + 8,
                y + 8
            );
            doc.text(
                `Duration: ${data.output.examMetadata.duration}`,
                margin + 8,
                y + 16
            );
            doc.text(
                `Questions to Attempt: ${data.output.examMetadata.questionsToAttempt} out of ${data.output.examMetadata.totalQuestions}`,
                margin + maxWidth / 2,
                y + 12
            );

            y += metadataBoxHeight + 8;
            doc.setFillColor(40, 40, 40);
            doc.rect(margin, y, maxWidth, 0.5, "F");
            y += SPACING.AFTER_HEADER;
        };

        const addWrappedText = (
            text: string,
            x: number,
            fontSize: number = 11,
            isBold: boolean = false,
            indent: number = 0,
            color: number[] = [40, 40, 40],
            marksText?: string
        ) => {
            doc.setFontSize(fontSize);
            doc.setFont("helvetica", isBold ? "bold" : "normal");
            doc.setTextColor(color[0], color[1], color[2]);

            const marksWidth = marksText
                ? doc.getStringUnitWidth(marksText) * fontSize * 0.352778 + 10
                : 0;
            const effectiveWidth = maxWidth - indent - marksWidth;
            const textLines = doc.splitTextToSize(text, effectiveWidth);
            const startY = y;

            if (Array.isArray(textLines)) {
                textLines.forEach((line) => {
                    doc.text(line, x + indent, y);
                    y += fontSize * 0.5;
                });
            } else {
                doc.text(textLines, x + indent, y);
                y += fontSize * 0.5;
            }

            if (marksText) {
                doc.setTextColor(100, 100, 100);
                doc.text(
                    marksText,
                    pageWidth - margin - marksWidth + 5,
                    startY
                );
                doc.setTextColor(color[0], color[1], color[2]);
            }

            return y;
        };

        const addWatermark = () => {
            doc.setFontSize(8);
            doc.setTextColor(130, 130, 130);
            const watermarkText = `Generated By SyllabusX on ${timestamp}`;
            const watermarkWidth =
                doc.getStringUnitWidth(watermarkText) * 8 * 0.352778;
            doc.text(
                watermarkText,
                pageWidth - margin - watermarkWidth,
                margin - 5
            );
        };

        addHeader();
        addWatermark();

        data.output.questions.forEach((question, index) => {
            const questionHeight = calculateQuestionHeight(question);
            if (y + questionHeight > pageHeight - margin) {
                doc.addPage();
                y = margin + SPACING.AFTER_HEADER;
                addWatermark();
            }

            const questionText = `Q${question.questionNumber}. ${
                question.isCompulsory ? "(Compulsory) " : ""
            }${
                question.alternativeQuestionNumber
                    ? `(OR Q${question.alternativeQuestionNumber}) `
                    : ""
            }[${question.totalMarks} Marks]`;

            doc.setFillColor(250, 250, 250);
            doc.setDrawColor(220, 220, 220);
            doc.roundedRect(margin, y - 4, maxWidth, 16, 2, 2, "FD");

            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(40, 40, 40);
            doc.text(questionText, margin + 4, y + 5);

            y += 16 + SPACING.AFTER_QUESTION_BOX;

            question.content.forEach((subQ, idx) => {
                const label = `${String.fromCharCode(97 + idx)})`;
                const subQuestionText = `${subQ.subQuestion}`;
                const marksText = `[${subQ.marks} Marks]`;

                doc.setFont("helvetica", "bold");
                doc.text(label, margin + 8, y);

                const labelWidth =
                    doc.getStringUnitWidth(label) * 11 * 0.352778;

                y = addWrappedText(
                    subQuestionText,
                    margin,
                    11,
                    false,
                    8 + labelWidth + 4,
                    [40, 40, 40],
                    marksText
                );

                if (idx < question.content.length - 1) {
                    y += SPACING.BETWEEN_SUBQUESTIONS;
                }
            });

            y += SPACING.BETWEEN_QUESTIONS;
        });

        const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${data.output.examMetadata.subject}_${
                    data.output.examMetadata.type
                }_${timestamp.replace(/[/: ]/g, "-")}_exam.pdf"`,
            },
        });
    } catch (error) {
        console.error("PDF Generation Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate PDF" },
            { status: 500 }
        );
    }
}
