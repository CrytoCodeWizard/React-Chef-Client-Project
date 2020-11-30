import React, { useEffect } from "react";
import { Button, Container, Jumbotron, Table } from "react-bootstrap";
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
  console.log("FETCHED BOOKIGNS", fetchedBookings);

  useEffect(() => {
    dispatch(fetchBookings(user.id));
  }, [dispatch, user.id]);

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
                  <th>Booker</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              <tbody>
                {fetchedBookings
                  .filter((x) => x.accepted)
                  .map((x) => (
                    <tr key={x.id}>
                      <td>{x.date}</td>
                      <td>{moment(x.createdAt).format("YYYY-MM-DD")}</td>
                      <td>{`${x.user.firstName} ${x.user.lastName}`}</td>
                      <td>{x.user.businessName}</td>
                      <td>{x.user.email}</td>
                      <td>
                        <Button
                          onClick={() => console.log("click")}
                          className="MyBookings-cancel-btn"
                        >
                          Cancel
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
