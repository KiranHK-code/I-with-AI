import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Aptitude from './aptitude'
import ResumeUpload from './resume'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/aptitude" element={<Aptitude />} />
                <Route path="/resume" element={<ResumeUpload />} />

            </Routes>
        </Router>
    )}
    export default App;