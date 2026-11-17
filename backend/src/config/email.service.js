import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(){
let ans=await resend.emails.send({
  from: "My Blog <onboarding@resend.dev>",
  to: "sahibdeeep9@gmail.com",
  subject: "Reset Password",
  html: "<h1>Reset your password</h1>"
});
console.log("ans",ans);
} 

export default sendEmail


