import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      toast.success('Admin login successful!');
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 bg-grid-pattern relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-radial-gradient opacity-30 pointer-events-none" />

      <Card className="max-w-md w-full p-8 border-white/[0.06] shadow-2xl relative z-10 text-left">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-primary w-6 h-6" />
          </div>
          <h2 className="font-heading font-black text-2xl text-white">Admin Dashboard Access</h2>
          <p className="text-xs text-text-muted mt-2">Log in using OhmD system credentials to manage resources.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Admin Email *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@ohmd.in"
            icon={Mail}
            required
          />

          <Input
            label="Password *"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={Lock}
            required
          />

          <div className="pt-2">
            <Button
              type="submit"
              loading={loading}
              className="w-full justify-center"
            >
              Authenticate Admin
            </Button>
          </div>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-primary hover:underline">
            Back to Public Website
          </Link>
        </div>
      </Card>
    </div>
  );
}

// Simple link import helper
import { Link } from 'react-router-dom';
