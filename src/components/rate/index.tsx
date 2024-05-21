import React, { useState } from "react";
import { Typography, Rate as AntdRate, Table, Row, Button } from "antd";

const { Text } = Typography;
const { Column } = Table;

interface DataSourceItem {
  description: string;
  rating: number;
}

const Rate: React.FC = () => {
  const [dataSource, setDataSource] = useState([
    { description: 'Schedule content across multiple platforms.', rating: 0 },
    { description: 'Monitor progress towards goals.', rating: 0 },
    { description: 'Evaluate and set performance benchmarks.', rating: 0 },
    { description: 'Get suggestions for engaging content ideas.', rating: 0 },
    { description: 'Search and discover potential influencers.', rating: 0 },
    { description: 'Connect with influencers for collaborations.', rating: 0 },
    { description: 'Target specific audience for ads.', rating: 0 },
    { description: 'Analyze competitors\' social media presence.', rating: 0 },
    { description: 'Understand sentiment of social media feedback.', rating: 0 },
    { description: 'Gain insights into social media audience.', rating: 0 },
    { description: 'Get quick help and answers via chatbot.', rating: 0 },
  ]);

  const handleRatingChange = (index: number, rating: number) => {
    const updatedDataSource = [...dataSource];
    updatedDataSource[index].rating = rating;
    setDataSource(updatedDataSource);
  };

  const handleSubmit = () => {
    console.log('Submitted ratings:', dataSource);
  };

  return (
    <>
      <Text style={{ fontSize: '1rem', fontWeight: '500' , textAlign: 'center'}}>
        Rate Product Features
      </Text>
      <Table style={{ marginTop: '2rem' }} dataSource={dataSource} pagination={false} bordered>
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Rating (1-5)"
          dataIndex="rating"
          key="rating"
          render={(text, record: DataSourceItem, index) => (
            <AntdRate allowHalf defaultValue={record.rating} onChange={(value) => handleRatingChange(index, value)} />
          )}
        />
      </Table>
      <Row style={{ marginTop: '1rem' }}>
        <Button type="primary" onClick={handleSubmit}>Submit</Button>
      </Row>
    </>
  );
};

export default Rate;
