'use client'
import { loadUser } from "@/redux/actions/authAction";
import { AuthSelector } from "@/redux/reducers";
import { useAppDispatch } from "@/redux/store";
import { UserRoles } from "@/types";
import { Typography, Tabs, Image, Space, Col, Button, Avatar, Row } from "antd"
import { useEffect } from "react";
import { useSelector } from "react-redux";
const { Title, Text } = Typography;

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector(AuthSelector);
  
  useEffect(()=> {
    dispatch(loadUser());
  },[user])

  const borderColor = "linear-gradient(90deg, #5082ED 0%, #9A72CB 27%, #B86DA2 63%, #D96570 100%)" 

  const ProfileSettings = () => {
    return (
      <Space style={{ width: '100%' }} direction="vertical">
        <Col span={24}>
          <Text style={{ fontSize: '1rem', fontWeight: '500' , textAlign: 'center'}}>
            Profile Settings
          </Text>
        </Col>
        <Row style={{ margin: '2rem'  }}>
          <Col span={2}>
            <Avatar size={100} shape='circle' alt="Profile picture" src={user?.profile_pic} />
          </Col>
          <Col style={{ display: 'flex', alignItems: 'center' }} span={4}>
            <Col span={24}>
              <Text> { user?.username } </Text>
            </Col>
            <Col span={24}>
              <Text> { user?.email } </Text>
            </Col>
          </Col>
          <Col style={{ marginTop: '1rem' }} span={24}>
            <Button>Change Password</Button>
          </Col>
        </Row>
      </Space>
    );
  };

  const AccountSettings = () => {
    return (
      <Space direction="vertical">
        <Col span={24}>
          <Text style={{ fontSize: '1rem', fontWeight: '500' , textAlign: 'center' }}>
            Account Settings
          </Text>
        </Col>
        <Row style={{ margin: '2rem'  }}>
          <Col style={{ marginBottom: '1rem' }} span={24}>
            <Text> You are a { user?.user_type } user </Text>
          </Col>
          { user?.user_type == UserRoles.Standard &&
            <Col span={24}>
              <Button>Switch To Premium</Button>
            </Col>
          }
        </Row>
      </Space>
    );
  };

  const SecurityLayer = () => {
    return (
      <Space direction="vertical">
        <Col span={24}>
          <Text style={{ fontSize: '1rem', fontWeight: '500' , textAlign: 'center' }}>
            Security Layer
          </Text>
        </Col>
        <Row style={{ margin: '2rem'  }}>
          <Col style={{ marginBottom: '1rem' }} span={24}>
            <Text> Two Factor Authentication </Text>
          </Col>
          { !user?.two_factor &&
            <Col span={24}>
              <Button>Add</Button>
            </Col>
          }
        </Row>
      </Space>
    );
  };

  return (
    <>
      <div 
        style={{ background: borderColor, borderRadius: '20px', height: 'auto', margin: '5rem' }}
        className="outer-gradient-border"
      >
        <div 
          style={{ padding: '2rem', borderRadius: '18px', height: 'auto' }} 
          className='inner-text'
        >     
          <div>
          <Title style={{ textAlign: 'center' }} className="gradient-text">
          Settings
          </Title>
            <Tabs
              defaultActiveKey="1"
              tabPosition='left'
              style={{ height: 'auto', paddingBottom: '2rem' }}
              items={[
                {
                  label: 'Profile Settings',
                  key: '1',
                  children: <ProfileSettings/>,
                },
                {
                  label: 'Account Settings',
                  key: '2',
                  children: <AccountSettings />,
                },
                {
                  label: 'Security Layer',
                  key: '3',
                  children: <SecurityLayer />,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;