export function midSemMockTemplate(
    strings: TemplateStringsArray,
    semester: string,
    branch: string,
    subject: string,
    topics: string[][]
) {
    return `I am ${branch} student of ${semester}th semester, learning ${subject} subject.
You need to create me a mock test of question paper for my mid sem with this format

Total number of marks: 30
Total number of questions to attempt: 3
Total number of questions: 4
Each question marks: 10
Duration: 1.5 hours

Question Structure:

Question 1:
- Weighs 10 marks
- Cannot be skipped (compulsory)
- Should cover concepts from both units
- Number of parts and marks distribution based on concepts being asked

Question 2:
- Weighs 10 marks
- Choice between question 2, 3 and 4
- Two parts generally covering both units
- Marks distribution based on complexity of parts

Question 3:
- Weighs 10 marks
- Choice between question 2, 3 and 4
- Two parts generally covering both units
- Marks distribution based on complexity of parts

Question 4:
- Weighs 10 marks
- Choice between question 2, 3 and 4
- Two parts generally covering both units
- Marks distribution based on complexity of parts

Give Your Response in JSON format which follows this schema:
{
  "output": {
    "examMetadata": {
      "totalMarks": number,
      "totalQuestions": number,
      "questionsToAttempt": number,
      "type": "midSem" | "endSem",
      "subject": string,
      "duration": string
    },
    "questions": [
      {
        "questionNumber": number,
        "content": [
          {
            "subQuestion": string,
            "marks": number
          }
        ],
        "totalMarks": number,
        "unit": number,
        "isCompulsory": boolean,
        "alternativeQuestionNumber": number | null,
        "topicsCovered": string[]
      }
    ]
  }
}

Following are the selected units' syllabus:
${JSON.stringify(topics)}`;
}

export function endSemMockTemplate(
    strings: TemplateStringsArray,
    semester: string,
    branch: string,
    subject: string,
    topics: string[][]
) {
    return `I am ${branch} student of ${semester}th semester, learning ${subject} subject.
You need to create me a mock test of question paper for my end sem with this format

Total number of marks: 75
Total number of questions to attempt: 5
Total number of questions: 9
Each question marks: 15
Duration: 3 hours

Question Structure:

Question 1:
- Weighs 15 marks
- Cannot be skipped
- Number of questions are multiple divided like (3 x 5) or random based on the question

Question 2:
-Weighs 15 marks
- Choice between question 2 and question 3
- Covers unit 1 topics only
- Number of questions are generally two which are divided (7.5 x 2)

Question 3:
-Weighs 15 marks
- Choice between question 2 and question 3
- Covers unit 1 topics only
- Number of questions are generally two which are divided (7.5 x 2)

Question 4:
-Weighs 15 marks
- Choice between question 4 and question 5
- Covers unit 2 topics only
- Number of questions are generally two which are divided (7.5 x 2)

Question 5:
-Weighs 15 marks
- Choice between question 4 and question 5
- Covers unit 2 topics only
- Number of questions are generally two which are divided (7.5 x 2)

Question 6:
-Weighs 15 marks
- Choice between question 6 and question 7
- Covers unit 3 topics only
- Number of questions are generally two which are divided (7.5 x 2)

Question 7:
-Weighs 15 marks
- Choice between question 6 and question 7
- Covers unit 3 topics only
- Number of questions are generally two which are divided (7.5 x 2)

Question 8:
-Weighs 15 marks
- Choice between question 8 and question 9
- Covers unit 4 topics only
- Number of questions are generally two which are divided (7.5 x 2)

Question 9:
-Weighs 15 marks
- Choice between question 8 and question 9
- Covers unit 4 topics only
- Number of questions are generally two which are divided (7.5 x 2)

Give Your Response in JSON format which follows this schema:
{
  "output": {
    "examMetadata": {
      "totalMarks": number,
      "totalQuestions": number,
      "questionsToAttempt": number,
      "type": "midSem" | "endSem",
      "subject": string,
      "duration": string
    },
    "questions": [
      {
        "questionNumber": number,
        "content": [
          {
            "subQuestion": string,
            "marks": number
          }
        ],
        "totalMarks": number,
        "unit": number,
        "isCompulsory": boolean,
        "alternativeQuestionNumber": number | null,
        "topicsCovered": string[]
      }
    ]
  }
}

Following is the syllabus of subject:
${JSON.stringify(topics)}`;
}

export function newEndSemMockTemplate(
    strings: TemplateStringsArray,
    semester: string,
    branch: string,
    subject: string,
    topics: string[][]
) {
    return `I am ${branch} student of ${semester}th semester, learning ${subject} subject.
You need to create me a mock test of question paper for my end sem with this format

Total number of marks: 60
Total number of questions to attempt: 5
Total number of questions: 9
Each question marks: 12
Duration: 3 hours

Question Structure:

Question 1:
- Weighs 12 marks
- Cannot be skipped
- Number of questions are multiple divided like (4 x 3) or random based on the question

Question 2:
-Weighs 12 marks
- Choice between question 2 and question 3
- Covers unit 1 topics only
- Number of questions are generally two which are divided (6 x 2)

Question 3:
-Weighs 12 marks
- Choice between question 2 and question 3
- Covers unit 1 topics only
- Number of questions are generally two which are divided (6 x 2)

Question 4:
-Weighs 12 marks
- Choice between question 4 and question 5
- Covers unit 2 topics only
- Number of questions are generally two which are divided (6 x 2)

Question 5:
-Weighs 12 marks
- Choice between question 4 and question 5
- Covers unit 2 topics only
- Number of questions are generally two which are divided (6 x 2)

Question 6:
-Weighs 12 marks
- Choice between question 6 and question 7
- Covers unit 3 topics only
- Number of questions are generally two which are divided (6 x 2)

Question 7:
-Weighs 12 marks
- Choice between question 6 and question 7
- Covers unit 3 topics only
- Number of questions are generally two which are divided (6 x 2)

Question 8:
-Weighs 12 marks
- Choice between question 8 and question 9
- Covers unit 4 topics only
- Number of questions are generally two which are divided (6 x 2)

Question 9:
-Weighs 12 marks
- Choice between question 8 and question 9
- Covers unit 4 topics only
- Number of questions are generally two which are divided (6 x 2)

Give Your Response in JSON format which follows this schema:
{
  "output": {
    "examMetadata": {
      "totalMarks": number,
      "totalQuestions": number,
      "questionsToAttempt": number,
      "type": "midSem" | "endSem",
      "subject": string,
      "duration": string
    },
    "questions": [
      {
        "questionNumber": number,
        "content": [
          {
            "subQuestion": string,
            "marks": number
          }
        ],
        "totalMarks": number,
        "unit": number,
        "isCompulsory": boolean,
        "alternativeQuestionNumber": number | null,
        "topicsCovered": string[]
      }
    ]
  }
}

Following is the syllabus of subject:
${JSON.stringify(topics)}`;
}
