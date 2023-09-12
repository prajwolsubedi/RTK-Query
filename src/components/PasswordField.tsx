import { TextField } from "@mui/material";
interface Props {
  onChange: (v: string) => void;
  password: string;
}

const PasswordField = ({ onChange, password }: Props) => {
  return (
    <TextField onChange={(e) => onChange(e.target.value)} value={password} />
  );
};

export default PasswordField;
