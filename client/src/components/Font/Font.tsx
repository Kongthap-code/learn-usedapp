import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@700&display=swap');
    `}
  />
);

export default Fonts;