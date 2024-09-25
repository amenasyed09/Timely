import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import PhoneComponent from "./PhoneComponent";

export default function SubscribeText() {
    const [userData, setUserData] = useState({ username: '', email: '' });
    const [error, setError] = useState(null); 
    const [isSubscribed, setIsSubscribed] = useState(false);
  

    useEffect(() => {
        const cookieData = Cookies.get('user_data');
        if (cookieData) {
            const [username, email] = cookieData.split(',');
            setUserData({ username, email });
            setIsSubscribed(true);
        }
    }, []);

    const handleSubscribe = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const email = event.target.email.value;

        try {
            const response = await axios.post('http://localhost:8000/subscribe', {
                username,
                email,
            });

            if (response.status === 200) {
                const userData = `${username},${email}`;
                Cookies.set('user_data', userData, { expires: 7 });
                localStorage.setItem('subscribed', 'true'); 
                setUserData({ username, email });
                setIsSubscribed(true);
                window.location.reload();

                try {
                    const emailResponse = await axios.get(`http://localhost:8000/sendemail/${username}`);
                    if (emailResponse.status === 200) {
                        console.log('Email sent successfully');
                    } else {
                        console.log('Failed to send email');
                    }
                } catch (emailError) {
                    console.error('Error while sending email:', emailError);
                }

            }
        } catch (error) {
            if (error.response && error.response.data.detail) {
                setError(error.response.data.detail);
            } else {
                setError('An error occurred. Please try again.');
            }
            console.error('Subscription error:', error);
        }
    };

    return (
        <section id="aboutus" className="bg-white text-black font-playfair">
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="max-w-lg">
                        <div className="flex justify-end">
                            <div className="max-w-md text-right">
                                <h2 className="text-2xl font-bold mb-6 text-right">Subscribe</h2>
                                <p className="mb-6 text-lg leading-relaxed">
                                    Past events, present tense.<br />
                                    Subscribe to receive history’s most fascinating happenings in your inbox.<br /><br />
                                    History Facts bring the past to life in your inbox and on the web. Sign up to receive one compelling fact in your inbox every morning.
                                </p>

                                {error && (
                                    <div className="text-red-500 font-semibold text-center mb-4">
                                        {error}
                                    </div>
                                )}

                                {!isSubscribed ? (
                                    <form className="flex flex-col space-y-4" onSubmit={handleSubscribe}>
                                        <input
                                            name='username'
                                            type="text"
                                            placeholder="Enter your username"
                                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500 text-lg text-right"
                                            style={{ color: 'black' }}
                                        />
                                        <input
                                            name='email'
                                            type="email"
                                            placeholder="Enter your email"
                                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500 text-lg text-right"
                                            style={{ color: 'black' }}
                                        />
                                        <button
                                            type="submit"
                                            className="px-6 py-3 text-white font-semibold rounded-md bg-black hover:bg-red-600"
                                        >
                                            Subscribe
                                        </button>
                                    </form>
                                ) : (
                                    <div className="text-green-500 font-semibold text-lg text-center">
                                        You are currently subscribed as {userData.username}!
                                    </div>
                                )}

                          
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 md:mt-0">
                        <PhoneComponent />
                    </div>
                </div>
            </div>
        </section>
    );
}
