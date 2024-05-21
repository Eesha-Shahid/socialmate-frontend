"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button, Col, Image, Row } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const HeroSection: React.FC = () => {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push("/auth");
    };

    return (
        <Row align={"middle"} justify={"center"} id="home">
            <Col
                className='hero'
                span={21}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: "center",
                    position: 'relative',
                }}
            >
                <Row align="middle" justify="center" >
                    <Col className="hero-container">
                        <span className="hero-title" >Simplify Your Social Media Management with
                            <span className="gradient-text hero-title" > SocialMate</span>
                            <div className="vector-1">
                                <Image src="images/vector1.svg" alt="vector" width={170} height={20} />
                            </div>
                        </span>

                    </Col>
                </Row>
                <p className="sol-p">Streamline scheduling, analytics, and engagement across your social media platforms</p>
                <Button
                    id="login"
                    type="primary"
                    onClick={handleButtonClick}
                    style={{ fontWeight: 500, fontSize: "16px", marginTop: '10px', height: '50px' }}
                >
                    Get Started
                    <ArrowRightOutlined />
                </Button>
                <Row className='hero-img-cont' align={'middle'} justify={'center'}>
                    <Image src="images/hero.svg" alt="vector" className="hero-img" preview={false}/>
                </Row>

            </Col>
        </Row>
    );
};

export default HeroSection;
