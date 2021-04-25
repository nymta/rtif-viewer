import React from "react";
import {Col, Row} from "react-bootstrap";
import LeftCard from "./LeftCard";
import RightCard from "./RightCard";
import "./LandingPage.css";

function LandingPage({rtif: theRtif, setRtif}) {
    return <Row className={"landingPage h-100"}>
        <Col lg={{span: 4, offset: 2}}>
            <LeftCard rtif={theRtif}/>
        </Col>
        <Col lg={{span: 4}}>
            <RightCard rtif={theRtif} setRtif={setRtif}/>
        </Col>
    </Row>;
}

export default LandingPage;
