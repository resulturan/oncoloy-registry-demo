import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import CohortSelectionPage from "./components/pages/CohortSelectionPage";
import DocumentBrowsingPage from "./components/pages/DocumentBrowsingPage";
import OntologySelectionPage from "./components/pages/OntologySelectionPage";
import ProcessingPage from "./components/pages/ProcessingPage";
import ReviewValidationPage from "./components/pages/ReviewValidationPage";
import "./App.css";

const App = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#0098DA",
                    borderRadius: 6,
                },
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/cohort-selection" replace />}
                    />
                    <Route
                        path="/cohort-selection"
                        element={<CohortSelectionPage />}
                    />
                    <Route
                        path="/documents/:patientId"
                        element={<DocumentBrowsingPage />}
                    />
                    <Route
                        path="/ontology-selection"
                        element={<OntologySelectionPage />}
                    />
                    <Route path="/processing" element={<ProcessingPage />} />
                    <Route
                        path="/review/:patientId"
                        element={<ReviewValidationPage />}
                    />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
};

export default App;
