import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
 
const API_BASE = 'http://localhost:8080/api/students';
 
const EMPTY_FORM = { name: '', subject: '', mark: '' };
 
function App() {
  const [students, setStudents]   = useState([]);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading]     = useState(false);
  const [toast, setToast]         = useState(null);
 
  const fetchStudents = useCallback(async () => {
    try {
      const { data } = await axios.get(API_BASE);
      setStudents(data);
    } catch {
      showToast('Could not connect to backend. Is Spring Boot running?', 'error');
    }
  }, []);
 
  useEffect(() => { fetchStudents(); }, [fetchStudents]);
 
  // Auto-refresh every 3 seconds so SQL changes appear live
  useEffect(() => {
    const interval = setInterval(fetchStudents, 3000);
    return () => clearInterval(interval);
  }, [fetchStudents]);
 
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };
 
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
 
  const resetForm = () => { setForm(EMPTY_FORM); setEditingId(null); };
 
  const handleSubmit = async () => {
    if (!form.name || !form.subject || !form.mark) {
      showToast('Please fill in all fields.', 'error'); return;
    }
    setLoading(true);
    try {
      const payload = { ...form, mark: parseFloat(form.mark) };
      if (editingId) {
        await axios.put(`${API_BASE}/${editingId}`, payload);
        showToast('Student updated successfully.');
      } else {
        await axios.post(API_BASE, payload);
        showToast('Student added successfully.');
      }
      resetForm();
      fetchStudents();
    } catch {
      showToast('Error saving student.', 'error');
    }
    setLoading(false);
  };
 
  const handleEdit = (s) => {
    setForm({ name: s.name, subject: s.subject, mark: s.mark });
    setEditingId(s.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
 
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      showToast(`"${name}" deleted.`);
      fetchStudents();
    } catch {
      showToast('Error deleting student.', 'error');
    }
  };
 
  const getGrade = (mark) => {
    if (mark >= 90) return { label: 'A+', cls: 'grade-a-plus' };
    if (mark >= 80) return { label: 'A',  cls: 'grade-a' };
    if (mark >= 70) return { label: 'B',  cls: 'grade-b' };
    if (mark >= 60) return { label: 'C',  cls: 'grade-c' };
    if (mark >= 50) return { label: 'D',  cls: 'grade-d' };
    return { label: 'F', cls: 'grade-f' };
  };
 
  return (
    <div className="app">
 
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}
 
      <header className="header">
        <div className="header-inner">
          <div className="header-title">
            <span className="header-icon">🎓</span>
            <div>
              <h1>Student Mark System</h1>
              <p>React · Spring Boot · MySQL</p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-box">
              <span className="stat-num">{students.length}</span>
              <span className="stat-lbl">Records</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">
                {students.length > 0
                  ? (students.reduce((s, x) => s + x.mark, 0) / students.length).toFixed(1)
                  : '—'}
              </span>
              <span className="stat-lbl">Avg Mark</span>
            </div>
          </div>
        </div>
      </header>
 
      <main className="main">
 
        {/* ── Form Card ── */}
        <div className="card">
          <div className="card-title">
            {editingId ? `✏️ Edit Student (ID: ${editingId})` : '➕ Add Student'}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Student Name</label>
              <input name="name" value={form.name} onChange={handleChange}  />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange}  />
            </div>
            <div className="form-group">
              <label>Mark (0 – 100)</label>
              <input name="mark" type="number" min="0" max="100" value={form.mark} onChange={handleChange}  />
            </div>
          </div>
          <div className="btn-row">
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {editingId ? 'Update' : 'Add Student'}
            </button>
            {editingId && (
              <button className="btn btn-outline" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </div>  {/* ← closes Form Card */}
 
        {/* ── Table Card ── */}
        <div className="card">
          <div className="card-title-row">
            <span className="card-title">📋 Student Records</span>
            <button className="btn btn-sm btn-outline" onClick={fetchStudents}>↻ Refresh</button>
          </div>
 
          {students.length === 0 ? (
            <div className="empty-state">No records found. Add a student above.</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>Mark</th>
                    <th>Grade</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => {
                    const grade = getGrade(s.mark);
                    return (
                      <tr key={s.id}>
                        <td className="td-id">#{s.id}</td>
                        <td className="td-name">{s.name}</td>
                        <td>{s.subject}</td>
                        <td className="td-mark">{s.mark}</td>
                        <td><span className={`grade-badge ${grade.cls}`}>{grade.label}</span></td>
                        <td className="td-date">
                          {s.createdAt ? new Date(s.createdAt).toLocaleString() : '—'}
                        </td>
                        <td>
                          <div className="action-row">
                            <button className="btn btn-sm btn-edit" onClick={() => handleEdit(s)}>Edit</button>
                            <button className="btn btn-sm btn-delete" onClick={() => handleDelete(s.id, s.name)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>  {/* ← closes Table Card */}
 
      </main>
    </div>
  );
}
 
export default App;