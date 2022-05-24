import React from 'react';

import { useRouter } from "next/router";

import { Menu,Icon} from 'semantic-ui-react';


const Header = () =>{
    const router = useRouter();

    return(
        <Menu style={{marginTop: '10px'}}>
            <Menu.Item onClick={router.push('/')}>
                <a>
                    <Icon name='ethereum' circular inverted color='teal' size='large'/>
                    CrowdCoin
                </a>
            </Menu.Item>

            <Menu.Menu position="right">
                
                <Menu.Item>Campaigns</Menu.Item>
                
                <Menu.Item>
                    +
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
};


export default Header;