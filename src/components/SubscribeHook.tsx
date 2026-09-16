import React, { useState } from 'react';

export default function SubscribeHook() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-3 px-6 rounded-xl border border-blue-200 transition-colors shadow-sm"
      >
        Save This Invoice to Your Free Dashboard
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Check your email!</h3>
                <p className="text-slate-600">We sent you a magic link to access your dashboard.</p>
                <button onClick={() => setIsOpen(false)} className="mt-6 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 rounded-xl">Close</button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Save your invoices and access them anywhere</h3>
                <p className="text-slate-600 mb-6">Enter your email. No password needed. Free forever.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="email" 
                      required
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  {status === 'error' && (
                    <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-70 flex justify-center items-center h-12"
                  >
                    {status === 'loading' ? (
                       <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                    ) : 'Save My Invoice'}
                  </button>
                  
                  <p className="text-xs text-center text-slate-400 mt-4">We'll never share your email. Unsubscribe anytime.</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
