import React from 'react';

import { Card,Button } from 'semantic-ui-react';


import Layout from '../components/Layout';
import factory from '../ethereum/factory';


class CampaignIndex extends React.Component {

    static async getInitialProps() {
        
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return {campaigns: campaigns};
    };

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return{
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            };
        });

        return <Card.Group items={items}/>
    };



    render() {
        return(
            <Layout> 
                <div>
                    <h3>Open Camapigns</h3>
                    
                    <Button
                        content="Create Campaign"
                        icon="add circle"
                        primary
                        labelPosition='right'
                        floated='right'
                    />
                    {this.renderCampaigns()}
                </div>
            </Layout>
    )};
}

export default CampaignIndex;

