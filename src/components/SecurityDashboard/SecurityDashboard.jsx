import React, { useEffect, useState } from 'react';
import { Shield, Bell, User, Flame, TriangleAlert, Filter, AlertCircle, UserPlus, Info, Ban } from 'lucide-react';
import './SecurityDashboard.css';

function SecurityDashboard() {
    const [statusOpacity, setStatusOpacity] = useState(1);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        // Animate the security status text
        const statusInterval = setInterval(() => {
            setStatusOpacity(prev => prev === 1 ? 0.5 : 1);
        }, 1000);

        // Animate the shield rotation
        const rotationInterval = setInterval(() => {
            setRotation(prev => (prev + 0.5) % 360);
        }, 50);

        return () => {
            clearInterval(statusInterval);
            clearInterval(rotationInterval);
        };
    }, []);

    return (
        <div className="security-dashboard-container">
            <div className="sd-container">
                <header className="sd-header">
                    <div className="sd-logo">
                        <div className="sd-logo-icon">
                            <Shield size={20} />
                        </div>
                        <h1>CyberShield</h1>
                    </div>
                    <nav className="sd-nav">
                        <ul>
                            <li><a href="#dashboard">Dashboard</a></li>
                            <li><a href="#threats">Threats</a></li>
                            <li><a href="#analytics">Analytics</a></li>
                            <li><a href="#reports">Reports</a></li>
                            <li><a href="#settings">Settings</a></li>
                        </ul>
                    </nav>
                    <div className="sd-user-actions">
                        <button className="sd-btn sd-btn-outline">
                            <Bell size={18} />
                        </button>
                        <button className="sd-btn sd-btn-primary">
                            <User size={18} /> Admin
                        </button>
                    </div>
                </header>

                <div className="sd-dashboard">
                    <div className="sd-dashboard-header">
                        <h2 className="sd-dashboard-title">Security Dashboard</h2>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ background: '#10b981', width: '12px', height: '12px', borderRadius: '50%', display: 'inline-block', marginRight: '8px' }}></span>
                            <span>Systems Protected</span>
                        </div>
                    </div>

                    <div className="sd-cyber-shield">
                        <div className="sd-shield" style={{ transform: `rotate(${rotation}deg)` }}></div>
                        <div className="sd-shield-core">
                            <div className="sd-shield-core-inner">
                                <div className="sd-security-status" style={{ opacity: statusOpacity }}>
                                    SECURE
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sd-dashboard-metrics">
                        <div className="sd-metric-card">
                            <div className="sd-metric-header">
                                <h3 className="sd-metric-title">Threat Detection</h3>
                                <div className="sd-metric-icon sd-icon-blue">
                                    <Shield size={20} />
                                </div>
                            </div>
                            <div className="sd-metric-value">98.7%</div>
                            <div className="sd-metric-description">Successfully detected threats</div>
                        </div>
                        <div className="sd-metric-card">
                            <div className="sd-metric-header">
                                <h3 className="sd-metric-title">Firewall Activity</h3>
                                <div className="sd-metric-icon sd-icon-green">
                                    <Flame size={20} />
                                </div>
                            </div>
                            <div className="sd-metric-value">24,587</div>
                            <div className="sd-metric-description">Blocked connections today</div>
                        </div>
                        <div className="sd-metric-card">
                            <div className="sd-metric-header">
                                <h3 className="sd-metric-title">Vulnerability</h3>
                                <div className="sd-metric-icon sd-icon-red">
                                    <TriangleAlert size={20} />
                                </div>
                            </div>
                            <div className="sd-metric-value">4</div>
                            <div className="sd-metric-description">Open vulnerabilities</div>
                        </div>
                    </div>

                    <div className="sd-security-events">
                        <div className="sd-events-header">
                            <h3 className="sd-events-title">Recent Security Events</h3>
                            <div className="sd-events-controls">
                                <button className="sd-btn sd-btn-outline" style={{ background: 'rgba(30, 41, 59, 0.7)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                    <Filter size={16} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="sd-event-item">
                            <div className="sd-event-icon sd-event-critical">
                                <AlertCircle size={20} />
                            </div>
                            <div className="sd-event-content">
                                <div className="sd-event-title">Suspicious Activity Detected</div>
                                <div className="sd-event-description">Unusual login attempt from Germany</div>
                            </div>
                            <div className="sd-event-time">10 min ago</div>
                        </div>
                        
                        <div className="sd-event-item">
                            <div className="sd-event-icon sd-event-warning">
                                <UserPlus size={20} />
                            </div>
                            <div className="sd-event-content">
                                <div className="sd-event-title">New User Registered</div>
                                <div className="sd-event-description">User account created from London</div>
                            </div>
                            <div className="sd-event-time">1 hour ago</div>
                        </div>
                        
                        <div className="sd-event-item">
                            <div className="sd-event-icon sd-event-info">
                                <Info size={20} />
                            </div>
                            <div className="sd-event-content">
                                <div className="sd-event-title">Security Update Installed</div>
                                <div className="sd-event-description">Firewall rules updated successfully</div>
                            </div>
                            <div className="sd-event-time">2 hours ago</div>
                        </div>
                        
                        <div className="sd-event-item">
                            <div className="sd-event-icon sd-event-critical">
                                <Ban size={20} />
                            </div>
                            <div className="sd-event-content">
                                <div className="sd-event-title">Blocked Malicious IP</div>
                                <div className="sd-event-description">IP address 192.168.1.154 blocked</div>
                            </div>
                            <div className="sd-event-time">5 hours ago</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sd-footer">
                <p className="sd-footer-text">© CyberShield Security System 2023</p>
            </div>
        </div>
    );
}

export default SecurityDashboard;
