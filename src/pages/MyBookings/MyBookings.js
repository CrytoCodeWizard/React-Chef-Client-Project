import React, { useEffect } from "react";
import { Button, Container, Jumbotron, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteBooking, fetchBookings, updateBooking } from "../../store/bookings/bookingActions";
import { selectAllBookings } from "../../store/bookings/bookingSelectors";
import { selectToken, selectUser } from "../../store/userLogin/userLoginSelectors";
import "./MyBookings.css";
import moment from "moment";
import { useHistory } from "react-router-dom";

function MyBookings() {
  const history = useHistory();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user.id;
  const userType = user.userType;
  const fetchedBookings = useSelector(selectAllBookings);

  let bookingsSortedByDateReceived = [...fetchedBookings].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchBookings(userId, userType));
    }
  }, [dispatch, userId, userType]);

  if (!token || token === null) {
    history.push("/");
  }

  const handleDeleteBooking = (bookingId) => () => {
    dispatch(deleteBooking(bookingId));
  };

  const handleUpdateBooking = (bookingId) => () => {
    dispatch(updateBooking(bookingId));
  };

  return (
    <div className="MyBookings">
      <Jumbotron className="MyBookings-jumbo">
        <h1>My Bookings</h1>
      </Jumbotron>
      <Container>
        <div className="MyBookings-wrapper">
          <div className="MyBookings-table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Booking date</th>
                  <th>Date received</th>
                  {userType === "Chef" ? <th>Booker</th> : <th>Chef Booked</th>}
                  <th>Company</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {bookingsSortedByDateReceived
                  // .filter((x) => x.accepted)
                  .map((x) => (
                    <tr key={x.id}>
                      <td>{x.date}</td>
                      <td>{moment(x.createdAt).format("YYYY-MM-DD")}</td>
                      <td>{`${x.user.firstName} ${x.user.lastName}`}</td>
                      <td>{x.user.businessName}</td>
                      <td>{x.user.email}</td>
                      <td>
                        {x.accepted ? (
                          <Button variant="secondary" onClick={handleUpdateBooking(x.id)}>
                            Cancel
                          </Button>
                        ) : (
                          <Button variant="success" onClick={handleUpdateBooking(x.id)}>
                            Accept
                          </Button>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={handleDeleteBooking(x.id)}
                          className="MyBookings-cancel-btn"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default MyBookings;
