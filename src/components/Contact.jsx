import React from 'react';
import { MapPin, Phone, Facebook } from 'lucide-react';
import '../styles/contact.css';

const Contact = () => {
    return (
        <footer id="contact" className="contact-section">
            <div className="container contact-container">
                <div id="about" className="about-section" style={{ marginBottom: '4rem' }}>
                    <h2 className="heading-md" style={{ marginBottom: '2rem', color: '#000' }}>ABOUT <span className="text-red">US</span></h2>
                    <div style={{ color: '#444', fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '800px', fontWeight: 'bold', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }}>
                        <p style={{ marginBottom: '1rem' }}>Support local. Eat something great.</p>
                        <p style={{ marginBottom: '1rem' }}>At Greg's Pizza Route 38, every dish is made to keep people coming back. It’s no surprise locals love it—and you might too.</p>
                        <p style={{ marginBottom: '1rem' }}>Start with the Power Protein Salad, one of the most talked-about items on the menu. Add a side of crispy french fries to make it a complete, satisfying meal.</p>
                        <p style={{ marginBottom: '1rem' }}>Serving the community for years and proudly partnered with Slice since 2021, we make ordering easy with quick curbside pickup.</p>
                        <p>Simple, fresh, and always worth it.</p>
                    </div>
                </div>

                <div className="contact-content">
                    <div className="contact-info" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', fontWeight: '600' }}>
                        <h2 className="heading-md" style={{ marginBottom: '2rem' }}>VISIT <span className="text-red">US</span></h2>
                        <div className="info-item">
                            <a 
                                href="https://www.google.com/maps/place/101+Main+St+Wilmington,+MA+01887" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                            >
                                <MapPin className="text-red" size={24} />
                            </a>
                            <p>
                                101 Main St Wilmington, MA 01887 
                                <a 
                                    href="https://www.google.com/maps/place/101+Main+St+Wilmington,+MA+01887" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ fontSize: '0.8rem', color: '#E31837', textDecoration: 'underline', marginLeft: '10px', whiteSpace: 'nowrap' }}
                                >
                                    GET DIRECTIONS
                                </a>
                            </p>
                        </div>
                        <div className="info-item">
                            <Phone className="text-red" size={24} />
                            <p>(978) 657-4567</p>
                        </div>
                        <div className="info-item">
                            <a 
                                href="https://www.facebook.com/profile.php?id=100069684032410" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                            >
                                <Facebook className="text-red" size={24} />
                            </a>
                            <p>
                                Follow Us 
                                <a 
                                    href="https://www.facebook.com/profile.php?id=100069684032410" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ fontSize: '0.8rem', color: '#E31837', textDecoration: 'underline', marginLeft: '10px', whiteSpace: 'nowrap' }}
                                >
                                    Facebook
                                </a>
                            </p>
                        </div>
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
