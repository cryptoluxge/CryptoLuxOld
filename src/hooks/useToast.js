import { useState } from "react";
import SuiSnackbar from "components/SuiSnackbar";

export function successToast(title, description, open) {
  const [successSB, setSuccessSB] = useState(open);
  const closeSuccessSB = () => setSuccessSB(false);
  const renderSB = <SuiSnackbar color="success" icon="check" title={title} content={description} dateTime="" open={successSB} onClose={closeSuccessSB} close={closeSuccessSB} />;

  return renderSB;
}

export function errorToast(title, description, open) {
  const [successSB, setSuccessSB] = useState(open);
  const closeSuccessSB = () => setSuccessSB(false);
  const renderSB = <SuiSnackbar color="error" icon="warning" title={title} content={description} dateTime="" open={successSB} onClose={closeSuccessSB} close={closeSuccessSB} />;

  return renderSB;
}

export function infoToast(title, description, open) {
  const [successSB, setSuccessSB] = useState(open);
  const closeSuccessSB = () => setSuccessSB(false);
  const renderSB = <SuiSnackbar color="info" icon="notifications" title={title} content={description} dateTime="" open={successSB} onClose={closeSuccessSB} close={closeSuccessSB} />;

  return renderSB;
}

export function warningToast(title, description, open) {
  const [successSB, setSuccessSB] = useState(open);
  const closeSuccessSB = () => setSuccessSB(false);
  const renderSB = <SuiSnackbar color="warning" icon="autorenew" title={title} content={description} dateTime="" open={successSB} onClose={closeSuccessSB} close={closeSuccessSB} />;

  return renderSB;
}
