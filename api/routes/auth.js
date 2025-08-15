const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendPasswordResetEmail } = require("../utils/email");

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json("Wrong credentials!");
        }

        const validated = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validated) {
            return res.status(400).json("Wrong credentials!");
        }

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        // res.status(500).json(err);
    }
});

// REQUEST PASSWORD RESET (no user enumeration)
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body || {};
    const genericMsg =
        "If an account exists for this email, a password reset link has been sent.";
    try {
        if (!email) {
            return res.status(200).json({ message: genericMsg });
        }

        // Case-insensitive email match
        const user = await User.findOne({
            email: { $regex: `^${email}$`, $options: "i" },
        });
        if (!user) {
            // Do not reveal whether the email exists
            return res.status(200).json({ message: genericMsg });
        }

        // Create reset token (store hashed version)
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        await user.save();

        const frontendBase =
            process.env.FRONTEND_BASE_URL || "http://localhost:3000";
        const resetUrl = `${frontendBase}/reset-password?token=${resetToken}`;

        // Send password reset email (log but never leak errors to client)
        try {
            await sendPasswordResetEmail(user.email, resetUrl);
        } catch (mailErr) {
            console.error(
                "[Password Reset] Email send failed:",
                mailErr?.message || mailErr
            );
        }
        return res.status(200).json({ message: genericMsg });
    } catch (err) {
        // Do not reveal details; still return generic message to avoid user enumeration
        return res.status(200).json({ message: genericMsg });
    }
});

// RESET PASSWORD
router.post("/reset-password", async (req, res) => {
    const { token, password } = req.body || {};
    try {
        if (!token || !password) {
            return res
                .status(400)
                .json({ message: "Invalid or expired reset token." });
        }

        if (typeof password !== "string" || password.length < 8) {
            return res
                .status(400)
                .json({ message: "Password must be at least 8 characters." });
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: new Date() },
        });

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid or expired reset token." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPass;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        return res
            .status(200)
            .json({ message: "Password has been reset successfully." });
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Something went wrong. Please try again." });
    }
});

module.exports = router;
