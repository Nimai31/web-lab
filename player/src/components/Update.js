import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from 'axios';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [inpval, setINP] = useState({
        name: "",
        position: "",
        age: "",
        team: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:8003/api/players/${id}`)
            .then(response => {
                setINP(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the player data!', error);
            });
    }, [id]);

    const setData = (e) => {
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        });
    };

    const updateUser = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8003/api/players/${id}`, inpval)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('There was an error updating the player!', error);
            });
    };

    return (
        <div>
            <div className="container">
                <NavLink to="/">Home</NavLink>
                <form className="mt-5" onSubmit={updateUser}>
                    <div className="row">
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" value={inpval.name} onChange={setData} name="name" className="form-control" id="name" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="position" className="form-label">Position</label>
                            <input type="text" value={inpval.position} onChange={setData} name="position" className="form-control" id="position" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" value={inpval.age} onChange={setData} name="age" className="form-control" id="age" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="team" className="form-label">Team</label>
                            <input type="text" value={inpval.team} onChange={setData} name="team" className="form-control" id="team" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Update;
