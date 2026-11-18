Build a German A1 Exam Readiness Checker web application.

### Product Overview
The application helps German A1 learners evaluate their preparation level before considering the Goethe or ÖSD A1 certification exam.

### Technology Stack
- React
- TypeScript
- Vite
- Tailwind CSS

### MVP Features

1. Welcome Screen
   - Introduce the purpose of the assessment.
   - Show that the test contains 15 questions.
   - Include a Start Assessment button.

2. Assessment Flow
   - Display one question at a time.
   - Show four multiple-choice options.
   - Include a progress indicator.
   - Allow users to select an answer and navigate to the next question.
   - Include a submit option on the final question.

3. Vocabulary Assessment
   - 5 German A1 vocabulary questions.

4. Grammar Assessment
   - 5 German A1 grammar questions.

5. Reading Assessment
   - 5 German A1 reading comprehension questions.
   - Use short German passages.

6. Score Calculation
   - Each correct answer = 1 mark.
   - Incorrect or unanswered question = 0 marks.
   - No negative marking.
   - Maximum score = 15.

7. Readiness Status
   - Below 60%: Needs Practice.
   - 60% to below 80%: Almost Ready.
   - 80% or above: Ready.

8. Retake Assessment
   - Allow users to restart the assessment.
   - Clear previous answers and calculate a fresh result.

### Design Requirements
- Clean, modern and professional UI.
- Responsive design for desktop and mobile.
- Beginner-friendly interface.
- Use clear typography and simple navigation.
- Display assessment progress clearly.

### Important Instructions
- Do not add login, registration, payment, dashboard, AI chatbot or other features outside the defined MVP.
- Keep questions in a separate JSON data file.
- Keep scoring logic separate from UI components.
- Use reusable React components.
- Write clean and maintainable TypeScript code.
- Do not use placeholder questions in the final assessment. Keep the question data structure ready so actual questions can be added later.

### First Task
Set up the React + TypeScript + Vite project, install dependencies, configure Tailwind CSS and create the basic application structure.

Do not build the entire application in one step. Complete the initial setup first and explain how to run the application.