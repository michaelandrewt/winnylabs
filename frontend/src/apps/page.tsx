'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@lib/supabase';
import posthog from '@lib/posthog';

export default function Home() {
  const [session, setSession] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) posthog.identify(data.session.user.id);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) posthog.identify(session.user.id);
    });
  }, []);

  const login = async () => {
    await supabase.auth.signInWithOtp({ email: prompt('Enter your email') || '' });
    alert('✔️ Check your email for the magic link');
  };

  const addLead = async () => {
    if (!session) return alert('⚠️ Please log in first');
    const { data, error } = await supabase.from('leads').insert([{ name, email, company }]);
    if (error) return console.error(error);
    posthog.capture('lead_created', { name, company });
    alert('✅ Lead added');
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">WinnyLabs Lead Builder</h1>
      {!session ? (
        <button
          onClick={login}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          🔑 Login / Magic Link
        </button>
      ) : (
        <div className="space-y-3">
          <p className="text-gray-700">Logged in as <span className="font-semibold">{session.user.email}</span></p>
          <input
            placeholder="Prospect Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            placeholder="Prospect Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <button
            onClick={addLead}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ➕ Add Lead
          </button>
        </div>
      )}
    </div>
  );
}
