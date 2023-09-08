import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
const StyledComponent = () => {
  const Basic = styled(Box)({
    backgroundColor: "aliceblue",
    color: "darkslategray",
    padding: "2rem",
    textAlign: "center",
  });
  const UsingTheme = styled(Box)(
    ({theme}) => ({
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.grey[900],
        padding: theme.spacing(2),
        textAlign: 'center',
        ...theme.typography.h6,
    })
  )
  return <UsingTheme>StyledComponent</UsingTheme>;
};

export default StyledComponent;
