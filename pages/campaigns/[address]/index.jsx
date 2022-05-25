import Campaign from '../../../ethereum/campaign';



const Show = ({summary,address}) => {

    return(
        <h1>{address}</h1>
    )

};


export default Show;



export async function getServerSideProps(params) {
    const campaign = Campaign(params.address);
    
    return {
        props:{
            summary: {
                campaigns: ''
            },
            address: params.address
            }
        };
};