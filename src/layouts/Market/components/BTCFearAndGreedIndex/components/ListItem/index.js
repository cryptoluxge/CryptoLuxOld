import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import SuiTypography from "components/SuiTypography";

function ListItem({ number, text, when, emotioncolor }) {
  return (
    <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center" }}>
      <Avatar sx={{ backgroundColor: emotioncolor, width: 40, height: 40 }} variant="rounded">
        {number}
      </Avatar>
      <Stack direction="column" spacing={0}>
        <SuiTypography fontSize="14px">{when}</SuiTypography>
        <SuiTypography fontSize="14px" fontWeight="bold">
          {text}
        </SuiTypography>
      </Stack>
    </Stack>
  );
}

ListItem.defaultProps = {
  number: 0,
  emotioncolor: "warning.main",
  text: "-",
  when: "-",
};

ListItem.propTypes = {
  number: PropTypes.number,
  text: PropTypes.string,
  when: PropTypes.string,
  emotioncolor: PropTypes.string,
};

export default ListItem;
