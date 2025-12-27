import React, { useState } from 'react';
import { Mail, Lock, User, Building, Shield, Wrench } from 'lucide-react';

interface RegisterScreenProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterScreen({ onRegister, onSwitchToLogin }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <div className="mb-8">
            <h2 className="text-gray-900 mb-2">Create your account</h2>
            <p className="text-gray-600">Start managing your maintenance today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-2">Full name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-gray-700 mb-2">Company name (optional)</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Acme Corporation"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 mb-2">Confirm password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded mt-1" required />
              <span className="text-sm text-gray-600">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E3] hover:to-[#7C3AED] text-white py-3 rounded-lg transition-all shadow-sm"
            >
              Create account
            </button>

            {/* Trust Signal */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Your data is encrypted and secure</span>
            </div>

            {/* Switch to Login */}
            <div className="text-center pt-4 border-t border-gray-200">
              <span className="text-gray-600">Already have an account? </span>
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-[#6366F1] hover:text-[#5558E3]"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Benefits */}
        <div className="hidden md:block space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center">
              <Wrench className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">GearGuard</h1>
              <p className="text-gray-600">Join thousands of users</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Enterprise-grade security</h3>
              <p className="text-gray-600">Your data is protected with bank-level encryption</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <Wrench className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Easy to get started</h3>
              <p className="text-gray-600">Set up your first asset in under 2 minutes</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Free 14-day trial</h3>
              <p className="text-gray-600">No credit card required. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}