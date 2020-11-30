import React from "react";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/userLogin/userLoginSelectors";
import { deleteUserTag } from "../../store/users/userActions";
import "./TagBox.css";

function TagBox({ tags, remove }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const deleteTag = (tagId) => () => {
    dispatch(deleteUserTag(tagId, user.id));
  };

  return (
    <div>
      {!remove ? (
        <div className="tagbox mb-2">
          {tags.map((x) => (
            <Badge key={x.id} variant="success" className="m-1 tag">
              {x.tagName}
            </Badge>
          ))}
        </div>
      ) : (
        <div className="tagbox mb-2">
          {tags.map((x) => (
            <Badge
              key={x.id}
              variant="danger"
              onClick={deleteTag(x.id)}
              className="m-1 tag tag-delete"
            >
              {x.tagName}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagBox;
