export const courseEnrollmentTemplate = (user, course) => `
  <h2>Hi ${user.firstName},</h2>
  <p>Welcome to StudyNotion!</p>
  <p>You are successfully enrolled in <b>${course.courseName}</b>.</p>
  <p>Course Description: ${course.courseDescription.slice(0, 100)}...</p>
  <p>Instructor: ${course.instructor.firstName} ${course.instructor.lastName}</p>
  <br/>
  <p>Login to your account to start learning.</p>
  <p>Happy Learning,<br/>StudyNotion Team</p>
`;