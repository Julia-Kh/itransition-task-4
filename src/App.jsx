import Main from "./components/Main";
import "./App.css";
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function App() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
            {!session ? <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} /> : <><div>
                <div>Logged in!</div>
                <button onClick={() => supabase.auth.signOut()}>Sign out</button>
            </div>
                <Main key={session.user.id} session={session} /></>}
        </div>
    );
}
