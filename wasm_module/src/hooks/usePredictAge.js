import { useState } from "react";
import { predictAge } from "@privateid/cryptonets-web-sdk-alpha";

const usePredictAge = () => {
  const [age, setAge] = useState(null);
  const [antispoofPerformed, setAntispoofPerformed] = useState(false);
  const [antispoofStatus, setAntispoofStatus] = useState("");
  const [validationStatus, setValidationStatus] = useState("");

  const callback = (response) => {
    console.log("predict Age Callback", response);

    if (response?.returnValue?.faces.length > 0) {
      setAge(response?.returnValue?.faces[0].age);
      setAntispoofPerformed(response?.returnValue?.faces[0].anti_spoof_performed);
      setAntispoofStatus(response?.returnValue?.faces[0].anti_spoof_status);
      setValidationStatus(response?.returnValue?.faces[0].status);
    } else {
      setAge("");
      setAntispoofPerformed("");
      setAntispoofStatus("");
      setValidationStatus("");
    }

    doPredictAge();
  };

  const doPredictAge = async () => {
    setAge("");
      setAntispoofPerformed("");
      setAntispoofStatus("");
      setValidationStatus("");
    await predictAge(callback, {
      input_image_format: "rgba",
    });
  };

  return { doPredictAge, age, antispoofPerformed, antispoofStatus, validationStatus };
};

export default usePredictAge;
