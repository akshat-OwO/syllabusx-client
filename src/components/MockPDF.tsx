"use client";

import jsPDF from "jspdf";
import { TMockSchema } from "@/lib/schemas";
import { Button } from "./ui/button";
import { Download, Loader2 } from "lucide-react";

export const PDFDownloadButton = ({ data }: { data: TMockSchema }) => {
    const generatePDF = () => {
        const doc = new jsPDF();
        
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15;
        const maxWidth = pageWidth - margin * 2;
        const SPACING = {
            AFTER_HEADER: 8,
            AFTER_QUESTION_BOX: 4,
            BETWEEN_SUBQUESTIONS: 4,
            BETWEEN_QUESTIONS: 6
        };

        let y = margin;

        // Timestamp formatting
        const timestamp = new Date().toLocaleString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

        // Calculate text height for a given text
        const calculateTextHeight = (text: string, fontSize: number, indent: number = 0, marksWidth: number = 0) => {
            doc.setFontSize(fontSize);
            const effectiveWidth = maxWidth - indent - marksWidth;
            const lines = doc.splitTextToSize(text, effectiveWidth);
            return Array.isArray(lines) ? lines.length * fontSize * 0.5 : fontSize * 0.5;
        };

        // Calculate total height for a question and its sub-questions
        const calculateQuestionHeight = (question: any) => {
            let height = 16 + SPACING.AFTER_QUESTION_BOX; // Question box height + spacing
            
            question.content.forEach((subQ: any, idx: number) => {
                const subQuestionText = `${String.fromCharCode(97 + idx)}) ${subQ.subQuestion}`;
                const marksText = `[${subQ.marks} Marks]`;
                const marksWidth = doc.getStringUnitWidth(marksText) * 11 * 0.352778 + 10;
                height += calculateTextHeight(subQuestionText, 11, 8, marksWidth);
                height += (idx < question.content.length - 1) ? SPACING.BETWEEN_SUBQUESTIONS : 0;
            });
            
            height += SPACING.BETWEEN_QUESTIONS;
            return height;
        };

        const addHeader = () => {
            // Top border
            doc.setFillColor(40, 40, 40);
            doc.rect(margin, margin, maxWidth, 0.5, 'F');
            y += 10;
            
            // Title
            doc.setFontSize(20);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(40, 40, 40);
            doc.text(data.output.examMetadata.subject, margin, y);
            y += 8;
            
            // Subtitle
            doc.setFontSize(14);
            doc.setFont("helvetica", "normal");
            const examType = data.output.examMetadata.type === "midSem" ? "Mid Semester" : "End Semester";
            doc.text(`${examType} Examination`, margin, y);
            y += 12;
            
            // Metadata box
            doc.setDrawColor(220, 220, 220);
            doc.setFillColor(250, 250, 250);
            const metadataBoxHeight = 20;
            doc.roundedRect(margin, y, maxWidth, metadataBoxHeight, 2, 2, 'FD');
            
            // Metadata content
            doc.setFontSize(11);
            doc.setTextColor(60, 60, 60);
            doc.text(`Total Marks: ${data.output.examMetadata.totalMarks}`, margin + 8, y + 8);
            doc.text(`Duration: ${data.output.examMetadata.duration}`, margin + 8, y + 16);
            doc.text(
                `Questions to Attempt: ${data.output.examMetadata.questionsToAttempt} out of ${data.output.examMetadata.totalQuestions}`,
                margin + maxWidth/2, y + 12
            );
            
            y += metadataBoxHeight + 8;
            doc.setFillColor(40, 40, 40);
            doc.rect(margin, y, maxWidth, 0.5, 'F');
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
            
            const marksWidth = marksText ? 
                doc.getStringUnitWidth(marksText) * fontSize * 0.352778 + 10 : 0;
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
                doc.text(marksText, pageWidth - margin - marksWidth + 5, startY);
                doc.setTextColor(color[0], color[1], color[2]);
            }
            
            return y;
        };

        // Start PDF Generation
        addHeader();

        // Questions
        data.output.questions.forEach((question, index) => {
            // Calculate height and check page break
            const questionHeight = calculateQuestionHeight(question);
            if (y + questionHeight > pageHeight - margin) {
                doc.addPage();
                y = margin + SPACING.AFTER_HEADER;
            }

            const questionText = `Q${question.questionNumber}. ${
                question.isCompulsory ? "(Compulsory) " : ""
            }${
                question.alternativeQuestionNumber
                    ? `(OR Q${question.alternativeQuestionNumber}) `
                    : ""
            }[${question.totalMarks} Marks]`;

            // Question box
            doc.setFillColor(250, 250, 250);
            doc.setDrawColor(220, 220, 220);
            doc.roundedRect(margin, y - 4, maxWidth, 16, 2, 2, 'FD');
            
            // Question text
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(40, 40, 40);
            doc.text(questionText, margin + 4, y + 5);
            
            y += 16 + SPACING.AFTER_QUESTION_BOX;

            // Sub-questions
            question.content.forEach((subQ, idx) => {
                // Split sub-question into label and content
                const label = `${String.fromCharCode(97 + idx)})`;
                const subQuestionText = `${subQ.subQuestion}`;
                const marksText = `[${subQ.marks} Marks]`;
                
                // Add bold label
                doc.setFont("helvetica", "bold");
                doc.text(label, margin + 8, y);
                
                // Calculate space taken by label
                const labelWidth = doc.getStringUnitWidth(label) * 11 * 0.352778;
                
                // Add content with proper indent after label
                y = addWrappedText(
                    subQuestionText,
                    margin,
                    11,
                    false,
                    8 + labelWidth + 4, // Add extra indent after label
                    [40, 40, 40],
                    marksText
                );
                
                // Add spacing only between sub-questions, not after the last one
                if (idx < question.content.length - 1) {
                    y += SPACING.BETWEEN_SUBQUESTIONS;
                }
            });

            // Add spacing between questions
            y += SPACING.BETWEEN_QUESTIONS;
        });

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(130, 130, 130);
        const watermarkText = `Generated By SyllabusX on ${timestamp}`;
        const watermarkWidth = doc.getStringUnitWidth(watermarkText) * 8 * 0.352778;
        doc.text(watermarkText, pageWidth - margin - watermarkWidth, pageHeight - 10);

        const filename = `${data.output.examMetadata.subject}_${
            data.output.examMetadata.type
        }_${timestamp.replace(/[/: ]/g, "-")}_exam.pdf`;

        doc.save(filename);
    };

    return (
        <Button variant="default" size="icon" onClick={generatePDF}>
            <Download className="h-4 w-4" />
        </Button>
    );
};
