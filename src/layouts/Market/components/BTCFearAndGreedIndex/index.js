import { useEffect, useState } from "react";
import SuiBox from "components/SuiBox";
import { Card, Stack } from "@mui/material";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import ListItem from "./components/ListItem";

function Tables() {
  const [data, setData] = useState([]);

  const emotions = { Fear: "შიში", Greed: "სიხარბე", "Extreme Fear": "ექსტრემალური შიში", "Extreme Greed": "ექსტრემალური სიხარბე" };
  const emotionsColor = { Fear: "warning.main", Greed: "success.main", "Extreme Fear": "gradients.error.main", "Extreme Greed": "gradients.success.main" };

  function getData() {
    axios(`https://api.alternative.me/fng/?limit=30`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch(() => {
        setData("error");
      });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <Card sx={{ width: "auto" }}>
      <Stack direction="column" spacing={1} p={1}>
        <SuiBox>
          <Avatar sx={{ width: "100%", height: "100%" }} variant="rounded" src="https://alternative.me/crypto/fear-and-greed-index.png" />
        </SuiBox>
        <SuiBox>
          {data.length > 0 ? (
            <Stack direction="column" spacing={1}>
              <ListItem number={Number(data[0].value)} emotioncolor={emotionsColor[data[0].value_classification]} text={emotions[data[0].value_classification]} when="დღეს" />
              <ListItem number={Number(data[1].value)} emotioncolor={emotionsColor[data[1].value_classification]} text={emotions[data[1].value_classification]} when="გუშინ" />
              <ListItem number={Number(data[7].value)} emotioncolor={emotionsColor[data[7].value_classification]} text={emotions[data[7].value_classification]} when="წინა კვირას" />
              <ListItem number={Number(data[28].value)} emotioncolor={emotionsColor[data[28].value_classification]} text={emotions[data[28].value_classification]} when="წინა თვეს" />
            </Stack>
          ) : null}
        </SuiBox>
      </Stack>
    </Card>
  );
}

export default Tables;
