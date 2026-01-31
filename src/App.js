import React, { useState, useEffect } from 'react';
import './style.css';

const STUDENTS_DB = {
  "student001": { id: "student001", name: "Kim Min-jae", email: "minjae@cec.com", password: "demo123", camp: "A", level: "G01-G10", joined: "2025-01-15" },
  "student002": { id: "student002", name: "Lee Ji-won", email: "jiwon@cec.com", password: "demo123", camp: "B", level: "G21-G40", joined: "2025-01-20" },
  "student003": { id: "student003", name: "Park Su-jin", email: "sujin@cec.com", password: "demo123", camp: "C", level: "G61-G80", joined: "2025-01-10" }
};

const ADMIN_DB = {
  "admin001": { id: "admin001", email: "admin@cec.com", password: "admin123", name: "CEC Admin", role: "admin" }
};

const PROGRESS_DB = {
  "student001": { completed_lessons: ["G01", "G02", "G03"], current_lesson: "G04", completion_rate: 30, last_activity: "2025-01-28T10:30:00", scores: [85, 90, 78] },
  "student002": { completed_lessons: ["G21", "G22", "G23", "G24", "G25"], current_lesson: "G26", completion_rate: 25, last_activity: "2025-01-27T14:15:00", scores: [92, 88, 91, 85, 89] },
  "student003": { completed_lessons: ["G61", "G62", "G63", "G64", "G65", "G66"], current_lesson: "G67", completion_rate: 33, last_activity: "2025-01-28T09:45:00", scores: [95, 93, 96, 91, 94, 92] }
};

function LoginPage({ onLogin, onAdminLogin }) {
  const [tab, setTab] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const demoCredentials = [
    { email: 'minjae@cec.com', password: 'demo123', name: 'Camp A' },
    { email: 'jiwon@cec.com', password: 'demo123', name: 'Camp B' },
    { email: 'sujin@cec.com', password: 'demo123', name: 'Camp C' }
  ];

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      let student = null;
      for (let sid in STUDENTS_DB) {
        if (STUDENTS_DB[sid].email === email && STUDENTS_DB[sid].password === password) {
          student = STUDENTS_DB[sid];
          break;
        }
      }
      if (student) {
        onLogin(student.id, student.name, student.camp);
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 500);
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      let admin = null;
      for (let aid in ADMIN_DB) {
        if (ADMIN_DB[aid].email === email && ADMIN_DB[aid].password === password) {
          admin = ADMIN_DB[aid];
          break;
        }
      }
      if (admin) {
        onAdminLogin(admin.id, admin.name);
      } else {
        setError('Invalid admin email or password');
      }
      setLoading(false);
    }, 500);
  };

  const handleDemoLogin = (cred) => {
    setEmail(cred.email);
    setPassword(cred.password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>CEC English Camp</h1>
        <div className="tab-menu">
          <button 
            className={`tab-btn ${tab === 'student' ? 'active' : ''}`}
            onClick={() => { setTab('student'); setEmail(''); setPassword(''); setError(''); }}
          >
            Student Portal
          </button>
          <button 
            className={`tab-btn ${tab === 'admin' ? 'active' : ''}`}
            onClick={() => { setTab('admin'); setEmail(''); setPassword(''); setError(''); }}
          >
            Admin Login
          </button>
        </div>

        {tab === 'student' ? (
          <>
            <form onSubmit={handleStudentSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@cec.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button type="submit" disabled={loading} className="login-btn">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className="demo-section">
              <p>Demo Accounts:</p>
              <div className="demo-buttons">
                {demoCredentials.map((cred, idx) => (
                  <button key={idx} type="button" className="demo-btn" onClick={() => handleDemoLogin(cred)}>
                    {cred.name}
                  </button>
                ))}
              </div>
              <small>Click Demo button then click Login</small>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleAdminSubmit}>
              <div className="form-group">
                <label htmlFor="admin-email">Admin Email</label>
                <input type="email" id="admin-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@cec.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="admin-password">Admin Password</label>
                <input type="password" id="admin-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button type="submit" disabled={loading} className="login-btn">
                {loading ? 'Logging in...' : 'Admin Login'}
              </button>
            </form>
            <div className="demo-section">
              <p>Demo Admin:</p>
              <div className="demo-buttons">
                <button type="button" className="demo-btn" onClick={() => { setEmail('admin@cec.com'); setPassword('admin123'); }}>
                  Admin Demo
                </button>
              </div>
              <small>Click Demo button then click Admin Login</small>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function AdminDashboard({ adminInfo, onLogout }) {
  const [currentTab, setCurrentTab] = useState('dashboard');

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-left">
          <img src="https://raw.githubusercontent.com/CecEnglishCamp/cecenglishcamp.github.io/main/assets/img/robo2.png" alt="CEC Logo" className="admin-logo" />
          <h1>CEC Admin Dashboard</h1>
        </div>
        <nav className="admin-nav">
          <button 
            className={`nav-btn ${currentTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-btn ${currentTab === 'students' ? 'active' : ''}`}
            onClick={() => setCurrentTab('students')}
          >
            👥 Students
          </button>
          <a href="https://cecenglishcamp.github.io/" target="_blank" rel="noopener noreferrer" className="nav-btn">
            🏠 Main Website
          </a>
        </nav>
        <div className="header-right">
          <span className="admin-name">{adminInfo.name}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>
      <div className="admin-container">
        {currentTab === 'dashboard' && (
          <>
            <div className="card admin-card">
              <h2>System Overview</h2>
              <div className="admin-stats">
                <div className="stat-item">
                  <span className="stat-label">Total Students</span>
                  <span className="stat-value">3</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Active Camps</span>
                  <span className="stat-value">3</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Lessons</span>
                  <span className="stat-value">80</span>
                </div>
              </div>
            </div>

            <div className="card admin-card">
              <h2>Student Progress</h2>
              <div className="progress-overview">
                {Object.entries(PROGRESS_DB).map(([studentId, progress]) => (
                  <div key={studentId} className="progress-item">
                    <span className="student-name">{STUDENTS_DB[studentId].name}</span>
                    <div className="mini-progress-bar">
                      <div className="mini-progress-fill" style={{ width: `${progress.completion_rate}%` }}></div>
                    </div>
                    <span className="progress-text">{progress.completion_rate}%</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {currentTab === 'students' && (
          <div className="card admin-card">
            <h2>Students Management</h2>
            <table className="students-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Camp</th>
                  <th>Level</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(STUDENTS_DB).map(([studentId, student]) => (
                  <tr key={studentId}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>Camp {student.camp}</td>
                    <td>{student.level}</td>
                    <td>
                      <div className="mini-progress-bar">
                        <div className="mini-progress-fill" style={{ width: `${PROGRESS_DB[studentId].completion_rate}%` }}></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard({ studentInfo, onNavigate, onLogout }) {
  const [progress, setProgress] = useState(null);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    setStudent(STUDENTS_DB[studentInfo.id]);
    setProgress(PROGRESS_DB[studentInfo.id]);
  }, [studentInfo]);

  if (!progress || !student) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>📚 CEC English Camp Dashboard</h1>
        </div>
        <div className="header-right">
          <span className="user-name">{student.name}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>
      <div className="dashboard-container">
        <div className="card student-info-card">
          <h2>Student Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Camp Level:</span>
              <span className="value">{student.camp}</span>
            </div>
            <div className="info-item">
              <span className="label">Current Level:</span>
              <span className="value">{student.level}</span>
            </div>
            <div className="info-item">
              <span className="label">Joined:</span>
              <span className="value">{student.joined}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{student.email}</span>
            </div>
          </div>
        </div>
        <div className="card progress-card">
          <h2>Learning Progress</h2>
          <div className="progress-section">
            <div className="progress-header">
              <span>Completion Rate</span>
              <span className="percentage">{progress.completion_rate}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress.completion_rate}%` }}></div>
            </div>
          </div>
          <div className="lessons-section">
            <h3>Recent Activity</h3>
            <p className="last-activity">
              Last activity: {new Date(progress.last_activity).toLocaleString()}
            </p>
            <p className="current-lesson">
              Current Lesson: <strong>{progress.current_lesson}</strong>
            </p>
          </div>
        </div>
        <div className="card completed-lessons-card">
          <h2>Completed Lessons</h2>
          <div className="lessons-list">
            {progress.completed_lessons.map((lesson, idx) => (
              <div key={idx} className="lesson-badge">{lesson}</div>
            ))}
          </div>
        </div>
        <div className="card scores-card">
          <h2>Recent Scores</h2>
          <div className="scores-chart">
            {progress.scores.map((score, idx) => (
              <div key={idx} className="score-bar-container">
                <div className="score-label">{progress.completed_lessons[idx]}</div>
                <div className="score-bar-wrapper">
                  <div className="score-bar" style={{ width: `${score}%` }}>
                    <span className="score-value">{score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card action-card">
          <h2>Need Help?</h2>
          <p>Ask questions to our AI tutor about grammar lessons</p>
          <button className="tutor-btn" onClick={() => onNavigate('tutor')}>
            🤖 Go to AI Tutor
          </button>
        </div>
      </div>
    </div>
  );
}

function TutorPage({ studentInfo, onNavigate }) {
  const [lessonId, setLessonId] = useState('G01');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    { type: 'assistant', text: 'Hello! I am CEC AI tutor. What grammar question?', timestamp: new Date() }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = React.useRef(null);

  const grammarLessons = ['G01', 'G02', 'G03', 'G04', 'G05', 'G21', 'G22', 'G23', 'G24', 'G25', 'G61', 'G62', 'G63', 'G64', 'G65'];

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    const userMessage = { type: 'user', text: question, timestamp: new Date() };
    setMessages([...messages, userMessage]);
    setQuestion('');
    setLoading(true);
    setTimeout(() => {
      const dummyAnswers = {
        "G01": "Present Simple is for general facts. Example: 'I eat breakfast every day.'",
        "G02": "Present Continuous is for actions now. Example: 'I am eating breakfast now.'",
        "G03": "Past Simple is for past actions. Example: 'I ate breakfast yesterday.'",
      };
      const answer = dummyAnswers[lessonId] || `Information about lesson ${lessonId} not found.`;
      const assistantMessage = { type: 'assistant', text: answer, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="tutor-page">
      <header className="tutor-header">
        <button className="back-btn" onClick={() => onNavigate('dashboard')}>
          ← Back to Dashboard
        </button>
        <h1>🤖 AI Grammar Tutor</h1>
        <span className="student-info">{studentInfo.name} - {studentInfo.camp}</span>
      </header>
      <div className="tutor-container">
        <div className="lesson-selector">
          <label htmlFor="lesson">Select Lesson:</label>
          <select id="lesson" value={lessonId} onChange={(e) => setLessonId(e.target.value)} className="lesson-select">
            {grammarLessons.map(lesson => (
              <option key={lesson} value={lesson}>{lesson}</option>
            ))}
          </select>
        </div>
        <div className="chat-container">
          <div className="messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                <div className="message-avatar">{msg.type === 'user' ? '👤' : '🤖'}</div>
                <div className="message-content">
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message assistant">
                <div className="message-avatar">🤖</div>
                <div className="message-content typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleAskQuestion} className="input-form">
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask your grammar question here..." disabled={loading} className="question-input" />
            <button type="submit" disabled={loading || !question.trim()} className="send-btn">
              {loading ? '⏳' : '📤'}
            </button>
          </form>
        </div>
        <div className="tips-section">
          <h3>💡 Tutor Tips</h3>
          <ul>
            <li>Select a lesson first, then ask specific questions</li>
            <li>Ask about grammar rules</li>
            <li>Request sentence interpretations</li>
            <li>Ask for corrections on wrong sentences</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [studentInfo, setStudentInfo] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);

  const handleLogin = (studentId, name, camp) => {
    setStudentInfo({ id: studentId, name, camp });
    setCurrentPage('dashboard');
  };

  const handleAdminLogin = (adminId, name) => {
    setAdminInfo({ id: adminId, name });
    setCurrentPage('admin');
  };

  const handleLogout = () => {
    setStudentInfo(null);
    setAdminInfo(null);
    setCurrentPage('login');
  };

  return (
    <div className="App">
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} onAdminLogin={handleAdminLogin} />}
      {currentPage === 'dashboard' && studentInfo && <Dashboard studentInfo={studentInfo} onNavigate={setCurrentPage} onLogout={handleLogout} />}
      {currentPage === 'tutor' && studentInfo && <TutorPage studentInfo={studentInfo} onNavigate={setCurrentPage} />}
      {currentPage === 'admin' && adminInfo && <AdminDashboard adminInfo={adminInfo} onLogout={handleLogout} />}
    </div>
  );
}
