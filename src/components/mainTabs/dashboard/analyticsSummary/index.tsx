import { FollowersIcon, HeartIcon, CommentsIcon, ReachIcon } from "@/assets/icons";
import { AnalyticsCard } from 'components';
import { Row, Col, Skeleton, Empty, Card } from "antd";

const AnalyticsSummary: React.FC<IAnalyticsSummaryProps> = ({
  data,
  dataLoading,
}) => {
  return (
    <>
      {dataLoading ? (
        <Row gutter={[16, 16]}>
          {[1, 2, 3, 4].map((_, index) => (
            <Col span={5} key={index}>
              <Skeleton active />
            </Col>
          ))}
        </Row>
      ) : (
        <>
          {data ? (
            <Row gutter={[16, 16]}>
              {[
                {
                  title: "Follows and Unfollows",
                  data: data.follows_and_unfollows,
                  icon: FollowersIcon,
                },
                { title: "Likes", data: data.likes, icon: HeartIcon },
                {
                  title: "Comments",
                  data: data.comments,
                  icon: CommentsIcon,
                },
                { title: "Reach", data: data.reach, icon: ReachIcon },
              ].map((item, index) => (
                <Col span={index == 0 ? 9: 5} key={index}>
                  <AnalyticsCard
                    title={item.title}
                    data={item.data}
                    icon={item.icon}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <Card title="Analytics Summary" bordered>
              <Empty />
            </Card>
          )}
        </>
      )}
    </>
  );
};

export default AnalyticsSummary;
