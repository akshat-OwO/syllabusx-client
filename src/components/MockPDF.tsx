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

        // Check if content fits on current page, if not add a new page
        const ensureSpace = (requiredHeight: number) => {
            if (y + requiredHeight > pageHeight - margin) {
                doc.addPage();
                y = margin;
                // Add header to new page
                doc.setFillColor(40, 40, 40);
                doc.rect(margin, margin, maxWidth, 0.5, 'F');
                y += 8;
                return true;
            }
            return false;
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
            
            y += metadataBoxHeight + 10;
            doc.setFillColor(40, 40, 40);
            doc.rect(margin, y, maxWidth, 0.5, 'F');
            y += 8;
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
            // Calculate total height needed for this question
            let questionHeight = 16; // Question box height
            question.content.forEach((subQ) => {
                const subQuestionText = `${String.fromCharCode(97)}.  ${subQ.subQuestion}`;
                const marksText = `[${subQ.marks} Marks]`;
                const marksWidth = doc.getStringUnitWidth(marksText) * 11 * 0.352778 + 10;
                questionHeight += calculateTextHeight(subQuestionText, 11, 8, marksWidth) + 4;
            });
            questionHeight += 8; // Additional spacing

            // Check if question fits on current page
            if (y + questionHeight > pageHeight - margin) {
                doc.addPage();
                y = margin + 8;
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
            
            y += 16 + 4;

            // Sub-questions
            question.content.forEach((subQ, idx) => {
                const subQuestionText = `${String.fromCharCode(97 + idx)}. ${subQ.subQuestion}`;
                const marksText = `[${subQ.marks} Marks]`;
                
                y = addWrappedText(
                    subQuestionText,
                    margin,
                    11,
                    false,
                    8,
                    [40, 40, 40],
                    marksText
                );
                
                y += 4; // Reduced space between sub-questions
            });

            y += 8; // Reduced space between questions
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
