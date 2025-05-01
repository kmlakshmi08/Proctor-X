import React, { useEffect, useState } from 'react';
import './ManageTests.css';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/admin/manageTests';

export default function ManageTests() {
    const [tests, setTests] = useState([]);
    const [newTest, setNewTest] = useState({ testName: '', subject: '' });
    const [questionData, setQuestionData] = useState({ question: '', options: ['', '', '', ''], correctAnswer: '' });
    const [expandedTestId, setExpandedTestId] = useState(null);

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        const res = await axios.get(BASE_URL);
        setTests(res.data);
    };

    const handleAddTest = async () => {
        await axios.post(BASE_URL, newTest);
        setNewTest({ testName: '', subject: '' });
        fetchTests();
    };

    const handleDeleteTest = async (id) => {
        await axios.delete(`${BASE_URL}/${id}`);
        fetchTests();
    };

    const handleAddQuestion = async (testId) => {
        await axios.post(`${BASE_URL}/${testId}/questions`, questionData);
        setQuestionData({ question: '', options: ['', '', '', ''], correctAnswer: '' });
        fetchTests();
    };

    const handleDeleteQuestion = async (testId, questionIndex) => {
        await axios.delete(`${BASE_URL}/${testId}/questions/${questionIndex}`);
        fetchTests();
    };

    return (
        <div className="manage-tests-container">
            <h2>Manage Tests</h2>

            <div className="test-form">
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

            <div className="test-list">
                {tests.map((test) => (
                    <div key={test._id} className="test-card">
                        <h3>{test.testName} - {test.subject}</h3>
                        <button onClick={() => handleDeleteTest(test._id)}>Delete Test</button>
                        <button onClick={() =>
                            setExpandedTestId(expandedTestId === test._id ? null : test._id)
                        }>
                            {expandedTestId === test._id ? 'Hide Questions' : 'View Questions'}
                        </button>

                        {expandedTestId === test._id && (
                            <div className="expanded-section">
                                <ul>
                                    {test.questions.map((q, i) => (
                                        <li key={i}>
                                            {q.question}
                                            <button onClick={() => handleDeleteQuestion(test._id, i)}>Delete</button>
                                        </li>
                                    ))}
                                </ul>

                                <div className="question-form">
                                    <h4>Add Question</h4>
                                    <input
                                        type="text"
                                        placeholder="Question"
                                        value={questionData.question}
                                        onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
                                    />
                                    {questionData.options.map((opt, idx) => (
                                        <input
                                            key={idx}
                                            type="text"
                                            placeholder={`Option ${idx + 1}`}
                                            value={opt}
                                            onChange={(e) => {
                                                const updated = [...questionData.options];
                                                updated[idx] = e.target.value;
                                                setQuestionData({ ...questionData, options: updated });
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
        </div>
    );
}
