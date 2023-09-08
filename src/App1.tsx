import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { useState } from "react";
import "./App.css";
import {
  useGetProfileQuery,
  useGetProfilesQuery,
  useAddProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} from "./services/api";
import Clsx from "./components/Clsx";
type ProfileDetailType = {
  id: string;
};
const App = () => {
  const [show, setShow] = useState<boolean>(true);

  const handleChange = () => {
    setShow((p) => !p);
    refetch();
  };

  const { data, error, isLoading, isFetching, isSuccess, refetch } =
    useGetProfilesQuery(undefined, {
      pollingInterval: 30000,
    });
  // if (clsx) {
  //   return <Clsx />;
  // }
  return (
    <div className="App">
      <Grid>
        <Grid item>
          <FormControl>
            <InputLabel>Email Address</InputLabel>
            <Input id="my-input" />
            <FormHelperText>Donot Share your email.</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Button onClick={handleChange}>Show</Button>

      <h1>Using RTK Query</h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Something went wrong...</h2>}
      {error && <h2>Something went wrong...</h2>}
      {isFetching && <h2>Fetching...</h2>}
      {isSuccess && (
        <div>
          {show ? (
            <div>
              {data?.map((profile) => {
                return (
                  <div className="data" key={profile.id}>
                    <span>{profile.name}</span>
                    {/* <span>{profile["job description"]}</span> */}
                    <span>
                      <ProfileDetailComponent id={profile.id} />
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <Clsx />
          )}
          <span>
            <AddProfileComponent />
          </span>
        </div>
      )}
    </div>
  );
};

export const AddProfileComponent = () => {
  const [addProfile] = useAddProfileMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const [deleteProfile] = useDeleteProfileMutation();
  const profile = {
    id: "6",
    name: "Prajwol",
    position: "Head of Technology",
    contract: false,
    "job description": "Fun Motivate Try hard 100%  .",
  };
  const rest = {
    id: "1",
    name: "Best Version",
    position: "Lead of Technology",
    contract: true,
    "job description": "Contract with devil !00% focus and 100% work ethics",
  };
  const addHandler = async () => {
    try {
      const res = await addProfile(profile);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const updateHandler = async () => {
    try {
      const res = await updateProfile(rest);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const removeHandler = async () => {
    try {
      const res = await deleteProfile("6");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <button onClick={addHandler}>Add Profile</button>
      <button onClick={updateHandler}>Update Profile</button>
      <button onClick={removeHandler}>Remove Profile</button>
    </>
  );
};

export const ProfileDetailComponent = ({ id }: ProfileDetailType) => {
  const { data } = useGetProfileQuery(id);
  return (
    <>
      <pre style={{ textAlign: "left" }}>{data?.name}</pre>
    </>
  );
};
export default App;
