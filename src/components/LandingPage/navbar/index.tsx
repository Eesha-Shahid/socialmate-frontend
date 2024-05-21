"use client";
import React, { useState } from "react";
import { Row, Col, Button, Drawer, Typography, Divider } from "antd";
import Image from "next/image";
import { MenuOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { NAV_LINKS } from "@/constants";

const LandingNavbar: React.FC = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const router = useRouter();

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleButtonClick = () => {
        router.push('/auth');
    };

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const closeDrawer = () => {
        setDrawerVisible(false);
    };

    return (
        <>
            <Row style={{ width: "100%"}} justify="space-between" align="middle">
                <Col xs={0} xl={1}/>
                <Col xs={23} lg={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Image src='/images/logo.svg' alt='logo' width={180} height={50} />
                </Col>
                <Col xs={{ span: 0 }} lg={{ span: 10 }} >
                    <Row justify={'center'}>
                        <ul className="nav-links">
                            {NAV_LINKS.map((link) => (
                                <li key={link.key} className="nav-item">
                                    <a onClick={() => scrollToSection(link.href)} >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Row>
                </Col>
                <Col xs={{ span: 0 }} lg={{ span: 7 }} xl={{ span: 6 }}>
                    <Row gutter={[8, 0]} justify={'end'}>
                        <Col>
                            <Button id='login' type="primary" onClick={handleButtonClick}>Log In</Button>
                        </Col>
                        <Col>
                            <Button id='register' type="primary" onClick={handleButtonClick}>Register</Button>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ span: 1 }} lg={{ span: 0 }} >
                    <Button type='default' onClick={showDrawer} icon={<MenuOutlined />} />
                </Col>
                <Col xs={0} xl={1} />
            </Row>

            <Drawer
                placement="right"
                onClose={closeDrawer}
                open={drawerVisible}
            >
                <ul className="nav-links" style={{ flexDirection: 'column', alignItems: 'flex-start'}}>
                    {NAV_LINKS.map((link) => (
                        <React.Fragment key={link.key}>
                            <li className="nav-item">
                                <a onClick={() => { scrollToSection(link.href); closeDrawer; }} style={{ fontSize: '15px' }}>
                                    {link.label}
                                </a>
                            </li>
                            <Divider />
                        </React.Fragment>
                    ))}
                    <li className="nav-item">
                        <a onClick={handleButtonClick} style={{ fontSize: '15px' }}>
                            Log In
                        </a>
                    </li>
                    <Divider />
                    <li className="nav-item">
                        <a onClick={handleButtonClick} style={{ fontSize: '15px' }}>
                            Register
                        </a>
                    </li>
                </ul>
            </Drawer>
        </>
    );
};

export default LandingNavbar;
