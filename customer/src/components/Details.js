import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Details = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8003/api/players/${id}`)
            .then(response => {
                setPlayer(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the player data!', error);
            });
    }, [id]);

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Welcome {player.name}</h1>
            <Card sx={{ minWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <button className="btn btn-primary mx-2"><CreateIcon /></button>
                        <button className="btn btn-danger"><DeleteIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src={`${process.env.PUBLIC_URL}/profile.png`} style={{ width: 60 }} alt="Profile" />
                            <h3 className="mt-3">Name: <span>{player.name}</span></h3>
                            <h3 className="mt-3">Position: <span>{player.position}</span></h3>
                            <h3 className="mt-3">Age: <span>{player.age}</span></h3>
                        </div>
                        <div className="right_view col-lg-6 col-md-6 col-12">
                            <h3 className="mt-5">Team: <span>{player.team}</span></h3>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Details;
