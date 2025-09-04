export const paymentSuccessTemplate = (user, orderId, paymentId, amount) => `
  <h2>Hi ${user.firstName},</h2>
  <p>🎉 Your payment was <b>successful</b>!</p>
  <p><b>Order ID:</b> ${orderId}</p>
  <p><b>Payment ID:</b> ${paymentId}</p>
  <p><b>Total Amount Paid:</b> ₹${amount / 100}</p>
  <br/>
  <p>You are now enrolled in your selected courses.</p>
  <p>Happy Learning,<br/>StudyNotion Team</p>
`;
