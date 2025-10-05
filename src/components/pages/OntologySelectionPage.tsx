import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout,
  Card,
  Tree,
  Button,
  Space,
  Typography,
  Breadcrumb,
  Tag,
  Descriptions,
  Progress,
  Input,
  Badge,
  Collapse,
} from 'antd';
import {
  CheckOutlined,
  StarOutlined,
  InfoCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  toggleElement,
  selectAllMandatory,
  setSelectedElementDetails,
} from '../../store/slices/ontologySlice';
import type { MCODEElement } from '../../types';

const { Header, Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const OntologySelectionPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedElements, mcodeTemplate, selectedElementDetails } = useAppSelector(
    (state) => state.ontology
  );

  const [searchTerm, setSearchTerm] = useState('');

  const buildTreeData = () => {
    if (!mcodeTemplate) return [];

    return Object.entries(mcodeTemplate).map(([category, elements]) => {
      const categoryKey = category.replace(/\s+/g, '_');
      const selectedCount = elements.filter((e) => selectedElements.includes(e.element_name)).length;

      return {
        title: (
          <Space>
            <Text strong>{category}</Text>
            <Badge count={`${selectedCount}/${elements.length}`} style={{ backgroundColor: '#52c41a' }} />
          </Space>
        ),
        key: categoryKey,
        children: elements.map((element) => ({
          title: (
            <Space>
              <Text>{element.element_name}</Text>
              {element.mandatory && <Tag color="red">*</Tag>}
              {element.infer_allowed && <Tag color="purple">inferrable</Tag>}
            </Space>
          ),
          key: element.element_name,
          checkable: true,
        })),
      };
    });
  };

  const getElementDetails = (elementName: string): MCODEElement | null => {
    if (!mcodeTemplate) return null;
    for (const elements of Object.values(mcodeTemplate)) {
      const element = elements.find((e) => e.element_name === elementName);
      if (element) return element;
    }
    return null;
  };

  const selectedElement = selectedElementDetails ? getElementDetails(selectedElementDetails) : null;

  const mandatoryCount = mcodeTemplate
    ? Object.values(mcodeTemplate).reduce(
        (acc, elements) => acc + elements.filter((e) => e.mandatory).length,
        0
      )
    : 0;

  const selectedMandatoryCount = mcodeTemplate
    ? Object.values(mcodeTemplate).reduce(
        (acc, elements) =>
          acc + elements.filter((e) => e.mandatory && selectedElements.includes(e.element_name)).length,
        0
      )
    : 0;

  const optionalCount = selectedElements.length - selectedMandatoryCount;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Breadcrumb
          items={[
            { title: 'Cohort Selection', onClick: () => navigate('/cohort-selection') },
            { title: 'Document Browsing' },
            { title: 'Ontology Selection' },
          ]}
          style={{ padding: '20px 0' }}
        />
      </Header>

      <Content style={{ padding: 24, background: '#f0f0f0' }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Card>
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Title level={3} style={{ margin: 0 }}>
                    <CheckOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    mCODE (Recommended)
                  </Title>
                  <Text type="secondary">Minimal Common Oncology Data Elements v3.0</Text>
                </div>
                <Tag color="green" style={{ fontSize: 16, padding: '8px 16px' }}>
                  Selected
                </Tag>
              </div>
              <Paragraph>
                mCODE is a standardized oncology data model designed for cancer registry reporting,
                clinical trials, and research. It includes comprehensive elements for patient
                demographics, diagnoses, staging, treatments, and outcomes.
              </Paragraph>
            </Space>
          </Card>

          <Card>
            <Layout style={{ background: '#fff' }}>
              <Sider width="40%" style={{ background: '#fafafa', padding: 16 }}>
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Title level={5}>mCODE Element Tree</Title>

                  <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search elements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <Button
                    type="primary"
                    block
                    onClick={() => dispatch(selectAllMandatory())}
                  >
                    Select All Mandatory
                  </Button>

                  <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={selectedElements}
                    treeData={buildTreeData()}
                    onCheck={(checkedKeys) => {
                      const keys = checkedKeys as string[];
                      keys.forEach((key) => {
                        if (!key.includes('_') && !selectedElements.includes(key)) {
                          dispatch(toggleElement(key));
                        }
                      });
                    }}
                    onSelect={(keys) => {
                      if (keys.length > 0 && !keys[0].toString().includes('_')) {
                        dispatch(setSelectedElementDetails(keys[0] as string));
                      }
                    }}
                    style={{ background: '#fff', padding: 16, borderRadius: 4 }}
                  />
                </Space>
              </Sider>

              <Content style={{ padding: 24 }}>
                {selectedElement ? (
                  <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <div>
                      <Title level={3}>{selectedElement.element_name}</Title>
                      <Space>
                        <Tag color="blue">{selectedElement.data_type}</Tag>
                        {selectedElement.mandatory && <Tag color="red">Mandatory</Tag>}
                        {selectedElement.infer_allowed && <Tag color="purple">Inference Allowed</Tag>}
                      </Space>
                    </div>

                    <Card title="Description">
                      <Paragraph>{selectedElement.description}</Paragraph>
                    </Card>

                    <Collapse>
                      <Panel header="Instructions" key="1">
                        <Paragraph>{selectedElement.instructions}</Paragraph>
                      </Panel>
                    </Collapse>

                    <Card title="Example Values">
                      <Space wrap>
                        {selectedElement.example_values.map((val, idx) => (
                          <Tag key={idx} color="cyan">
                            {val}
                          </Tag>
                        ))}
                      </Space>
                    </Card>

                    <Card>
                      <Progress
                        percent={94}
                        strokeColor="#52c41a"
                        status="success"
                      />
                      <Text type="secondary">
                        This element has a 94% extraction success rate based on historical data
                      </Text>
                    </Card>

                    <Descriptions title="Reference" bordered size="small">
                      <Descriptions.Item label="Guideline">
                        {selectedElement.reference_guideline}
                      </Descriptions.Item>
                    </Descriptions>
                  </Space>
                ) : (
                  <div style={{ textAlign: 'center', padding: 60 }}>
                    <InfoCircleOutlined style={{ fontSize: 48, color: '#bfbfbf' }} />
                    <Paragraph type="secondary" style={{ marginTop: 16 }}>
                      Select an element from the tree to view details
                    </Paragraph>
                  </div>
                )}
              </Content>
            </Layout>
          </Card>

          <Card title="Reference Guidelines">
            <Space wrap>
              <Tag color="blue">AJCC Staging Manual (8th Edition)</Tag>
              <Tag color="green">SEER Coding Guidelines</Tag>
              <Tag color="purple">mCODE Implementation Guide</Tag>
              <Tag color="orange">ICD-O-3 Morphology Codes</Tag>
            </Space>
          </Card>

          <Card style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Space size="large">
                <Text strong>
                  {selectedMandatoryCount}/{mandatoryCount} mandatory elements selected
                </Text>
                <Text type="secondary">{optionalCount} optional elements selected</Text>
              </Space>
              <Space>
                <Button onClick={() => navigate('/documents/P10001')}>Back</Button>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate('/processing')}
                  disabled={selectedMandatoryCount < mandatoryCount}
                >
                  Proceed to Processing
                </Button>
              </Space>
            </div>
          </Card>
        </Space>
      </Content>
    </Layout>
  );
};

export default OntologySelectionPage;
