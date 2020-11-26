import React from "react";
import "./MyProfile.css";

function EditMode({ setEditProfile, chef, editProfile }) {
  return (
    <div className="MyProfile-editMode-wrapper">
      <h5>Edit profile details...</h5>
      <input
        onChange={(e) => setEditProfile({ ...editProfile, yearsOfExperience: e.target.value })}
        className="MyProfile-editMode-input"
        placeholder={editProfile.yearsOfExperience}
        type="text"
      />
      <input
        onChange={(e) => setEditProfile({ ...editProfile, hourlyRate: e.target.value })}
        placeholder={editProfile.hourlyRate}
        className="MyProfile-editMode-input"
        type="text"
      />
      <input
        onChange={(e) => setEditProfile({ ...editProfile, position: e.target.value })}
        className="MyProfile-editMode-input"
        placeholder={editProfile.position}
        type="text"
      />
      <input
        onChange={(e) => setEditProfile({ ...editProfile, city: e.target.value })}
        className="MyProfile-editMode-input"
        placeholder={editProfile.city}
        type="text"
      />
      <textarea
        className="MyProfile-editMode-textarea"
        onChange={(e) => setEditProfile({ ...editProfile, description: e.target.value })}
        rows="6"
        cols="30"
        defaultValue={chef && chef.profile.description}
      ></textarea>
    </div>
  );
}

export default EditMode;
