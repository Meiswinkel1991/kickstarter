import React from 'react';
import { useRouter} from "next/router";
import Link from 'next/link';
import { Card,Button } from 'semantic-ui-react';

import factory from '../ethereum/factory';



const CampaignIndex = ({campaigns}) => {

    const router = useRouter();

    const renderCampaigns = () => {
        
        const items = campaigns.map(address => {
            return{
                header: address,
                description: <Link href={`/campaigns/${address}`}>View Campaign</Link>,
                fluid: true
            };
        });

        return <Card.Group items={items}/>
    };

    return(
            <div>
                <h3>Open Camapigns</h3>
                
                <Button
                    content="Create Campaign"
                    icon="add circle"
                    primary
                    labelPosition='right'
                    floated='right'
                    onClick={() => router.push("/campaigns/new")}
                />
                {renderCampaigns()}
            </div>

)};

export default CampaignIndex;

export async function getServerSideProps(context) {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    
    return {
        props: {
            campaigns,
        },
    };
};
