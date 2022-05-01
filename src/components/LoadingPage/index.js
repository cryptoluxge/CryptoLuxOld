import SuiBox from "components/SuiBox";
import Stack from "@mui/material/Stack";
import SuiTypography from "components/SuiTypography";

function LoadingPage() {
  return (
    <SuiBox>
      <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
        <svg width="60px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 500.16 500.16">
          <defs>
            <style>{"\n      .cls-1{fill:none;}.cls-2{clip-path:url(#clip-path);}.cls-3{fill:url(#linear-gradient);}.cls-4{fill:#ffbc00;}\n    "}</style>
            <clipPath id="clip-path" transform="translate(-0.38 0.16)">
              <circle className="cls-1" cx={250.45} cy={249.92} r={250.08} />
            </clipPath>
            <linearGradient id="linear-gradient" x1={79.27} y1={545.93} x2={420.89} y2={-45.77} gradientUnits="userSpaceOnUse">
              <stop offset={0} stopColor="#ffdb01" />
              <stop offset={1} stopColor="#ff00fa" />
            </linearGradient>
          </defs>
          <g className="cls-2">
            <rect className="cls-3" width={500.16} height={500.16} />
            <ellipse cx={250.99} cy={249.14} rx={228.91} ry={229.14} />
            <ellipse className="cls-4" cx={250.99} cy={249.14} rx={209.31} ry={209.52} />
            <path d="M192.27,335.11l.14-90.28c0-.14,0-.27,0-.4.59-4.61,11.89-84,95.52-64.88l.19.07c3,1.36,24.59,13,32.15,23.15a3.3,3.3,0,0,0,5,.4l27.32-27.32a3.29,3.29,0,0,0,.28-4.35c-8.15-10.44-45.25-51.58-114.43-36.89,0,0-72.6,12.28-88.16,84.86,0,1.49-23.2,72.29,36.66,118.26A3.31,3.31,0,0,0,192.27,335.11Z" transform="translate(-0.38 0.16)" />
            <path d="M259.12,202.79V319.3a2.67,2.67,0,0,0,2.49,2.68c8,.56,34.23,0,59.33-26.35a2.68,2.68,0,0,1,3.79-.08l28.13,26.78a2.69,2.69,0,0,1,.24,3.64c-5.83,7.24-28.36,32.29-65.85,39.55-19.57,3.79-44.28,1.63-71-8.59a2.71,2.71,0,0,1-1.73-2.53V244.56c0-.11,0-.22,0-.33.35-2.87,5.57-39.53,41.55-44.12A2.69,2.69,0,0,1,259.12,202.79Z" transform="translate(-0.38 0.16)" />
          </g>
        </svg>
        <SuiTypography fontSize="16px">დაელოდეთ</SuiTypography>
      </Stack>
    </SuiBox>
  );
}

export default LoadingPage;
