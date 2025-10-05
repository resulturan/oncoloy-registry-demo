import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout,
  Card,
  Progress,
  Steps,
  List,
  Tag,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Radio,
  Switch,
  Slider,
  DatePicker,
  message,
  Badge,
} from 'antd';
import {
  CheckCircleOutlined,
  LoadingOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  startProcessing,
  setOverallProgress,
  setPatientProgress,
  addLog,
  completeProcessing,
  setTimelineRange,
} from '../../store/slices/processingSlice';
import { setPatientResult, setCurrentValidationPatient } from '../../store/slices/validationSlice';
import { sampleMCODEResult } from '../../data/sampleResults';
import type { LogEntry, PatientProcessingProgress } from '../../types';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const ProcessingPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedPatientIds, patients } = useAppSelector((state) => state.cohort);
  const { status, overallProgress, patientProgress, logs, timelineRange } = useAppSelector(
    (state) => state.processing
  );

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (status === 'idle') {
      setTimeout(() => {
        dispatch(startProcessing());
        simulateProcessing();
      }, 1000);
    }
  }, []);

  const simulateProcessing = async () => {
    const totalPatients = Math.min(selectedPatientIds.length, 5);
    const categories = [
      'Patient',
      'Primary Cancer',
      'TNM Staging',
      'Histology',
      'Biomarkers',
      'Treatment',
      'Outcome',
    ];

    // Initialize patient progress
    for (let i = 0; i < totalPatients; i++) {
      const patientId = selectedPatientIds[i];
      dispatch(
        setPatientProgress({
          patientId,
          progress: {
            patientId,
            progress: 0,
            status: 'Initializing...',
            categoryProgress: {},
            complete: false,
            hasWarnings: false,
            hasErrors: false,
          },
        })
      );
    }

    // Simulate processing steps
    for (let step = 0; step < 4; step++) {
      setCurrentStep(step);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    // Process each patient
    for (let i = 0; i < totalPatients; i++) {
      const patientId = selectedPatientIds[i];
      const patient = patients.find((p) => p.id === patientId);

      dispatch(
        addLog({
          timestamp: new Date().toISOString(),
          severity: 'INFO',
          message: `Starting extraction for patient ${patient?.mrn}`,
          patientId,
        })
      );

      // Process each category
      for (let j = 0; j < categories.length; j++) {
        const category = categories[j];
        const progress = Math.round(((j + 1) / categories.length) * 100);

        dispatch(
          setPatientProgress({
            patientId,
            progress: {
              patientId,
              progress,
              status: `Extracting ${category}...`,
              categoryProgress: {
                ...Object.fromEntries(categories.slice(0, j + 1).map((c) => [c, 100])),
              },
              complete: false,
              hasWarnings: j === 3,
              hasErrors: false,
            },
          })
        );

        // Add log entries
        await new Promise((resolve) => setTimeout(resolve, 400));

        if (j === 0) {
          dispatch(
            addLog({
              timestamp: new Date().toISOString(),
              severity: 'SUCCESS',
              message: `✓ Extracted patientIdentifier: ${patient?.mrn} (99% confidence)`,
              patientId,
            })
          );
        } else if (j === 2) {
          dispatch(
            addLog({
              timestamp: new Date().toISOString(),
              severity: 'SUCCESS',
              message: `✓ Found T_category: cT2b (98% confidence)`,
              patientId,
            })
          );
        } else if (j === 3) {
          dispatch(
            addLog({
              timestamp: new Date().toISOString(),
              severity: 'WARNING',
              message: `⚠ N_category not explicit, inferring from clinical notes`,
              patientId,
            })
          );
        } else if (j === 4) {
          dispatch(
            addLog({
              timestamp: new Date().toISOString(),
              severity: 'SUCCESS',
              message: `✓ Extracted biomarkerTests: 4 tests found`,
              patientId,
            })
          );
        }

        const overall = Math.round(((i * categories.length + j + 1) / (totalPatients * categories.length)) * 100);
        dispatch(setOverallProgress(overall));
      }

      // Mark patient complete
      dispatch(
        setPatientProgress({
          patientId,
          progress: {
            patientId,
            progress: 100,
            status: 'Complete',
            categoryProgress: Object.fromEntries(categories.map((c) => [c, 100])),
            complete: true,
            hasWarnings: true,
            hasErrors: false,
          },
        })
      );

      dispatch(
        addLog({
          timestamp: new Date().toISOString(),
          severity: 'INFO',
          message: `Processing complete for ${patient?.mrn}`,
          patientId,
        })
      );

      // Store results for validation page
      dispatch(setPatientResult({ patientId, result: sampleMCODEResult }));
    }

    // Complete processing
    dispatch(completeProcessing());
    dispatch(setCurrentValidationPatient(selectedPatientIds[0]));

    message.success('Processing completed successfully!');
    setTimeout(() => {
      navigate(`/review/${selectedPatientIds[0]}`);
    }, 1500);
  };

  const getPatientStatusIcon = (progress: PatientProcessingProgress) => {
    if (progress.complete) {
      if (progress.hasErrors) return <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: 24 }} />;
      if (progress.hasWarnings)
        return <WarningOutlined style={{ color: '#faad14', fontSize: 24 }} />;
      return <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24 }} />;
    }
    return <LoadingOutlined style={{ color: '#1890ff', fontSize: 24 }} />;
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <Header style={{ background: '#fff', padding: '16px 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ margin: 0 }}>
          Processing {Math.min(selectedPatientIds.length, 5)} patients...
        </Title>
      </Header>

      <Content style={{ padding: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Card>
            <Steps
              current={currentStep}
              items={[
                { title: 'Initialize', icon: currentStep > 0 ? <CheckCircleOutlined /> : undefined },
                { title: 'Extract', icon: currentStep > 1 ? <CheckCircleOutlined /> : undefined },
                { title: 'Validate', icon: currentStep > 2 ? <CheckCircleOutlined /> : undefined },
                { title: 'Complete', icon: currentStep > 3 ? <CheckCircleOutlined /> : undefined },
              ]}
            />
          </Card>

          <Card title="Overall Progress">
            <Progress
              percent={overallProgress}
              status={status === 'completed' ? 'success' : 'active'}
              strokeColor={{ from: '#108ee9', to: '#87d068' }}
            />
            <Text type="secondary">
              {status === 'completed'
                ? 'Processing completed'
                : `Estimated time remaining: ${Math.ceil((100 - overallProgress) / 10)} seconds`}
            </Text>
          </Card>

          <Card title="Patient Progress">
            <Row gutter={[16, 16]}>
              {Object.entries(patientProgress).map(([patientId, progress]) => {
                const patient = patients.find((p) => p.id === patientId);
                return (
                  <Col span={8} key={patientId}>
                    <Card size="small">
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div>
                            <Text strong>{patient?.name}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {patient?.mrn}
                            </Text>
                          </div>
                          {getPatientStatusIcon(progress)}
                        </div>
                        <Progress
                          type="circle"
                          percent={progress.progress}
                          size={80}
                          status={progress.complete ? 'success' : 'active'}
                        />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {progress.status}
                        </Text>
                      </Space>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card>

          <Card title="Extraction Log" extra={<Badge count={logs.length} />}>
            <List
              size="small"
              dataSource={logs.slice().reverse().slice(0, 20)}
              renderItem={(log: LogEntry) => (
                <List.Item>
                  <Space>
                    <Tag
                      color={
                        log.severity === 'SUCCESS'
                          ? 'green'
                          : log.severity === 'WARNING'
                            ? 'orange'
                            : log.severity === 'ERROR'
                              ? 'red'
                              : 'blue'
                      }
                    >
                      {log.severity}
                    </Tag>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </Text>
                    <Text>{log.message}</Text>
                  </Space>
                </List.Item>
              )}
              style={{ maxHeight: 300, overflow: 'auto' }}
            />
          </Card>
        </Space>
      </Content>
    </Layout>
  );
};

export default ProcessingPage;
