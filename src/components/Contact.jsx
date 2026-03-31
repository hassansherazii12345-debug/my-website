import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import '../styles/contact.css';

const Contact = () => {
    return (
        <footer id="contact" className="contact-section">
            <div className="container contact-container">
                <div className="contact-content">
                    <div className="contact-info">
                        <h2 className="heading-md" style={{ marginBottom: '2rem' }}>VISIT <span className="text-red">US</span></h2>
                        <div className="info-item">
                            <MapPin className="text-red" size={24} />
                            <p>123 Luxury Avenue, Culinary District, NY 10012</p>
                        </div>
                        <div className="info-item">
                            <Phone className="text-red" size={24} />
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <div className="info-item">
                            <Mail className="text-red" size={24} />
                            <p>reservations@gregspizza.com</p>
                        </div>
                        <div className="info-item">
                            <Clock className="text-red" size={24} />
                            <div>
                                <p>Mon - Thu: 5PM - 11PM</p>
                                <p>Fri - Sun: 4PM - 12AM</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-newsletter">
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>JOIN THE EXCLUSIVE CLUB</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Receive invitations to private tastings and seasonal menu reveals.</p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="YOUR EMAIL ADDRESS" />
                            <button type="submit">SUBSCRIBE</button>
                        </form>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} GREG'S PIZZA. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
