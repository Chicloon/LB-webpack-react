import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { observer } from 'mobx-react';

@observer(['doctors'])
class SongList extends Component {
    componentWillMount() {
        this.props.doctors.fetchAll();
    }

    renderSongs() {
        console.log(this.props);
        return this.props.data.users.map(user =>
            <li key={user.id} className="collections-item">
                {user.name}
            </li>
        );
    }

    render() {
        if(this.props.data.loading) {
            return <div> Loading.... </div>
        }
        
        return (
            <ul className="collection">
                Songs
                {this.renderSongs()}               
            </ul>
        );
    }
}

const query = gql`
    {
        users {
            name,
            id
        }
    }
`;

export default graphql(query)(SongList);




/*
import React from 'react';

const Home = () =>
    <div style={{ 'margin': '2em' }}>
        Сайт-болванка для записи на прием к врачу
    </div>;

export default Home;
*/
