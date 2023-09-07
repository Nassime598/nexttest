// pages/SignIn.js

import {useState} from "react";
import {useRouter} from "next/navigation";
import db from "../database/db";
import jwt from "jsonwebtoken";

export default function Home() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    const handleLogin = async () => {
        // Check for the blocked user condition
        if (username === 'muser3' && password === 'mpassword3') {
            setErrorMessage('Ce compte a été bloqué.');
            return;
        }

        try {
            const storedPassword = await db.get(username);
            if (storedPassword === password) {
                console.log('testing authentification');
                const token = jwt.sign({ username: username }, 'your-secret-key', { expiresIn: '1h' });
                localStorage.setItem('token', token);
                router.push('/photos');  // Redirect to photos page
            } else {
                setErrorMessage('Informations de connexion invalides');
            }
        } catch (error) {
            setErrorMessage('Informations de connexion invalides');

        }
    };
    return (
        <div className="h-screen bg-gray-200 flex items-center justify-center">
            <div className="flex h-4/5 w-full md:w-4/5 bg-gray-100 rounded shadow-lg overflow-hidden">
                {/* Left section (Form) */}
                <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-10 space-y-6">
                    <h1 className="text-2xl font-bold ">Welcome Back!</h1>
                    <h1 className="text-base border-e-gray-100 pb-4" >Welcome back! Please enter your details.</h1>
                    <div className="space-y-4 w-4/5 md:w-2/3">
                        <input
                            type="text"
                            placeholder="Username"
                            className="border rounded w-full py-2 px-4"
                            value={username} onChange={e => setUsername(e.target.value)}

                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border rounded w-full py-2 px-4"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />

                        <div className="flex justify-between items-center">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2"/>
                                Remember Me
                            </label>
                            <a href="#" className="text-sm text-blue-500">Forgot Password?</a>
                        </div>

                        <button onClick={handleLogin} className="bg-black text-white w-full py-2 rounded mb-2">
                            Sign In
                        </button>

                        <button className="flex items-center justify-center bg-gray-100 text-black w-full py-2 rounded">
                            <img src="/google.png" alt="Google Icon" className="mr-2 w-6 h-6" />
                            Sign in with Google
                        </button>
                    </div>

                    <p>
                        Don't have an account?
                        <a href="#" className="text-blue-500 ml-2">Create Account</a>
                    </p>
                    {errorMessage && <p className={"text-red-600 font-bold"}>{errorMessage}</p>}
                </div>

                {/* Right section (Image) - Hidden on mobile, visible on medium screens and up */}
                <div className="hidden max-h-screen md:flex w-1/2 bg-gray-200 items-center justify-center p-10">
                    <img src="/image.jpg" alt="Right Side Image" className="max-w-screen min-w-full	 max-h-screen h-auto"  />
                </div>
            </div>
        </div>
    );
}
