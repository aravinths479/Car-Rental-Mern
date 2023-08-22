import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [successMessage, setSuccessMessage] = useState('');

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:4000/api/user/getUserUpdate",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        const data = await response.json();

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setDateOfBirth(data.date_of_birth);
        setPhoneNumber(data.phone_number);
        setAddress(data.address);
        

      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:4000/api/user/postUserUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          first_name,
          last_name,
          date_of_birth,
          phone_number,
          address
        })
      });

      // Handle the response as needed
      setSuccessMessage("Profile Updated");
      
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMsg = () => {
    setSuccessMessage("");
  };


  return (
    <div className="profile">
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="pagetitle">
          <h1>Profile</h1>
        </div>

        <div className="container-xl px-4 mt-4">
          <div className="row">
            <div className="col-xl-8">
              <div className="card mb-4">
                <div className="card-header">Account Details</div>
                <div className="card-body">

                  <form  onSubmit={handleSubmit}>
                    
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputFirstName">
                          First name
                        </label>
                        <input
                          className="form-control"
                          id="inputFirstName"
                          value={first_name}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputLastName">
                          Last name
                        </label>
                        <input
                          className="form-control"
                          id="inputLastName"
                          type="text"
                          value={last_name}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputOrgName">
                          Date Of Birth
                        </label>
                        <input
                          className="form-control"
                          id="inputOrgName"
                          type="text"
                          value={date_of_birth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputLocation">
                          Phone Number
                        </label>
                        <input
                          className="form-control"
                          id="inputLocation"
                          type="text"
                          value={phone_number}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="inputEmailAddress">
                        Address
                      </label>
                      <input
                        className="form-control"
                        id="inputEmailAddress"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <button className="btn btn-primary" type="submit">
                      Save changes
                    </button>
                  </form>
                  <br />
                  {successMessage &&
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {successMessage}
                      <button type="button" onClick={handleMsg} class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
