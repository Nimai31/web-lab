import React, { useState, useEffect } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

const Home = () => {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8003/api/players')
            .then(response => {
                setPlayers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleView = (id) => {
        navigate(`/view/${id}`);
    };

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this player?")) {
            console.log(`Attempting to delete player with ID: ${id}`);
            axios.delete(`http://localhost:8003/api/players/${id}`)
                .then((response) => {
                    console.log('Delete response:', response);
                    setPlayers(players.filter(player => player._id !== id));
                })
                .catch(error => {
                    console.error('There was an error deleting the player!', error);
                });
        }
    };

    return (
        <div className="mt-5">
            <div className="container">
                <div className="add_btn mt-2 mb-2">
                    <NavLink to="/register" className="btn btn-primary">Add Player</NavLink>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Position</th>
                        <th scope="col">Age</th>
                        <th scope="col">Team</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr key={player._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{player.name}</td>
                            <td>{player.position}</td>
                            <td>{player.age}</td>
                            <td>{player.team}</td>
                            <td className="d-flex justify-content-between">
                                <button className="btn btn-success" onClick={() => handleView(player._id)}><RemoveRedEyeIcon /></button>
                                <button className="btn btn-primary" onClick={() => handleUpdate(player._id)}><CreateIcon /></button>
                                <button className="btn btn-danger" onClick={() => handleDelete(player._id)}><DeleteIcon /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
