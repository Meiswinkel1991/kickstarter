import React,{useState} from 'react';
import { useRouter } from 'next/router';


import { Button, Input, Form,Message } from 'semantic-ui-react'

import Layout from '../../components/Layout';

import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';


const CampaignNew = () => {

    const [minimumContribution,setMinimumContribution] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    const router = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        setErrorMessage('');

        try{
            const accounts = await web3.eth.getAccounts();

            await factory.methods.createCampaign(minimumContribution)
                .send({
                    from: accounts[0]
                });
            
            router.push("/");

        }catch(err){
            setErrorMessage(err.message);
        }

        setIsLoading(false);


    };

    return(
        <div>
                <h3>Create a Campaign!</h3>
                <Form error={!!errorMessage} onSubmit={onSubmit}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            labelPosition='right'
                            placeholder='Enter amount...'
                            label='Wei' 
                            size='large'
                            value={minimumContribution}
                            onChange={event => setMinimumContribution(event.target.value)}
                        />
                        
                    </Form.Field>

                    <Message error header='Oops!' content={errorMessage}/>
                    
                    
                    <Button loading={isLoading} primary >Create!</Button>
                </Form>
            </div>
    )


};



export default CampaignNew;