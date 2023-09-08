// import CustomLinearProgress from './components/styled/CustomLinearProgress'
// import CustomSelect from './components/styled/CustomSelect'
import StyledComponent from './components/styled/StyledComponent'
import PasswordField from './components/PasswordField'
import { Typography } from '@mui/material'
import { useState } from 'react'
import SearchBar from './components/SearchBox'
import Calender from './components/Organisms/Calender'
const App = () => {
    const [password, setPassword] = useState<string>("")
    // console.log(password)
  return (
    <div>
        <Typography>StyledComponent</Typography>
        <StyledComponent />
        <PasswordField password={password} onChange={(v) => setPassword(v)} />
        {/* <SearchBar /> */}
        {/* <Calender /> */}
        {/* <CustomLinearProgress /> */}
        {/* <CustomSelect /> */}
    </div>
  )
}

export default App