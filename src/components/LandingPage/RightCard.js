import {Button, Card, Form} from "react-bootstrap";
import {parseRtif} from "../../parser";
import React, {useEffect} from "react";
import bsCustomFileInput from "bs-custom-file-input";
import {readAsText} from "promise-file-reader";

function RightCard({rtif: theRtif, setRtif}) {
    useEffect(() => {
        bsCustomFileInput.init()
    }, []);

    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const theFile = formData.get("rtifFile");

        readAsText(theFile)
            .then(fileContents => {
                const parsedRtif = parseRtif(fileContents);
                setRtif(parsedRtif);
            })
    }

    return <Card>
        <Card.Header>Load Timetable</Card.Header>
        <Card.Body>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.File
                        name={"rtifFile"}
                        label="Select timetable"
                        required
                        custom />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Card.Body>
    </Card>;

}

export default RightCard;
