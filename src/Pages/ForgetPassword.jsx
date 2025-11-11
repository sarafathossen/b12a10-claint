import React, { useContext } from 'react';
import { useLocation } from 'react-router'; 
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
  const location = useLocation();
  const passedEmail = location.state?.email || '';
  const [email, setEmail] = React.useState(passedEmail);

  const { resetPassword } = useContext(AuthContext);

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) {
      toast("Please enter your email first!");
      return;
    }

    resetPassword(email)
      .then(() => {
        
        toast('✅ Password reset email sent successfully! Redirecting to Gmail...');
        
        window.location.href = 'https://mail.google.com/mail/u/0/#inbox';
      })
      .catch((error) => {
        toast(`❌ ${error.message}`);
      });
  };

  return (
    <div className="flex justify-center my-6 items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <form onSubmit={handleReset} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              required
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-neutral mt-4">
              Reset
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
