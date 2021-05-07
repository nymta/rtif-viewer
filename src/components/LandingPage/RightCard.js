import React from "react";

import {
  EuiButton,
  EuiCard,
  EuiFilePicker,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
} from "@elastic/eui";
import { readAsText } from "promise-file-reader";

import { parseRtif } from "../../parser";

function RightCard({ rtif: theRtif, setRtif }) {
  const filePickerRef = React.createRef();

  function onSubmit(event) {
    event.preventDefault();
    const theForm = event.target;

    const formData = new FormData(theForm);
    const theFile = formData.get("rtifFile");

    const filePicker = filePickerRef.current;

    readAsText(theFile).then((fileContents) => {
      const parsedRtif = parseRtif(fileContents);
      setRtif(parsedRtif);
      theForm.reset();
      filePicker.setState({ promptText: null });
    });
  }

  return (
    <EuiCard title={"Load Timetable"} padding={"l"} display="subdued">
      <EuiForm className={"eui-textLeft"} component="form" onSubmit={onSubmit}>
        <EuiFormRow label="RTIF file">
          <EuiFilePicker required name={"rtifFile"} ref={filePickerRef} />
        </EuiFormRow>
        <EuiSpacer />
        <EuiButton type="submit" fill>
          Load
        </EuiButton>
      </EuiForm>
    </EuiCard>
  );
}

export default RightCard;
