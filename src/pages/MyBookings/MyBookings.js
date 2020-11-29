import React, { useState } from "react";
import { Container, Jumbotron, Table } from "react-bootstrap";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const isAdmin = true;

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
                  <th>Date</th>
                  <th>Table</th>
                  {isAdmin && <th>Name</th>}
                  {isAdmin && <th>Email</th>}
                  {isAdmin && <th>Cancel</th>}
                </tr>
              </thead>
              <tbody>
                {bookings.map((x) => (
                  <tr key={x.id}>
                    <td>{x.date}</td>
                    <td>{x.tableId}</td>
                    {isAdmin && <td>{x.user.name}</td>}
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
