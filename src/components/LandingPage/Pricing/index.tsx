"use client";
import React from "react";
import { Col, Divider, Image, Row } from "antd";

const Pricing: React.FC = () => {


    return (
        <Row align={"middle"} justify={"center"} id="pricing">
            <Col span={22} xl={19} className="sol-cont" >
                <Row align={"middle"} justify={"center"}>
                    <Col span={20}>
                        <span className="sol-title" >Pricing Plans</span>
                        <div className="vector-2">
                            <Image src="images/vector2.svg" alt="vector" width={170} height={20} />
                        </div>
                    </Col>
                    <p className="sol-p">Choose the plan that best suits your needs and start enhancing your social media presence today!</p>
                </Row>

                <Row align={"middle"} justify={"space-evenly"} >
                    <Col span={22}>
                        <Image className="plat-img" src="images/pricing.svg" alt="vector" preview={false} />
                    </Col>
                </Row>
                <Divider />

            </Col>
        </Row>
    );
};

export default Pricing;
