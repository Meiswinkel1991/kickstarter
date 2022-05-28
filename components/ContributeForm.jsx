import { useState} from 'react';
import { useRouter } from 'next/router';
import {Button,Form,Input,Message} from 'semantic-ui-react';

import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';



const ContributeForm = ({address}) => {

    const [value,setValue] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    const router = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault;

        setIsLoading(true);
        setErrorMessage('');

        const campaign = Campaign(address);

        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value,'ether')
            });

            router.push(`/campaigns/${address}`);

        } catch(err) {
            setErrorMessage(err.message);
        }

        setIsLoading(false)


    } 

    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <Input
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    label='ether'
                    labelPosition='right'
                >
                </Input>
            </Form.Field>
            <Message error header='Oops!' content={errorMessage} />
            <Button loading={isLoading} primary>
                Contribute!
            </Button>
        </Form>
    );
};



export default ContributeForm;