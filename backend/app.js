import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
const router = express.Router();

config({ path: "./config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/send/mail", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide all details",
    });
  }

  try {
    await sendEmail({
      email: email, // send to user's email
      subject: "Thank you for contacting GYM WEBSITE",
      message: `Hi ${name},\n\nThank you for reaching out! We received your message:\n\n"${message}"\n\nWe will get back to you soon.\n\nBest regards,\nGYM WEBSITE Team`,
      userEmail: process.env.SMTP_MAIL,
    });

    res.status(200).json({
      success: true,
      message: "Confirmation email sent to your email address.",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.get("/", (req, res) => {
  res.send("API is running.");
});

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
