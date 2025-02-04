import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVerifyEmailMutation } from '@/redux/api/authApi';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, MailCheck } from 'lucide-react';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [verifyEmail] = useVerifyEmailMutation();
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [message, setMessage] = useState('');
  const verificationAttempted = useRef(false);

  useEffect(() => {
    let timer;
    
    const verifyToken = async () => {
      if (verificationAttempted.current) return;
      verificationAttempted.current = true;

      try {
        const result = await verifyEmail(token).unwrap();
        setVerificationStatus('success');
        toast.success(result.message, {
          toastId: 'verification-success',
        });
        
        timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/login');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } catch (error) {
        setVerificationStatus('error');
        setMessage(error?.data?.message || 'Verification failed. Please try again.');
        toast.error(error?.data?.message || 'Verification failed', {
          toastId: 'verification-error',
        });
        
        timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/login');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setVerificationStatus('error');
      setMessage('Invalid verification link. Please request a new one.');
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [token, verifyEmail, navigate]);

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'success':
        return <CheckCircle2 className="w-16 h-16 text-green-500" strokeWidth={1.5} />;
      case 'error':
        return <XCircle className="w-16 h-16 text-red-500" strokeWidth={1.5} />;
      default:
        return <MailCheck className="w-16 h-16 text-blue-500 animate-pulse" strokeWidth={1.5} />;
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-gradient">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-4 p-8 rounded-3xl backdrop-blur-lg shadow-2xl bg-gradient-to-br from-brand-start/40 to-brand-end/40 border border-white/20"
        >
          <div className="text-center space-y-4">
            <XCircle className="w-16 h-16 text-red-500 mx-auto" strokeWidth={1.5} />
            <h2 className="text-2xl font-semibold text-white">Invalid Verification Link</h2>
            <p className="text-light/90">Please request a new verification link.</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-brand-start to-brand-end text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Go to Login
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-4 p-8 rounded-3xl backdrop-blur-lg shadow-2xl bg-gradient-to-br from-brand-start/40 to-brand-end/40 border border-white/20"
      >
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            {getStatusIcon()}
          </div>
          
          {verificationStatus === 'pending' ? (
            <>
              <h2 className="text-2xl font-semibold text-white">
                Verifying your email...
              </h2>
              <p className="text-light/90">
                Please wait while we verify your email address.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-white">
                {verificationStatus === 'success' 
                  ? 'Email Verification Successful!' 
                  : 'Email Verification Failed'}
              </h2>
              <p className="text-light/90">
                {message}
              </p>
              <p className="text-light/90">
                Redirecting to login page in {countdown} seconds...
              </p>
              <button
                onClick={() => navigate('/login')}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-brand-start to-brand-end text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Go to Login
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerification;
