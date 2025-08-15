import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./reset.css";

export default function ResetPassword() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const t = params.get("token") || "";
        setToken(t);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            toast.error("Invalid or expired reset link.", {
                position: "top-center",
            });
            return;
        }
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters.", {
                position: "top-center",
            });
            return;
        }
        if (password !== confirm) {
            toast.error("Passwords do not match.", { position: "top-center" });
            return;
        }
        setSubmitting(true);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/auth/reset-password`,
                { token, password }
            );
            toast.success(res?.data?.message || "Password has been reset.", {
                position: "top-center",
            });
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                "Invalid or expired reset token.";
            toast.error(msg, { position: "top-center" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="reset">
            <ToastContainer />
            <span className="resetTitle">Create a new password</span>
            <form className="resetForm" onSubmit={onSubmit}>
                <label>New Password</label>
                <input
                    type="password"
                    className="resetInput"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Confirm Password</label>
                <input
                    type="password"
                    className="resetInput"
                    placeholder="Confirm new password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />
                <button
                    className="resetButton"
                    type="submit"
                    disabled={submitting}
                >
                    {submitting ? "Updating…" : "Reset Password"}
                </button>
            </form>
        </div>
    );
}
