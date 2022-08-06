import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import "./settings.scss";
import SideBar from "../../components/sidebar/SideBar";

import { AppContext } from "../../context/AppContext";
import axios from "axios";
// import PROFILE from "../../assets/profile.jpg";

const Settings = () => {
  const { user, dispatch, isFetching } = useContext(AppContext);
  const PF = "http://localhost:5000/images/";

  const [updatePf, setUpdatePf] = useState({
    username: "",
    email: "",
    password: "",
    file: null,
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setUpdatePf({
      ...updatePf,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    dispatch({type:'UPDATE_START'})
    e.preventDefault();

    const updatedUser = {
      userId: user._id,
      username: updatePf.username,
      email: updatePf.email,
      password: updatePf.password,
    };

    if (updatePf.file) {
      const data = new FormData();
      const fileName = Date.now() + updatePf.file.name;
      data.append("name", fileName);
      data.append("file", updatePf.file);
      updatedUser.profilePicture = fileName;
      try {
        await axios.post("/upload", data);
      } catch (error) {}
    }
    
    try {
     const {data} =  await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
    dispatch({ type: "UPDATE_SUCCESS", payload: data});

    } catch (error) {
    dispatch({ type: "UPDATE_FAILURE" });

    }
  };

  const onDelete = async()=>{
    try {
      await axios.delete(`/users/${user._id}`);
    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle" onClick={onDelete}>Delete Account</span>
        </div>
        <form onSubmit={handleSubmit} className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={ updatePf.file ? URL.createObjectURL(updatePf.file) : PF + user.profilePicture } alt="profile" />
            <label htmlFor="fileInput">
              <FaUser className="settingsPPIcon" />
            </label>
          </div>

          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) =>
              setUpdatePf({ ...updatePf, file: e.target.files[0] })
            }
          />
          <label>User</label>
          <input
            type="text"
            name="username"
            placeholder={user.username}
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder={user.email}
            onChange={handleChange}
          />
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} />

          <button type="submit" className="settingsSubmit">
            {isFetching ? 'loading' :'Update'}
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "25px" }}
            >
              Profile updated successfully
            </span>
          )}
        </form>
      </div>
      <SideBar />
    </div>
  );
};

export default Settings;
