import Link from "next/link";
import { Table,Button } from "semantic-ui-react";

import Campaign from '../../../../ethereum/campaign';

import RequestRow from "../../../../components/RequestRow";



const RequestIndex = ({address,requests,numRequests,numApprovers}) => {

    const {Header,Row,HeaderCell,Body} = Table;

    const renderRows = () => {
        console.log(requests);
        return requests.map((request,index) => {
            return (<RequestRow
                        key={index}
                        id={index}
                        request={request}
                        address={address}
                        numApprovers={numApprovers}
                    />
            );
        });

    };

    return(
        <div>
            <Link href={`/campaigns/${address}/requests/new`}>
                <Button style={{ marginBottom: 10 }} floated="right" primary>
                    New Request
                </Button>
            </Link>
            <h3>Request List</h3>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {renderRows()}
                </Body>
            </Table>
            <div>Found {numRequests} requests</div>
        </div>
    );

};


export default RequestIndex;

export async function getServerSideProps({ params }) {

    const {address} = params;

    const campaign = Campaign(address);

    const numRequests = await campaign.methods.numRequests().call();

    const numApprovers = await campaign.methods.numApprovers().call();

    const requests = await Promise.all(
        Array(parseInt(numRequests)).fill().map((element,index) => {
            return campaign.methods.requests(index).call();
        })
    );
    

    

    


    return{
        props: {
            address: params.address,
            requests: JSON.parse(JSON.stringify(requests)),
            numRequests: numRequests,
            numApprovers: numApprovers
        }
    };
}