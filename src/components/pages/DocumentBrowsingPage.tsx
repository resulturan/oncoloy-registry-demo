import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Layout,
    Card,
    List,
    Tag,
    Button,
    Space,
    Typography,
    Avatar,
    Breadcrumb,
    Drawer,
    Timeline,
    Badge,
    Segmented,
} from "antd";
import {
    FileTextOutlined,
    FilePdfOutlined,
    ExperimentOutlined,
    MedicineBoxOutlined,
    LeftOutlined,
    RightOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    setCurrentPatient,
    setDocuments,
    setSelectedDocument,
} from "../../store/slices/documentsSlice";
import { generateMockDocuments } from "../../data/mockDocuments";
import type { Document } from "../../types";

const { Header, Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;

const DocumentBrowsingPage = () => {
    const { patientId } = useParams<{ patientId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { patients, selectedPatientIds } = useAppSelector(
        state => state.cohort
    );
    const { documents, selectedDocumentId, activeFilters } = useAppSelector(
        state => state.documents
    );

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("All Documents");

    const currentPatient = patients.find(p => p.id === patientId);
    const patientDocs = documents[patientId || ""] || [];

    useEffect(() => {
        if (patientId) {
            dispatch(setCurrentPatient(patientId));
            if (!documents[patientId]) {
                const mockDocs = generateMockDocuments(patientId);
                dispatch(setDocuments({ patientId, documents: mockDocs }));
            }
        }
    }, [patientId, dispatch, documents]);

    const getDocumentIcon = (type: Document["type"]) => {
        switch (type) {
            case "Pathology":
                return (
                    <ExperimentOutlined
                        style={{ fontSize: 24, color: "#722ed1" }}
                    />
                );
            case "Clinical Notes":
                return (
                    <FileTextOutlined
                        style={{ fontSize: 24, color: "#1890ff" }}
                    />
                );
            case "Radiology":
                return (
                    <FilePdfOutlined
                        style={{ fontSize: 24, color: "#52c41a" }}
                    />
                );
            case "Lab Results":
                return (
                    <ExperimentOutlined
                        style={{ fontSize: 24, color: "#faad14" }}
                    />
                );
            case "Treatment":
                return (
                    <MedicineBoxOutlined
                        style={{ fontSize: 24, color: "#ff4d4f" }}
                    />
                );
            default:
                return <FileTextOutlined style={{ fontSize: 24 }} />;
        }
    };

    const getFormatColor = (format: Document["format"]) => {
        switch (format) {
            case "PDF":
                return "red";
            case "Text":
                return "blue";
            case "FHIR":
                return "green";
            default:
                return "default";
        }
    };

    const filteredDocs = patientDocs.filter(doc => {
        if (selectedFilter === "All Documents") return true;
        return doc.type === selectedFilter;
    });

    const docTypeCount = (type: string) => {
        if (type === "All Documents") return patientDocs.length;
        return patientDocs.filter(d => d.type === type).length;
    };

    const currentPatientIndex = selectedPatientIds.indexOf(patientId || "");
    const canGoPrevious = currentPatientIndex > 0;
    const canGoNext = currentPatientIndex < selectedPatientIds.length - 1;

    const handlePrevious = () => {
        if (canGoPrevious) {
            navigate(
                `/documents/${selectedPatientIds[currentPatientIndex - 1]}`
            );
        }
    };

    const handleNext = () => {
        if (canGoNext) {
            navigate(
                `/documents/${selectedPatientIds[currentPatientIndex + 1]}`
            );
        }
    };

    return (
        <Layout
            style={{ minHeight: "100vh", height: "100vh", overflow: "hidden" }}
        >
            <Header
                style={{
                    background: "#fff",
                    padding: "0 24px",
                    borderBottom: "1px solid #f0f0f0",
                }}
            >
                <Breadcrumb
                    items={[
                        {
                            title: "Cohort Selection",
                            onClick: () => navigate("/cohort-selection"),
                        },
                        { title: "Document Browsing" },
                    ]}
                    style={{ padding: "20px 0" }}
                />
            </Header>

            <Layout>
                <Sider
                    width={250}
                    theme="light"
                    style={{
                        background: "#fafafa",
                        padding: 16,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Card size="small" style={{ marginBottom: 16 }}>
                        <Space direction="vertical" size="small">
                            <Avatar
                                size={64}
                                style={{ backgroundColor: "#1890ff" }}
                            >
                                {currentPatient?.name
                                    .split(" ")
                                    .map(n => n[0])
                                    .join("")}
                            </Avatar>
                            <Title level={5} style={{ margin: 0 }}>
                                {currentPatient?.name}
                            </Title>
                            <Text type="secondary">{currentPatient?.mrn}</Text>
                            <Text type="secondary">
                                {currentPatient?.primaryDiagnosis}
                            </Text>
                        </Space>
                    </Card>

                    <Card
                        size="small"
                        title={`Selected Patients (${selectedPatientIds.length})`}
                    >
                        <List
                            size="small"
                            locale={{ emptyText: "No patients selected" }}
                            dataSource={selectedPatientIds
                                .map(id => patients.find(p => p.id === id))
                                .filter(Boolean)}
                            renderItem={patient => (
                                <List.Item
                                    style={{
                                        background:
                                            patient?.id === patientId
                                                ? "#e6f7ff"
                                                : "transparent",
                                        cursor: "pointer",
                                        padding: "8px 12px",
                                        borderRadius: 4,
                                        marginBottom: 4,
                                    }}
                                    onClick={() =>
                                        navigate(`/documents/${patient?.id}`)
                                    }
                                >
                                    <Space
                                        direction="vertical"
                                        size={0}
                                        style={{ width: "100%" }}
                                    >
                                        <Text
                                            strong={patient?.id === patientId}
                                            style={{ fontSize: 13 }}
                                        >
                                            {patient?.name}
                                        </Text>
                                        <Text
                                            type="secondary"
                                            style={{ fontSize: 11 }}
                                        >
                                            {patient?.mrn}
                                        </Text>
                                    </Space>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Sider>

                <Content
                    style={{
                        padding: 24,
                        background: "#fff",
                        overflow: "auto",
                    }}
                >
                    <Space
                        direction="vertical"
                        style={{ width: "100%" }}
                        size="large"
                    >
                        <Card
                            title="Document Timeline"
                            style={{ marginBottom: 16 }}
                        >
                            <div style={{ paddingLeft: 8 }}>
                                <Timeline
                                    items={patientDocs.slice(0, 8).map(doc => ({
                                        color:
                                            doc.type === "Pathology"
                                                ? "purple"
                                                : doc.type === "Radiology"
                                                ? "green"
                                                : doc.type === "Lab Results"
                                                ? "orange"
                                                : doc.type === "Treatment"
                                                ? "red"
                                                : "blue",
                                        children: (
                                            <div style={{ paddingBottom: 4 }}>
                                                <Space
                                                    size="large"
                                                    style={{ width: "100%" }}
                                                    wrap
                                                >
                                                    <Text strong>
                                                        {doc.date}
                                                    </Text>
                                                    <Text style={{ flex: 1 }}>
                                                        {doc.title}
                                                    </Text>
                                                    <Tag
                                                        color={
                                                            doc.type ===
                                                            "Pathology"
                                                                ? "purple"
                                                                : doc.type ===
                                                                  "Radiology"
                                                                ? "green"
                                                                : doc.type ===
                                                                  "Lab Results"
                                                                ? "orange"
                                                                : doc.type ===
                                                                  "Treatment"
                                                                ? "red"
                                                                : "blue"
                                                        }
                                                    >
                                                        {doc.type}
                                                    </Tag>
                                                </Space>
                                            </div>
                                        ),
                                    }))}
                                />
                            </div>
                        </Card>

                        <Card>
                            <Space wrap style={{ marginBottom: 16 }}>
                                {[
                                    "All Documents",
                                    "Pathology",
                                    "Clinical Notes",
                                    "Radiology",
                                    "Lab Results",
                                    "Treatment",
                                ].map(type => (
                                    <Badge
                                        count={docTypeCount(type)}
                                        key={type}
                                    >
                                        <Button
                                            type={
                                                selectedFilter === type
                                                    ? "primary"
                                                    : "default"
                                            }
                                            onClick={() =>
                                                setSelectedFilter(type)
                                            }
                                        >
                                            {type}
                                        </Button>
                                    </Badge>
                                ))}
                            </Space>

                            <List
                                grid={{
                                    gutter: 16,
                                    xs: 1,
                                    sm: 2,
                                    md: 2,
                                    lg: 3,
                                }}
                                dataSource={filteredDocs}
                                renderItem={doc => (
                                    <List.Item>
                                        <Card
                                            hoverable
                                            onClick={() => {
                                                dispatch(
                                                    setSelectedDocument(doc.id)
                                                );
                                                setDrawerOpen(true);
                                            }}
                                        >
                                            <Space
                                                direction="vertical"
                                                style={{ width: "100%" }}
                                            >
                                                <Space>
                                                    {getDocumentIcon(doc.type)}
                                                    <div>
                                                        <Text strong>
                                                            {doc.title}
                                                        </Text>
                                                        <br />
                                                        <Text
                                                            type="secondary"
                                                            style={{
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            {doc.date}
                                                        </Text>
                                                    </div>
                                                </Space>
                                                <div>
                                                    <Text
                                                        type="secondary"
                                                        style={{ fontSize: 12 }}
                                                    >
                                                        {doc.provider}
                                                    </Text>
                                                </div>
                                                <Tag
                                                    color={getFormatColor(
                                                        doc.format
                                                    )}
                                                >
                                                    {doc.format}
                                                </Tag>
                                            </Space>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </Card>

                        <Card
                            style={{
                                position: "fixed",
                                bottom: 0,
                                left: 250,
                                right: 0,
                                zIndex: 100,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Button
                                    icon={<LeftOutlined />}
                                    onClick={handlePrevious}
                                    disabled={!canGoPrevious}
                                >
                                    Previous Patient
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={() =>
                                        navigate("/ontology-selection")
                                    }
                                >
                                    Proceed to Ontology Selection
                                </Button>
                                <Button
                                    icon={<RightOutlined />}
                                    iconPosition="end"
                                    onClick={handleNext}
                                    disabled={!canGoNext}
                                >
                                    Next Patient
                                </Button>
                            </div>
                        </Card>
                    </Space>
                </Content>
            </Layout>

            <Drawer
                title="Document Viewer"
                placement="right"
                width={900}
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                styles={{ body: { overflow: "auto" } }}
            >
                {selectedDocumentId &&
                    (() => {
                        const doc = patientDocs.find(
                            d => d.id === selectedDocumentId
                        );
                        const isPDF = doc?.format === "PDF";

                        return (
                            <Space
                                direction="vertical"
                                style={{ width: "100%" }}
                                size="large"
                            >
                                <div>
                                    <Title level={4}>{doc?.title}</Title>
                                    <Space size="large">
                                        <Text>
                                            <Text strong>Date:</Text>{" "}
                                            {doc?.date}
                                        </Text>
                                        <Text>
                                            <Text strong>Provider:</Text>{" "}
                                            {doc?.provider}
                                        </Text>
                                        <Tag
                                            color={getFormatColor(
                                                doc?.format || "Text"
                                            )}
                                        >
                                            {doc?.format}
                                        </Tag>
                                        <Tag>{doc?.type}</Tag>
                                    </Space>
                                </div>

                                {isPDF ? (
                                    // PDF-style viewer
                                    <div
                                        style={{
                                            background: "#525659",
                                            padding: "24px",
                                            borderRadius: "4px",
                                            maxHeight: "calc(100vh - 250px)",
                                            overflow: "auto",
                                        }}
                                    >
                                        <div
                                            style={{
                                                background: "#ffffff",
                                                boxShadow:
                                                    "0 4px 12px rgba(0, 0, 0, 0.3)",
                                                padding: "60px 80px",
                                                minHeight: "1000px",
                                                position: "relative",
                                            }}
                                        >
                                            {/* PDF Header */}
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "20px",
                                                    right: "80px",
                                                    fontSize: "10px",
                                                    color: "#8c8c8c",
                                                }}
                                            >
                                                Page 1 of 1
                                            </div>

                                            {/* PDF Content */}
                                            <pre
                                                style={{
                                                    fontFamily:
                                                        "Times New Roman, serif",
                                                    fontSize: "12px",
                                                    lineHeight: "1.5",
                                                    whiteSpace: "pre-wrap",
                                                    wordWrap: "break-word",
                                                    margin: 0,
                                                    color: "#000000",
                                                }}
                                            >
                                                {doc?.content}
                                            </pre>

                                            {/* PDF Footer */}
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    bottom: "20px",
                                                    left: "80px",
                                                    right: "80px",
                                                    fontSize: "9px",
                                                    color: "#8c8c8c",
                                                    borderTop:
                                                        "1px solid #d9d9d9",
                                                    paddingTop: "8px",
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <span>
                                                    Confidential Medical Record
                                                </span>
                                                <span>{doc?.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Text document viewer
                                    <Card
                                        style={{
                                            background: "#ffffff",
                                            border: "1px solid #d9d9d9",
                                            maxHeight: "calc(100vh - 250px)",
                                            overflow: "auto",
                                        }}
                                    >
                                        <pre
                                            style={{
                                                fontFamily:
                                                    "Courier New, monospace",
                                                fontSize: "13px",
                                                lineHeight: "1.6",
                                                whiteSpace: "pre-wrap",
                                                wordWrap: "break-word",
                                                margin: 0,
                                                color: "#262626",
                                            }}
                                        >
                                            {doc?.content}
                                        </pre>
                                    </Card>
                                )}
                            </Space>
                        );
                    })()}
            </Drawer>
        </Layout>
    );
};

export default DocumentBrowsingPage;
