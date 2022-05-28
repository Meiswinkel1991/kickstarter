import { useRouter } from "next/router";
import Link from "next/link";
import {useState} from "react";

import {Form,Button,Message,Input,Icon} from 'semantic-ui-react';

import web3 from "../../../../ethereum/web3";
import Campaign from "../../../../ethereum/campaign";



const RequestNew = ({address}) => {

    const[isLoading,setIsLoading] = useState(false);
    const[errorMessage,setErrorMessage] = useState('');

    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');
    const [recipient,setRecipient] = useState('');



    const router = useRouter(); 

    const onSubmit = async (event) => {
        event.preventDefault;

        setErrorMessage('');
        setIsLoading(true);

        const campaign = Campaign(address);

        try{

            const accounts = await web3.eth.getAccounts();

            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value,'ether'),
                recipient
            ).send({
                from: accounts[0]
            });

            router.push(`/campaigns/${address}/requests`);


        } catch(err) {
            setErrorMessage(err.message);
        }


        setIsLoading(false);
    };

    return(

        <div>
            <Link href={`/campaigns/${address}/requests`}>
            <Button 
                icon 
                labelPosition='left'
                basic 
                color='blue'
            >
                Back
                <Icon name='left arrow' />
            </Button>
            </Link>
            <h3>Request New View!</h3>
            <Form error={!!errorMessage} onSubmit={onSubmit}>
                <Form.Field>
                    <label> Description</label>
                    <Input
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label> Amount of ether</label>
                    <Input
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label> Recipient</label>
                    <Input
                        value={recipient}
                        onChange={event => setRecipient(event.target.value)}
                    />
                </Form.Field>
                <Message error header='Ooops!' content={errorMessage} />
                <Button primary loading={isLoading}>
                    Create Request!
                </Button>
            </Form>
        </div>
    );

};



export default RequestNew;



export async function getServerSideProps({ params }) {

    const {address} = params;


    return{
        props: {
            address: params.address
        }
    };
}

