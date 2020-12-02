import React from "react";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/userLogin/userLoginSelectors";
import { deleteUserTag } from "../../store/users/userActions";
import "./TagBox.css";

function TagBox({ tags, remove }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const deleteTag = (userTagId) => () => {
    dispatch(deleteUserTag(userTagId, user.id));
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to remove
    </Tooltip>
  );

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
            <OverlayTrigger
              placement="right"
              delay={{ show: 300, hide: 100 }}
              overlay={renderTooltip}
            >
              <Badge
                key={x.id}
                variant="danger"
                onClick={deleteTag(x.userTags.id)}
                className="m-1 tag tag-delete"
              >
                {x.tagName}
              </Badge>
            </OverlayTrigger>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagBox;
