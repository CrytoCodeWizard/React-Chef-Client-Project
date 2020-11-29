import React, { useState, useEffect } from "react";
import { Container, Jumbotron, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../store/bookings/bookingActions";
import { selectAllBookings } from "../../store/bookings/bookingSelectors";
import { selectUser } from "../../store/userLogin/userLoginSelectors";
import "./MyBookings.css";
import moment from "moment";

function MyBookings() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const fetchedBookings = useSelector(selectAllBookings);
  const [bookings, setBookings] = useState([]);
  const isAdmin = true;

  useEffect(() => {
    dispatch(fetchBookings(user.id));
    setBookings(fetchedBookings);
  }, [dispatch, user.id, fetchedBookings]);

  return (
    <div>
      <Jumbotron>
        <h1 className="Jumbotron-header">My Bookings</h1>
      </Jumbotron>
      <Container>
        <div className="Reservations-wrapper">
          <div className="Reservations-table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Booking date</th>
                  <th>Date received</th>
                  {isAdmin && <th>Name</th>}
                  {isAdmin && <th>Email</th>}
                  {isAdmin && <th>Cancel</th>}
                </tr>
              </thead>
              <tbody>
                {bookings.map((x) => (
                  <tr key={x.id}>
                    <td>{x.date}</td>
                    <td>{moment(x.createdAt).format("YYYY-MM-DD")}</td>
                    {isAdmin && <td>{`${x.user.firstName} ${x.user.lastName}`}</td>}
                    {isAdmin && <td>{x.user.email}</td>}
                    {isAdmin && (
                      <td>
                        <button
                          onClick={() => console.log("click")}
                          className="Reservations-cancel-btn"
                        >
                          Cancel
                        </button>
                      </td>
                    )}
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
