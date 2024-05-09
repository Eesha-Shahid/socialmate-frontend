import React from "react";
import { Col, Divider, Row, Switch, Typography, Avatar, Space } from "antd";
import Icon, { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { IIntegrationCardProps } from "./types";
import { capitalize, renderDate, renderTime } from "@/utils";
import { Clock, Plus, TrashCan } from "akar-icons";
import { getColor } from "@/colors";

const IntegrationCard:React.FC<IIntegrationCardProps> = ({ icon, platform, data, onToggle, onDelete }) => {

  const borderColor = "linear-gradient(90deg, #5082ED 0%, #9A72CB 27%, #B86DA2 63%, #D96570 100%)" 

  return (
    <div 
      style={{ background: borderColor, borderRadius: '20px', height: 'auto' }}
      className="outer-gradient-border"
    >
      <div 
        style={{ padding: '30px 30px', borderRadius: '18px', height: 'auto' }} 
        className='inner-text'
      >
          <Row gutter={[16, 16]}>
            {/* Left side */}
            <Col span={11}>
              <Space size='small' direction="vertical">
                <Row justify="center" align="middle" gutter={[8, 8]}>
                  <Col span={6}>
                    <Icon component={icon} />
                  </Col>
                  <Col span={13}>
                    <Typography.Text strong style={{ fontWeight: '600', fontSize: '1rem' }}>{capitalize(platform)}</Typography.Text>
                  </Col>
                  <Col span={3}>
                    <Switch checked={data != null} onChange={onToggle} />
                  </Col>
                </Row>
                <Row gutter={[8, 8]}>
                  <Col>
                    <Typography.Text type="secondary">
                      You can enable/disable {capitalize(platform)} social share.
                    </Typography.Text>
                  </Col>
                </Row>
              </Space>
            </Col>
            <Col span={2}>
              <Divider className="integration-divider" style={{ height: '100%' }} type="vertical" />
            </Col>
            {/* Right side */}
            <Col span={11}>
                {data && (
                  <Space size='middle' direction="vertical" style={{ width: '100%' }}>
                    <Row gutter={[8, 8]} align="middle">
                      {/* Avatar */}
                      <Col span={6}>
                        <Avatar size={60} src={data.profile_picture_url} alt="Profile" />
                      </Col>

                      {/* Details */}
                      <Col span={13}>
                        <Row>
                          <Typography.Text strong>{data?.username}</Typography.Text>
                        </Row>
                        <Row>
                          <Typography.Text>{data?.name}</Typography.Text>
                        </Row>
                      </Col>

                      {/* Button */}
                      <Col span={3}>
                          <TrashCan color={getColor('red')} onClick={onDelete} />
                      </Col>
                    </Row>
                    {/* Login Time */}
                    <Space size={2} direction="horizontal">
                      <Col style={{ marginTop: '1rem' }}>
                        <Clock color='black'/>
                      </Col>  
                      <Col>
                        <Typography.Text >Last Login on {renderDate(data?.login_time)} {renderTime(data?.login_time)}</Typography.Text>
                      </Col>
                    </Space>
                  </Space>
                )}
                { data == null && (
                  <div 
                  style={{ background: borderColor, borderRadius: '20px', height: 'auto' }}
                  className="outer-gradient-border"
                >
                    <div 
                      style={{ background: '#F3F4F6', padding: '30px 30px', borderRadius: '18px', height: 'auto', display: 'flex', alignItems: 'center' }} 
                      className='inner-text'
                    >
                      <Plus color="#AEA8A8"/>
                    </div>
                  </div>
                )}
            </Col>
          </Row>
      </div>
    </div>
  );
};

export default IntegrationCard;
