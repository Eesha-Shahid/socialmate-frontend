"use client";
import React from "react";
import { Col, Divider, Image, Row } from "antd";

const Solutions: React.FC = () => {


    return (
        <Row align={"middle"} justify={"center"} id="solutions">
            <Col span={22} xl={19} className="sol-cont" >

                <Row align={"middle"} justify={"center"}>
                    <Col span={20}>
                        <span className="sol-title" >Solutions</span>
                        <div className="vector-2">
                            <Image src="images/vector2.svg" alt="vector" width={170} height={20} />
                        </div>
                    </Col>
                    <p className="sol-p">Transform Your Social Media Experience with SocialMate</p>
                </Row>

                <Row align={"middle"} justify={"space-evenly"} >
                    <Col span={22} md={9} lg={8} >
                        <h2>Multi-Platform Scheduling</h2>
                        <p className="sol-p2">Schedule your posts across multiple social media platforms effortlessly from one dashboard.</p>
                    </Col>
                    <Col span={22} md={12} lg={10} >
                        <Image className="sol-img" src="images/multi-platform.svg" alt="vector" preview={false} />
                    </Col>
                </Row>

                <Divider />

                <Row align={"middle"} justify={"space-evenly"} >
                    <Col span={22} md={12} lg={10}>
                        <Image className="sol-img" src="images/analytics.svg" alt="vector" preview={false} />
                    </Col>
                    <Col span={22} md={9} lg={8}>
                        <h2 >Detailed Analytics & Insights</h2>
                        <p className="sol-p2">Track your performance with comprehensive analytics to make data-driven decisions.</p>
                    </Col>
                </Row>

                <Divider />

                <Row align={"middle"} justify={"space-evenly"} >
                    <Col span={22} md={9} lg={8} >
                        <h2>Content Calendar</h2>
                        <p className="sol-p2">Plan, organize, and execute your social media strategy with our intuitive content calendar.</p>
                    </Col>
                    <Col span={22} md={12} lg={10} >
                        <Image className="sol-img" src="images/calendar.svg" alt="vector" preview={false} />
                    </Col>
                </Row>

                <Divider />

                <Row align={"middle"} justify={"space-evenly"} >
                    <Col span={22} md={12} lg={10}>
                        <Image className="sol-img" src="images/integrations.svg" alt="vector" preview={false} />
                    </Col>
                    <Col span={22} md={9} lg={8}>
                        <h2 >Seamless Integrations</h2>
                        <p className="sol-p2">Connect with popular social media platforms for a seamless experience.</p>
                    </Col>
                </Row>

                <Divider />

                <Row align={"middle"} justify={"space-evenly"} >
                    <Col span={22} md={9} lg={8} >
                        <h2>Prompt & Image Caption</h2>
                        <p className="sol-p2">Generate captivating captions quickly to engage your audience effectively.</p>
                    </Col>
                    <Col span={22} md={12} lg={10} >
                        <Image className="sol-img" src="images/caption.svg" alt="vector" preview={false} />
                    </Col>
                </Row>

                <Divider />

            </Col>
        </Row>
    );
};

export default Solutions;
