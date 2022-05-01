import PropTypes from "prop-types";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiButton from "components/SuiButton";
import campaigns from "config/PancakeSwap/constants/campaigns.json";
import { BadgeIcon } from "../Logos";

function AchievementCard({ campaignId, points }) {
  const obj = campaigns.find((o) => o.id === campaignId);

  return (
    <SuiBox p={2}>
      <SuiBox component="ul" display="flex" flexDirection="column">
        <SuiBox key="1" component="li" display="flex" alignItems="center">
          <SuiBox mr={1}>
            <SuiAvatar src={`https://pancakeswap.finance/images/achievements/${obj.badge}`} alt={obj.title} variant="rounded" />
          </SuiBox>
          <SuiBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
            <SuiTypography variant="button" fontWeight="bold">
              {obj.type === "ifo" ? `IFO Shopper: ${obj.title}` : obj.title}
            </SuiTypography>
            <SuiBox lineHeight={0}>
              {obj.type === "ifo" ? (
                <SuiTypography variant="button" fontWeight="regular" color="text">
                  Committed more than $5 worth of LP in the {obj.title} IFO
                </SuiTypography>
              ) : null}
              {obj.type === "teambattle" ? (
                <SuiTypography variant="button" fontWeight="regular" color="text">
                  Participated in the Trading Competition
                </SuiTypography>
              ) : null}
              {obj.type === "participation" && obj.description ? (
                <SuiTypography variant="button" fontWeight="regular" color="text">
                  {obj.description}
                </SuiTypography>
              ) : null}
            </SuiBox>
          </SuiBox>
          <SuiBox ml="auto">
            <SuiButton variant="text" size="medium" color="dark" fontSize={15}>
              <BadgeIcon />
              {points}
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </SuiBox>
  );
}

AchievementCard.propTypes = {
  campaignId: PropTypes.string.isRequired,
  points: PropTypes.string.isRequired,
};

export default AchievementCard;
