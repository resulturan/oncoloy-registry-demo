import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout,
  Table,
  Button,
  Checkbox,
  Badge,
  Space,
  Avatar,
  Typography,
  Card,
  Input,
  DatePicker,
  Select,
  Slider,
  Collapse,
  message,
} from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  FilterOutlined,
  ExportOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  togglePatientSelection,
  selectAllPatients,
  deselectAllPatients,
  setCurrentPage,
} from '../../store/slices/cohortSlice';
import type { Patient } from '../../types';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const CohortSelectionPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { patients, selectedPatientIds, currentPage, pageSize } = useAppSelector(
    (state) => state.cohort
  );

  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    cancerTypes: [] as string[],
    facility: '',
    gender: [] as string[],
    ageRange: [0, 100] as [number, number],
  });

  const columns = [
    {
      title: '',
      key: 'selection',
      width: 50,
      render: (_: any, record: Patient) => (
        <Checkbox
          checked={selectedPatientIds.includes(record.id)}
          onChange={() => dispatch(togglePatientSelection(record.id))}
        />
      ),
    },
    {
      title: 'Patient ID/MRN',
      dataIndex: 'mrn',
      key: 'mrn',
      sorter: (a: Patient, b: Patient) => a.mrn.localeCompare(b.mrn),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Patient, b: Patient) => a.name.localeCompare(b.name),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a: Patient, b: Patient) => a.age - b.age,
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: 'Primary Diagnosis',
      dataIndex: 'primaryDiagnosis',
      key: 'primaryDiagnosis',
      ellipsis: true,
    },
    {
      title: 'Diagnosis Date',
      dataIndex: 'diagnosisDate',
      key: 'diagnosisDate',
      sorter: (a: Patient, b: Patient) => a.diagnosisDate.localeCompare(b.diagnosisDate),
    },
    {
      title: 'Documents',
      dataIndex: 'documentCount',
      key: 'documentCount',
      render: (count: number) => <Badge count={count} showZero color="#1890ff" />,
      sorter: (a: Patient, b: Patient) => a.documentCount - b.documentCount,
    },
    {
      title: 'Last Update',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      sorter: (a: Patient, b: Patient) => a.lastUpdate.localeCompare(b.lastUpdate),
    },
  ];

  const handleProcessSelected = () => {
    if (selectedPatientIds.length === 0) {
      message.warning('Please select at least one patient');
      return;
    }
    navigate(`/documents/${selectedPatientIds[0]}`);
  };

  const handleSelectAll = (e: any) => {
    if (e.target.checked) {
      dispatch(selectAllPatients());
    } else {
      dispatch(deselectAllPatients());
    }
  };

  const filteredPatients = patients.filter((patient) => {
    if (filters.cancerTypes.length > 0) {
      const hasMatchingType = filters.cancerTypes.some((type) =>
        patient.primaryDiagnosis.toLowerCase().includes(type.toLowerCase())
      );
      if (!hasMatchingType) return false;
    }
    if (filters.facility && patient.facility !== filters.facility) return false;
    if (filters.gender.length > 0 && !filters.gender.includes(patient.sex)) return false;
    if (patient.age < filters.ageRange[0] || patient.age > filters.ageRange[1]) return false;
    return true;
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Oncology Registry Automation
        </Title>
        <Space>
          <Avatar icon={<UserOutlined />} />
          <SettingOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
        </Space>
      </Header>

      <Layout>
        <Sider
          width={300}
          theme="light"
          collapsible
          collapsed={filterCollapsed}
          onCollapse={setFilterCollapsed}
          style={{ background: '#fafafa', padding: filterCollapsed ? 0 : 16 }}
        >
          {!filterCollapsed && (
            <Card title={<><FilterOutlined /> Filters</>} bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Text strong>Diagnosis Date Range</Text>
                  <RangePicker style={{ width: '100%', marginTop: 8 }} />
                </div>

                <div>
                  <Text strong>Cancer Types</Text>
                  <Select
                    mode="multiple"
                    placeholder="Select cancer types"
                    style={{ width: '100%', marginTop: 8 }}
                    value={filters.cancerTypes}
                    onChange={(value) => setFilters({ ...filters, cancerTypes: value })}
                    options={[
                      { label: 'Lung', value: 'Lung' },
                      { label: 'Breast', value: 'Breast' },
                      { label: 'Colon', value: 'Colon' },
                      { label: 'Prostate', value: 'Prostate' },
                      { label: 'Melanoma', value: 'Melanoma' },
                    ]}
                  />
                </div>

                <div>
                  <Text strong>Facility</Text>
                  <Select
                    placeholder="Select facility"
                    style={{ width: '100%', marginTop: 8 }}
                    value={filters.facility}
                    onChange={(value) => setFilters({ ...filters, facility: value })}
                    allowClear
                    options={[
                      { label: 'Memorial Hospital', value: 'Memorial Hospital' },
                      { label: 'City Medical Center', value: 'City Medical Center' },
                      { label: 'Regional Cancer Institute', value: 'Regional Cancer Institute' },
                    ]}
                  />
                </div>

                <div>
                  <Text strong>Age Range</Text>
                  <Slider
                    range
                    min={0}
                    max={100}
                    value={filters.ageRange}
                    onChange={(value) => setFilters({ ...filters, ageRange: value as [number, number] })}
                    style={{ marginTop: 16 }}
                  />
                  <Text type="secondary">
                    {filters.ageRange[0]} - {filters.ageRange[1]} years
                  </Text>
                </div>

                <div>
                  <Text strong>Gender</Text>
                  <Checkbox.Group
                    style={{ width: '100%', marginTop: 8 }}
                    value={filters.gender}
                    onChange={(value) => setFilters({ ...filters, gender: value as string[] })}
                  >
                    <Space direction="vertical">
                      <Checkbox value="Male">Male</Checkbox>
                      <Checkbox value="Female">Female</Checkbox>
                    </Space>
                  </Checkbox.Group>
                </div>

                <Space style={{ width: '100%', marginTop: 16 }}>
                  <Button type="primary" block>
                    Apply Filters
                  </Button>
                  <Button
                    onClick={() =>
                      setFilters({
                        cancerTypes: [],
                        facility: '',
                        gender: [],
                        ageRange: [0, 100],
                      })
                    }
                  >
                    Reset
                  </Button>
                </Space>
              </Space>
            </Card>
          )}
        </Sider>

        <Content style={{ padding: 24, background: '#fff' }}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div>
              <Text type="secondary" style={{ fontSize: 16 }}>
                Showing {filteredPatients.length} patients matching criteria
              </Text>
            </div>

            <Table
              columns={columns}
              dataSource={filteredPatients}
              rowKey="id"
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: filteredPatients.length,
                onChange: (page) => dispatch(setCurrentPage(page)),
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} patients`,
              }}
              title={() => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Checkbox
                    indeterminate={
                      selectedPatientIds.length > 0 &&
                      selectedPatientIds.length < filteredPatients.length
                    }
                    checked={
                      selectedPatientIds.length === filteredPatients.length &&
                      filteredPatients.length > 0
                    }
                    onChange={handleSelectAll}
                  >
                    Select All
                  </Checkbox>
                  <Input.Search
                    placeholder="Search patients..."
                    style={{ width: 300 }}
                    allowClear
                  />
                </div>
              )}
            />

            <Card style={{ position: 'fixed', bottom: 0, left: 300, right: 0, zIndex: 100 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text strong>{selectedPatientIds.length} patients selected</Text>
                <Space>
                  <Button icon={<SaveOutlined />}>Save Cohort</Button>
                  <Button icon={<ExportOutlined />}>Export</Button>
                  <Button type="primary" size="large" onClick={handleProcessSelected}>
                    Process Selected
                  </Button>
                </Space>
              </div>
            </Card>
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CohortSelectionPage;
