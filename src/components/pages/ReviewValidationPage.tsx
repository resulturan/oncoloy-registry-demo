import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Card,
  Tabs,
  Button,
  Space,
  Typography,
  Progress,
  Tag,
  Drawer,
  List,
  Descriptions,
  Badge,
  Statistic,
  Row,
  Col,
  Select,
  Input,
  message,
  Modal,
} from 'antd';
import {
  CheckCircleOutlined,
  WarningOutlined,
  EditOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  LeftOutlined,
  RightOutlined,
  ExportOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setActiveTab,
  setProvenanceOpen,
  setSelectedElementForProvenance,
  updateElementStatus,
} from '../../store/slices/validationSlice';
import type { ExtractedValue, BiomarkerTest } from '../../types';

const { Header, Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ReviewValidationPage = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { patients, selectedPatientIds } = useAppSelector((state) => state.cohort);
  const { results, activeTab, provenanceOpen, selectedElementForProvenance } = useAppSelector(
    (state) => state.validation
  );

  const [exportModalOpen, setExportModalOpen] = useState(false);

  const currentPatient = patients.find((p) => p.id === patientId);
  const result = results[patientId || ''];

  const getElementCard = (
    elementName: string,
    elementData: ExtractedValue,
    category: string
  ) => {
    const statusColor =
      elementData.status === 'confirmed'
        ? '#52c41a'
        : elementData.status === 'needs_review'
          ? '#faad14'
          : '#ff4d4f';

    const statusIcon =
      elementData.status === 'confirmed' ? (
        <CheckCircleOutlined />
      ) : elementData.status === 'needs_review' ? (
        <WarningOutlined />
      ) : (
        <CloseCircleOutlined />
      );

    return (
      <Card
        key={elementName}
        style={{
          marginBottom: 16,
          borderLeft: `4px solid ${statusColor}`,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <Title level={5} style={{ margin: 0 }}>
                {elementName}
              </Title>
              <Tag color={statusColor}>
                {statusIcon} {elementData.status.toUpperCase()}
              </Tag>
              {elementData.inferred && <Tag color="purple">INFERRED</Tag>}
            </Space>
          </div>

          <Card type="inner" size="small" title="Extracted Value">
            <Text strong style={{ fontSize: 16 }}>
              {typeof elementData.value === 'boolean'
                ? elementData.value
                  ? 'True'
                  : 'False'
                : elementData.value}
            </Text>
          </Card>

          {elementData.alternatives && elementData.alternatives.length > 0 && (
            <div>
              <Text type="secondary">Alternative Values:</Text>
              <List
                size="small"
                dataSource={elementData.alternatives}
                renderItem={(alt) => (
                  <List.Item>
                    <Space>
                      <Text>{alt.value}</Text>
                      <Tag>{(alt.confidence * 100).toFixed(0)}% confidence</Tag>
                    </Space>
                  </List.Item>
                )}
              />
            </div>
          )}

          {elementData.reasoning && (
            <Card type="inner" size="small" title="Normalization / Details">
              <Paragraph>{elementData.reasoning}</Paragraph>
            </Card>
          )}

          <div>
            <Text type="secondary">Confidence:</Text>
            <Progress
              percent={Math.round(elementData.confidence * 100)}
              strokeColor={elementData.confidence > 0.9 ? '#52c41a' : '#faad14'}
              size="small"
            />
          </div>

          <Space>
            <Button
              type={elementData.status === 'confirmed' ? 'primary' : 'default'}
              icon={<CheckOutlined />}
              onClick={() => {
                dispatch(
                  updateElementStatus({
                    patientId: patientId || '',
                    category,
                    element: elementName,
                    status: 'confirmed',
                  })
                );
                message.success('Element confirmed');
              }}
            >
              Confirm
            </Button>
            <Button icon={<EditOutlined />}>Edit</Button>
            <Button
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => {
                dispatch(
                  updateElementStatus({
                    patientId: patientId || '',
                    category,
                    element: elementName,
                    status: 'rejected',
                  })
                );
                message.warning('Element rejected');
              }}
            >
              Reject
            </Button>
            <Button
              icon={<FileTextOutlined />}
              onClick={() => {
                dispatch(setSelectedElementForProvenance(elementName));
                dispatch(setProvenanceOpen(true));
              }}
            >
              View Source
            </Button>
          </Space>
        </Space>
      </Card>
    );
  };

  const getBiomarkerCard = (biomarker: BiomarkerTest, index: number, category: string) => {
    return (
      <Card
        key={index}
        size="small"
        style={{
          marginBottom: 12,
          borderLeft: `4px solid ${biomarker.status === 'confirmed' ? '#52c41a' : '#faad14'}`,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text strong>{biomarker.marker}</Text>
            <Tag color={biomarker.status === 'confirmed' ? 'green' : 'orange'}>
              {(biomarker.confidence * 100).toFixed(0)}% confidence
            </Tag>
          </div>
          <Descriptions size="small" column={1}>
            <Descriptions.Item label="Result">{biomarker.result}</Descriptions.Item>
            <Descriptions.Item label="Normalized">{biomarker.normalizedValue}</Descriptions.Item>
            {biomarker.interpretation && (
              <Descriptions.Item label="Interpretation">{biomarker.interpretation}</Descriptions.Item>
            )}
          </Descriptions>
          <Space>
            <Button size="small" type="primary" icon={<CheckOutlined />}>
              Confirm
            </Button>
            <Button size="small" icon={<EditOutlined />}>
              Edit
            </Button>
            <Button size="small" danger icon={<CloseCircleOutlined />}>
              Remove
            </Button>
          </Space>
        </Space>
      </Card>
    );
  };

  const renderTabContent = (category: string) => {
    if (!result) return <Text>No data available</Text>;

    const categoryData = (result as any)[category];
    if (!categoryData) return <Text>No data available</Text>;

    if (category === 'Tumor Markers' && categoryData.biomarkerTests) {
      return (
        <div>
          <Title level={5}>{categoryData.biomarkerTests.length} biomarker tests extracted:</Title>
          {categoryData.biomarkerTests.map((bio: BiomarkerTest, idx: number) =>
            getBiomarkerCard(bio, idx, category)
          )}
          <Button type="dashed" block style={{ marginTop: 16 }}>
            + Add New Biomarker Test
          </Button>
        </div>
      );
    }

    return Object.entries(categoryData).map(([key, value]: [string, any]) => {
      if (Array.isArray(value)) {
        return (
          <div key={key}>
            <Title level={5}>{key}</Title>
            {value.map((item, idx) => (
              <Card key={idx} size="small" style={{ marginBottom: 12 }}>
                <Descriptions size="small" column={1}>
                  {Object.entries(item).map(([k, v]: [string, any]) => {
                    if (k !== 'provenance' && k !== 'status' && k !== 'confidence') {
                      return (
                        <Descriptions.Item label={k} key={k}>
                          {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                        </Descriptions.Item>
                      );
                    }
                    return null;
                  })}
                </Descriptions>
              </Card>
            ))}
          </div>
        );
      }
      return getElementCard(key, value as ExtractedValue, category);
    });
  };

  const currentPatientIndex = selectedPatientIds.indexOf(patientId || '');
  const canGoPrevious = currentPatientIndex > 0;
  const canGoNext = currentPatientIndex < selectedPatientIds.length - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      navigate(`/review/${selectedPatientIds[currentPatientIndex - 1]}`);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      navigate(`/review/${selectedPatientIds[currentPatientIndex + 1]}`);
    }
  };

  const calculateStats = () => {
    if (!result) return { mandatory: 0, optional: 0, needsReview: 0 };

    let needsReview = 0;
    Object.values(result).forEach((categoryData: any) => {
      Object.values(categoryData).forEach((elementData: any) => {
        if (Array.isArray(elementData)) {
          elementData.forEach((item: any) => {
            if (item.status === 'needs_review') needsReview++;
          });
        } else if (elementData?.status === 'needs_review') {
          needsReview++;
        }
      });
    });

    return { mandatory: 18, optional: 8, needsReview };
  };

  const stats = calculateStats();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '16px 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ margin: 0 }}>
          Review & Validation - {currentPatient?.name}
        </Title>
      </Header>

      <Layout>
        <Content style={{ padding: 24, background: '#f0f0f0' }}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Row gutter={16}>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Extraction Status"
                    value="Complete"
                    valueStyle={{ color: '#52c41a' }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Mandatory Elements"
                    value={`${stats.mandatory}/18`}
                    valueStyle={{ color: '#52c41a' }}
                    suffix="(100%)"
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Optional Elements"
                    value={`${stats.optional}/12`}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Needs Review"
                    value={stats.needsReview}
                    valueStyle={{ color: stats.needsReview > 0 ? '#faad14' : '#52c41a' }}
                    prefix={stats.needsReview > 0 ? <WarningOutlined /> : <CheckCircleOutlined />}
                  />
                </Card>
              </Col>
            </Row>

            <Card
              extra={
                <Space>
                  <Button icon={<ExportOutlined />} onClick={() => setExportModalOpen(true)}>
                    Export
                  </Button>
                </Space>
              }
            >
              <Tabs
                activeKey={activeTab}
                onChange={(key) => dispatch(setActiveTab(key))}
                type="card"
              >
                {[
                  'Patient',
                  'Primary Cancer Condition',
                  'Secondary Cancer Condition',
                  'TNM and Stage Group',
                  'Histology / Morphology',
                  'Tumor Markers',
                  'Treatment (Procedures, Meds, Radiation)',
                  'Disease Status / Recurrence',
                  'Outcome',
                ].map((category) => (
                  <TabPane tab={category} key={category}>
                    {renderTabContent(category)}
                  </TabPane>
                ))}
              </Tabs>
            </Card>

            <Card style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button icon={<LeftOutlined />} onClick={handlePrevious} disabled={!canGoPrevious}>
                  Previous Patient
                </Button>
                <Space>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      message.success('Data submitted to registry successfully!');
                    }}
                  >
                    Submit to Registry
                  </Button>
                </Space>
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
        title="Source Documents & Provenance"
        placement="right"
        width={700}
        onClose={() => dispatch(setProvenanceOpen(false))}
        open={provenanceOpen}
      >
        {selectedElementForProvenance && result && (
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Title level={4}>{selectedElementForProvenance}</Title>

            <Tabs>
              <TabPane tab="Source Documents" key="1">
                <List
                  dataSource={
                    Object.values(result)
                      .flatMap((cat: any) => Object.values(cat))
                      .find((el: any) => el?.provenance)?. provenance || []
                  }
                  renderItem={(prov: any) => (
                    <List.Item>
                      <Card size="small" style={{ width: '100%' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Text strong>{prov.documentTitle}</Text>
                          <Card type="inner" size="small" style={{ background: '#fffbe6' }}>
                            <Text mark>{prov.highlightedText}</Text>
                          </Card>
                        </Space>
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="Extraction Logic" key="2">
                <Card>
                  <Paragraph>
                    <Title level={5}>How was this value extracted?</Title>
                    <ol>
                      <li>✓ Found relevant document in patient record</li>
                      <li>✓ Located key information using NLP extraction</li>
                      <li>✓ Applied guideline-based normalization rules</li>
                      <li>✓ Verified confidence threshold met</li>
                      <li>✓ Result validated against mCODE specifications</li>
                    </ol>
                  </Paragraph>
                </Card>
              </TabPane>
            </Tabs>
          </Space>
        )}
      </Drawer>

      <Modal
        title="Export Data"
        open={exportModalOpen}
        onCancel={() => setExportModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setExportModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="json"
            onClick={() => {
              message.success('Exported as JSON');
              setExportModalOpen(false);
            }}
          >
            Export JSON
          </Button>,
          <Button
            key="fhir"
            type="primary"
            onClick={() => {
              message.success('Exported as FHIR');
              setExportModalOpen(false);
            }}
          >
            Export FHIR
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text>Select export format:</Text>
          <Select
            style={{ width: '100%' }}
            defaultValue="fhir"
            options={[
              { label: 'FHIR Bundle (JSON)', value: 'fhir' },
              { label: 'mCODE JSON', value: 'json' },
              { label: 'CSV Export', value: 'csv' },
            ]}
          />
        </Space>
      </Modal>
    </Layout>
  );
};

export default ReviewValidationPage;
