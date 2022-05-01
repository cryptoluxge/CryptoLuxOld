import PropTypes from "prop-types";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

function PrivateSaleDetails({ name, value }) {
  return (
    <SuiBox sx={{ display: "flex", justifyContent: "space-between" }}>
      <SuiTypography sx={{ fontSize: 14 }} fontWeight="light">
        {name}
      </SuiTypography>
      <SuiBox>
        <SuiTypography sx={{ fontSize: 14 }} fontWeight="light">
          {value}
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

PrivateSaleDetails.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default PrivateSaleDetails;
