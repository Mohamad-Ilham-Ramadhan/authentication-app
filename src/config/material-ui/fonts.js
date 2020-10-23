import notoSans300Eot from "../../assets/fonts/noto-sans-hk-v5-latin-300.eot";
import notoSans300Woff2 from "../../assets/fonts/noto-sans-hk-v5-latin-300.woff2";
import notoSans300Woff from "../../assets/fonts/noto-sans-hk-v5-latin-300.woff";
import notoSans300Svg from "../../assets/fonts/noto-sans-hk-v5-latin-300.svg";

import notoSans400Eot from "../../assets/fonts/noto-sans-hk-v5-latin-regular.eot";
import notoSans400Woff2 from "../../assets/fonts/noto-sans-hk-v5-latin-regular.woff2";
import notoSans400Woff from "../../assets/fonts/noto-sans-hk-v5-latin-regular.woff";
import notoSans400Svg from "../../assets/fonts/noto-sans-hk-v5-latin-regular.svg";

import notoSans500Eot from "../../assets/fonts/noto-sans-hk-v5-latin-500.eot";
import notoSans500Woff2 from "../../assets/fonts/noto-sans-hk-v5-latin-500.woff2";
import notoSans500Woff from "../../assets/fonts/noto-sans-hk-v5-latin-500.woff";
import notoSans500Svg from "../../assets/fonts/noto-sans-hk-v5-latin-500.svg";

import notoSans700Eot from "../../assets/fonts/noto-sans-hk-v5-latin-700.eot";
import notoSans700Woff2 from "../../assets/fonts/noto-sans-hk-v5-latin-700.woff2";
import notoSans700Woff from "../../assets/fonts/noto-sans-hk-v5-latin-700.woff";
import notoSans700Svg from "../../assets/fonts/noto-sans-hk-v5-latin-700.svg";

const notoSans300 = {
  fontFamily: "Noto Sans HK",
  fontStyle: "normal",
  fontWeight: 300,
  src: `url('${notoSans300Eot}'),
        local('Noto Sans HK Light'), local('NotoSansHK-Light'),
        url('${notoSans300Eot}?#iefix') format('embedded-opentype'),
        url('${notoSans300Woff2}') format('woff2'),
        url('${notoSans300Woff}') format('woff'),
        url('${notoSans300Svg}#NotoSansHK') format('svg'); 
  `,
};

const notoSans400 = {
  fontFamily: "Noto Sans HK",
  fontStyle: "normal",
  fontWeight: 400,
  src: `url('${notoSans400Eot}'),
        local('Noto Sans HK Regular'), local('NotoSansHK-Regular'),
        url('${notoSans400Eot}?#iefix') format('embedded-opentype'),
        url('${notoSans400Woff2}') format('woff2'),
        url('${notoSans400Woff}') format('woff'),
        url('${notoSans400Svg}#NotoSansHK') format('svg'); 
  `,
};
const notoSans500 = {
  fontFamily: "Noto Sans HK",
  fontStyle: "normal",
  fontWeight: 500,
  src: `url('${notoSans500Eot}'),
        local('Noto Sans HK Medium'), local('NotoSansHK-Medium'),
        url('${notoSans500Eot}?#iefix') format('embedded-opentype'),
        url('${notoSans500Woff2}') format('woff2'),
        url('${notoSans500Woff}') format('woff'),
        url('${notoSans500Svg}#NotoSansHK') format('svg'); 
  `,
};
const notoSans700 = {
  fontFamily: "Noto Sans HK",
  fontStyle: "normal",
  fontWeight: 700,
  src: `url('${notoSans700Eot}'),
        local('Noto Sans HK Bold'), local('NotoSansHK-Bold'),
        url('${notoSans700Eot}?#iefix') format('embedded-opentype'),
        url('${notoSans700Woff2}') format('woff2'),
        url('${notoSans700Woff}') format('woff'),
        url('${notoSans700Svg}#NotoSansHK') format('svg'); 
  `,
};

export { notoSans300, notoSans400, notoSans500, notoSans700 };
