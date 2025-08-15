import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./forgot.css";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setSubmitting(true);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/auth/forgot-password`,
                { email }
            );
            toast.info(
                res?.data?.message ||
                    "If an account exists, a reset link has been sent.",
                { position: "top-center" }
            );
        } catch (err) {
            toast.info("If an account exists, a reset link has been sent.", {
                position: "top-center",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="forgot">
            <ToastContainer />
            <span className="forgotTitle">Reset your password</span>
            <form className="forgotForm" onSubmit={onSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    className="forgotInput"
                    placeholder="Enter your account email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    className="forgotButton"
                    type="submit"
                    disabled={submitting}
                >
                    {submitting ? "Sending…" : "Send reset link"}
                </button>
            </form>
        </div>
    );
}
