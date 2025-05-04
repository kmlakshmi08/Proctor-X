import React, { useEffect, useState } from 'react';
import './ManageTests.css';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/admin/manageTests';

export default function ManageTests() {
    const [tests, setTests] = useState([]);
    const [newTest, setNewTest] = useState({ testName: '', subject: '' });
    const [questionData, setQuestionData] = useState({ question: '', options: ['', '', '', ''], correctAnswer: '' });
    const [expandedTestId, setExpandedTestId] = useState(null);
    const [editTestId, setEditTestId] = useState(null);
    const [editTestName, setEditTestName] = useState('');
    const [editSubject, setEditSubject] = useState('');
    

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        const res = await axios.get(BASE_URL);
        setTests(res.data);
    };

    const handleAddTest = async () => {
        if (!newTest.testName || !newTest.subject) return alert("Please fill in all fields.");
        await axios.post(BASE_URL, newTest);
        setNewTest({ testName: '', subject: '' });
        fetchTests();
    };

    const handleDeleteTest = async (id) => {
        await axios.delete(`${BASE_URL}/${id}`);
        fetchTests();
    };

    const handleAddQuestion = async (testId) => {
        if (!questionData.question || questionData.options.some(opt => !opt) || !questionData.correctAnswer) {
            return alert("Please complete all fields for the question.");
        }
        await axios.post(`${BASE_URL}/${testId}/questions`, questionData);
        setQuestionData({ question: '', options: ['', '', '', ''], correctAnswer: '' });
        fetchTests();
    };

    const handleDeleteQuestion = async (testId, questionIndex) => {
        await axios.delete(`${BASE_URL}/${testId}/questions/${questionIndex}`);
        fetchTests();
    };

    const handleSaveEdit = async (id) => {
        if (!editTestName.trim() || !editSubject.trim()) {
            alert("Test name and subject cannot be empty.");
            return;
        }
        await axios.put(`${BASE_URL}/${id}`, {
            testName: editTestName,
            subject: editSubject
        });
        setEditTestId(null);
        setEditTestName('');
        setEditSubject('');
        fetchTests();
    };
    
    

    return (
        <div className="manage-tests-container">
            <h2>Manage Tests</h2>
    
            <div className="test-list">
                {tests.map((test) => (
                    <div key={test._id} className="test-card">
                        <h3>{test.testName} - {test.subject}</h3>
                            {editTestId === test._id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editTestName}
                                        placeholder="Test Name"
                                        onChange={(e) => setEditTestName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={editSubject}
                                        placeholder="Subject"
                                        onChange={(e) => setEditSubject(e.target.value)}
                                    />
                                    <button onClick={() => handleSaveEdit(test._id)}>Save</button>
                                    <button onClick={() => setEditTestId(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => {
                                        setEditTestId(test._id);
                                        setEditTestName(test.testName);
                                        setEditSubject(test.subject);
                                    }}>
                                        Edit Test Name and Subject
                                    </button>
                                </>
                            )}

                        <button onClick={() => handleDeleteTest(test._id)}>Delete Test</button>
                        <button onClick={() =>
                            setExpandedTestId(expandedTestId === test._id ? null : test._id)
                        }>
                            {expandedTestId === test._id ? 'Hide Questions' : 'View/Edit Questions'}
                        </button>
                        

    
                        {expandedTestId === test._id && (
                            <div className="expanded-section">
                                <h4>Questions:</h4>
                                <ul>
                                    {test.questions.map((q, i) => (
                                        <li key={i}>
                                            <div className="question-header">
                                                <div>
                                                    <strong>Q:</strong> {q.question}
                                                </div>
                                                <button onClick={() => handleDeleteQuestion(test._id, i)}>Delete</button>
                                            </div>
                                            <ul>
                                                {q.options.map((opt, idx) => (
                                                    <li key={idx}>
                                                        {String.fromCharCode(65 + idx)}. {opt}
                                                    </li>
                                                ))}
                                            </ul>
                                            <strong>Answer:</strong> {q.correctAnswer}
                                        </li>
                                    ))}
                                </ul>
    
                                <div className="add-question-form">
                                    <h5>Add Question</h5>
                                    <input
                                        type="text"
                                        placeholder="Question"
                                        value={questionData.question}
                                        onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
                                    />
                                    {questionData.options.map((opt, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            placeholder={`Option ${index + 1}`}
                                            value={opt}
                                            onChange={(e) => {
                                                const newOptions = [...questionData.options];
                                                newOptions[index] = e.target.value;
                                                setQuestionData({ ...questionData, options: newOptions });
                                            }}
                                        />
                                    ))}
                                    <input
                                        type="text"
                                        placeholder="Correct Answer"
                                        value={questionData.correctAnswer}
                                        onChange={(e) => setQuestionData({ ...questionData, correctAnswer: e.target.value })}
                                    />
                                    <button onClick={() => handleAddQuestion(test._id)}>Add Question</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
    
            <div className="test-form">
                <h4>Add New Test</h4>
                <input
                    type="text"
                    placeholder="Test Name"
                    value={newTest.testName}
                    onChange={(e) => setNewTest({ ...newTest, testName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Subject"
                    value={newTest.subject}
                    onChange={(e) => setNewTest({ ...newTest, subject: e.target.value })}
                />
                <button onClick={handleAddTest}>Add Test</button>
            </div>
        </div>
    );    
}
